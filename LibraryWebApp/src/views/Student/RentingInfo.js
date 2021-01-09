/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Header from "components/Headers/Header.js";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Alert } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
} from "reactstrap";
import MyUltil from "store/ultility"
import { element } from "prop-types";
import DueHistoryModal from '../../components/Modals/DueHistoryModal';
import ExtendDueModal from '../../components/Modals/ExtendDueModal';

class RentingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            overDueData: null,
            nowRentingData: null,
            returnedData: null,
            showHistory: false,
            studentId: null,
            book: null,
            showExtdForm: false,
            libraryCardId: null,
            dueDate: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
        this.otherFormatter = this.otherFormatter.bind(this);
        this.handleExtdSubmit = this.handleExtdSubmit.bind(this);
    }

    componentDidMount() {

        const doGetUserIdThenFetchData = async () => {
            let userid = localStorage.getItem("userId");
            if (userid) {
                await this.setState({ searchValue: userid })
                await this.fetchData();
            }
            return
        }

        return doGetUserIdThenFetchData()

    }

    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }

    handleSearch() {
        this.setState({
            successShow: false,
            errorShow: false
        })
        this.fetchData(1, 10, this.state.searchValue)
    }

    handlePageChange(page, sizePerPage) {
        console.log(page, sizePerPage)
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {

        const doFetchData = async () => {
            await this.props.onFetchData(page - 1, sizePerPage, searchValue)
            if (!this.props.data) {
                this.setState({
                    overDueData: null,
                    nowRentingData: null,
                    returnedData: null
                })
            } else {
                var dta = this.props.data
                var retrnedDta = dta.filter(element => element.dateReturned)
                var ovrDta = dta.filter(element => !element.dateReturned)
                var rentingDta = ovrDta.filter(element => MyUltil.compareDate(element.dateDue, Date.now()) >= 0);
                ovrDta = ovrDta.filter(element => MyUltil.compareDate(element.dateDue, Date.now()) < 0);

                this.setState({
                    overDueData: Object.keys(ovrDta).length > 0 ? ovrDta : null,
                    nowRentingData: Object.keys(rentingDta).length > 0 ? rentingDta : null,
                    returnedData: Object.keys(retrnedDta).length > 0 ? retrnedDta : null
                })
            }

            return
        }

        return doFetchData()
    }

    titleFormatter(cell, row) {
        return cell.title;
    }

    isbnFormatter(cell, row) {
        return cell.isbn;
    }

    otherFormatter(cell, row) {
        var stdId = row.borrower.id
        var bok = row.book
        let date = MyUltil.convertToDate(row.dateDue)

        return (
            <div>
                <button className="btn btn-fill btn-info" onClick={() => this.setState({
                    showExtdForm: true,
                    studentId: stdId,
                    book: bok,
                    dueDate: date,
                    libraryCardId: row.id
                })} >Extend due date</button>
                <button className="btn btn-fill btn-info" onClick={() => this.setState({
                    showHistory: true,
                    studentId: stdId,
                    book: bok
                })} ><i className="ni ni-collection" /></button>
            </div>
        )
    }

    handleHistoryClose = () => {
        this.setState({
            showHistory: false
        })
        
    }

    handleExtdFormClose = () => {
        this.setState({
            showExtdForm: false,
            libraryCardId: null
        })
    }

    // handleExtdSubmit(date, libraryCardId) {
    //     this.setState({ showExtdForm: false })
    //     const doExtdThenReloadTable = async () => { 
    //         await this.props.onCancelOrder(date, libraryCardId)
    //         await this.fetchData(this.props.page, this.props.sizePerPage, this.state.searchValue)
    //         return
    //     }
    //     return doExtdThenReloadTable()
    // }

    handleExtdSubmit(libraryCardId) {
        this.setState({ showExtdForm: false })
        const doExtdThenReloadTable = async () => {
            await this.props.onExtdSubmit(libraryCardId)
            await this.setState({successShow: true})
            await this.fetchData(this.props.page, this.props.sizePerPage, this.state.searchValue)
            return
        }
        return doExtdThenReloadTable()
    }

    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            hideSizePerPage: true,
        };

        let display1
        if (!(!this.state.overDueData)) display1 = (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                        {/* <Navbar>
                            <FormGroup>
                                <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                                <button onClick={() => this.handleSearch()} className="btn btn-simple  "><span><i className="fa fa-search"></i></span></button>
                            </FormGroup>
                        </Navbar> */}
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.state.overDueData}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.isbnFormatter} dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        )
        let display2
        if (!(!this.state.nowRentingData)) display2 = (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                        {/* <Navbar>
                            <FormGroup>
                                <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                                <button onClick={() => this.handleSearch()} className="btn btn-simple  "><span><i className="fa fa-search"></i></span></button>
                            </FormGroup>
                        </Navbar> */}
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.state.nowRentingData}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.isbnFormatter} dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        )
        let display3
        if (!(!this.state.returnedData)) display3 = (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                        {/* <Navbar>
                            <FormGroup>
                                <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                                <button onClick={() => this.handleSearch()} className="btn btn-simple  "><span><i className="fa fa-search"></i></span></button>
                            </FormGroup>
                        </Navbar> */}
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.state.returnedData}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataAlign="center">Lent Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        )


        let errorMsg = null
        let msg = null
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }
        if (this.props.successMsg && this.state.successShow) {
            msg = <Alert key="success" variant="success" onClose={() => this.setState({ successShow: false })} dismissible>{this.props.successMsg}</Alert>
        }

        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Over Due</h3>
                        </CardHeader>
                        {errorMsg}
                        {msg}
                        {display1}
                    </Card>
                    <Card className="shadow mt-1 pb-auto">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Renting</h3>
                        </CardHeader>
                        {display2}
                    </Card>
                    <Card className="shadow mt-1 pb-auto">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Returned</h3>
                        </CardHeader>
                        {display3}
                    </Card>

                    <Row className="justify-content-center">
                        <DueHistoryModal
                            show={this.state.showHistory}
                            hide={() => this.handleHistoryClose()}
                            data={this.props.historyData}
                            title={this.state.book ? " Due Date History of [" + this.state.book.title + " - ISBN:" + this.state.book.isbn + "]" : "Default"}
                            onShow={() => this.props.getExtendedHistoryInfo(1, 100, this.state.studentId, this.state.book.id)}
                        />

                        <ExtendDueModal
                            show={this.state.showExtdForm}
                            hide={() => this.handleExtdFormClose()}
                            title="Extend Due Date"
                            // submit={(datePicker) => this.handleExtdSubmit(datePicker, this.state.libraryCardId)}
                            submit={() => this.handleExtdSubmit(this.state.libraryCardId)}
                            dueDate={this.state.dueDate}
                            numOfDateToAdd={7}
                        />

                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.info.loading,
        data: state.info.data,
        error: state.info.error,
        totalSize: state.info.total,
        page: state.info.page,
        sizePerPage: state.info.sizePerPage,
        historyData: state.info.historyData,
        successMsg: state.info.successMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getRentingInfo(page, size, search)),
        getExtendedHistoryInfo: (page, size, studentId, bookId) => dispatch(actions.getExtendedHistory(page, size, studentId, bookId)),
        onExtdSubmit: (libraryCardId) => dispatch(actions.extendDue(libraryCardId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingInfo)
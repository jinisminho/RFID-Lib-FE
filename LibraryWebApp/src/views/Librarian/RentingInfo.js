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
import React, { Component } from "react";
import Header from "components/Headers/Header.js";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Alert } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col
} from "reactstrap";
import MyUtil from "store/utility"
import 'views/Librarian/librarian.css'
import SearchForm from '../../components/Forms/SearchForm'
import DueHistoryModal from '../../components/Modals/DueHistoryModal';
import ExtendDueModal from '../../components/Modals/ExtendDueModal';
import StudentInfoCard from 'views/Checkout/studentInfoCard'

class RentingInfo extends Component {
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
            dueDate: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
        this.otherFormatter = this.otherFormatter.bind(this);
        this.otherFormatter2 = this.otherFormatter2.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.handleExtdSubmit = this.handleExtdSubmit.bind(this);

    }

    componentDidMount() {

    }

    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.studentId) {

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
                var rentingDta = ovrDta.filter(element => MyUtil.compareDate(element.dateDue, Date.now()) >= 0);
                ovrDta = ovrDta.filter(element => MyUtil.compareDate(element.dateDue, Date.now()) < 0);

                this.setState({
                    overDueData: Object.keys(ovrDta).length > 0 ? ovrDta : null,
                    nowRentingData: Object.keys(rentingDta).length > 0 ? rentingDta : null,
                    returnedData: Object.keys(retrnedDta).length > 0 ? retrnedDta : null
                })
            }
            await this.props.getStudent(searchValue)

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
        let date = MyUtil.convertToDate(row.dateDue)

        return (
            <div>
                <button className="btn btn-fill btn-primary btn-block btn-sm text-truncate" onClick={() => this.setState({
                    showHistory: true,
                    studentId: stdId,
                    book: bok
                })} ><i className="ni ni-collection" /> Due Date History </button>
            </div>
        )
    }

    otherFormatter2(cell, row) {
        var stdId = row.borrower.id
        var bok = row.book
        let date = MyUtil.convertToDate(row.dateDue)

        return (
            <div>
                <Row>
                    <Col lg="8"><button className="btn btn-fill btn-primary btn-sm btn-block text-truncate" onClick={() => this.setState({
                        showExtdForm: true,
                        studentId: stdId,
                        book: bok,
                        dueDate: date,
                    })} >Extend due date</button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm btn-block" onClick={() => this.setState({
                        showHistory: true,
                        studentId: stdId,
                        book: bok
                    })} ><i className="ni ni-collection" /></button></Col>
                </Row>


            </div>
        )
    }

    dateFormatter(cell, row) {
        return MyUtil.convertToDate(cell).toDateString()
    }

    handleHistoryClose = () => {
        this.setState({
            showHistory: false
        })

    }

    handleExtdFormClose = () => {
        this.setState({
            showExtdForm: false,
        })
    }

    handleExtdSubmit(bookId, studentId) {
        this.setState({ showExtdForm: false })
        const doExtdThenReloadTable = async () => {
            await this.props.onExtdSubmit(bookId, studentId)
            await this.setState({ successShow: true, errorShow: true })
            await this.fetchData(this.props.page, this.props.sizePerPage, this.state.studentId)
            return
        }
        return doExtdThenReloadTable()
    }

    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.name : '',
            id: this.props.studentData ? this.props.studentData.id : '',
            img: this.props.studentData ? this.props.studentData.img : '',
            department: this.props.studentData ? this.props.studentData.department : '',
            username: this.props.studentData ? this.props.studentData.username : '',
        };
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
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.isbnFormatter} dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataFormat={this.dateFormatter} dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataFormat={this.dateFormatter} dataAlign="center">Due</TableHeaderColumn>
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
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.isbnFormatter} dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataFormat={this.dateFormatter} dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataFormat={this.dateFormatter} dataAlign="center">Due</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter2} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
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
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" dataFormat={this.dateFormatter} dataAlign="center">Lent Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateReturned" dataFormat={this.dateFormatter} dataAlign="center" >Returned Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateDue" dataFormat={this.dateFormatter} dataAlign="center">Due</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        )

        let studentInfo
        if (this.props.studentData) {
            studentInfo = (
                <Container className="pb-4">
                    <Row>
                        <Card className="shadow w-100">
                            <Row>
                                <Col className="col-6">
                                    <StudentInfoCard student={this.getInitialValues()} />
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Container>
            )
        }

        let form = <SearchForm placeholder="e.g. 130111" editClassName="shadow mw-100 p-0" onSubmit={(value) => this.fetchData(1, 10, this.state.studentId = value.search)} formTitle="Search Renting Information By Student ID" />

        let errorMsg = null
        let msg = null

        if (this.props.errOnFetch && this.state.errorShow) {
            errorMsg = <Alert key="danger" variant="danger" onClose={() => this.setState({ successShow: false, errorShow: false })}>{this.props.errOnFetch}</Alert>
        }
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert key="danger" variant="danger" onClose={() => this.setState({ successShow: false, errorShow: false })} dismissible>{this.props.error}</Alert>
        }
        if (this.props.successMsg && this.state.successShow) {
            msg = <Alert key="success" variant="success" onClose={() => this.setState({ successShow: false, errorShow: false })} dismissible>{this.props.successMsg}</Alert>
        }

        return (
            <>
                <Header />
                <Container className="mt-3" fluid>
                    <Row className="justify-content-center">
                        {form}
                    </Row>
                    <Row className="justify-content-center">
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0 ">
                                <h3 className="mb-0">Student Infomation</h3>
                            </CardHeader>
                            {studentInfo}
                            {errorMsg}
                            {msg}
                        </Card>
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0 ">
                                <h3 className="mb-0">Over Due</h3>
                            </CardHeader>
                            {display1}
                        </Card>
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Renting</h3>
                            </CardHeader>
                            {display2}
                        </Card>
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Returned</h3>
                            </CardHeader>
                            {display3}
                        </Card>
                    </Row>

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
                            submit={() => this.handleExtdSubmit(this.state.studentId, this.state.book.id)}
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
        loading: state.infoLside.loading,
        data: state.infoLside.data,
        error: state.infoLside.error,
        totalSize: state.infoLside.total,
        page: state.infoLside.page,
        sizePerPage: state.infoLside.sizePerPage,
        historyData: state.infoLside.historyData,
        successMsg: state.infoLside.successMsg,
        errOnFetch: state.infoLside.errOnFetch,
        studentData: state.infoLside.studentData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, studentId) => dispatch(actions.getRentingInfoLibrarianSide(page, size, studentId)),
        getExtendedHistoryInfo: (page, size, studentId, bookId) => dispatch(actions.getExtendedHistoryLibrarianSide(page, size, studentId, bookId)),
        onExtdSubmit: (studentId, bookId) => dispatch(actions.extendDueLibrarianSide(studentId, bookId)),
        getStudent: (search) => dispatch(actions.getStudentLibInfo(search)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingInfo)
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
import { Navbar, FormGroup, FormControl } from 'react-bootstrap'
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
            returnedData: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {

        const doFetchData = async () => {
            await this.fetchData()

            var dta = this.props.data
            var retrnedDta = dta.filter(element => element.dateReturned)
            var ovrDta = dta.filter(element => !element.dateReturned)
            var rentingDta = ovrDta.filter(element => MyUltil.compareDate(element.dateDue, Date.now()) >= 0);
            ovrDta = ovrDta.filter(element => MyUltil.compareDate(element.dateDue, Date.now()) < 0);

            this.setState({
                overDueData: ovrDta,
                nowRentingData: rentingDta,
                returnedData: retrnedDta
            })

            return
        }

        return doFetchData()

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
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }

    titleFormatter(cell, row) {
        return cell.title;
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
                    <TableHeaderColumn dataField="dateLent" dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
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
                    <TableHeaderColumn dataField="dateLent" dataAlign="center">Lent Date</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField="dateReturned" dataAlign="center" >Returned Date</TableHeaderColumn> */}
                    <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
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

        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Over Due</h3>
                        </CardHeader>
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
        sizePerPage: state.info.sizePerPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getRentingInfo(page, size, search))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingInfo)
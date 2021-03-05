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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Modal, Button } from 'react-bootstrap'
import DatePicker from '../../components/DateRangePicker/DatePicker'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"

class BookLost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            errorShow: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate() {
       
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
        
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
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, start=this.formatDate(new Date())+" 00:00:00",end=this.formatDate(new Date())+" 23:59:59") {
        this.props.onFetchData(page - 1, sizePerPage, start,end)
    }
    formatDate(date) {
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var month = (monthIndex + 1) < 10 ? '0' + (monthIndex + 1) : (monthIndex + 1)
        return (year + "-" + month + "-" + day)
      }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, successShowOther: false, errorShowOther: false })
        this.fetchData(1, this.props.sizePerPage, this.state.searchValue);
    }
    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };
        let main=(
            <BootstrapTable
                    data={this.props.data}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    bordered={false}
                    keyField="id"
                >
                    <TableHeaderColumn dataField="barcode" width="15%">Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn" width="15%">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'width="15%">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='borrowerEmail'width="15%">Patron Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='lostAt'width="15%">Lost At</TableHeaderColumn>
                    <TableHeaderColumn dataField='fine'width="10%">Fine</TableHeaderColumn>
                    <TableHeaderColumn dataField='reason'width="15%">Reason</TableHeaderColumn>
                </BootstrapTable>
        )
        let display = (
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                    <DatePicker onChange={(startDate, endDate) => {
                        this.fetchData(1,10,this.formatDate(startDate)+" 00:00:00",this.formatDate(endDate)+" 23:59:59")}} 
                        startDateId="lost_start"
                        endDateId="lost_end"/>
                    </Col>
                </Row>

                <br />
                {main}
            </div>
        )
        if (this.props.loading) {
            main = <Spinner />
        }
        return (
            <>
                {/* <Header /> */}
                <Container className="mt-md-3" fluid>
                    <Card className="shadow">
                    <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                    <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {display}
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.lost.loading,
        data: state.lost.data,
        error: state.lost.error,
        totalSize: state.lost.total,
        page: state.lost.page,
        sizePerPage: state.lost.sizePerPage,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, start,end) => dispatch(actions.getBookLost(page, size, start,end)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookLost)

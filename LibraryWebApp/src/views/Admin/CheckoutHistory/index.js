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
import { Row, Col,Button,Modal} from 'react-bootstrap'
import DatePicker from '../../../components/DateRangePicker/DateRange'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import CommonErrorModal from "components/Modals/CommonErrorModal"
import MyUtil from "store/utility"
import * as MyConstant from '../../Util/Constant'
import moment from 'moment';
class CheckoutHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorShow: false,
            startDate:this.formatDate(new Date())+" 00:00:00",
            endDate:this.formatDate(new Date())+" 23:59:59",
            detail:null,
            detailShow:false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate() {
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true})
        }
        
    }
   
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.startDate, this.state.endDate);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.startDate, this.state.endDate);

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
        this.setState({errorShow: false, detail:null, detailShow:false})
    } 
    
    datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }
    borrowerFormatter(cell, row) {
        return row.borrower.fullName
    }
    ifNullFormatter(cell, row) {
        return cell ? cell : " - "
    }
    
    actionFormatter=(cell, row) => {
        return <div>
        <Button className="btn btn-primary" onClick={()=>this.setState({detailShow:true,detail:row.bookBorrowings})}>Detail</Button>
    </div>
    }
    bookDescriptionFormat(cell, row) {
        return (
            <div>
                <h2 className="font-weight-bolder">{row.bookCopy.book.title}{row.bookCopy.book.subtitle ? ":" + " " + row.bookCopy.book.subtitle : ""}</h2>
            </div>
        )
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.bookCopy.book.img} />)
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
        const detailOptions = {
            sizePerPage: 5,
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
                    <TableHeaderColumn dataField="index" width="12%" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={(cell, row, enumObject, index)=>index+1}>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='borrower'width="20%" dataFormat={this.borrowerFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrower</TableHeaderColumn>
                    <TableHeaderColumn dataField='borrowedAt'width="15%" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrow At</TableHeaderColumn>
                    <TableHeaderColumn dataField='note'width="15%" dataAlign="center" dataFormat={this.ifNullFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Note</TableHeaderColumn>
                    <TableHeaderColumn dataField='action'width="10%" dataFormat={this.actionFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Action</TableHeaderColumn>
                </BootstrapTable>
        )
        if (this.props.loading) {
            main = <Spinner />
        }
        let display = (
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-2 pl-4">
                    <DatePicker onChange={(startDate, endDate) => {
                        this.setState({
                            startDate:startDate+" 00:00:00",
                            endDate:endDate+" 23:59:59"
                        })
                        this.fetchData(1,10,startDate+" 00:00:00",endDate+" 23:59:59")}} 
                        startDateId="history_start"
                        endDateId="history_end"/>
                    </Col>
                </Row>

                <br />
                {main}
            </div>
            
        )
       
        return (
            <>
                {/* <Header /> */}
                <Container className="mt-md-3" fluid>
                    <Card className="shadow">
                    <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {display}
                    </Card>
                    <Modal size="lg" show={this.state.detailShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BootstrapTable
                            data={this.state.detail}
                            options={detailOptions}
                            pagination
                            striped
                            hover
                            condensed
                            className="mt-3"
                            bordered={false}
                            // tableHeaderClass={"col-hidden"}
                            keyField="bookCopy"
                        >
                            <TableHeaderColumn dataField="img" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.imageFormatter} width="10%">Image</TableHeaderColumn>
                            <TableHeaderColumn dataField="title" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" width="40%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Title</TableHeaderColumn>
                            <TableHeaderColumn dataField="author" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="20%" headerAlign="center" dataFormat={(cell, row) => row.bookCopy.book.authors}>Author</TableHeaderColumn>
                            <TableHeaderColumn dataField="type" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="15%" headerAlign="center" dataFormat={(cell, row) => row.bookCopy.copyType}>Book Copy Type</TableHeaderColumn>
                        </BootstrapTable>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalClose()}>
                            Close
                                </Button>
                    </Modal.Footer>
                </Modal>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.history.loading,
        data: state.history.data,
        error: state.history.error,
        totalSize: state.history.total,
        page: state.history.page,
        sizePerPage: state.history.sizePerPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, start,end) => dispatch(actions.getHistory(page, size, start,end)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutHistory)

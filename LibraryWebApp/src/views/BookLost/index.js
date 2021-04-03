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
import DatePicker from '../../components/DateRangePicker/DateRange'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import Select from 'react-select';
import MyUtil from "store/utility"
import * as MyConstant from '../Util/Constant'
import moment from 'moment';
import BookLostConfirmForm from './confirmBookLostForm'
class BookLost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorShow: false,
            bookLostStatus:null,
            selectValue:null,
            startDate:this.formatDate(new Date())+" 00:00:00",
            endDate:this.formatDate(new Date())+" 23:59:59",
            successShow:false,
            successNotice:""
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleGetBookLostFine = this.handleGetBookLostFine.bind(this);
    }
    componentDidMount() {
        if (!this.state.bookLostStatus) {
            let bookLostStatus = []
            Object.keys(MyConstant.BOOK_LOST_STATUS).forEach(el => {
                bookLostStatus.push({ "value": el, "label": MyConstant.BOOK_LOST_STATUS[el] })
            })
            this.setState({ bookLostStatus: bookLostStatus })
        }
        this.fetchData();
    }
    componentDidUpdate() {
        let msg = null
        if (this.props.confirmSuccess) {
            msg = "Confirm lost book successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
        
    }
   
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.startDate, this.state.endDate, this.state.selectValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.startDate, this.state.endDate, this.state.selectValue);

    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, start=this.formatDate(new Date())+" 00:00:00",end=this.formatDate(new Date())+" 23:59:59",selectValue = this.state.selectValue) {
        this.props.onFetchData(page - 1, sizePerPage, start,end,selectValue)
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
        this.fetchData(1, this.props.sizePerPage, this.state.startDate, this.state.endDate, this.state.selectValue);
    } 
    handleSelectChange(value) {
        this.setState({ selectValue: value.value }, () => {
            this.fetchData(1, 10, this.state.startDate, this.state.endDate, this.state.selectValue)
        })
    }
    datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }
    titleFormatter(cell, row) {
        let tmp= row.subtitle?": "+row.subtitle:""
        return row.title + tmp
    }
    ifNullFormatter(cell, row) {
        return cell ? cell : " - "
    }
    handleGetBookLostFine= id => {
        this.props.onGetLostBookFine(id)
    }
    actionFormatter=(cell, row) => {
        return row.status=="PENDING"?<div>
        <Button className="btn btn-primary" onClick={()=>this.handleGetBookLostFine(row.id)}>Confirm</Button>
    </div>:null
    }
    handleConfirmSubmit(value){
        let tmp={
            auditorId: this.props.userid,
            bookLostReportId:value.id,
            fine:parseFloat(value.fine)+ parseFloat(value.overdueFee),
            note:value.note
        }
        this.props.onConfirmBookLost(tmp)
    }
    getConfirmInitialValues = () => {
        return {
            isbn: this.props.bookLost ? this.props.bookLost.bookBorrowingInfo.bookCopy.book.isbn : '',
            author: this.props.bookLost ? this.props.bookLost.bookBorrowingInfo.bookCopy.book.authors : '',
            title: this.props.bookLost ? this.props.bookLost.bookBorrowingInfo.bookCopy.book.title : '',
            edition: this.props.bookLost ? this.props.bookLost.bookBorrowingInfo.bookCopy.book.edition : '',
            img: this.props.bookLost ? this.props.bookLost.bookBorrowingInfo.bookCopy.book.img : '',
            lostBookFineInMarket: this.props.bookLost ? this.props.bookLost.lostBookFineInMarket : '',
            lostBookFineNotInMarket: this.props.bookLost ? this.props.bookLost.lostBookFineNotInMarket : '',
            overdueDays: this.props.bookLost ? this.props.bookLost.overdueDays+"" : '',
            overdueFee: this.props.bookLost ? this.props.bookLost.overdueFee +"": '',
            id: this.props.bookLost ? this.props.bookLost.id : ''
        };
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
                    <TableHeaderColumn dataField="barcode" width="10%" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'width="25%" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='borrowerEmail'width="15%" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Patron Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='lostAt' width="10%" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Lost At</TableHeaderColumn>
                    <TableHeaderColumn dataField='fine'width="15%" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Fine-VND</TableHeaderColumn>
                    <TableHeaderColumn dataField='reason'width="15%" dataAlign="center" dataFormat={this.ifNullFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Note</TableHeaderColumn>
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
                        console.log(startDate,endDate)
                        this.setState({
                            startDate:startDate+" 00:00:00",
                            endDate:endDate+" 00:00:00"
                        })
                        this.fetchData(1,10,startDate+" 00:00:00",endDate+" 23:59:59")}} 
                        startDateId="lost_start"
                        endDateId="lost_end"/>
                    </Col>
                    <Col className="col-4">
                    <Select className=""
                            // defaultValue={{value:Object.keys(MyConstant.BOOK_LOST_STATUS)[0],label:MyConstant.BOOK_LOST_STATUS[Object.keys(MyConstant.BOOK_LOST_STATUS)[0]]}}
                            options={this.state.bookLostStatus}
                            placeholder="Select report status..."
                            onChange={(e) => this.handleSelectChange(e)}
                        />
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
                    <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                    <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {display}
                    </Card>
                    <Modal size="lg" backdrop="static" show={this.props.bookLost!=null} onHide={() => this.props.onCancelConfirm()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm lost book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookLostConfirmForm initialValues={this.getConfirmInitialValues()} 
                        handleCancel={() => this.props.onCancelConfirm()} 
                        onSubmit={(value) => this.handleConfirmSubmit(value)}
                        />
                    </Modal.Body>
                </Modal>
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
        bookLost:state.lost.bookLost,
        userid: state.Auth.userId,
        confirmSuccess:state.lost.confirmSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, start,end,status) => dispatch(actions.getBookLost(page, size, start,end,status)),
        onGetLostBookFine: (id) => dispatch(actions.getLostBookFine(id)),
        onCancelConfirm: () => dispatch(actions.cancelConfirmBookLost()),
        onConfirmBookLost: (data) => dispatch(actions.confirmBookLost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookLost)

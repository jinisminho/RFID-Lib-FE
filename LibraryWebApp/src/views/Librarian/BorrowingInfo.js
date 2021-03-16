import React from "react";
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
import DueHistoryModal from '../../components/Modals/DueHistoryModal';
import ExtendDueModal from '../../components/Modals/ExtendDueModal';
import * as MyConstant from '../Util/Constant'
import moment from 'moment';
import StudentInfoCard from './studentInfoCard'
import SearchForm from '../../components/Forms/SearchForm'
import CommonErrorModal from "components/Modals/CommonErrorModal";
import CommonSuccessModal from "components/Modals/CommonSuccessModal";
import Spinner from '../../components/Spinner/Spinner'
import CommonConfirmModal from "components/Modals/CommonConfirmModal";

class BorrowingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            overDueData: null,
            nowBorrowingData: null,
            returnedData: null,
            showHistory: false,
            patronId: null,
            book: null,
            showExtdForm: false,
            dueDate: null
        }
        this.fetchDataOverdue = this.fetchDataOverdue.bind(this);
        this.fetchDataBorrowing = this.fetchDataBorrowing.bind(this);
        this.fetchDataReturned = this.fetchDataReturned.bind(this);
        this.fetchDataLost = this.fetchDataLost.bind(this);
        this.handlePageChangeOverdue = this.handlePageChangeOverdue.bind(this);
        this.handlePageChangeBorrowing = this.handlePageChangeBorrowing.bind(this);
        this.handlePageChangeReturned = this.handlePageChangeReturned.bind(this);
        this.handlePageChangeLost = this.handlePageChangeLost.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
        this.otherFormatter = this.otherFormatter.bind(this);
        this.otherFormatter2 = this.otherFormatter2.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.ifNullFormatter = this.ifNullFormatter.bind(this);
        this.handleExtdSubmit = this.handleExtdSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.getStudentAndHistories()
    }

    handlePageChangeOverdue(page, sizePerPage) {
        this.fetchDataOverdue(page, sizePerPage, this.props.studentData.accountId);
    }
    handlePageChangeBorrowing(page, sizePerPage) {
        this.fetchDataBorrowing(page, sizePerPage, this.props.studentData.accountId);
    }
    handlePageChangeReturned(page, sizePerPage) {
        this.fetchDataReturned(page, sizePerPage, this.props.studentData.accountId);
    }
    handlePageChangeLost(page, sizePerPage) {
        this.fetchDataLost(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    handleSearch(value) {

        //IF SCAN PATRON ID CARD
        if (value.search.trim().toUpperCase().includes("PAT#")) {
            this.getStudentAndHistories(1, this.props.sizePerPage, value.search.trim().toUpperCase().split("PAT#")[1])
            this.setState({
                notFoundShow: true,
            })
        }
        else { //DEFAULT
            this.getStudentAndHistories(1, this.props.sizePerPage, value.search.trim().toUpperCase())
            this.setState({
                notFoundShow: true,
            })
        }

    }

    fetchData() {
        this.fetchDataOverdue()
        this.fetchDataBorrowing()
        this.fetchDataReturned()
        this.fetchDataLost();
    }

    getStudentAndHistories(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.getStudent(page - 1, sizePerPage, searchValue)
        this.setState({
            searchValue: searchValue,
        })
    }

    fetchDataOverdue(page = this.props.pageOverdue, sizePerPage = this.props.sizePerPage, searchValue = this.props.studentData.accountId) {
        return this.props.onFetchOverdue(page - 1, sizePerPage, searchValue)
    }

    fetchDataBorrowing(page = this.props.pageBorrowing, sizePerPage = this.props.sizePerPage, searchValue = this.props.studentData.accountId) {
        return this.props.onFetchBorrowing(page - 1, sizePerPage, searchValue)
    }

    fetchDataReturned(page = this.props.pageReturned, sizePerPage = this.props.sizePerPage, searchValue = this.props.studentData.accountId) {
        return this.props.onFetchReturned(page - 1, sizePerPage, searchValue)
    }

    fetchDataLost(page = this.props.pageLost, sizePerPage = this.props.sizePerPage, patronId = this.state.searchValue) {
        return this.props.onFetchLost(page - 1, sizePerPage, patronId)
    }

    titleFormatter(cell, row) {
        if (row.bookCopy) {
            let res = row.bookCopy.book.title;
            res += row.bookCopy.book.subtitle ? " : " + row.bookCopy.book.subtitle : "";
            res += row.bookCopy.book.edition ? " - Edition[" + row.bookCopy.book.edition + "]" : "";

            return res;
        }
        return (row.title ? row.title : "") + (row.subtitle ? (" : " + row.subtitle) : "") + (row.edition ? " - Edition[" + row.edition + "]" : "")
    }

    isbnFormatter(cell, row) {
        return cell.isbn;
    }

    otherFormatter(cell, row) {
        var borrowerId = row.borrowing ? row.borrowing.borrower.accountId : null
        var bokCpy = row.bookCopy ? row.bookCopy : null
        var bokBorrowing = row ? row : null


        return (
            <div>
                <button className="btn btn-fill btn-primary btn-block btn-sm text-truncate" onClick={() => this.setState({
                    showHistory: true,
                    // patronId: borrowerId,
                    bookBorrowing: bokBorrowing,
                    bookCopy: bokCpy
                })} ><i className="ni ni-collection" /> History </button>
            </div>
        )
    }

    otherFormatter2(cell, row) {
        var borrowerId = row.borrowing ? row.borrowing.borrower.accountId : null
        var bokCpy = row.bookCopy ? row.bookCopy : null
        var bokBorrowing = row ? row : null
        return (
            <div>
                <Row>
                    <Col lg="8"><button className="btn btn-fill btn-primary btn-sm btn-block mt-1 mt-lg-0 text-truncate" onClick={() => { this.handleExtdFormShow(borrowerId, bokCpy); this.setState({ bookBorrowing: bokBorrowing }) }} >Renew</button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm mt-1 mt-lg-0 btn-block" onClick={() => this.setState({
                        showHistory: true,
                        patronId: borrowerId,
                        bookCopy: bokCpy,
                        bookBorrowing: bokBorrowing
                    })} ><i className="ni ni-collection" /></button></Col>
                </Row>
            </div>
        )
    }

    dateFormatter(cell, row) {
        return moment(MyUtil.convertToDate(cell)).format(MyConstant.DATE)
    }

    datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }

    ifNullFormatter(cell, row) {
        return cell ? cell : " - "
    }

    handleHistoryClose = () => {
        this.setState({
            showHistory: false
        })

    }

    handleExtdFormShow = (ptrnId, bokCpy) => {
        this.setState({
            showExtdForm: true,
            // patronId: ptrnId,
            bookCopy: bokCpy,
        })
    }

    handleExtdFormClose = () => {
        this.setState({
            showExtdForm: false,
        })
    }

    handleExtdSubmit(bookBorrowingId, form) {
        this.setState({ showExtdForm: false })
        const doExtdThenReloadTable = async () => {
            await this.props.onExtdSubmit(bookBorrowingId, this.props.currentUserId, form)
            await this.setState({ successShow: true, errorShow: true })
            // await this.fetchData(1, this.props.sizePerPage, this.state.searchValue)
            await this.fetchData()
            return
        }
        return doExtdThenReloadTable()
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, lostSuccessShow: false, lostErrorShow: false })
        // this.fetchData(1, this.props.sizePerPage, this.state.searchValue);
        this.fetchData();
    }

    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.fullName : '',
            img: this.props.studentData ? this.props.studentData.avatar : '',
            email: this.props.studentData ? this.props.studentData.email : '',
        };
    }

    handleLostFormClose = () => {
        this.setState({
            showLostForm: false,
        })
    }

    handleLostSubmit() {
        this.props.onLostSubmit(this.state.lostBorrowing ? this.state.lostBorrowing.id : null);
        this.setState({ showLostForm: false, lostBook: null, lostBorrowing: null, lostSuccessShow: true, lostErrorShow: true });
    }

    titleForModalFormatter() {
        let bok = this.state.lostBook ? this.state.lostBook.book : null
        return (bok ? bok.title : '') + (bok ? (bok.subtitle ? " : " + bok.subtitle : "") : '')
    }

    render() {
        const options = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };

        const options_overdue = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.pageOverdue,
            onPageChange: this.handlePageChangeOverdue,
        };

        const options_borrowing = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.pageBorrowing,
            onPageChange: this.handlePageChangeBorrowing,
        };

        const options_returned = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.pageReturned,
            onPageChange: this.handlePageChangeReturned,
        };

        const options_lost = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.pageLost,
            onPageChange: this.handlePageChangeLost,
        };

        let overdueBooks = this.props.dataOverdue && this.props.dataOverdue.length != 0 ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">

                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataOverdue}
                    options={options_overdue}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeOverdue }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={(cell, row) => { return this.datetimeFormatter(row.borrowing.borrowedAt, row) }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="dueAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Due Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="overdueDays" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Overdue Day(s)</TableHeaderColumn>
                    <TableHeaderColumn dataField="fine" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Fine - {MyConstant.CURRENCY}</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let borrowingBooks = this.props.dataBorrowing && this.props.dataBorrowing.length != 0 ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataBorrowing}
                    options={options_borrowing}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeBorrowing }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={(cell, row) => { return this.datetimeFormatter(row.borrowing.borrowedAt, row) }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="dueAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Due Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter2} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let returnedBooks = this.props.dataReturned && this.props.dataReturned.length != 0 ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataReturned}
                    options={options_returned}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeReturned }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={(cell, row) => { return this.datetimeFormatter(row.borrowing.borrowedAt, row) }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="returnedAt" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Returned At</TableHeaderColumn>
                    <TableHeaderColumn dataField="overdueDays" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Overdue Day(s)</TableHeaderColumn>
                    <TableHeaderColumn dataField="fine" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Fine - {MyConstant.CURRENCY}</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let lostBooks = this.props.dataLost && this.props.dataLost.length != 0 ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataLost}
                    options={options_lost}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeLost }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="lostAt" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Lost At</TableHeaderColumn>
                    <TableHeaderColumn dataField="fine" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Fine - {MyConstant.CURRENCY}</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Status</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let studentInfo
        if (this.props.studentData) {
            studentInfo = (
                <StudentInfoCard student={this.getInitialValues()} />
            )
        }

        let form = <SearchForm placeholder="Get checkout Informations by a student's RFID or Email. e.g. 130111, example@smart.edu.vn" editClassName="shadow mw-100 p-0" onSubmit={(value) => this.handleSearch(value)} />


        // let errorMsg = null
        // let msg = null
        // if (this.props.errOnFetch && this.state.errorShow) {
        //     errorMsg = <Alert key="danger" variant="danger" onClose={() => this.setState({ successShow: false, errorShow: false })}>{this.props.errOnFetch}</Alert>
        // }
        // if (this.props.error && this.state.errorShow) {
        //     errorMsg = <Alert key="danger" variant="danger" onClose={() => this.setState({ successShow: false, errorShow: false })} dismissible>{this.props.error}</Alert>
        // }
        // if (this.props.successMsg && this.state.successShow) {
        //     msg = <Alert key="success" variant="success" onClose={() => this.setState({ successShow: false, errorShow: false })} dismissible>{this.props.successMsg}</Alert>
        // }

        let errorMsg = null
        if (!this.props.studentData && this.state.notFoundShow && !this.props.loading) {
            errorMsg = <Alert className="w-100" key="danger" variant="danger" onClose={() => this.setState({ notFoundShow: false })} dismissible>Patron not found</Alert>
        }

        let display = (
            <>
                <Row className="justify-content-center">
                    <Row className="shadow mt-1 pb-auto w-100">
                        <Card className="shadow mt-1 pb-auto w-100">
                            {/* <CardHeader className="border-0 ">
                                <h3 className="mb-0">Student Infomation</h3>
                            </CardHeader> */}
                            {studentInfo}
                            {/* {errorMsg} */}
                            {/* {msg} */}
                        </Card>
                    </Row>
                    <Row className="shadow mt-1 pb-auto w-100">
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{MyConstant.OVERDUE_BOOKS}</h3>
                            </CardHeader>
                            {overdueBooks}
                        </Card>
                    </Row>
                    <Row className="shadow mt-1 pb-auto w-100">
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{MyConstant.BORROWING_BOOKS}</h3>
                            </CardHeader>
                            {borrowingBooks}
                        </Card>
                    </Row>
                    <Row className="shadow mt-1 pb-auto w-100">
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{MyConstant.RETURNED_BOOKS}</h3>
                            </CardHeader>
                            {returnedBooks}
                        </Card>
                    </Row>
                    <Row className="shadow mt-1 pb-auto w-100">
                        <Card className="shadow mt-1 pb-auto w-100">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">{MyConstant.LOST_BOOKS}</h3>
                            </CardHeader>
                            {lostBooks}
                        </Card>
                    </Row>
                </Row>
            </>
        )
        if (this.props.loading) {
            display = <Card className="shadow mt-1 pb-auto w-100"><Spinner /></Card>
        }

        return (
            <>
                {/* <Header /> */}
                <Container className="mt-3" fluid>
                    <Row className="justify-content-center">
                        {errorMsg}
                        {form}
                    </Row>
                    {display}

                    <Row className="justify-content-center">
                        <DueHistoryModal
                            show={this.state.showHistory}
                            hide={() => this.handleHistoryClose()}
                            data={this.props.historyData}
                            bookCopy={this.state.bookCopy ? this.state.bookCopy : []}
                            bookBorrowing={this.state.bookBorrowing}
                            onShow={() => this.props.getExtendedHistoryInfo(this.state.bookBorrowing.id)}
                        />

                        <ExtendDueModal
                            show={this.state.showExtdForm}
                            hide={() => this.handleExtdFormClose()}
                            title="Renew Due Date"
                            submit={values => this.handleExtdSubmit(this.state.bookBorrowing.id, values)}
                            bookBorrowingId={this.state.bookBorrowing ? this.state.bookBorrowing.id : null}
                            // dueDate={this.state.dueDate}
                            numOfDateToAdd={MyConstant.DEFAULT_DATE_TO_ADD}
                            libraianId={this.props.currentUserId}
                        />

                        <CommonConfirmModal title="Report book lost" show={this.state.showLostForm} hide={() => this.handleLostFormClose()} clickConfirm={() => this.handleLostSubmit()} msg={"Do you want to report lost this book [" + this.titleForModalFormatter() + "] ?"} />

                        <CommonErrorModal show={this.props.error && this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {/* <CommonErrorModal show={this.props.lostError && this.state.lostErrorShow} hide={() => this.handleModalClose()} msg={this.props.lostError} /> */}
                        <CommonSuccessModal show={this.props.successMsg && this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
                        {/* <CommonSuccessModal show={this.props.lostSuccessMsg && this.state.lostSuccessShow} hide={() => this.handleModalClose()} msg={this.props.lostSuccessMsg} /> */}

                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        successMsg: state.infoLside.successMsg,
        errOnFetch: state.infoLside.errOnFetch,
        error: state.infoLside.error,
        loading: state.infoLside.loading,
        dataOverdue: state.infoLside.dataOverdue,
        dataBorrowing: state.infoLside.dataBorrowing,
        dataReturned: state.infoLside.dataReturned,
        totalSizeOverdue: state.infoLside.totalOverdue,
        totalSizeBorrowing: state.infoLside.totalBorrowing,
        totalSizeReturned: state.infoLside.totalReturned,
        pageOverdue: state.infoLside.pageOverdue,
        pageBorrowing: state.infoLside.pageBorrowing,
        pageReturned: state.infoLside.pageReturned,
        sizePerPage: state.infoLside.sizePerPage,
        historyData: state.infoLside.historyData,
        studentData: state.infoLside.studentData,
        currentUserId: state.Auth.userId,
        page: state.infoLside.page,
        // lostSuccessMsg: state.lostBook.successMsg,
        // lostError: state.lostBook.error,
        pageLost: state.infoLside.pageLost,
        totalSizeLost: state.infoLside.totalLost,
        dataLost: state.infoLside.dataLost,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchData: (page, size, search) => dispatch(actions.getBorrowingInfo(page, size, search)),
        // onFetchOverdue: (page, size, search) => dispatch(actions.getBorrowingInfo_Overdue(page, size, search)),
        // onFetchBorrowing: (page, size, search) => dispatch(actions.getBorrowingInfo_Borrowing(page, size, search)),
        // onFetchReturned: (page, size, search) => dispatch(actions.getBorrowingInfo_Returned(page, size, search)),
        // getExtendedHistoryInfo: (page, size, patronId, bookId) => dispatch(actions.getExtendedHistory(page, size, patronId, bookId)),
        // onExtdSubmit: (patronId, bookId) => dispatch(actions.extendDue(patronId, bookId)),

        onFetchOverdue: (page, size, search) => dispatch(actions.getBorrowingInfo_Overdue_Lib(page, size, search)),
        onFetchBorrowing: (page, size, search) => dispatch(actions.getBorrowingInfo_Borrowing_Lib(page, size, search)),
        onFetchReturned: (page, size, search) => dispatch(actions.getBorrowingInfo_Returned_Lib(page, size, search)),
        getExtendedHistoryInfo: (bookBorrowingId) => dispatch(actions.getExtendedHistory_Lib(bookBorrowingId)),
        onExtdSubmit: (bookBorrowingId, librarianId, form) => dispatch(actions.extendDue_Lib(bookBorrowingId, librarianId, form)),

        getStudent: (page, sizePerPage, search) => dispatch(actions.getStudentThenGetBorrowingHistories(page, sizePerPage, search)),

        // onLostSubmit: (bookBorrowingId) => dispatch(actions.addLostReport(bookBorrowingId)),
        onFetchLost: (page, size, patronId, startDate, endDate) => dispatch(actions.getLostReports(page, size, patronId, startDate, endDate)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingInfo)
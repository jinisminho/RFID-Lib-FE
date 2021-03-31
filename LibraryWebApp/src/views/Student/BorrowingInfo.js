import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col
} from "reactstrap";
import { Tab, Tabs } from 'react-bootstrap'
import MyUtil from "store/utility"
import DueHistoryModal from '../../components/Modals/DueHistoryModal';
import ExtendDueModal from '../../components/Modals/ExtendDueModal';
import * as MyConstant from '../Util/Constant'
import moment from 'moment';
import CommonErrorModal from "components/Modals/CommonErrorModal";
import CommonSuccessModal from "components/Modals/CommonSuccessModal";
import LostReportModal from "components/Modals/LostReportModal";
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
            bookCopy: null,
            showExtdForm: false,
            bookBorrowing: null,
            dueDate: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChangeOverdue = this.handlePageChangeOverdue.bind(this);
        this.handlePageChangeBorrowing = this.handlePageChangeBorrowing.bind(this);
        this.handlePageChangeReturned = this.handlePageChangeReturned.bind(this);
        this.handlePageChangeLost = this.handlePageChangeLost.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
        this.otherFormatter = this.otherFormatter.bind(this);
        this.otherFormatter2 = this.otherFormatter2.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.datetimeFormatter = this.datetimeFormatter.bind(this);
        this.ifNullFormatter = this.ifNullFormatter.bind(this);
        this.handleExtdSubmit = this.handleExtdSubmit.bind(this);
    }

    componentDidMount() {

        const doGetUserIdThenFetchData = async () => {
            let userid = this.props.currentUserId;
            if (userid) {
                await this.setState({ searchValue: userid })
                await this.fetchData();
            }
            return
        }

        return doGetUserIdThenFetchData()

    }

    handlePageChangeOverdue(page, sizePerPage) {
        this.fetchDataOverdue(page, sizePerPage, this.state.searchValue);
    }
    handlePageChangeBorrowing(page, sizePerPage) {
        this.fetchDataBorrowing(page, sizePerPage, this.state.searchValue);
    }
    handlePageChangeReturned(page, sizePerPage) {
        this.fetchDataReturned(page, sizePerPage, this.state.searchValue);
    }
    handlePageChangeLost(page, sizePerPage) {
        this.fetchDataLost(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.fetchDataOverdue(page, sizePerPage, this.state.searchValue);
        this.fetchDataBorrowing(page, sizePerPage, this.state.searchValue);
        this.fetchDataReturned(page, sizePerPage, this.state.searchValue);
        this.fetchDataLost(page, sizePerPage, this.state.searchValue);
    }

    fetchDataOverdue(page = this.props.pageOverdue, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        return this.props.onFetchOverdue(page - 1, sizePerPage, searchValue)
    }

    fetchDataBorrowing(page = this.props.pageBorrowing, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        return this.props.onFetchBorrowing(page - 1, sizePerPage, searchValue)
    }

    fetchDataReturned(page = this.props.pageReturned, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
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
                <Row>
                    <Col lg="8"><button className="btn btn-fill btn-primary btn-block btn-sm text-truncate" onClick={() => this.setState({
                        showHistory: true,
                        patronId: borrowerId,
                        bookBorrowing: bokBorrowing,
                        bookCopy: bokCpy
                    })} ><i className="ni ni-collection" /> History </button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm mt-1 mt-lg-0 btn-block" onClick={() => this.setState({
                        showLostForm: true,
                        lostBook: bokCpy,
                        lostBorrowing: bokBorrowing
                    })} >Lost</button></Col>

                </Row>
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
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm btn-block mt-1 mt-lg-0 text-truncate" onClick={() => { this.handleExtdFormShow(borrowerId, bokCpy); this.setState({ bookBorrowing: bokBorrowing }) }} >Renew</button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm mt-1 mt-lg-0 btn-block" onClick={() => this.setState({
                        showHistory: true,
                        patronId: borrowerId,
                        bookCopy: bokCpy,
                        bookBorrowing: bokBorrowing
                    })} >History</button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm mt-1 mt-lg-0 btn-block" onClick={() => this.setState({
                        showLostForm: true,
                        lostBook: bokCpy,
                        lostBorrowing: bokBorrowing
                    })} >Lost</button></Col>

                </Row>


            </div>
        )
    }

    otherFormatter3(cell, row) {

        var borrowerId = row.borrowing ? row.borrowing.borrower.accountId : null
        var bokCpy = row.bookCopy ? row.bookCopy : null
        var bokBorrowing = row ? row : null


        return (
            <div>
                <button className="btn btn-fill btn-primary btn-block btn-sm text-truncate" onClick={() => this.setState({
                    showHistory: true,
                    patronId: borrowerId,
                    bookBorrowing: bokBorrowing,
                    bookCopy: bokCpy
                })} >History</button>
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
            patronId: ptrnId,
            bookCopy: bokCpy,
        })
    }

    handleExtdFormClose = () => {
        this.setState({
            showExtdForm: false,
        })
    }

    handleExtdSubmit(bookBorrowingId) {
        this.setState({ showExtdForm: false })
        const doExtdThenReloadTable = async () => {
            await this.props.onExtdSubmit(bookBorrowingId)
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

        let overdueBooks = (
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
        );

        let borrowingBooks =(
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
        );

        let returnedBooks =(
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
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter3} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        );

        let lostBooks =(
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
        );

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

        return (
            <>
                {/* <Header /> */}
                <Container className="mt-3" fluid>
                    <Row className="justify-content-center">
                        <Row className="shadow mt-1 pb-auto w-100">
                            <Card className="shadow pb-auto w-100">
                                {/* <CardHeader className="border-0">
                                    <h3 className="mb-0">{MyConstant.BORROW_POLICY}</h3>
                                </CardHeader> */}
                                <Tabs defaultActiveKey="borrowingBooks" onSelect={() => { if (this.props.studentData && this.props.studentData.accountId) this.fetchData() }} id="my-uncontrolled-tab" >
                                    <Tab eventKey="overdueBooks" title={MyConstant.OVERDUE_BOOKS}>
                                        {overdueBooks}
                                    </Tab>
                                    <Tab eventKey="borrowingBooks" title={MyConstant.BORROWING_BOOKS}>
                                        {borrowingBooks}
                                    </Tab>
                                    <Tab eventKey="returnedBooks" title={MyConstant.RETURNED_BOOKS}>
                                        {returnedBooks}
                                    </Tab>
                                    <Tab eventKey="lostBooks" title={MyConstant.LOST_BOOKS}>
                                        {lostBooks}
                                    </Tab>
                                </Tabs>
                            </Card>
                        </Row>
                    </Row>

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
                            submit={() => this.handleExtdSubmit(this.state.bookBorrowing.id)}
                            bookBorrowingId={this.state.bookBorrowing ? this.state.bookBorrowing.id : null}
                            // dueDate={this.state.dueDate}
                            numOfDateToAdd={MyConstant.DEFAULT_DATE_TO_ADD}
                        />

                        <CommonConfirmModal title="Report book lost" show={this.state.showLostForm} hide={() => this.handleLostFormClose()} clickConfirm={() => this.handleLostSubmit()} msg={"Do you want to report lost this book [" + this.titleForModalFormatter() + "] ?"} />

                        <CommonErrorModal show={this.props.error && this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        <CommonErrorModal show={this.props.lostError && this.state.lostErrorShow} hide={() => this.handleModalClose()} msg={this.props.lostError} />
                        <CommonSuccessModal show={this.props.successMsg && this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
                        <CommonSuccessModal show={this.props.lostSuccessMsg && this.state.lostSuccessShow} hide={() => this.handleModalClose()} msg={this.props.lostSuccessMsg} />

                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {

    return {
        nowUserId: state.Auth.userid,
        successMsg: state.info.successMsg,
        errOnFetch: state.info.errOnFetch,
        error: state.info.error,
        loading: state.info.loading,
        dataOverdue: state.info.dataOverdue,
        dataBorrowing: state.info.dataBorrowing,
        dataReturned: state.info.dataReturned,
        totalSizeOverdue: state.info.totalOverdue,
        totalSizeBorrowing: state.info.totalBorrowing,
        totalSizeReturned: state.info.totalReturned,
        pageOverdue: state.info.pageOverdue,
        pageBorrowing: state.info.pageBorrowing,
        pageReturned: state.info.pageReturned,
        sizePerPage: state.info.sizePerPage,
        historyData: state.info.historyData,
        currentUserId: state.Auth.userId,
        lostSuccessMsg: state.lostBook.successMsg,
        lostError: state.lostBook.error,
        pageLost: state.lostBook.page,
        totalSizeLost: state.lostBook.total,
        dataLost: state.lostBook.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOverdue: (page, size, search) => dispatch(actions.getBorrowingInfo_Overdue(page, size, search)),
        onFetchBorrowing: (page, size, search) => dispatch(actions.getBorrowingInfo_Borrowing(page, size, search)),
        onFetchReturned: (page, size, search) => dispatch(actions.getBorrowingInfo_Returned(page, size, search)),
        getExtendedHistoryInfo: (bookBorrowingId) => dispatch(actions.getExtendedHistory(bookBorrowingId)),
        onExtdSubmit: (bookBorrowingId) => dispatch(actions.extendDue(bookBorrowingId)),
        onLostSubmit: (bookBorrowingId) => dispatch(actions.addLostReport(bookBorrowingId)),
        onFetchLost: (page, size, patronId, startDate, endDate) => dispatch(actions.getLostReports(page, size, patronId, startDate, endDate)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingInfo)
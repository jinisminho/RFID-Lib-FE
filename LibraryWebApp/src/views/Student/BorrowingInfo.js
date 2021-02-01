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
            studentId: null,
            book: null,
            showExtdForm: false,
            dueDate: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChangeOverdue = this.handlePageChangeOverdue.bind(this);
        this.handlePageChangeBorrowing = this.handlePageChangeBorrowing.bind(this);
        this.handlePageChangeReturned = this.handlePageChangeReturned.bind(this);
        this.handleHistoryClose = this.handleHistoryClose.bind(this);
        this.otherFormatter = this.otherFormatter.bind(this);
        this.otherFormatter2 = this.otherFormatter2.bind(this);
        this.dateFormatter = this.dateFormatter.bind(this);
        this.ifNullFormatter = this.ifNullFormatter.bind(this);
        this.handleExtdSubmit = this.handleExtdSubmit.bind(this);
    }

    componentDidMount() {

        const doGetUserIdThenFetchData = async () => {
            let userid = 1;
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

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        return this.props.onFetchData(page - 1, sizePerPage, searchValue)
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

    titleFormatter(cell, row) {
        let res = cell.title;
        res += cell.edition ? " - Edition[" + cell.edition + "]" : "";

        return res;
    }

    isbnFormatter(cell, row) {
        return cell.isbn;
    }

    otherFormatter(cell, row) {
        var stdId = row.borrower.id
        var bok = row.book

        return (
            <div>
                <button className="btn btn-fill btn-primary btn-block btn-sm text-truncate" onClick={() => this.setState({
                    showHistory: true,
                    studentId: stdId,
                    book: bok,
                })} ><i className="ni ni-collection" /> History </button>
            </div>
        )
    }

    otherFormatter2(cell, row) {
        var stdId = row.borrower.id
        var bok = row.book
        let date = MyUtil.convertToDate(row.dueDate)

        return (
            <div>
                <Row>
                    <Col lg="8"><button className="btn btn-fill btn-primary btn-sm btn-block mt-1 mt-lg-0 text-truncate" onClick={() => this.setState({
                        showExtdForm: true,
                        studentId: stdId,
                        book: bok,
                        dueDate: date,
                    })} >Renew</button></Col>
                    <Col lg="4"><button className="btn btn-fill btn-primary btn-sm mt-1 mt-lg-0 btn-block" onClick={() => this.setState({
                        showHistory: true,
                        studentId: stdId,
                        book: bok
                    })} ><i className="ni ni-collection" /></button></Col>
                </Row>


            </div>
        )
    }

    dateFormatter(cell, row) {
        return moment(MyUtil.convertToDate(cell)).format(MyConstant.DATETIME)
    }

    ifNullFormatter(cell, row) {
        return cell ? cell : " - "
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
            await this.fetchData(this.props.page, this.props.sizePerPage, this.state.searchValue)
            return
        }
        return doExtdThenReloadTable()
    }

    render() {
        const options = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            hideSizePerPage: true,
        };

        let overdueBooks = this.props.dataOverdue ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">

                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataOverdue}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeOverdue }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    onPageChange={this.handlePageChangeOverdue}
                    page={this.props.pageOverdue}
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="dueDate" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Due Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="overdueDays" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Overdue Day(s)</TableHeaderColumn>
                    <TableHeaderColumn dataField="fine" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Fine</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let borrowingBooks = this.props.dataBorrowing ? (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataBorrowing}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeBorrowing }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    onPageChange={this.handlePageChangeBorrowing}
                    page={this.props.pageBorrowing}
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="dueDate" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Due Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter2} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let returnedBooks = this.props.dataReturned?(
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    </div>
                </div>

                <br />

                <BootstrapTable
                    data={this.props.dataReturned}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSizeReturned }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    onPageChange={this.handlePageChangeReturned}
                    page={this.props.pageReturned}
                >
                    <TableHeaderColumn dataField="book" dataFormat={this.titleFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="borrowedAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Borrowed At</TableHeaderColumn>
                    <TableHeaderColumn dataField="returnedAt" dataFormat={this.dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Returned At</TableHeaderColumn>
                    <TableHeaderColumn dataField="overdueDays" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Overdue Day(s)</TableHeaderColumn>
                    <TableHeaderColumn dataField="fine" dataFormat={this.ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Fine</TableHeaderColumn>
                    <TableHeaderColumn dataField="book" dataFormat={this.otherFormatter} columnClassName='my-class' dataAlign="center"></TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

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
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{MyConstant.OVERDUE_BOOKS}</h3>
                        </CardHeader>
                        {errorMsg}
                        {msg}
                        {overdueBooks}
                    </Card>
                    <Card className="shadow mt-1 pb-auto">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{MyConstant.BORROWING_BOOKS}</h3>
                        </CardHeader>
                        {borrowingBooks}
                    </Card>
                    <Card className="shadow mt-1 pb-auto">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{MyConstant.RETURNED_BOOKS}</h3>
                        </CardHeader>
                        {returnedBooks}
                    </Card>

                    <Row className="justify-content-center">
                        <DueHistoryModal
                            show={this.state.showHistory}
                            hide={() => this.handleHistoryClose()}
                            data={this.props.historyData}
                            book={this.state.book? this.state.book : []}
                            onShow={() => this.props.getExtendedHistoryInfo(1, 100, this.state.studentId, this.state.book.id)}
                        />

                        <ExtendDueModal
                            show={this.state.showExtdForm}
                            hide={() => this.handleExtdFormClose()}
                            title="Renew Due Date"
                            submit={() => this.handleExtdSubmit(this.state.studentId, this.state.book.id)}
                            dueDate={this.state.dueDate}
                            numOfDateToAdd={MyConstant.DEFAULT_DATE_TO_ADD}
                        />

                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    
    return {
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getBorrowingInfo(page, size, search)),
        onFetchOverdue: (page, size, search) => dispatch(actions.getBorrowingInfo_Overdue(page, size, search)),
        onFetchBorrowing: (page, size, search) => dispatch(actions.getBorrowingInfo_Borrowing(page, size, search)),
        onFetchReturned: (page, size, search) => dispatch(actions.getBorrowingInfo_Returned(page, size, search)),
        getExtendedHistoryInfo: (page, size, studentId, bookId) => dispatch(actions.getExtendedHistory(page, size, studentId, bookId)),
        onExtdSubmit: (studentId, bookId) => dispatch(actions.extendDue(studentId, bookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingInfo)
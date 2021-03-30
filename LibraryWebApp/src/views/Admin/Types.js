import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Alert, Tab, Tabs } from 'react-bootstrap'
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
import * as MyConstant from '../Util/Constant'
import UpdateButton from '../../components/Button/UpdateButton'
import DeleteButton from '../../components/Button/DeleteButton'
import CommonConfirmModal from "components/Modals/CommonConfirmModal"
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import moment from 'moment';
import AddNewPatronTypeModal from "components/Modals/AddNewPatronTypeModal";
import AddNewBookCopyTypeModal from "components/Modals/AddNewBookCopyTypeModal";


class Types extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successNotice: '',
            successShow: false,
            errorShow: false,
            addNewBorrowTypeShow: false,
            feeHistoryShow: false,
            updateBorrowShow: false,
            deleteBorrowShow: false,
            updatePatronShow: false,
            updateFeeShow: false,
            tab: 1,
            lastFeeChanged: null,
            bookCopyChanged: null,
            bookCopyToDel: null,
        }
        this.handlePageChangePatron = this.handlePageChangePatron.bind(this);
        this.bookCopyActionFormatter = this.bookCopyActionFormatter.bind(this);
        this.patronActionFormatter = this.patronActionFormatter.bind(this);
        this.handleAddNewAPatronTypeSubmit = this.handleAddNewAPatronTypeSubmit.bind(this);
        this.deletePatronTypeSubmit = this.deletePatronTypeSubmit.bind(this);
        this.intValidator = this.intValidator.bind(this);
        this.fetchDataPatron = this.fetchDataPatron.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate() {
        if (this.props.patron ? (this.props.patronPage != 0 && this.props.patron.length == 0) : false)
            this.fetchDataPatron(1);
        if (this.props.bookCopy ? (this.props.bookCopyPage != 0 && this.props.bookCopy.length == 0) : false)
            this.fetchDataBookCopy(1);
    }

    handlePageChangeBookCopy(page, sizePerPage) {
        this.fetchDataBookCopy(page, sizePerPage, this.state.searchValue);
    }

    handlePageChangePatron(page, sizePerPage) {
        this.fetchDataPatron(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page, sizePerPage, searchValue) {
        this.fetchDataBookCopy(page, sizePerPage, searchValue)
        this.fetchDataPatron(page, sizePerPage, searchValue)
    }

    fetchDataBookCopy(page = this.props.bookCopyPage, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchDataBookCopy(page - 1, sizePerPage, searchValue)
    }

    fetchDataPatron(page = this.props.patronPage, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchDataPatron(page - 1, sizePerPage, searchValue)
    }

    bookCopyActionFormatter(cell, row) {
        return (
            <div>
                <UpdateButton clicked={() => this.setState({ updateBookCopyShow: true, bookCopyChanged: row })} />
                <DeleteButton clicked={() => this.setState({ deleteBookCopyShow: true, bookCopyToDel: row })} />
            </div>
        )
    }

    updateBookCopyTypeSubmit = (values) => {
        if (values) this.props.onUpdateBookCopyType(values)
        this.setState({ updateBookCopyShow: false, successShow: true, errorShow: true })
        this.fetchDataBookCopy()
    }

    deleteBookCopyTypeSubmit = (value) => {
        if (value) this.props.onDeleteBookCopyType(value.id)
        this.setState({ deleteBookCopyShow: false, successShow: true, errorShow: true })
        this.fetchDataBookCopy()
    }

    patronActionFormatter(cell, row) {
        return (
            <div>
                <UpdateButton clicked={() => this.setState({ updatePatronShow: true, patronChanged: row })} />
                <DeleteButton clicked={() => this.setState({ deletePatronShow: true, patronToDel: row })} />
            </div>
        )
    }

    updatePatronTypeSubmit = (values) => {
        if (values) this.props.onUpdatePatronType(values)
        this.setState({ updatePatronShow: false, successShow: true, errorShow: true })
        this.fetchDataPatron()
    }

    handleAddNewAPatronTypeSubmit = values => {
        // this.props.onAddPatronType(values)
        // this.setState({ addNewPatronShow: false, successShow: true, errorShow: true })
        // this.fetchDataPatron()

        const doAddThenFetchData = async () => {
            await this.props.onAddPatronType(values)
            await this.setState({ addNewPatronShow: false, successShow: true, errorShow: true })
            await this.fetchDataPatron()
            return
        }

        return doAddThenFetchData()
    }

    handleAddNewBookCopyTypeSubmit = values => {
        this.props.onAddBookCopyType(values)
        this.setState({ addNewBookCopyShow: false, successShow: true, errorShow: true })
        this.fetchDataBookCopy()
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, addNewPatronShow: false, updatePatronShow: false, deletePatronShow: false, updateBookCopyShow: false, deleteBookCopyShow: false, addNewBookCopyShow: false, })
        this.fetchData();
    }

    afterSaveCell(row, cellName, cellValue) {
        const nan = isNaN(parseInt(cellValue, 10));
        row[cellName] = nan ? cellValue : Number(cellValue);
    }

    intValidator(cellValue, cellName) {
        var value = {};
        value[cellName] = cellValue
        // validation here
        const nan = isNaN(parseInt(cellValue, 10));
        if (nan) {
            return 'Value must be a integer';
        }
        if (MyConstant.MIN_NUMBER_BORROW > value.maxBorrowNumber || value.maxBorrowNumber > MyConstant.MAX_NUMBER_BORROW) {
            return "Max borrow number must be " + MyConstant.MIN_NUMBER_BORROW + "-" + MyConstant.MAX_NUMBER_BORROW
        }
        return true
    }

    stringValidator(cellValue, cellName) {
        var value = {};
        value[cellName] = cellValue
        // validation here
        if (!value.name || value.name.length == 0) {
            return "Name is required"
        }
        return true
    }

    deletePatronTypeSubmit = (value) => {
        if (value) this.props.onDeletePatronType(value.id)
        this.setState({ deletePatronShow: false, successShow: true, errorShow: true })
        this.fetchDataPatron()
    }

    render() {

        const options_book_copy = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.bookCopyPage,
            onPageChange: this.handlePageChangeBookCopy,
        };

        const options_patron = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.patronPage,
            onPageChange: this.handlePageChangePatron,
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell,
        };

        let book_copy_type = this.props.bookCopy ? (
            <div className="content mt-2">
                <Row className="w-100 m-0 p-0">
                    <Col className="pull-right">
                        <button onClick={() => this.setState({ addNewBookCopyShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add New
                        </button>
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.bookCopy}
                    options={options_book_copy}
                    fetchInfo={{ dataTotalSize: this.props.bookCopyTotalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    cellEdit={cellEditProp}
                >
                    <TableHeaderColumn dataField="name" dataAlign="center" editable={{ validator: (value, row) => { return this.stringValidator(value, "name") } }} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataAlign="center" width="12%" dataFormat={this.bookCopyActionFormatter} editable={false} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Action</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let patron_type = this.props.patron ? (
            <div className="content mt-2">
                <Row className="w-100 m-0 p-0">
                    <Col className="pull-right">
                        <button onClick={() => this.setState({ addNewPatronShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add New
                        </button>
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.patron}
                    options={options_patron}
                    fetchInfo={{ dataTotalSize: this.props.patronTotalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    cellEdit={cellEditProp}
                >
                    <TableHeaderColumn dataField="name" dataAlign="center" editable={{ validator: (value, row) => { return this.stringValidator(value, "name") } }} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} >Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxBorrowNumber" editable={{ validator: (value, row) => { return this.intValidator(value, "maxBorrowNumber") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Max Borrow Number</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataAlign="center" width="10%" dataFormat={this.patronActionFormatter} editable={false} >Action</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let errorMsg = null
        let msg = null
        if (this.props.errOnFetch && this.state.errorShow) {
            errorMsg = <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.errOnFetch} />
        }
        if (this.props.error && this.state.errorShow) {
            errorMsg = <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
        }
        if (this.props.successMsg && this.state.successShow) {
            msg = <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
        }

        return (
            <>
                {/* <Header /> */}

                <Container className="mt-3" fluid>

                    <Row className="justify-content-center">
                        <Row className="shadow mt-1 pb-auto w-100">
                            <Card className="shadow mt-1 pb-auto w-100">
                                {/* <CardHeader className="border-0 ">
                                <h3 className="mb-0">Student Infomation</h3>
                            </CardHeader> */}
                                {errorMsg}
                                {msg}
                            </Card>
                        </Row>
                        <Row className="shadow mt-1 pb-auto w-100">
                            <Card className="shadow pb-auto w-100">
                                {/* <CardHeader className="border-0">
                                    <h3 className="mb-0">{MyConstant.BORROW_POLICY}</h3>
                                </CardHeader> */}
                                <Tabs defaultActiveKey="bookCopy" onSelect={() => this.fetchData()} id="my-uncontrolled-tab" >
                                    <Tab eventKey="bookCopy" title="Book copy">
                                        {book_copy_type}
                                    </Tab>
                                    <Tab eventKey="patron" title="Patron">
                                        {patron_type}
                                    </Tab>
                                </Tabs>
                            </Card>
                        </Row>
                    </Row>


                    <Row className="justify-content-center">
                        <CommonConfirmModal title="Update patron" show={this.state.updatePatronShow} hide={() => this.handleModalClose()} clickConfirm={() => this.updatePatronTypeSubmit(this.state.patronChanged)} msg="Do you want to update this patron type?" />
                        <CommonConfirmModal title="Delete patron" show={this.state.deletePatronShow} hide={() => this.handleModalClose()} clickConfirm={() => this.deletePatronTypeSubmit(this.state.patronToDel)} msg="Do you want to delete this patron type?" />
                        <CommonConfirmModal title="Update book copy" show={this.state.updateBookCopyShow} hide={() => this.handleModalClose()} clickConfirm={() => this.updateBookCopyTypeSubmit(this.state.bookCopyChanged)} msg="Do you want to update this book copy type?" />
                        <CommonConfirmModal title="Delete book copy" show={this.state.deleteBookCopyShow} hide={() => this.handleModalClose()} clickConfirm={() => this.deleteBookCopyTypeSubmit(this.state.bookCopyToDel)} msg="Do you want to delete this book copy type?" />
                        <AddNewPatronTypeModal title="Add new patron" show={this.state.addNewPatronShow} hide={() => this.handleModalClose()} submit={values => this.handleAddNewAPatronTypeSubmit(values)} msg="Do you want to add this patron?" />
                        <AddNewBookCopyTypeModal title="Add new book copy" show={this.state.addNewBookCopyShow} hide={() => this.handleModalClose()} submit={values => this.handleAddNewBookCopyTypeSubmit(values)} msg="Do you want to add this book copy type?" />
                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.types.error,
        loading: state.types.loading,
        successMsg: state.types.successMsg,
        sizePerPage: state.types.sizePerPage,

        patron: state.types.patronTypes,
        patronPage: state.types.patronPage,
        patronTotalSize: state.types.patronTotal,

        bookCopy: state.types.bookCopyTypes,
        bookCopyTotalSize: state.types.bookCopyTotal,
        bookCopyPage: state.types.bookCopyPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataPatron: (page, size) => dispatch(actions.getPatronTypes(page, size)),
        onUpdatePatronType: (data) => dispatch(actions.updatePatronType(data)),
        onAddPatronType: (data) => dispatch(actions.addPatronType(data)),
        onDeletePatronType: (id) => dispatch(actions.deletePatronType(id)),

        onFetchDataBookCopy: (page, size) => dispatch(actions.getBookCopyTypes(page, size)),
        onUpdateBookCopyType: (data) => dispatch(actions.updateBookCopyType(data)),
        onAddBookCopyType: (data) => dispatch(actions.addBookCopyType(data)),
        onDeleteBookCopyType: (id) => dispatch(actions.deleteBookCopyType(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Types)
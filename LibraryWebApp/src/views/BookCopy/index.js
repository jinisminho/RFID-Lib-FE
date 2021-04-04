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
import { FormControl, InputGroup, Row, Col, Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import UpdateButton from '../../components/Button/UpdateButton'
import CopyAddForm from './copyAddForm'
import CopyUpdateForm from './copyUpdateForm'
import ConfirmCopyForm from './copyComfirmForm'
import Select from 'react-select';
import TagRFIDModal from "../../components/Modals/TagRFIDModal"
import * as MyConstant from '../Util/Constant'
import {
    Card,
    Container
} from "reactstrap";
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import CommonConfirmModal from "components/Modals/CommonConfirmModal"
import { Link } from 'react-router-dom'
class BookCopy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            errMsg: "",
            confirmDelete: false,
            deleteId: null,
            updateFormShow: false,
            updateData: null,
            confirmFormShow: false,
            selectValue: [],
            tagFormShow: false,
            price: null,
            copyType: null,
            copyStatus: null,
            barcodeList: [],
            barcodeConfirm: false,
            allBarcodeConfirm: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
        this.bookDescriptionFormat = this.bookDescriptionFormat.bind(this)
        this.handleSelectBook = this.handleSelectBook.bind(this)
    }
    componentDidMount() {
        if (!this.state.copyStatus) {
            let copyStatus = []
            Object.keys(MyConstant.BOOK_COPY_STATUS_LIST).forEach(el => {
                if (el != "IN_PROCESS") copyStatus.push({ "value": el, "label": MyConstant.BOOK_COPY_STATUS_LIST[el] })
            })
            this.setState({ copyStatus: copyStatus })
        }
        this.getCopyTypes()
        this.fetchData()
    }
    componentDidUpdate() {
        // console.log(this.props.printBarcodeSuccess)
        let msg = null
        if (this.props.addSuccess) {
            msg = "Add book copy successfully"
        }
        if (this.props.updateSuccess) {
            msg = "Update book copy successfully"
        }
        if (this.props.deleteSuccess) {
            msg = "Delete book copy successfully"
        }
        if (this.props.printBarcodeSuccess || this.props.printAllBarcodeSuccess) {
            msg = "Print barcode successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if ((this.props.error != null || this.props.bookError != null) && !this.state.errorShow) {
            let errMsg = null
            if (this.props.error != null) {
                errMsg = this.props.error
            } else if (this.props.bookError) {
                errMsg = this.props.bookError
            }
            this.setState({ errorShow: true, errMsg: errMsg, searchValue: '' })
        }
        if (this.props.bookCopyData != null && !this.state.confirmFormShow) {
            this.setState({ confirmFormShow: true })
        }
        if (this.props.bookCopyData == null && this.state.confirmFormShow) {
            this.setState({ confirmFormShow: false })
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
        this.fetchData(1, 10, this.state.searchValue, this.state.selectValue)
    }
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.searchValue, this.state.selectValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue, this.state.selectValue);

    }
    handleAddCancel = () => {
        this.setState({
            addFormShow: false,
            cancelAdd: true,
            price: null,
            copyType: null
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue, selectValue = this.state.selectValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue.toUpperCase(), selectValue)
    }

    getCopyTypes() {
        this.props.onGetCopyType()
    }
    handleGenerateSubmit(values) {
        this.setState({ addFormShow: false, price: values.price, copyType: values.copyTypeId })
        this.props.onGenerateBarcode(values)
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, barcodeList: [] })
        this.fetchData(1, this.props.sizePerPage, this.state.searchValue, this.state.selectValue);
    }
    handleUpdateCancel = () => {
        this.setState({
            updateFormShow: false,
            updateData: null,
        })
    }
    handleUpdateSubmit(values) {
        this.setState({ updateFormShow: false })
        let data = {}
        data["id"] = values.id
        data["copyTypeId"] = values.copyType
        data["price"] = values.price
        data["rfid"] = values.rfid
        data["updater"] = this.props.userid
        this.props.onUpdateCopy(data)
    }
    handleDeleteSubmit() {
        this.setState({ confirmDelete: false })
        this.props.onDeleteCopy(this.state.deleteId)
    }
    handleDeleteCancel = () => {
        this.setState({
            confirmDelete: false,
            deleteId: null,
        })
    }
    handleConfirmCancel = () => {
        this.setState({
            confirmFormShow: false,
        })
        this.fetchData()
    }

    handleConfirmSubmit = (values) => {

        let data = {}
        let barcodes = []
        values.members.forEach(element => {
            barcodes.push(element.barcode)
        });
        data["bookId"] = values.id
        data["creatorId"] = this.props.userid
        data["copyTypeId"] = this.state.copyType
        data["price"] = this.state.price
        data["barcodes"] = barcodes
        this.props.onAddCopy(data)
        this.setState({
            confirmFormShow: false,
            copyType: null,
            price: null
        })
    }
    handleSelectChange(values) {
        let tmp = []
        if (values != null) {
            values.forEach(el => {
                tmp.push(el["value"])
            });
        }
        this.setState({ selectValue: tmp }, () => {
            this.fetchData(1, 10, this.state.searchValue, this.state.selectValue)
        })
    }
    activeFormatter(cell, row) {
        let btn = null
        if (!MyConstant.BOOK_COPY_NOT_UPDATE_STATUS.includes(row.status)) {
            btn = (<UpdateButton clicked={() => this.setState({
                updateFormShow: true,
                updateData: row
            })} />)
        }
        return (
            <div>
                {btn}
            </div>
        )
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.book.img} />)
    }
    bookDescriptionFormat(cell, row) {
        let author = []
        row.book.author.forEach(el => author.push(el.name))
        return (
            <>
                <Link to={{
                    pathname: this.props.location.pathname.includes('/admin') ? '/admin/copyDetail' : '/librarian/copyDetail',
                    state: {
                        copy: row,
                    }
                }}><h1 className="font-weight-bolder">{row.book.title}{row.book.subtitle ? " : " + row.book.subtitle : null}</h1></Link>
                <p>by {author.join(", ")}</p>
                <p>Edition: {row.book.edition}</p>
                <p>Price: {row.price} VND</p>
                <p>ISBN: {row.book.isbn}</p>
                <p>Barcode: {row.barcode}</p>
                <p>Call Number: {row.book.callNumber}</p>
                <p>Status: {row.status}</p>
            </>
        )
    }
    getInitialValues = () => {
        let author = []
        if (this.state.updateData) {
            this.state.updateData.book.author.forEach(el => author.push(el.name))
        }
        return {
            rfid: this.state.updateData ? this.state.updateData.rfid : '',
            isbn: this.state.updateData ? this.state.updateData.book.isbn : '',
            title: this.state.updateData ? this.state.updateData.book.title : '',
            edition: this.state.updateData ? this.state.updateData.book.edition : '',
            id: this.state.updateData ? this.state.updateData.id : '',
            price: this.state.updateData ? this.state.updateData.price : '',
            copyType: this.state.updateData ? (this.state.updateData.bookCopyTypeDto ? this.state.updateData.bookCopyTypeDto.id : '') : '',
            img: this.state.updateData ? this.state.updateData.book.img : '',
            barcode: this.state.updateData ? this.state.updateData.barcode : '',
            subtitle: this.state.updateData ? (this.state.updateData.book ? (this.state.updateData.book.subtitle ? this.state.updateData.book.subtitle : '') : '') : '',
            authors: author.join(", "),
        };
    }
    getConfirmInitialValues = () => {
        let barcode = []
        if (this.props.bookCopyData && this.props.bookCopyData.generatedBarcodes.length > 0) {
            this.props.bookCopyData.generatedBarcodes.forEach(el => {
                barcode.push({ "barcode": el })
            });
        }
        let copyType = ""
        if (this.props.copyTypes) {
            this.props.copyTypes.forEach(element => {
                if (element.id == this.state.copyType) {
                    copyType = element.name
                }
            });
        }
        return {
            isbn: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.isbn : '',
            author: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.authors : '',
            price: this.state.price ? this.state.price : '',
            title: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.title : '',
            edition: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.edition : '',
            copyType: copyType,
            members: barcode,
            img: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.img : '',
            id: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.bookId : ''
        };
    }

    handleTagCancel = () => {
        this.setState({
            tagFormShow: false,
        })
        this.fetchData()
    }
    handleTagSubmit = values => {
        this.setState({ tagFormShow: false })
        values["userid"] = this.props.userid
        this.props.onTagRFID(values)
    }
    getInitialCopyValues() {
        return {
            copyTypeId: this.props.copyTypes ? this.props.copyTypes[0]["id"] : ""
        };
    }
    handleSelectBook(row, isSelect, rowIndex, e) {
        if (isSelect) {
            if (!(this.state.barcodeList.includes(row.id))) {
                this.setState({
                    barcodeList: [...this.state.barcodeList, row.id]
                })
            }
        } else {
            var array = [...this.state.barcodeList];
            var index = array.indexOf(row.id)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ barcodeList: array });
            }
        }
    }
    handlePrintBarcode() {
        this.setState({ barcodeConfirm: false })
        this.props.onPrintBarcode({ bookCopyIdList: this.state.barcodeList })
    }
    handlePrintAllBarcode() {
        this.setState({ allBarcodeConfirm: false })
        this.props.onPrintAllBarcode({ searchValue: this.state.searchValue, status: this.state.selectValue })
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
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleSelectBook,
            selected: this.state.barcodeList
        };
        let main = (
            <>
                <BootstrapTable
                    data={this.props.data}
                    options={options}
                    selectRow={selectRow}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="id"
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="13%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="50%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="15%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyAddForm options={this.props.copyTypes} initialValues={this.getInitialCopyValues()} handleCancel={() => this.handleAddCancel()} onSubmit={(values) => this.handleGenerateSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal dialogClassName="two-col-modal" backdrop="static" show={this.state.confirmFormShow} onHide={() => { this.handleConfirmCancel() }} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmCopyForm initialValues={this.getConfirmInitialValues()} handleCancel={() => this.handleConfirmCancel()} onSubmit={(values) => this.handleConfirmSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal dialogClassName="two-col-modal" backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyUpdateForm options={this.props.copyTypes} initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} dataList={this.props.bookData} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmDelete} onHide={() => this.handleDeleteCancel()}>
                    <Modal.Header className="bg-danger" closeButton>
                        <Modal.Title>Delete Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-danger display-1"><i className="fas fa-trash-alt"></i></h1>
                        <h4>You will not be able to recover this book copy</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleDeleteCancel()}>
                            Close
                    </Button>
                        <Button variant="danger" onClick={() => this.handleDeleteSubmit()}>
                            OK
                    </Button>
                    </Modal.Footer>
                </Modal>
                <TagRFIDModal title="Tag RFID" show={this.state.tagFormShow} hide={() => this.handleTagCancel()} submit={values => this.handleTagSubmit(values)}></TagRFIDModal>
            </>
        )
        if (this.props.loading) {
            main = <Spinner />
        }
        let display = (
            <div className="content mt-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-3 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Search by ISBN, barcode, rfid or title" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-2">
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.copyStatus}
                            placeholder="Select status..."
                            onChange={(e) => this.handleSelectChange(e)}
                        />
                    </Col>
                    <Col className="col-6 pr-4 pull-right offset-1">

                        {/* <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Book Copy
                        </button> */}

                        {/* <button onClick={() => this.setState({ tagFormShow: true })}
                            type="button" className="btn mr-2 btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Tag RFID
                        </button> */}

                        {/* <button onClick={() => this.setState({ allBarcodeConfirm: true })}
                            type="button" className="btn btn-primary mx-1 btn-fill float-right" >
                            <span className="btn-label">
                            </span> Print All Barcode
                        </button> */}

                        {/* <button disabled={this.state.barcodeList.length == 0} onClick={() => this.setState({ barcodeConfirm: true })}
                            type="button" className="btn btn-primary mx-1 btn-fill float-right" >
                            <span className="btn-label">
                            </span> Print Barcode
                        </button> */}

                        <Dropdown className="mx-1 float-right" alignRight={true}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">Print Barcodes</Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button" onClick={() => this.setState({ allBarcodeConfirm: true })}>All</Dropdown.Item>
                                <Dropdown.Item as="button" disabled={this.state.barcodeList.length == 0} onClick={() => this.setState({ barcodeConfirm: true })}>Selected</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Col>
                </Row>

                <br />
                {main}
            </div>
        )

        return (
            <>
                {/* <Header /> */}
                <Container className="mt-3" fluid>
                    <Card className="shadow">
                        <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                        <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.state.errMsg} />
                        <CommonConfirmModal title="Print barcode" show={this.state.barcodeConfirm} hide={() => this.setState({ barcodeConfirm: false })} clickConfirm={() => this.handlePrintBarcode()} msg="Do you want to print selected barcodes?" />
                        <CommonConfirmModal title="Print all barcode" show={this.state.allBarcodeConfirm} hide={() => this.setState({ allBarcodeConfirm: false })} clickConfirm={() => this.handlePrintAllBarcode()} msg="Do you want to print all searched barcodes?" />

                        {display}
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.copy.loading,
        data: state.copy.data,
        bookData: state.copy.bookData,
        error: state.copy.error,
        bookError: state.copy.bookError,
        totalSize: state.copy.total,
        page: state.copy.page,
        sizePerPage: state.copy.sizePerPage,
        deleteSuccess: state.copy.deleteSuccess,
        printBarcodeSuccess: state.copy.printBarcodeSuccess,
        printAllBarcodeSuccess: state.copy.printAllBarcodeSuccess,
        updateSuccess: state.copy.updateSuccess,
        addSuccess: state.copy.addSuccess,
        bookCopyData: state.copy.bookCopyData,
        bookCopyStatus: state.copy.bookCopyStatus,
        copyTypes: state.copy.copyTypes,
        userid: state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search, select) => dispatch(actions.getCopy(page, size, search, select)),
        onDeleteCopy: (id) => dispatch(actions.deleteCopy(id)),
        onUpdateCopy: (data) => dispatch(actions.updateCopy(data)),
        onAddCopy: (data) => dispatch(actions.addCopy(data)),
        // onGetBook: () => dispatch(actions.getAllBook()),
        onGetCopyType: () => dispatch(actions.getCopyType()),
        onGenerateBarcode: (data) => dispatch(actions.generateBarcode(data)),
        onTagRFID: (data) => dispatch(actions.tagRFID(data)),
        onPrintBarcode: (data) => dispatch(actions.printBarcode(data)),
        onPrintAllBarcode: (data) => dispatch(actions.printAllBarcode(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCopy)

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
import { Navbar, FormGroup, FormControl, InputGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import UpdateButton from '../../components/Button/UpdateButton'
import DeleteButton from '../../components/Button/DeleteButton'
import CopyAddForm from './copyAddForm'
import CopyUpdateForm from './copyUpdateForm'
import ConfirmCopyForm from './copyComfirmForm'
import Select from 'react-select';
import chroma from 'chroma-js';

import {
    Card,
    CardHeader,
    CardFooter,
    Container
} from "reactstrap";
class BookCopy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            errMsg:"",
            confirmDelete: false,
            deleteId: null,
            updateFormShow: false,
            updateData: null,
            confirmFormShow:false,
            selectValue:[]
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
        
    }
    componentDidMount() {
        this.getAllBookStatus()
        this.fetchData()
    }
    componentDidUpdate() {
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
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if ((this.props.error != null || this.props.bookError != null) && !this.state.errorShow) {
            let errMsg=null
            if(this.props.error != null){
                errMsg=this.props.error
            }else if(this.props.bookError){
                errMsg=this.props.bookError
            }
            this.setState({ errorShow: true,errMsg:errMsg,searchValue:'' })
        }
        if(this.props.bookCopyData!=null && !this.state.confirmFormShow){
            this.setState({confirmFormShow:true})
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
        this.fetchData(1, 10, this.state.searchValue,this.state.selectValue)
    }
    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.searchValue,this.state.selectValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue,this.state.selectValue);

    }
    handleAddCancel = () => {
        this.setState({
            addFormShow: false,
            cancelAdd: true,
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue,selectValue=this.state.selectValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue,selectValue)
    }
    getAllBookStatus(){
        this.props.onGetBookStatus()
    }
    handleAddSubmit(values) {
        this.setState({ addFormShow: false })
        this.props.onAddCopy(values)
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        this.fetchData(1, 10, this.state.searchValue,this.state.selectValue);
    }
    handleUpdateCancel = () => {
        this.setState({
            updateFormShow: false,
            updateData: null,
        })
    }
    handleUpdateSubmit(values) {
        this.setState({ updateFormShow: false })
        this.props.onUpdateCopy(values)
    }
    handleDeleteSubmit() {
        this.setState({ confirmDelete: false})
        this.props.onDeleteCopy(this.state.deleteId)
    }
    handleDeleteCancel = () => {
        this.setState({
            confirmDelete: false,
            deleteId: null,
        })
    }
    handleConfirm = () => {
        this.setState({
            confirmFormShow: false,
        })
        this.fetchData()
    }
    handleSelectChange(values){
        let tmp=[]
        console.log(values)
        if(values !=null){
            values.forEach(el => {
                tmp.push(el["value"])
            });
        }
        this.setState({selectValue:tmp},()=>{
        this.fetchData()
        })
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <Button className="btn btn-sm btn-primary" onClick={() => this.setState({
                     updateFormShow: true,
                     updateData: row
                })}>Tag RFID</Button>        
                <DeleteButton clicked={() => this.setState({
                    confirmDelete: true,
                    deleteId: row.id
                })}/>              
            </div>
        )
    }
    bookDescriptionFormat(cell, row) {
        let author=row.author.join()
        return (
            <Row>
                <Col className="col-6">Title: {row.title}</Col>
                <Col className="col-6">Subtitle: {row.sub}</Col>
                <Col className="col-4">DDC: {row.ddc}</Col>
                <Col className="col-4">Author: {author}</Col>
                <Col className="col-4">Publisher:{row.publisher}</Col>
                <Col className="col-4">Language: {row.language}</Col>
                <Col className="col-4">Number of page: {row.nop}</Col>
                <Col className="col-4">Edition: {row.edition}</Col>
            </Row>
            )
    }
    getInitialValues = () => {
        return {
            rfidcode: this.state.updateData ? this.state.updateData.rfidcode : '',
            isbn: this.state.updateData ? this.state.updateData.isbn : '',
            title: this.state.updateData ? this.state.updateData.title : '',
            edition: this.state.updateData ? this.state.updateData.edition : '',
            id:this.state.updateData ? this.state.updateData.id : ''
        };
    }
    getConfirmInitialValues = () => {
        let barcode=[]
        if(this.props.bookCopyData && this.props.bookCopyData.barcode.length>0){
            this.props.bookCopyData.barcode.forEach(el => {
                barcode.push({"barcode":el})
            });
        }
        return {
            isbn: this.props.bookCopyData ? this.props.bookCopyData.isbn : '',
            author: this.props.bookCopyData ? this.props.bookCopyData.author : '',
            price: this.props.bookCopyData ? this.props.bookCopyData.price : '',
            title: this.props.bookCopyData ? this.props.bookCopyData.title : '',
            edition: this.props.bookCopyData ? this.props.bookCopyData.edition : '',
            noc: this.props.bookCopyData ? this.props.bookCopyData.noc : '',
            members:barcode
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
        let display = (
            <div className="content">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-4">
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={this.props.bookCopyStatus}
                        onChange={(e)=>this.handleSelectChange(e)}
                        />
                    </Col>
                    <Col className="col-4 pr-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Book Copy
                        </button>
                    </Col>
                </Row>

                <br />
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
                >
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="barcode" width="12%" isKey dataAlign="center">Bar Code</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="isbn" width="12%" dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="description" width="47%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="category" dataAlign="center" width="12%">Category</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="price" dataAlign="center" width="10%">Price</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField="status" dataAlign="center" width="10%">Status</TableHeaderColumn>
                    <TableHeaderColumn thStyle={{ whiteSpace: 'normal' }} tdStyle={{ whiteSpace: 'normal' }} dataField='active' dataAlign="center" width="20%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyAddForm  handleCancel={() => this.handleAddCancel()} onSubmit={(values) => this.handleAddSubmit(values)}/>
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmFormShow} onHide={() => {this.handleConfirm()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmCopyForm initialValues={this.getConfirmInitialValues()} handleCancel={() => this.handleConfirm()} onSubmit={() => this.handleConfirm()}/>
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyUpdateForm initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} dataList={this.props.bookData}/>
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
            </div>
        )
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Book copy tables</h3>
                        </CardHeader>
                        <Modal show={this.state.successShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                            <Modal.Header className="bg-success" closeButton>
                                <Modal.Title>Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <h1 className="text-success display-1"><i className="fas fa-check-circle"></i></h1>
                                <h2>{this.state.successNotice}</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleModalClose()}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.errorShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton className="bg-danger">
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <h1 className="text-danger display-1"><i className="fas fa-times-circle"></i></h1>
                                <h2>{this.state.errMsg}</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleModalClose()}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
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
        updateSuccess: state.copy.updateSuccess,
        addSuccess: state.copy.addSuccess,
        bookCopyData:state.copy.bookCopyData,
        bookCopyStatus:state.copy.bookCopyStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search,select) => dispatch(actions.getCopy(page, size, search,select)),
        onDeleteCopy: (id) => dispatch(actions.deleteCopy(id)),
        onUpdateCopy: (data) => dispatch(actions.updateCopy(data)),
        onAddCopy: (data) => dispatch(actions.addCopy(data)),
        onGetBook: () => dispatch(actions.getAllBook()),
        onGetBookStatus:()=>dispatch(actions.getBookCopyStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCopy)

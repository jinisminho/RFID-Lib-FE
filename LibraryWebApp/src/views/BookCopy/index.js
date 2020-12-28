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
import CopyForm from './copyForm'
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
            updateData: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
    }
    componentDidMount() {
        this.fetchData();
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
    handleAddCancel = () => {
        this.setState({
            addFormShow: false,
            cancelAdd: true,
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
        this.props.onGetBook()
    }
    handleAddSubmit(values) {
        console.log(values)
        this.setState({ addFormShow: false })
        this.props.onAddCopy(values)
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        this.fetchData(1, 10, this.state.searchValue);
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
    activeFormatter(cell, row) {
        return (
            <div>
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row
                })} />
                <DeleteButton clicked={() => this.setState({
                    confirmDelete: true,
                    deleteId: row.id
                })}/>              
            </div>
        )
    }
    getInitialValues = () => {
        return {
            code: this.state.updateData ? this.state.updateData.code : '',
            book: this.state.updateData ? this.state.updateData.book : '',
            id:this.state.updateData ? this.state.updateData.id : ''
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
                    <Col className="col-8 pr-4 pull-right">
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
                    <TableHeaderColumn dataField="code" width="10%" isKey dataAlign="center">Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn" width="10%"  dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="10%" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" width="10%" dataAlign="center">Author</TableHeaderColumn>
                    <TableHeaderColumn dataField="publisher" width="10%" dataAlign="center">Publisher</TableHeaderColumn>
                    <TableHeaderColumn dataField="language" width="10%" dataAlign="center" >Language</TableHeaderColumn>
                    <TableHeaderColumn dataField="nop" dataAlign="center" width="10%" >Number of page</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="10%">Category</TableHeaderColumn>
                    <TableHeaderColumn dataField="edition" dataAlign="center" width="10%">Edition</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="15%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyForm  handleCancel={() => this.handleAddCancel()} onSubmit={(values) => this.handleAddSubmit(values)}  dataList={this.props.bookData}/>
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyForm initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} dataList={this.props.bookData}/>
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
        addSuccess: state.copy.addSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getCopy(page, size, search)),
        onDeleteCopy: (id) => dispatch(actions.deleteCopy(id)),
        onUpdateCopy: (data) => dispatch(actions.updateCopy(data)),
        onAddCopy: (data) => dispatch(actions.addCopy(data)),
        onGetBook: () => dispatch(actions.getAllBook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCopy)

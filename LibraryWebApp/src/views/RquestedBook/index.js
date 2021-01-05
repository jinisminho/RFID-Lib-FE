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
import React, {Component} from "react";
import Header from "components/Headers/Header.js";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Button, Col, FormControl, InputGroup, Modal, Row} from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import DeleteButton from '../../components/Button/DeleteButton'
import {Card, CardHeader, Container} from "reactstrap";

class RequestedBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
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
        if (this.props.deleteSuccess) {
            msg = "Delete book successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({successShow: true, successNotice: msg})
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({errorShow: true, searchValue: ''})
        }
    }

    inputChangedHandler = (event) => {
        this.setState({searchValue: event.target.value})
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

    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }

    // handleAddSubmit(values) {
    //     this.setState({addFormShow: false})
    //     this.props.onAddBook(values)
    // }

    handleModalClose() {
        this.setState({successShow: false, errorShow: false})
        this.fetchData(1, 10, this.state.searchValue);
    }

    handleDeleteSubmit() {
        this.setState({confirmDelete: false})
        this.props.onDeleteBook(this.state.deleteId)
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
                <DeleteButton clicked={() => this.setState({
                    confirmDelete: true,
                    deleteId: row.id
                })}/>
            </div>
        )
    }

    // getInitialValues = () => {
    //     let author = []
    //     if (this.state.updateData && this.state.updateData.author.length > 0) {
    //         this.state.updateData.author.forEach(el => {
    //             author.push({"author": el})
    //         });
    //     }
    //     return {
    //         isbn: this.state.updateData ? this.state.updateData.isbn : '',
    //         title: this.state.updateData ? this.state.updateData.title : '',
    //         publisher: this.state.updateData ? this.state.updateData.publisher : '',
    //         language: this.state.updateData ? this.state.updateData.language : '',
    //         nop: this.state.updateData ? this.state.updateData.nop : '',
    //         category: this.state.updateData ? this.state.updateData.category : '',
    //         edition: this.state.updateData ? this.state.updateData.edition : '',
    //         members: author,
    //         id: this.state.updateData ? this.state.updateData.id : ''
    //     };
    // }

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
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""}
                                         onChange={(event => this.inputChangedHandler(event))} type="text"
                                         placeholder="Type to search"/>
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i
                                    className="fa fa-search"/></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>

                <br/>

                <BootstrapTable
                    data={this.props.data}
                    options={options}
                    fetchInfo={{dataTotalSize: this.props.totalSize}}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                >
                    <TableHeaderColumn dataField="isbn" width="12%" isKey dataAlign="center"
                                       dataSort>ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="17%" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" width="12%" dataAlign="center">Author</TableHeaderColumn>
                    <TableHeaderColumn dataField="publisher" width="12%"
                                       dataAlign="center">Publisher</TableHeaderColumn>
                    <TableHeaderColumn dataField="language" width="11%" dataAlign="center">Language</TableHeaderColumn>
                    <TableHeaderColumn dataField="nop" dataAlign="center" width="10%">Number of page</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="11%">Category</TableHeaderColumn>
                    <TableHeaderColumn dataField="edition" dataAlign="center" width="5%">Edition</TableHeaderColumn>
                    <TableHeaderColumn dataField="requests" dataAlign="center" width="10%"
                                       dataSort>Requests</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="10%"
                                       dataFormat={this.activeFormatter}>Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal backdrop="static" show={this.state.confirmDelete} onHide={() => this.handleDeleteCancel()}>
                    <Modal.Header className="bg-danger" closeButton>
                        <Modal.Title>Delete Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-danger display-1"><i className="fas fa-trash-alt"/></h1>
                        <h4>You will not be able to recover this book</h4>
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
            display = <Spinner/>
        }
        return (
            <>
                <Header/>
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Requested Books</h3>
                        </CardHeader>
                        <Modal show={this.state.successShow} onHide={() => this.handleModalClose()} backdrop="static"
                               keyboard={false}>
                            <Modal.Header className="bg-success" closeButton>
                                <Modal.Title>Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <h1 className="text-success display-1"><i className="fas fa-check-circle"/></h1>
                                <h2>{this.state.successNotice}</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleModalClose()}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.errorShow} onHide={() => this.handleModalClose()} backdrop="static"
                               keyboard={false}>
                            <Modal.Header closeButton className="bg-danger">
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <h1 className="text-danger display-1"><i className="fas fa-times-circle"/></h1>
                                <h2>{this.props.error}</h2>
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
        loading: state.book.loading,
        data: state.book.data,
        error: state.book.error,
        totalSize: state.book.total,
        page: state.book.page,
        sizePerPage: state.book.sizePerPage,
        deleteSuccess: state.book.deleteSuccess,
        updateSuccess: state.book.updateSuccess,
        addSuccess: state.book.addSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getRequestedBooks(page, size, search)),
        onDeleteBook: (id) => dispatch(actions.deleteRequestedBook(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestedBooks)

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
import {FormControl, InputGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import UpdateButton from '../../../components/Button/UpdateButton'
import DeleteButton from '../../../components/Button/DeleteButton'
import AuthorForm from './authorForm'
import CommonConfirmModal from "components/Modals/CommonConfirmModal"
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import {
    Card,
    Container
} from "reactstrap";
class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            updateFormShow: false,
            updateData: null,
            deleteId:null,
            deleteFormShow:false
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
            msg = "Add author successfully"
        }
        if (this.props.updateSuccess) {
            msg = "Update author successfully"
        }
        if (this.props.deleteSuccess) {
            msg = "Delete author successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
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
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }
    handleAddSubmit(values) {
        this.setState({ addFormShow: false })
        values.birthYear = values.birthYear.getFullYear()
        this.props.onAddAuthor(values)

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
    handleDeleteCancel = () => {
        this.setState({
            deleteFormShow: false,
            deleteId: null,
        })
    }
    handleUpdateSubmit(values) {
        this.setState({ updateFormShow: false })
        values.birthYear = values.birthYear.getFullYear()
        this.props.onUpdateAuthor(values)
    }
    handleDeleteSubmit() {
        this.setState({ deleteFormShow: false })
        this.props.onDeleteAuthor(this.state.deleteId)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row
                })} />
                <DeleteButton clicked={() => this.setState({
                    deleteFormShow: true,
                    deleteId: row.id
                })} />
                
            </div>
        )
    }
    getInitialValues = () => {
        return {
            name: this.state.updateData ? this.state.updateData.name : '',
            country: this.state.updateData ? this.state.updateData.country : '',
            birthYear: this.state.updateData ? new Date(this.state.updateData.birthYear.toString()) : '',
            authorId: this.state.updateData ? this.state.updateData.id : ''
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
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Search by author name" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Author
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
                    className="mx-4"
                >
                    <TableHeaderColumn
                        dataField="id"
                        isKey
                        dataAlign="center"
                        width="10%"
                    >
                        Id
          </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="name"
                        dataAlign="center"
                        width="15%"
                    >
                        Name

          </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="country"
                        dataAlign="center"
                        width="15%"
                    >
                        Country
          </TableHeaderColumn>
                    <TableHeaderColumn dataField="birthYear" dataAlign="center" width="10%" >
                        Birth Year
          </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="action"
                        dataAlign="center"
                        dataFormat={this.activeFormatter}
                        width="20%"
                    >
                        Action
          </TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Author</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AuthorForm 
                            handleCancel={() => this.handleAddCancel()} 
                            onSubmit={(values) => this.handleAddSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Author</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AuthorForm initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <CommonConfirmModal title="Delete Author" show={this.state.deleteFormShow} hide={() => this.handleDeleteCancel()} clickConfirm={() => this.handleDeleteSubmit()} msg="Do you want to delete this author?" />
                
            </div>
        )
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                <Container className="mt-md-3" fluid>
                    <Card className="shadow">
                    <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                    <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {display}
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.author.loading,
        data: state.author.data,
        error: state.author.error,
        totalSize: state.author.total,
        page: state.author.page,
        sizePerPage: state.author.sizePerPage,
        deleteSuccess: state.author.deleteSuccess,
        updateSuccess: state.author.updateSuccess,
        addSuccess: state.author.addSuccess,
        userid: state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getAdminAuthor(page, size, search)),
        onDeleteAuthor: (id) => dispatch(actions.deleteAuthor(id)),
        onUpdateAuthor: (data) => dispatch(actions.updateAuthor(data)),
        onAddAuthor: (data) => dispatch(actions.addAuthor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Author)

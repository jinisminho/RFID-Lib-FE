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
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import UpdateButton from '../../../components/Button/UpdateButton'
import DeleteButton from '../../../components/Button/DeleteButton'
import StaffForm from './staffForm'
import SwitchControl from "../../../components/Switch/Switch";
import moment from 'moment'
import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            confirmActiveStatus: false,
            confirmDisableStatus:false,
            statusId: null,
            copyShow: false,
            copyData: null,
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
            msg = "Add staff successfully"
        }
        if (this.props.updateSuccess) {
            msg = "Update staff successfully"
        }
        if (this.props.deleteSuccess) {
            msg = "Change staff status successfully"
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
            cancelAdd: true,
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }
    handleAddSubmit(values) {
        this.setState({ addFormShow: false })
        this.props.onAddStaff(values)
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
        this.props.onUpdateStaff(values)
    }
    handleChangeStatusSubmit(status) {
        this.setState({ confirmActiveStatus: false,confirmDisableStatus:false })
        this.props.onChangeStatusStaff(this.state.statusId,status)
    }
    handleChangeStatusCancel = () => {
        this.setState({
            confirmActiveStatus: false,
            confirmDisableStatus:false,
            statusId: null,
        })
    }
    statusFormat(cell,row){
        let status = null
        if(!row.status){
            status = <span className="text-danger">disable</span>
        }else{
            status = <span className="text-success">active</span>
        }
        return(
            <>{status}</>
        )
    }
    activeFormatter(cell, row) {
        let status=<button type="button" rel="tooltip" data-placement="left" className="btn btn-sm btn-danger btn-simple btn-icon" onClick={() => this.setState({
            confirmDisableStatus: true,
            statusId: row.id
        })}>
                        <i className="fa fa-trash"></i> Disable
                    </button>
                    if (!row.status){
                        status=<button type="button" rel="tooltip" data-placement="left" className="btn btn-sm btn-primary btn-simple btn-icon" onClick={() => this.setState({
                            confirmActiveStatus: true,
                            statusId: row.id
                        })}> <i className="fa fa-check"></i> Enable
                        </button>
                    }
        return (
            <div>
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row
                })} />
                {status}
                
            </div>
        )
    }
    getInitialValues = () => {
        return {
            name: this.state.updateData ? this.state.updateData.name : '',
            username: this.state.updateData ? this.state.updateData.username : '',
            password: this.state.updateData ? this.state.updateData.password : '',
            email: this.state.updateData ? this.state.updateData.email : '',
            phone: this.state.updateData ? this.state.updateData.phone : '',
            address: this.state.updateData ? this.state.updateData.address : '',
            dob: this.state.updateData ? this.state.updateData.dob : '',
            gender: this.state.updateData ? this.state.updateData.gender : '',
            id: this.state.updateData ? this.state.updateData.id : ''
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
                            </span> <i className="fa fa-plus"></i> Add Staff
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
                        dataField="username"
                        dataAlign="center"
                        width="15%"
                    >
                        Username

          </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="name"
                        dataAlign="center"
                        width="15%"
                    >
                        Name
          </TableHeaderColumn>
                    <TableHeaderColumn dataField="gender" dataAlign="center" width="10%">
                        Gender
          </TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataAlign="center" width="15%">
                        Phone
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataAlign="center" width="15%" dataFormat={this.statusFormat}>
                        Status
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
                        <Modal.Title>Add Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StaffForm initialValues={{
                                    gender:'M',
                                    dob:moment().subtract(18,'years').startOf("year").format('YYYY-MM-DD')
                                }} 
                                handleCancel={() => this.handleAddCancel()} 
                                onSubmit={(values) => this.handleAddSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StaffForm initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmDisableStatus} onHide={() => this.handleChangeStatusCancel()}>
                    <Modal.Header className="bg-danger" closeButton>
                        <Modal.Title>Disable Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-danger display-1"><i className="fas fa-trash-alt"></i></h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleChangeStatusCancel()}>
                            Close
                    </Button>
                        <Button variant="danger" onClick={() => this.handleChangeStatusSubmit(false)}>
                            OK
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmActiveStatus} onHide={() => this.handleChangeStatusCancel()}>
                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>Activate Staff</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-primary display-1"><i className="fas fa-check"></i></h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleChangeStatusCancel()}>
                            Close
                    </Button>
                        <Button variant="success" onClick={() => this.handleChangeStatusSubmit(true)}>
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
                            <h3 className="mb-0">Staff tables</h3>
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
        loading: state.staff.loading,
        data: state.staff.data,
        error: state.staff.error,
        totalSize: state.staff.total,
        page: state.staff.page,
        sizePerPage: state.staff.sizePerPage,
        deleteSuccess: state.staff.deleteSuccess,
        updateSuccess: state.staff.updateSuccess,
        addSuccess: state.staff.addSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getStaff(page, size, search)),
        onChangeStatusStaff: (id,status) => dispatch(actions.changeStatusStaff(id,status)),
        onUpdateStaff: (data) => dispatch(actions.updateStaff(data)),
        onAddStaff: (data) => dispatch(actions.addStaff(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)

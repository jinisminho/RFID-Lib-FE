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
import StaffForm from './staffForm'
import StaffUpdateForm from './staffUpdateForm'
import moment from 'moment'
import { storage } from '../../../firebase'
import CommonConfirmModal from "components/Modals/CommonConfirmModal"
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import {
    Card,
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
            updateFormShow: false,
            updateData: null,
            imageLoading:false
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
            msg = "Add librarian successfully"
        }
        if (this.props.updateSuccess) {
            msg = "Update librarian successfully"
        }
        if (this.props.deleteSuccess) {
            msg = "Change librarian status successfully"
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
        const uploadTask = storage.ref(`images/staff/${values.avatar[0].name}`).put(values.avatar[0])
        uploadTask.on('state_changed',
            (snapshot) => {
                this.setState({ imageLoading: true, addFormShow: false })
            },
            (error) => {
                // console.log(error)
                this.setState({ imageLoading: false })
            },
            () => {
                storage.ref('images/staff').child(values.avatar[0].name).getDownloadURL().then(url => {
                    this.setState({ imageLoading: false })
                    values["avatar"] = url
                    values["creatorId"]=this.props.userid
                    if(values["rfid"].trim().toUpperCase().includes("PAT#")){
                        values["rfid"]=values["rfid"].trim().toUpperCase().split("PAT#")[1]
                    }else { //DEFAULT
                        values["rfid"]=values["rfid"].trim().toUpperCase()
                    }
                    this.props.onAddStaff(values)
                })
            }
        )

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
        if (Array.isArray(values.avatar)) {
            const uploadTask = storage.ref(`images/staff/${values.avatar[0].name}`).put(values.avatar[0])
            uploadTask.on('state_changed',
                (snapshot) => {
                    this.setState({ imageLoading: true, updateFormShow: false })
                },
                (error) => {
                    // console.log(error)
                    this.setState({ imageLoading: false })
                },
                () => {
                    storage.ref('images/staff').child(values.avatar[0].name).getDownloadURL().then(url => {
                        this.setState({ imageLoading: false })
                        values["avatar"] = url
                        values["updaterId"] = this.props.userid
                        if(values["rfid"].trim().toUpperCase().includes("PAT#")){
                            values["rfid"]=values["rfid"].trim().toUpperCase().split("PAT#")[1]
                        }else { //DEFAULT
                            values["rfid"]=values["rfid"].trim().toUpperCase()
                        }
                        this.props.onUpdateStaff(values)
                    })
                }
            )
        } else {
            this.setState({ updateFormShow: false })
            values["updaterId"] = this.props.userid
            if(values["rfid"].trim().toUpperCase().includes("PAT#")){
                values["rfid"]=values["rfid"].trim().toUpperCase().split("PAT#")[1]
            }else { //DEFAULT
                values["rfid"]=values["rfid"].trim().toUpperCase()
            }
            this.props.onUpdateStaff(values)
        }

    }
    handleChangeStatusSubmit(status) {
        this.setState({ confirmActiveStatus: false,confirmDisableStatus:false })
        this.props.onChangeStatusStaff(this.state.statusId,status,this.props.userid)
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
        if(!row.active){
            status = <span className="text-danger">DISABLE</span>
        }else{
            status = <span className="text-success">ACTIVE</span>
        }
        return(
            <>{status}</>
        )
    }
    nameFormat(cell,row){
        return row.profile.fullName
    }
    genderFormat(cell,row){
        return row.profile.gender=="M"?"Male":"Female"
    }
    phoneFormat(cell,row){
        return row.profile.phone
    }
    activeFormatter(cell, row) {
        let status=<button type="button" rel="tooltip" data-placement="left" className="btn btn-danger btn-simple btn-icon" onClick={() => this.setState({
            confirmDisableStatus: true,
            statusId: row.id
        })}>
                     Disable
                    </button>
                    if (!row.active){
                        status=<button type="button" rel="tooltip" data-placement="left" className="btn btn-primary btn-simple btn-icon" onClick={() => this.setState({
                            confirmActiveStatus: true,
                            statusId: row.id
                        })}>Enable
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
            fullName: this.state.updateData ? this.state.updateData.profile.fullName : '',
            email: this.state.updateData ? this.state.updateData.email : '',
            phone: this.state.updateData ? this.state.updateData.profile.phone : '',
            gender: this.state.updateData ? this.state.updateData.profile.gender : '',
            rfid: this.state.updateData ? this.state.updateData.rfid : '',
            avatar: this.state.updateData ? this.state.updateData.avatar : '',
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
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Search by email" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Librarian
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
                        dataField="email"
                        dataAlign="center"
                        width="15%"
                    >
                        Email

          </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="name"
                        dataAlign="center"
                        width="15%"
                        dataFormat={this.nameFormat}
                    >
                        Name
          </TableHeaderColumn>
                    <TableHeaderColumn dataField="gender" dataAlign="center" width="10%" dataFormat={this.genderFormat}>
                        Gender
          </TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataAlign="center" width="15%" dataFormat={this.phoneFormat}>
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
                <Modal size="lg" backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Librarian</Modal.Title>
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
                <Modal size="lg" backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Librarian</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StaffUpdateForm initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <CommonConfirmModal title="Disable Patron" show={this.state.confirmDisableStatus} hide={() => this.handleChangeStatusCancel()} clickConfirm={() => this.handleChangeStatusSubmit(false)} msg="Do you want to disable this librarian?" />
                <CommonConfirmModal title="Activate Patron" show={this.state.confirmActiveStatus} hide={() => this.handleChangeStatusCancel()} clickConfirm={() => this.handleChangeStatusSubmit(true)} msg="Do you want to activate this librarian?" />
                
            </div>
        )
        if (this.props.loading || this.state.imageLoading) {
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
        loading: state.staff.loading,
        data: state.staff.data,
        error: state.staff.error,
        totalSize: state.staff.total,
        page: state.staff.page,
        sizePerPage: state.staff.sizePerPage,
        deleteSuccess: state.staff.deleteSuccess,
        updateSuccess: state.staff.updateSuccess,
        addSuccess: state.staff.addSuccess,
        userid: state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getStaff(page, size, search)),
        onChangeStatusStaff: (id,status,updater) => dispatch(actions.changeStatusStaff(id,status,updater)),
        onUpdateStaff: (data) => dispatch(actions.updateStaff(data)),
        onAddStaff: (data) => dispatch(actions.addStaff(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)

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
import {Row, Col, Modal, Button } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import StudentHeader from '../../components/Headers/StudentHeader.js';
import DeleteButton from '../../components/Button/DeleteButton'
import BarcodeReader from 'react-barcode-reader'
import OverdueModal from '../../components/Modals/overdueModal'
import CheckoutConfirmForm from './checkoutConfirmForm'

import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
import StudentInfoCard from "./studentInfoCard";
import { submit } from 'redux-form'

class Checkout extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bookCodeList: [],
            showOverdue:false,
            bookSearchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            bookErrorShow: false,
            bookShow: false,
            errMsg: "",
            bookErrMsg: "",
            title: "SCAN PATRON'S CARD",
            checkoutAllow:true
        }
        this.fetchData = this.fetchData.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
        this.handleScan = this.handleScan.bind(this)
        this.showOverdue = this.showOverdue.bind(this)
    }
    
    componentDidUpdate() {
        let checkoutAllow=true
        this.props.bookData.forEach(el=>{
            if(el.violatePolicy){
                checkoutAllow=false
            }
        })
        if(this.state.checkoutAllow!=checkoutAllow){
            this.setState({
                checkoutAllow:checkoutAllow
            })
        }
        let msg = null
        if (this.props.checkoutSuccess) {
            msg = "Checkout successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, errMsg: this.props.error })
        }
        if (this.props.bookError != null && !this.state.bookErrorShow) {
            this.setState({ bookErrorShow: true, bookErrMsg: this.props.bookError })
        }
        if (this.props.studentData != null && this.props.overdueData != null && !this.state.bookShow) {
            this.setState({ bookShow: true, title: "SCAN CHECK OUT BOOKS" })
        }
    }
    componentDidMount() {
        this.clearData()
    }
    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }
    inputBookChangedHandler = (event) => {
        this.setState({ bookSearchValue: event.target.value })
    }
    handleSearch() {
        this.setState({
            successShow: false,
            errorShow: false
        })
        this.fetchData()
    }
    handleBookSearch() {
        this.setState({
            successShow: false,
            errorShow: false
        })
        this.fetchBookData()
    }
    fetchBookData() {
        this.props.onGetBook(this.state.bookSearchValue)
    }
    fetchData() {
        this.props.onFetchData(this.state.searchValue)
        this.props.onGetOverdue(this.state.searchValue)
    }
    handleDeleteBook(id, rfidcode) {
        let tmp = [...this.state.bookCodeList]
        var index = tmp.indexOf(rfidcode)
        if (index != -1) {
            tmp.splice(index, 1);
            this.setState({ bookCodeList: tmp });
        }
        this.props.onDeleteBook(id)
    }
    handleModalClose() {
        this.setState({
            searchValue: '',
            bookCodeList: [],
            successNotice: '',
            successShow: false,
            errorShow: false,
            bookErrorShow: false,
            bookShow: false,
            errMsg: "",
            bookErrMsg: "",
            title: "SCAN PATRON'S CARD"
        })
        this.props.onClearData()
    }
    clearData() {
        this.props.onClearData()
    }
    clearBookError() {
        this.props.onClearBookError()
        this.setState({ bookErrorShow: false, bookErrMsg: "" })
    }
    handleConfirmCancel(){
        this.props.onCancelConfirm()
    }
    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.profile.fullName : '',
            id: this.props.studentData ? this.props.studentData.id : '',
            email: this.props.studentData ? this.props.studentData.email : '',
            img: this.props.studentData ? this.props.studentData.avatar : '',
        };
    }
    showOverdue(){
        this.setState({showOverdue:true})
    }
    bookDescriptionFormat(cell, row) {
        let msg=""
        if(row.violatePolicy){
            msg=row.reasons.join(", ")
        }
        return (
            <div>
                {msg!="" &&<h3 className="text-danger">{msg.toUpperCase()}</h3>}
                <a href="https://www.google.com"><h2 className="font-weight-bolder">{row.copy.title}{row.copy.subtitle?":" +" "+row.copy.subtitle:""}</h2></a>
                <p>by <span className="font-weight-bold">{row.copy.authors}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.copy.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.copy.barcode}</p>
                <p><span className="font-weight-bold">Genre(s):</span> {row.copy.genres}</p>
                <p><span className="font-weight-bold">ISBN:</span> {row.copy.isbn}</p>
                <p><span className="font-weight-bold">Overdue at:</span> {row.dueAt}</p>
            </div>
            )
    }
    imageFormatter(cell, row){
        return (<img className="img-thumbnail" src={row.copy.img}/>)
    }
    handleScan(data) {
        if (this.props.studentData != null) {
            if (!(this.state.bookCodeList.includes(data.trim()) || data.trim().length!=24)) {
                this.setState({
                    successShow: false,
                    errorShow: false,
                    bookCodeList: [...this.state.bookCodeList, data.trim()]
                })
                this.props.onGetBook(data.trim(),this.props.studentData.id)
            }
        } else if(data.trim().toUpperCase().includes("PAT#")) {
            this.setState({
                successShow: false,
                errorShow: false
            })
            this.props.onFetchData(data.trim().toUpperCase().split("PAT#")[1])
        }
    }

    checkout(values=null) {
        let studentid = this.props.studentData.id
        let booklist = []
        let reason=null
        if(values){
            reason=values.reason
        }
        this.props.bookData.forEach(book => {
            booklist.push(book.copy.rfid)
        });
        this.props.onCheckout(studentid, booklist,reason,this.props.userid,this.props.studentData.email)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <DeleteButton clicked={() => this.handleDeleteBook(row.copy.id, row.copy.rfid)} />
            </div>
        )
    }
    
    render() {
        const options = {
            sizePerPage: 5,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };
        let studentDisplay = null
        let overdueDisplay = null
        if (this.props.studentLoading) {
            studentDisplay = <Spinner />
        }
        if (this.props.studentData != null && this.props.overdueData != null) {

            studentDisplay = <Container className="mt-7 mt-md-3" fluid>
                <Card className="shadow w-100">
                    <Row>
                        <Col className="col-4">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Patron information</h3>
                            </CardHeader>
                        </Col>
                        <Col className="col-12">
                            <StudentInfoCard student={this.getInitialValues()} overdue={this.props.overdueData} showOverdue={this.showOverdue}/>
                        </Col>
                    </Row>
                </Card>
            </Container>


            overdueDisplay =<OverdueModal data={this.props.overdueData} title="Overdue book(s)" show={this.state.showOverdue} hide={()=>this.setState({showOverdue:false})}/>
        }
        let bookDisplay = null
        if (this.state.bookShow == true) {
            bookDisplay =
                <Container className="mt-4" fluid>
                    <Card className="shadow w-100">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Checking out book(s)</h3>
                        </CardHeader>
                        <Row>
                            <Col className="col-12 mb-3 pr-4 pull-right">
                                <button disabled={!(this.state.checkoutAllow && this.props.bookData.length>0)} onClick={() => this.props.onCheckPolicy(this.props.bookData,this.props.studentData.id,this.props.userid)}
                                    type="button" className="btn btn-info btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Check out
                        </button>
                                <button onClick={() => this.handleModalClose()}
                                    type="button" className="btn btn-info btn-fill float-right mr-3" >
                                    <span className="btn-label">Clear
                            </span>
                                </button>
                            </Col>
                        </Row>
                    </Card>
                    <BootstrapTable
                    data={this.props.bookData}
                    options={options}
                    pagination
                    remote
                    striped
                    hover
                    condensed
                    className="mt-3"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="copy"
                >
                    <TableHeaderColumn dataField="img"  dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="60%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="action" width="20%" headerAlign="center" dataFormat={this.activeFormatter}>Action</TableHeaderColumn>
                </BootstrapTable>
                </Container>
        }
        let reasonConfirm = null
        let submitFunction=()=>this.checkout()
        if(this.props.warning!=null){
            submitFunction=()=>this.props.onSubmitConfirmForm()
            reasonConfirm=( <Row className="w-100">
            <CheckoutConfirmForm onSubmit={(values)=>this.checkout(values)}/>
            </Row>)
        }
        return (
            <>
                <StudentHeader title={this.state.title} />
                <BarcodeReader
                    onScan={this.handleScan}
                    onError={(e) => console.log(e)}
                />
                {studentDisplay}
                {overdueDisplay}
                {bookDisplay}
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
                        <Modal.Title>Student Error</Modal.Title>
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
                <Modal show={this.state.bookErrorShow} onHide={() => this.clearBookError()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="bg-danger">
                        <Modal.Title>Book Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1 className="text-danger display-1"><i className="fas fa-times-circle"></i></h1>
                        <h2>{this.state.bookErrMsg}</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.clearBookError()}>
                            Close
                                </Button>
                    </Modal.Footer>
                </Modal>
                <Modal size="lg" show={this.props.confirmSuccess} onHide={() => this.handleConfirmCancel()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                    <h2 className="text-warning">{this.props.warning}</h2>
                    <BootstrapTable
                        data={this.props.bookData}
                        options={options}
                        pagination
                        striped
                        hover
                        condensed
                        className="mt-3"
                        bordered={false}
                        tableHeaderClass={"col-hidden"}
                        keyField="copy"
                    >
                    <TableHeaderColumn dataField="img"  dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="60%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                </BootstrapTable>
                       {reasonConfirm}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleConfirmCancel()}>
                            Close
                                </Button>
                                <Button variant="success" onClick={submitFunction}>
                            Confirm
                                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        studentLoading: state.checkout.studentLoading,
        studentData: state.checkout.studentData,
        overdueData: state.checkout.overdueData,
        bookData: state.checkout.bookData,
        bookLoading: state.checkout.bookLoading,
        error: state.checkout.error,
        bookError: state.checkout.bookError,
        checkoutSuccess: state.checkout.checkoutSuccess,
        warning: state.checkout.warning,
        confirmSuccess: state.checkout.confirmSuccess,
        userid:state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (search) => dispatch(actions.getStudent(search)),
        onGetBook: (search,id) => dispatch(actions.getStudentBook(search,id)),
        onCheckout: (studentid, booklist,reason,libid,mail) => dispatch(actions.checkout(studentid, booklist,reason,libid,mail)),
        onClearData: () => dispatch(actions.clearData()),
        onDeleteBook: (id) => dispatch(actions.deleteCheckoutBook(id)),
        onClearBookError: () => dispatch(actions.clearBookError()),
        onCheckPolicy: (data,patronid,libid) => dispatch(actions.checkPolicy(data,patronid,libid)),
        onCancelConfirm:()=>dispatch(actions.cancelConfirm()),
        onSubmitConfirmForm:() => dispatch(submit("CheckoutConfirmForm"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

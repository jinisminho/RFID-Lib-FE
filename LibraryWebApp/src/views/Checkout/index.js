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
import { Row, Col, Modal, Button, FormControl, InputGroup, Toast } from 'react-bootstrap'
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
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bookCodeList: [],
            showOverdue: false,
            bookSearchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            bookErrorShow: false,
            bookShow: false,
            errMsg: "",
            bookErrMsg: "",
            title: "SCAN PATRON'S CARD",
            searchValue: "",
            checkSearch: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
        this.handleScan = this.handleScan.bind(this)
        this.showOverdue = this.showOverdue.bind(this)
    }

    componentDidUpdate() {
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
        if (!this.state.searchValue || this.state.searchValue.trim() == "") {
            this.setState({ checkSearch: true })
        } else {
            this.setState({ checkSearch: false })
            this.fetchData()
        }
    }
    handleBookSearch() {
        if (!(this.state.bookCodeList.includes(this.state.bookSearchValue.trim()))) {
            this.setState({
                successShow: false,
                errorShow: false,
                bookCodeList: [...this.state.bookCodeList, this.state.bookSearchValue.trim()]
            })
            this.fetchBookData()
        }
    }
    fetchBookData() {
        this.props.onGetBook(this.state.bookSearchValue.trim(), this.props.studentData.id)
    }
    fetchData() {
        this.props.onFetchData(this.state.searchValue)
    }
    handleDeleteBook(id, rfidcode, barcode) {
        let tmp = [...this.state.bookCodeList]
        var indexRfid = tmp.indexOf(rfidcode)
        if (indexRfid != -1) {
            tmp.splice(indexRfid, 1);
        }
        var indexBarcode = tmp.indexOf(barcode)
        if (indexBarcode != -1) {
            tmp.splice(indexBarcode, 1);
        }
        this.setState({ bookCodeList: tmp });
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
    handleConfirmCancel() {
        this.props.onCancelConfirm()
    }
    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.profile.fullName : '',
            id: this.props.studentData ? this.props.studentData.id : '',
            email: this.props.studentData ? this.props.studentData.email : '',
            patronType: this.props.studentData ? this.props.studentData.patronType.name : '',
            img: this.props.studentData ? this.props.studentData.avatar : '',
        };
    }
    showOverdue() {
        this.setState({ showOverdue: true })
    }
    bookDescriptionFormat(cell, row) {
        let msg = ""
        if (row.violatePolicy) {
            msg = row.reasons.join(", ")
        }
        return (
            <div>
                <h2 className="font-weight-bolder">{row.copy.title}{row.copy.subtitle ? ":" + " " + row.copy.subtitle : ""}</h2>
                {/* <p>by <span className="font-weight-bold">{row.copy.authors}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.copy.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.copy.barcode}</p>
                <p><span className="font-weight-bold">Book Type:</span> {row.copy.copyType}</p>
                <p><span className="font-weight-bold">ISBN:</span> {row.copy.isbn}</p>
                <p><span className="font-weight-bold">Overdue at:</span> {row.dueAt}</p> */}
            </div>
        )
    }
    bookErrorDescriptionFormat(cell, row) {
        let msg = ""
        if (row.violatePolicy) {
            msg = row.reasons.join(", ")
        }
        return (
            <div>
                {msg != "" && <h5 className="text-danger">{msg.toUpperCase()}</h5>}
                <h4 className="font-weight-bolder">{row.copy.title}{row.copy.subtitle ? ":" + " " + row.copy.subtitle : ""}</h4>
                {/* <p>by <span className="font-weight-bold">{row.copy.authors}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.copy.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.copy.barcode}</p>
                <p><span className="font-weight-bold">Book Type:</span> {row.copy.copyType}</p>
                <p><span className="font-weight-bold">ISBN:</span> {row.copy.isbn}</p>
                <p><span className="font-weight-bold">Overdue at:</span> {row.dueAt}</p> */}
            </div>
        )
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.copy.img} onError={(e) => e.target.src = require("assets/img/theme/no-image.png")}/>)
    }
    handleScan(data) {
        if (this.props.studentData != null) {
            if (!(this.state.bookCodeList.includes(data.trim()) || data.trim().length != 24)) {
                this.setState({
                    successShow: false,
                    errorShow: false,
                    bookCodeList: [...this.state.bookCodeList, data.trim().toUpperCase()]
                })
                this.props.onGetBook(data.trim().toUpperCase(), this.props.studentData.id)
            }
        } else if (data.trim().toUpperCase().includes("PAT#")) {
            this.setState({
                successShow: false,
                errorShow: false
            })
            this.props.onFetchData(data.trim().toUpperCase().split("PAT#")[1])
        }
    }

    checkout(values = null) {
        let studentid = this.props.studentData.id
        let booklist = []
        let reason = null
        if (values) {
            reason = values.reason
        }
        this.props.validBook.forEach(book => {
            booklist.push(book.copy.rfid)
        });
        this.props.onCheckout(studentid, booklist, reason, this.props.userid, this.props.studentData.email)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <DeleteButton clicked={() => this.handleDeleteBook(row.copy.id, row.copy.rfid, row.copy.barcode)} />
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
        let form = null
        if (this.props.studentData == null) {
            form = <InputGroup className="mb-3">
                <FormControl className={this.state.checkSearch ? "border border-danger" : ""} value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Search by patron's email" />
                <InputGroup.Append>
                    <button onClick={() => this.handleSearch()} className="btn btn-primary"><span><i className="fa fa-search"></i></span></button>
                </InputGroup.Append>
            </InputGroup>
        }

        if (this.props.studentData != null && this.props.overdueData != null) {
            form = null
            studentDisplay = <Container className="mt-7 mt-md-3" fluid>
                <Row>
                    <Col className="col-12">
                        <Card className="shadow w-100">
                            <Row>
                                <Col className="col-12">
                                    <CardHeader className="border-0">
                                        <h3 className="mb-0">Patron information</h3>
                                    </CardHeader>
                                </Col>
                                <Col className="col-12">
                                    <StudentInfoCard student={this.getInitialValues()} overdue={this.props.overdueData} showOverdue={this.showOverdue} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    {/* <Col className="col-8">
                        <Card className="shadow w-100">
                            <Row>
                                <Col className="col-12">
                                    <CardHeader className="border-0">
                                        <h3 className="mb-0">Invalid Book(s)</h3>
                                    </CardHeader>
                                </Col>
                                <Col className="col-12">
                                    <BootstrapTable
                                        data={this.props.invalidBook}
                                        options={options}
                                        pagination
                                        striped
                                        hover
                                        condensed
                                        bordered={false}
                                        // tableHeaderClass={"col-hidden"}
                                        keyField="copy"
                                    >
                                        <TableHeaderColumn dataField="img" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.imageFormatter} width="10%">Image</TableHeaderColumn>
                                        <TableHeaderColumn dataField="title" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" width="75%" headerAlign="center" dataFormat={this.bookErrorDescriptionFormat}>Title</TableHeaderColumn>
                                        <TableHeaderColumn dataField="type" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="15%" headerAlign="center" dataFormat={(cell, row) => row.copy.copyType}>Book Copy Type</TableHeaderColumn>
                                    </BootstrapTable>
                                </Col>
                            </Row>
                        </Card>
                    </Col> */}
                </Row>
            </Container>


            overdueDisplay = <OverdueModal data={this.props.overdueData} title="Overdue book(s)" show={this.state.showOverdue} hide={() => this.setState({ showOverdue: false })} />
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
                            <Col className="col-4 pl-4">
                                <InputGroup className="mb-3">
                                    <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Search book by barcode" />
                                    <InputGroup.Append>
                                        <button onClick={() => this.handleBookSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col className="col-8 mb-3 pr-4 pull-right">
                                <button disabled={this.props.validBook.length == 0} onClick={() => this.props.onCheckPolicy(this.props.validBook, this.props.studentData.id, this.props.userid)}
                                    type="button" className="btn btn-primary btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Check out
                        </button>
                                <button onClick={() => this.handleModalClose()}
                                    type="button" className="btn btn-primary btn-fill float-right mr-3" >
                                    <span className="btn-label">Clear
                            </span>
                                </button>
                            </Col>
                        </Row>
                    </Card>
                    <BootstrapTable
                        data={this.props.validBook}
                        options={options}
                        pagination
                        striped
                        hover
                        condensed
                        className="mt-3"
                        // bordered={false}
                        // tableHeaderClass={"col-hidden"}
                        keyField="copy"
                    >
                        <TableHeaderColumn dataField="img" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.imageFormatter} width="7%">Image</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" width="45%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="author" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="15%" headerAlign="center" dataFormat={(cell, row) => row.copy.authors}>Author</TableHeaderColumn>
                        <TableHeaderColumn dataField="type" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="10%" headerAlign="center" dataFormat={(cell, row) => row.copy.copyType}>Book Copy Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="dueAt" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="13%" headerAlign="center">Due At</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="10%" headerAlign="center" dataFormat={this.activeFormatter}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
        }
        let reasonConfirm = null
        let submitFunction = () => this.checkout()
        let warning = null
        if (this.props.warning != null) {
            submitFunction = () => this.props.onSubmitConfirmForm()
            reasonConfirm = (<Row className="w-100">
                <CheckoutConfirmForm onSubmit={(values) => this.checkout(values)} />
            </Row>)
            let tmp = this.props.warning.map((el,index)=>(<li key={index}>{el}</li>))
            warning=(
                <>
                    <h3 className="text-warning">Warning:</h3>
                    <ul>
                    {tmp}
                    </ul>
                </>
            )
        }
        let toast = this.props.invalidBook.map((el, index) => {
            let msg = ""
            if (el.violatePolicy) {
                msg = el.reasons.join(", ")
            }
            return (
                <Toast key={index} style={{ boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",maxWidth:"500px", borderRadius:"10px"}} onClose={() => this.props.onCloseToast(el.copy.id)} >
                    <Toast.Header className="p-2 border-bottom border-secondary" style={{backgroundColor:"rgb(255,86,48)"}}>
                    <strong className="mr-auto">{el.copy.title}: {el.copy.subtitle}</strong>
                    </Toast.Header>
                    <Toast.Body className="p-2" style={{backgroundColor:"rgb(255,235,230)", color:"rgb(227,148,129)"}}>
                        {msg}
                    </Toast.Body>
                </Toast>)
        })

        return (
            <>
                <StudentHeader title={this.state.title} />
                {form}
                <BarcodeReader
                    onScan={this.handleScan}
                    onError={(e) => console.log(e)}
                />
                {
                    this.props.invalidBook.length>0?
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        position: 'absolute',
                        minHeight: '200px',
                        minWidth:'400px',
                        zIndex: '5000',
                        top:0,
                        right:0
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        {toast}
                    </div>
                </div>:null
                }
                {studentDisplay}
                {overdueDisplay}
                {bookDisplay}
                
                <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.state.errMsg} />
                <CommonErrorModal show={this.state.bookErrorShow} hide={() => this.clearBookError()} msg={this.state.bookErrMsg} />
                <Modal size="lg" show={this.props.confirmSuccess} onHide={() => this.handleConfirmCancel()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BootstrapTable
                            data={this.props.validBook}
                            options={options}
                            pagination
                            striped
                            hover
                            condensed
                            className="mt-3"
                            // bordered={false}
                            // tableHeaderClass={"col-hidden"}
                            keyField="copy"
                        >
                            <TableHeaderColumn dataField="img" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.imageFormatter} width="10%">Image</TableHeaderColumn>
                            <TableHeaderColumn dataField="title" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" width="40%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Title</TableHeaderColumn>
                            <TableHeaderColumn dataField="author" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="20%" headerAlign="center" dataFormat={(cell, row) => row.copy.authors}>Author</TableHeaderColumn>
                            <TableHeaderColumn dataField="type" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="15%" headerAlign="center" dataFormat={(cell, row) => row.copy.copyType}>Book Copy Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="dueAt" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="13%" headerAlign="center">Due At</TableHeaderColumn>
                        </BootstrapTable>
                        {reasonConfirm}
                        <div style={{maxHeight:"200px", overflowY:"scroll"}}>
                            {warning}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.warning?<span className="text-danger">* Required field</span>:null}
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
        validBook: state.checkout.validBook,
        invalidBook: state.checkout.invalidBook,
        bookLoading: state.checkout.bookLoading,
        error: state.checkout.error,
        bookError: state.checkout.bookError,
        checkoutSuccess: state.checkout.checkoutSuccess,
        warning: state.checkout.warning,
        confirmSuccess: state.checkout.confirmSuccess,
        userid: state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (search) => dispatch(actions.getStudent(search)),
        onGetBook: (search, id) => dispatch(actions.getStudentBook(search, id)),
        onCheckout: (studentid, booklist, reason, libid, mail) => dispatch(actions.checkout(studentid, booklist, reason, libid, mail)),
        onClearData: () => dispatch(actions.clearData()),
        onDeleteBook: (id) => dispatch(actions.deleteCheckoutBook(id)),
        onClearBookError: () => dispatch(actions.clearBookError()),
        onCheckPolicy: (data, patronid, libid) => dispatch(actions.checkPolicy(data, patronid, libid)),
        onCancelConfirm: () => dispatch(actions.cancelConfirm()),
        onSubmitConfirmForm: () => dispatch(submit("CheckoutConfirmForm")),
        onCloseToast: (id) => dispatch(actions.closeToast(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

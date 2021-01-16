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
import StudentHeader from '../../components/Headers/StudentHeader.js';
import DeleteButton from '../../components/Button/DeleteButton'
import {
    Card,
    CardHeader,
    CardFooter,
    Container
} from "reactstrap";
import StudentInfoCard from "./studentInfoCard";
class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            bookSearchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            bookShow:false,
            errMsg:"",
       
        }
        this.fetchData = this.fetchData.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this)
    }
    componentDidUpdate() {
        let msg=null
        if (this.props.checkoutSuccess) {
            msg = "Checkout successfully"
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
            this.setState({ errorShow: true,errMsg:errMsg })
        }
        if(this.props.studentData != null && this.props.overdueData != null && !this.state.bookShow){
            this.setState({ bookShow:true})
        }
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
    fetchBookData(){
        this.props.onGetBook(this.state.bookSearchValue)
    }
    fetchData(){
        this.props.onFetchData(this.state.searchValue)
        this.props.onGetOverdue(this.state.searchValue)
    }

    handleModalClose() {
        this.setState({ searchValue: '',
        bookSearchValue: '',
        successNotice: '',
        successShow: false,
        errorShow: false,
        bookShow:false,
        errMsg:""})
        this.props.onClearData()
    }
    clearData(){
        this.props.onClearData()
    }
    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.name : '',
            id: this.props.studentData ? this.props.studentData.id : '',
            img: this.props.studentData ? this.props.studentData.img : '',
            department:  this.props.studentData ? this.props.studentData.department : '',
            username:  this.props.studentData ? this.props.studentData.username : '',
        };
    }
    checkout(){
        let studentid=this.props.studentData.id
        let booklist= []
        this.props.bookData.forEach(book => {
            booklist.push(book.id)
        });
        this.props.oncCheckout(studentid,booklist)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <DeleteButton clicked={() => this.props.onDeleteBook(row.id)}/>   
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
            hideSizePerPage: false,
        };
        let studentDisplay = null
        let overdueDisplay = null
        if (this.props.studentLoading) {
            studentDisplay = <Spinner />
        }
        if(this.props.studentData != null && this.props.overdueData !=null){
                        
            studentDisplay= <StudentInfoCard  student={this.getInitialValues()}/>
                
                
            overdueDisplay=
            <Container className="mt-4" fluid>
            <Card className="shadow w-100">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Overdue Book</h3>
                    </CardHeader>
                    <BootstrapTable
                    data={this.props.overdueData}
                    options={options}
                    striped
                    hover
                    condensed
                    className="mt-3"
                >
                    <TableHeaderColumn dataField="barcode" width="15%" isKey dataAlign="center">Bar Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn" width="15%"  dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="30%" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateLent" width="20%" dataAlign="center">Lent Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="dateDue" dataAlign="center" width="20%">Overdue Date</TableHeaderColumn>
                </BootstrapTable>
            </Card>
            
            </Container>
        }
        let bookDisplay=null
        
        if(this.state.bookShow==true){
            bookDisplay= 
        <Container className="mt-4" fluid>
                <Card className="shadow w-100">
                     <CardHeader className="border-0">
                        <h3 className="mb-0">Checking out books</h3>
                    </CardHeader>
                    <Row>
                    <Col className="col-4 pl-4">
                    <InputGroup className="mb-3">
                        <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Scanning book to get book's code" />
                        <InputGroup.Append>
                            <button onClick={() => this.handleBookSearch()} className="btn btn-simple">Search</button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.checkout()}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            </span> Check out
                        </button>
                    </Col>
                    </Row>
                </Card>
            <BootstrapTable
                    data={this.props.bookData}
                    options={options}
                    remote
                    striped
                    hover
                    condensed
                    className="mt-3"
                >
                    <TableHeaderColumn dataField="barcode" width="10%" isKey dataAlign="center">Bar Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn" width="10%"  dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="10%" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" width="10%" dataAlign="center">Author</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="10%">Category</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="15%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
            
        </Container>
        }
        return (
            <>
            <StudentHeader/>
                <Container className="mt--7" fluid>
                    <Card className="shadow w-100">
                        <Row>
                        <Col className="col-4">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Student information</h3>
                            </CardHeader>
                            <InputGroup className="mb-3 col-12">
                                <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Student number" />
                                <InputGroup.Append>
                                    <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col className="col-8">
                           {studentDisplay}
                        </Col>
                        </Row>
                    </Card>
            </Container>
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
        checkoutSuccess:state.checkout.checkoutSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (search) => dispatch(actions.getStudent(search)),
        onGetBook: (search) => dispatch(actions.getStudentBook(search)),
        oncCheckout:(studentid,booklist) => dispatch(actions.checkout(studentid,booklist)),
        onClearData:()=>dispatch(actions.clearData()),
        onDeleteBook:(id)=>dispatch(actions.deleteCheckoutBook(id)),
        onGetOverdue:(search)=>dispatch(actions.getOverdue(search))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

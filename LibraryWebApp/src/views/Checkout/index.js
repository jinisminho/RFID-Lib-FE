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
// import CopyForm from './copyForm'
import {
    Card,
    CardHeader,
    CardFooter,
    Container
} from "reactstrap";
import StudentForm from "./studentForm";
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
    }
   
    componentDidUpdate() {
        let msg=null
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
        if(this.props.studentData != null && !this.state.bookShow){
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
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
    }
    
    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.name : '',
            id:this.props.studentData ? this.props.studentData.id : ''
        };
    }
    render() {
        let studentDisplay = null
        if (this.props.studentLoading) {
            studentDisplay = <Spinner />
        }
        if(this.props.studentData != null){
            studentDisplay= <StudentForm  initialValues={this.getInitialValues()}/>
        }
        let bookDisplay=null
        if(this.state.bookShow==true){
            bookDisplay=<Card className="shadow col-6">
            <CardHeader className="border-0">
                <h3 className="mb-0">List of books</h3>
            </CardHeader>
            <InputGroup className="mb-3">
                            <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Student number" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleBookSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
            </InputGroup>
        </Card>
        }
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row>

                    <Card className="shadow col-5 mr-5 ml-3">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Student information</h3>
                        </CardHeader>
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Student number" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                        {studentDisplay}
                    </Card>
                    {bookDisplay}
                    </Row>

                </Container>
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
        bookData: state.checkout.bookData,
        bookLoading: state.checkout.bookLoading,
        error: state.checkout.error,
        bookError: state.copy.bookError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (search) => dispatch(actions.getStudent(search)),
        onGetBook: () => dispatch(actions.getStudentBook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

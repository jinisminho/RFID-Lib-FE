
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Navbar, FormGroup, FormControl, InputGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import StudentHeader from '../../components/Headers/StudentHeader.js';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    CardHeader,
    CardFooter,
    Container
} from "reactstrap";
import StudentInfoCard from './studentInfoCard'
import Books from './returningBooks'


class ReturnBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookSearchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            errMsg:'',
            bookList: [],
        }
    }
    componentDidMount(){
        this.clearBookData()
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
    clearBookData(){
        this.props.onClearBook()
        this.setState({
            bookSearchValue:""
        })
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
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


    render(){

        const options = {
            sizePerPage: 5,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: false,
        };
        
    
        return(
        <>
            <StudentHeader />
            <Container className="mt--7" fluid>
                <Card className="shadow w-100">
                     <CardHeader className="border-0">
                        <h3 className="mb-0">Returning books</h3>
                    </CardHeader>
                    <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4"> 
                    <InputGroup className="mb-3">
                        <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Scanning book to get book's code" />
                        <InputGroup.Append>
                            <button onClick={() => this.handleBookSearch()} className="btn btn-simple">RETURN</button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.clearBookData()}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            </span> Clear
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
                    <TableHeaderColumn dataField="barcode" width="15%" isKey dataAlign="center">Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField="isbn" width="15%"  dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="15%" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="15%">Category</TableHeaderColumn>
                    <TableHeaderColumn dataField="studentid" dataAlign="center" width="15%">Student ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="studentname" dataAlign="center" width="15%">Student Name</TableHeaderColumn>
                </BootstrapTable>
            
        </Container>
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookData: state.returnBook.bookData,
        bookLoading: state.returnBook.bookLoading,
        error: state.returnBook.error,
        bookError: state.returnBook.bookError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetBook: (search) => dispatch(actions.getReturningBook(search)),
        onClearBook: () => dispatch(actions.clearBook())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReturnBook)



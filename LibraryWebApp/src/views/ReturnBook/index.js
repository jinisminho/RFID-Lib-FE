
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
import BarcodeReader from 'react-barcode-reader'


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
            bookCodeList:[]
        }
        this.handleScan = this.handleScan.bind(this)
    }
    componentDidMount(){
        this.clearBookData()
    }
    componentDidUpdate() {
        if (this.props.bookError != null && !this.state.errorShow) {
            this.setState({ errorShow: true,errMsg:this.props.bookError })
        }
    }

  
    clearBookData(){
        this.props.onClearBook()
        this.setState({
            bookSearchValue:"",
            bookCodeList:[]
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
    handleScan(data){
        if(!this.state.bookCodeList.includes(data.trim())){
            this.setState({
                successShow: false,
                errorShow: false,
                bookCodeList:[...this.state.bookCodeList,data.trim()]
            })
            this.props.onGetBook(data.trim())
        }
      }
      clearReturnBookError() {
        this.props.onClearReturnBookError()
        this.setState({ errorShow: false, errMsg: "" })
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
            <StudentHeader title="SCAN BOOK TO RETURN"/>
            <BarcodeReader
                    onScan={this.handleScan}
                    onError={(e) => console.log(e)}
                />
            <Container className="mt--7" fluid>
                <Card className="shadow w-100">
                     <CardHeader className="border-0">
                        <h3 className="mb-0">Returning books</h3>
                    </CardHeader>
                    <Row className="w-100 m-0 p-0">
                    <Col className="col-12 mb-3 pr-4 pull-right">
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
        <Modal show={this.state.errorShow} onHide={() => this.clearReturnBookError()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="bg-danger">
                        <Modal.Title>Book Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1 className="text-danger display-1"><i className="fas fa-times-circle"></i></h1>
                        <h2>{this.state.errMsg}</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.clearReturnBookError()}>
                            Close
                                </Button>
                    </Modal.Footer>
                </Modal>
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookData: state.returnBook.bookData,
        bookLoading: state.returnBook.bookLoading,
        bookError: state.returnBook.bookError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetBook: (search) => dispatch(actions.getReturningBook(search)),
        onClearBook: () => dispatch(actions.clearBook()),
        onClearReturnBookError: () => dispatch(actions.clearReturnBookError())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReturnBook)



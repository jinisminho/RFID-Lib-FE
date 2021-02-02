
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Row, Col, Modal, Button } from 'react-bootstrap'
import StudentHeader from '../../components/Headers/StudentHeader.js';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
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
    imageFormatter(cell, row){
        return (<img className="img-thumbnail" src={cell}/>)
    }
    bookDescriptionFormat(cell, row) {
        let author=row.author.join(", ")
        let genre=row.genres.join(", ")
        return (
            <>
                <a href="https://www.google.com"><h2 className="font-weight-bolder">{row.title}{row.sub?":" +" "+row.sub:""}</h2></a>
                <p>by <span className="font-weight-bold">{author}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.barcode}</p>
                <p><span className="font-weight-bold">Genre(s):</span> {genre}</p>
            </>
            )
    }
    returnDescriptionFormat(cell, row) {
        return (
            <>
                <p><span className="font-weight-bold">Borrower:</span> {row.borrower}</p>
                <p><span className="font-weight-bold">Return At:</span> {row.returnat}</p>
                <p><span className="font-weight-bold">Due Date:</span> {row.duedate}</p>
                <p><span className="font-weight-bold">Overdue Day(s):</span> {row.overdue}</p>
                <p><span className="font-weight-bold">Fine:</span> {row.fine} VND</p>
            </>
            )
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
            <Container className="mt-3" fluid>
                <Card className="shadow w-100">
                    <Row className="w-100 mt-3 p-0">
                    <Col className="col-8 mb-3 pl-4">
                        <p><span className="font-weight-bold">Retuned book(s):</span> {this.props.bookData.length}</p>
                    </Col>
                    <Col className="col-4 mb-3 pr-4 pull-right">
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
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="id"
                >
                    <TableHeaderColumn dataField="img"  dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="bookinfo" width="40%"  dataFormat={this.bookDescriptionFormat}>Book Info</TableHeaderColumn>
                    <TableHeaderColumn dataField='returninfo'width="40%" dataFormat={this.returnDescriptionFormat} >Return Info</TableHeaderColumn>
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



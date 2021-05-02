
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Modal, Button,InputGroup,FormControl } from 'react-bootstrap'
import StudentHeader from '../../components/Headers/StudentHeader.js';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import BarcodeReader from 'react-barcode-reader'
import DeleteButton from '../../components/Button/DeleteButton'
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import CommonConfirmModal from "components/Modals/CommonConfirmModal"

class ReturnBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookSearchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            errMsg: '',
            bookList: [],
            bookCodeList: [],
            confirmShow: false,
            bookSearchValue:""
        }
        this.handleScan = this.handleScan.bind(this)
        this.activeFormatter = this.activeFormatter.bind(this)
    }
    componentDidMount() {
        this.clearBookData()
    }
    componentDidUpdate() {
        if (this.props.bookError != null && !this.state.errorShow) {
            this.setState({ errorShow: true, errMsg: this.props.bookError })
        }
        let msg = null
        if (this.props.returnSuccess) {
            msg = "Return book successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
    }

    inputBookChangedHandler = (event) => {
        this.setState({ bookSearchValue: event.target.value })
    }
    clearBookData() {
        this.props.onClearBook()
        this.setState({
            bookSearchValue: "",
            bookCodeList: []
        })
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        this.clearBookData()
    }
    handleReturnConfirm() {
        this.setState({ confirmShow: false, errorShow: false })
        this.props.onReturnBook(this.props.bookData,this.props.userid)
    }
    handleDeleteBook(id, rfidcode,barcode) {
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
    activeFormatter(cell, row) {
        return (
            <div>
                <DeleteButton clicked={() => this.handleDeleteBook(row.id, row.rfid,row.barcode)} />
            </div>
        )
    }
    getInitialValues = () => {
        return {
            name: this.props.studentData ? this.props.studentData.name : '',
            id: this.props.studentData ? this.props.studentData.id : '',
            img: this.props.studentData ? this.props.studentData.img : '',
            department: this.props.studentData ? this.props.studentData.department : '',
            username: this.props.studentData ? this.props.studentData.username : '',
        };
    }
    handleScan(data) {
        if (!(this.state.bookCodeList.includes(data.trim()) || data.trim().length != 24)) {
            this.setState({
                successShow: false,
                errorShow: false,
                bookCodeList: [...this.state.bookCodeList, data.trim().toUpperCase()]
            })
            this.props.onGetBook(data.trim().toUpperCase())
        }
    }
    handleSearch(){
        if (!this.state.bookCodeList.includes(this.state.bookSearchValue.trim())) {
            this.setState({
                successShow: false,
                errorShow: false,
                bookCodeList: [...this.state.bookCodeList, this.state.bookSearchValue.trim()]
            })
            this.props.onGetBook(this.state.bookSearchValue.trim())
        }
    }
    clearReturnBookError() {
        this.props.onClearReturnBookError()
        this.setState({ errorShow: false, errMsg: "" })
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.book.img} />)
    }
    bookDescriptionFormat(cell, row) {
        return (
            <>
                <a><h2 className="font-weight-bolder">{row.book.title}{row.book.subtitle ? ":" + " " + row.book.subtitle : ""}</h2></a>
                {/* <p>by <span className="font-weight-bold">{row.book.authors}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.book.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.barcode}</p> */}
                {/* <p><span className="font-weight-bold">Genre(s):</span> {row.book.genres}</p> */}
            </>
        )
    }
    returnDescriptionFormat(cell, row) {
        return (
            <>
                <p><span className="font-weight-bold">Borrower:</span> {row.borrower.profile.fullName}</p>
                {/* <p><span className="font-weight-bold">Return At:</span> {row.returnat}</p> */}
                <p><span className="font-weight-bold">Due Date:</span> {row.dueDate}</p>
                <p><span className="font-weight-bold">Overdue Day(s):</span> {row.overdue ? row.overdueDays : 0}</p>
                <p><span className="font-weight-bold">Fine:</span> {row.fine} VND</p>
            </>
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
        let display = <BootstrapTable
            data={this.props.bookData}
            options={options}
            striped
            hover
            pagination
            condensed
            className="mt-3"
            // tableHeaderClass={"col-hidden"}
            keyField="id"
        >
            <TableHeaderColumn dataField="img" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.imageFormatter} width="7%">Image</TableHeaderColumn>
            <TableHeaderColumn dataField="title" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" width="35%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Title</TableHeaderColumn>
            <TableHeaderColumn dataField="borrower" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="20%" headerAlign="center" dataFormat={(cell,row)=> row.borrower.profile.fullName}>Borrower</TableHeaderColumn>
            <TableHeaderColumn dataField="overdueDay" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="10%" headerAlign="center" dataFormat={(cell,row)=> row.overdue ? row.overdueDays : 0}>Overdue Day(s)</TableHeaderColumn>
            <TableHeaderColumn dataField="fine" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataAlign="center" width="15%" headerAlign="center">Fine (VND)</TableHeaderColumn>
            {/* <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
            <TableHeaderColumn dataField="bookinfo" width="60%" dataFormat={this.bookDescriptionFormat}>Book Info</TableHeaderColumn>
            <TableHeaderColumn dataField='returninfo' width="30%" dataFormat={this.returnDescriptionFormat} >Return Info</TableHeaderColumn> */}
            <TableHeaderColumn dataField='action' width="10%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
        </BootstrapTable>

        if (this.props.bookLoading) {
            display = <Spinner />
        }
        return (
            <>
                <StudentHeader title="SCAN BOOK TO RETURN" />
                <BarcodeReader
                    onScan={this.handleScan}
                    onError={(e) => console.log(e)}
                />
                <Container className="mt-3" fluid>
                    <Card className="shadow w-100">
                        <Row className="w-100 mt-3 p-0">
                            <Col className="col-4 mb-3 pl-4">
                                <p><span className="font-weight-bold">Retuned book(s):</span> {this.props.bookData.length}</p>
                                <p><span className="font-weight-bold">Total fine:</span> {this.props.bookData.reduce((total,el) => total+el.fine,0)}</p>
                            </Col>
                            <Col className="col-4 mb-3 pl-4">
                            <InputGroup className="mb-3">
                                <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Search book by barcode" />
                                <InputGroup.Append>
                                    <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                </InputGroup.Append>
                            </InputGroup>
                            </Col>
                            <Col className="col-4 mb-3 pr-4 pull-right">
                                <button disabled={!this.props.bookData.length > 0} onClick={() => this.setState({ confirmShow: true })}
                                    type="button" className="btn btn-primary btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Return
                        </button>
                                <button onClick={() => this.clearBookData()}
                                    type="button" className="btn btn-primary btn-fill float-right mr-3" >
                                    <span className="btn-label">
                                    </span> Clear
                        </button>

                            </Col>
                        </Row>
                    </Card>
                    {display}
                </Container>
                <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                <CommonErrorModal show={this.state.errorShow} hide={() => this.clearReturnBookError()} msg={this.state.errMsg}/>
                <CommonConfirmModal show={this.state.confirmShow} title="Confirm return" hide={() => this.setState({ confirmShow: false })} clickConfirm={()=>this.handleReturnConfirm()} msg="Do you want to return scanned books?" />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookData: state.returnBook.bookData,
        bookLoading: state.returnBook.bookLoading,
        bookError: state.returnBook.bookError,
        userid: state.Auth.userId,
        returnSuccess:state.returnBook.returnSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetBook: (search) => dispatch(actions.getReturningBook(search)),
        onClearBook: () => dispatch(actions.clearBook()),
        onClearReturnBookError: () => dispatch(actions.clearReturnBookError()),
        onDeleteBook: (id) => dispatch(actions.deleteReturnBook(id)),
        onReturnBook: (data, libid) => dispatch(actions.returnBook(data, libid))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReturnBook)



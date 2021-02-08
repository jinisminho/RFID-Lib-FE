
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Modal, Button } from 'react-bootstrap'
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
            confirmShow: false
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
    handleDeleteBook(id, rfidcode) {
        let tmp = [...this.state.bookCodeList]
        var index = tmp.indexOf(rfidcode)
        if (index != -1) {
            tmp.splice(index, 1);
            this.setState({ bookCodeList: tmp });
        }
        this.props.onDeleteBook(id)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <DeleteButton clicked={() => this.handleDeleteBook(row.id, row.rfid)} />
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
        if (!this.state.bookCodeList.includes(data.trim())) {
            this.setState({
                successShow: false,
                errorShow: false,
                bookCodeList: [...this.state.bookCodeList, data.trim()]
            })
            this.props.onGetBook(data.trim(), this.props.userid)
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
                <a href="https://www.google.com"><h2 className="font-weight-bolder">{row.book.title}{row.book.subtitle ? ":" + " " + row.book.subtitle : ""}</h2></a>
                <p>by <span className="font-weight-bold">{row.book.authors}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.book.edition}</p>
                <p><span className="font-weight-bold">Barcode:</span> {row.barcode}</p>
                <p><span className="font-weight-bold">Genre(s):</span> {row.book.genres}</p>
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
            bordered={false}
            tableHeaderClass={"col-hidden"}
            keyField="id"
        >
            <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
            <TableHeaderColumn dataField="bookinfo" width="60%" dataFormat={this.bookDescriptionFormat}>Book Info</TableHeaderColumn>
            <TableHeaderColumn dataField='returninfo' width="30%" dataFormat={this.returnDescriptionFormat} >Return Info</TableHeaderColumn>
            <TableHeaderColumn dataField='action' width="20%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
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
                            <Col className="col-8 mb-3 pl-4">
                                <p><span className="font-weight-bold">Retuned book(s):</span> {this.props.bookData.length}</p>
                            </Col>
                            <Col className="col-4 mb-3 pr-4 pull-right">
                                <button disabled={!this.props.bookData.length > 0} onClick={() => this.setState({ confirmShow: true })}
                                    type="button" className="btn btn-info btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Return
                        </button>
                                <button onClick={() => this.clearBookData()}
                                    type="button" className="btn btn-info btn-fill float-right mr-3" >
                                    <span className="btn-label">
                                    </span> Clear
                        </button>

                            </Col>
                        </Row>
                    </Card>
                    {display}
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
                <Modal show={this.state.confirmShow} onHide={() => this.setState({ confirmShow: false })} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="bg-success">
                        <Modal.Title>Confirm Return</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1 className="text-primary display-1"><i class="fas fa-question-circle"></i></h1>
                        <h2>Confirm return books</h2>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={() => this.setState({ confirmShow: false })}>
                            Close
                                </Button>
                        <Button variant="success" onClick={() => this.handleReturnConfirm()}>
                            Confirm
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
        onGetBook: (search, libid) => dispatch(actions.getReturningBook(search, libid)),
        onClearBook: () => dispatch(actions.clearBook()),
        onClearReturnBookError: () => dispatch(actions.clearReturnBookError()),
        onDeleteBook: (id) => dispatch(actions.deleteReturnBook(id)),
        onReturnBook: (data, libid) => dispatch(actions.returnBook(data, libid))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReturnBook)



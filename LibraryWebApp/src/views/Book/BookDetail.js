import React from "react";
import Header from "components/Headers/Header.js";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux'
import Spinner from 'components/Spinner/Spinner'
import {
    Card,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";
import { Button, Modal } from 'react-bootstrap'
import * as actions from 'store/actions/index'

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.location.state.book,
            studentId: this.props.location.state.studentId,
            successNotice: '',
            successShow: false,
            errorShow: false,
        }
        this.floorShelfFormatter = this.floorShelfFormatter.bind(this);
    }
    componentDidMount() {
        this.props.onFetchData(this.state.book.id)
    }
    componentDidUpdate() {
    }

    handleAddReminder(bookId, studentId) {
        this.setState({
            errorShow: true,
            successShow: true
        })
        this.props.onAddReminder(bookId, studentId);
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
    }

    // handlePageChange(page, sizePerPage) {
    //     // this.fetchData(page, sizePerPage, this.state.searchValue);
    // }

    // handleSizePerPageChange(sizePerPage) {
    //     // When changing the size per page always navigating to the first page
    //     // this.fetchData(1, sizePerPage, this.state.searchValue);

    // }

    floorShelfFormatter(cell, row) {
        return (row.shelf ? "Shelf: " + row.shelf : "") + (row.line ? (row.shelf ? " - " : "") + "Row: " + row.line : "")
    }

    render() {
        const thisBook = this.state.book

        let authors = thisBook.author ? (thisBook.author.length > 0 ? thisBook.author : []) : [];
        let formatedAuthor = "";
        let i = 0;
        authors.forEach(element => {
            i < authors.length - 1 ? formatedAuthor += " " + element["name"] + " , " : formatedAuthor += " " + element["name"] + " ";
            i++;
        });

        let genres = thisBook.genres ? (thisBook.genres.length > 0 ? thisBook.genres : []) : [];
        let formatedGenres = "";
        i = 0;
        genres.forEach(element => {
            i < genres.length - 1 ? formatedGenres += " " + element["name"] + " , " : formatedGenres += " " + element["name"] + " ";
            i++;
        });

        let publisherPublishYearStr = (thisBook.publisher ? thisBook.publisher : "") + (thisBook.publishYear ? (thisBook.publisher ? " - " : "") + thisBook.publishYear : "");

        const options = {
            // onPageChange: this.handlePageChange,
            // onSizePerPageList: this.handleSizePerPageChange,
            // page: this.props.page,
            // sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };

        let display = (
            <div className="content">
                <Row className=" align-items-center my-3">
                    <Col lg="1"></Col>
                    <Col lg="3">
                        <Row>
                            <img className="img-thumbnail" src={thisBook.img} />
                        </Row>
                    </Col>
                    <Col>
                        <Table className=" border">
                            <tbody>
                                <tr>
                                    <th className="pl-sm-4 pl-7" style={{ width: "40px" }}>Title:</th>
                                    <td>{thisBook.title}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Subtitle:</th>
                                    <td>{thisBook.subtitle}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Total available:</th>
                                    <td>{thisBook.stock + "/" + thisBook.numberOfCopy}</td>
                                </tr>
                                {/* <tr>
                                    <th className="pl-sm-4 pl-7">Location:</th>
                                    <td>{thisBook.location}</td>
                                </tr> */}
                                <tr>
                                    <th className="pl-sm-4 pl-7">Call number:</th>
                                    <td>{thisBook.callNumber}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Status:</th>
                                    <td>{thisBook.status}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    {/* <Col className="align-self-start"> */}
                    <Col lg="1">

                    </Col>
                </Row>
                <Row>
                    <Col lg="1"></Col>
                    <Col>
                        <Table>
                            <tbody>
                                <tr>
                                    <th className="pl-7 pt-5" style={{ width: "20px" }}>Author(s):</th>
                                    <td className="pt-5">{formatedAuthor}</td>
                                </tr>
                                <tr>
                                    <th className="pl-7 border-0">ISBN:</th>
                                    <td className="border-0">{thisBook.isbn}</td>
                                </tr>
                                <tr>
                                    <th className="pl-7 border-0">Edition:</th>
                                    <td className="border-0">{thisBook.edition}</td>
                                </tr>
                                <tr>
                                    <th className="pl-7 border-0">Publisher:</th>
                                    <td className="border-0">{publisherPublishYearStr}</td>
                                </tr>
                                <tr>
                                    <th className="pl-7 border-0">Number of pages:</th>
                                    <td className="border-0">{thisBook.pageNumber}</td>
                                </tr>
                                <tr>
                                    <th className="pl-7 border-0">Language:</th>
                                    <td className="border-0">{thisBook.language}</td>
                                </tr>
                                {/* <tr>
                                    <th className="pl-7 border-0">Genre(s):</th>
                                    <td className="border-0">{formatedGenres}</td>
                                </tr> */}
                                <tr>
                                    <th className="pl-7 border-0">Genre:</th>
                                    <td className="border-0">{thisBook.genre}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg="1"></Col>
                </Row>
                <Row>
                    <Col lg="1"></Col>
                    <Col>
                        <div className="d-flex my-3">
                            <hr className="my-auto" width="5%" />
                            <div className="px-6"><p className="h2">LOCATIONS</p></div>
                            <hr className="my-auto flex-grow-1" />
                        </div>
                        <BootstrapTable
                            data={this.props.data}
                            options={options}
                            // fetchInfo={{ dataTotalSize: this.props.totalSize }}
                            remote
                            striped
                            hover
                            condensed
                            className="ml-4 mr-4 mb-4"
                            keyField="index"
                        >
                            <TableHeaderColumn dataField="shelf" dataAlign="center" headerAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Shelf</TableHeaderColumn>
                            <TableHeaderColumn dataField="line" dataAlign="center" headerAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Row</TableHeaderColumn>
                            {/* <TableHeaderColumn dataField="description" width="50%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn> */}
                            {/* <TableHeaderColumn dataField='active' dataAlign="center" width="30%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn> */}
                        </BootstrapTable>
                    </Col>
                    <Col lg="1"></Col>
                </Row>
            </div>
        )
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                <Container className="my-3" fluid>
                    <Card className="shadow">
                        {display}
                    </Card>
                </Container>

                <Modal show={this.props.successMsg && this.state.successShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                    <Modal.Header className="bg-success" closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1 className="text-success display-1"><i className="fas fa-check-circle"></i></h1>
                        <h2>{this.props.successMsg}</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalClose()}>
                            Close
                                </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.errorInfo && this.state.errorShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton className="bg-danger">
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1 className="text-danger display-1"><i className="fas fa-times-circle"></i></h1>
                        <h2>{this.props.errorInfo}</h2>
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
    let i = 0;
    let bookLocFormatted = state.book.bookLocation ? state.book.bookLocation.map(el => { el.index = ++i; return el }) : state.book.bookLocation;

    return {
        loading: state.info.loading,
        error: state.info.error,
        successMsg: state.info.successMsg,

        // data: state.book.data,
        data: bookLocFormatted,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddReminder: (bookId, studentId) => dispatch(actions.addReminder(bookId, studentId)),
        onFetchData: (bookId) => dispatch(actions.getLocation_Book_Lib(bookId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)

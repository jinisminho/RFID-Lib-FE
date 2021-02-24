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
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import {
    Card,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";
import { Button, Modal } from 'react-bootstrap'
import MyUtil from 'store/utility'
import * as MyConstant from '../../Util/Constant'
import * as actions from '../../../store/actions/index'
import CommonErrorModal from "components/Modals/CommonErrorModal";
import CommonSuccessModal from "components/Modals/CommonSuccessModal";

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.location.state.book,
            patronId: this.props.location.state.patronId,
            successNotice: '',
            successShow: false,
            errorShow: false,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }

    handleAddReminder(bookId, patronId) {
        this.setState({
            errorShow: true,
            successShow: true
        })
        this.props.onAddReminder(bookId, patronId);
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
    }

    render() {
        const thisBook = this.state.book[0]

        let authors = thisBook.author ? (thisBook.author.length > 0 ? thisBook.author : []) : [];
        let formatedAuthor = "";
        let i = 0;
        authors.forEach(element => {
            i < authors.length - 1 ? formatedAuthor += " " + element["name"] + " , " : formatedAuthor += " " + element["name"] + " ";
            i++;
        });

        let genres = thisBook.genres ? (thisBook.genres.length > 0 ? thisBook.genres : []) : [];
        let formatedGenre = "";
        i = 0;
        genres.forEach(element => {
            i < genres.length - 1 ? formatedGenre += " " + element["name"] + " , " : formatedGenre += " " + element["name"] + " ";
            i++;
        });

        let publisherPublishYearStr = thisBook.publisher ? thisBook.publisher : "";
        publisherPublishYearStr += thisBook.publishYear ? " - " + thisBook.publishYear : "";


        let addToWishlistButton = thisBook.stock <= 0 || thisBook.status !== MyConstant.BOOK_IN_CIRCULATION ? (<Button className="btn btn-sm btn-primary btn-block text-truncate my-2" onClick={() => this.handleAddReminder(thisBook.id, this.state.patronId)}>Add to Wishlist</Button>) : null;

        let display = (
            <div className="content">
                <Row className=" align-items-center my-3">
                    <Col lg="1"></Col>
                    <Col lg="3">
                        <Row>
                            <img className="img-thumbnail" src={thisBook.img} />
                        </Row>
                        <Row>
                            <Col lg="3" xs="1"></Col>
                            <Col>
                                {addToWishlistButton}
                            </Col>
                            <Col lg="3" xs="1"></Col>
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
                                    <td>{thisBook.stock + "/" + thisBook.numberOfCopy}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Total available:</th>
                                    <td>{thisBook.stock}</td>
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
                                    <td>{thisBook.status + (thisBook.onlyInLibrary ? " - ONLY IN LIBRARY" : "")}</td>
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
                                    <th className="pl-7" style={{ width: "20px" }}>Author(s):</th>
                                    <td className="">{formatedAuthor}</td>
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
                                <tr>
                                    <th className="pl-7 border-0">Genre(s):</th>
                                    <td className="border-0">{formatedGenre}</td>
                                </tr>
                            </tbody>
                        </Table>
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
                {/* <Header /> */}
                <Container className="mt-3" fluid>
                    <Card className="shadow">
                        {display}
                    </Card>
                </Container>

                {/* <Modal show={this.props.successMsg && this.state.successShow} onHide={() => this.handleModalClose()} backdrop="static" keyboard={false}>
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
                </Modal> */}

                <CommonErrorModal show={this.props.errorInfo && this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.errorInfo} />
                <CommonSuccessModal show={this.props.successMsg && this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.info.loading,
        errorInfo: state.info.error,
        successMsg: state.info.successMsg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddReminder: (bookId, patronId) => dispatch(actions.addReminder(bookId, patronId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)

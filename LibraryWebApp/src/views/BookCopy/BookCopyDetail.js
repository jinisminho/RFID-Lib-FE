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
import Spinner from 'components/Spinner/Spinner'
import {
    Card,
    Container,
    Row,
    Col,
    Table
} from "reactstrap";
import { Button, Modal } from 'react-bootstrap'
import MyUtil from 'store/utility'
import * as MyConstant from '../Util/Constant'
import * as actions from 'store/actions/index'

class BookCopyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copy: this.props.location.state.copy,
        }
    }
    componentDidMount() {
        this.props.onFetchData(this.state.copy.id)
    }
    componentDidUpdate() {
    }

    fetchData(id) {
        this.props.onFetchData(id)
    }

    render() {
        const thisCopy = this.props.copyDetail;
        const thisBook = thisCopy ? thisCopy.book : [];

        let publisherPublishYearStr = thisBook.publisher ? thisBook.publisher : "";
        publisherPublishYearStr += thisBook.publishYear ? " - " + thisBook.publishYear : "";

        let statusFormatted = thisCopy ? thisCopy.status : null;
        statusFormatted = (statusFormatted ==  MyConstant.BOOK_COPY_BORROWED) ?  "Borrowed by " + (thisCopy.borrower.patronTypeName ? thisCopy.borrower.patronTypeName + " : " : "") 
        + (thisCopy.borrower.profile.fullName ? thisCopy.borrower.profile.fullName : "") 
        + (thisCopy.borrower.email ? " - " + thisCopy.borrower.email : "") + (thisCopy.borrower.profile.phone ? " - " + thisCopy.borrower.profile.phone : "") : statusFormatted;

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
                                    <th className="pl-sm-4 pl-7">Barcode:</th>
                                    <td>{thisCopy ? thisCopy.barcode : null}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Call number:</th>
                                    <td>{thisBook.callNumber}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Copy type:</th>
                                    <td>{thisCopy ? thisCopy.copyType : null}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Price:</th>
                                    <td>{thisCopy ? thisCopy.price : null}</td>
                                </tr>
                                <tr>
                                    <th className="pl-sm-4 pl-7">Status:</th>
                                    <td>{statusFormatted}</td>
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
                                    <td className="">{thisBook.authors}</td>
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
                                    <td className="border-0">{thisBook.genres}</td>
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
                <Header />
                <Container className="mt-3" fluid>
                    <Card className="shadow">
                        {display}
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.copy.loading,
        error: state.copy.error,
        successMsg: state.copy.successMsg,
        copyDetail: state.copy.copyDetail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (id) => dispatch(actions.getCopyById(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCopyDetail)

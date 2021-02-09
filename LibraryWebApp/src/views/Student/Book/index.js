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
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import * as MyConstant from '../../Util/Constant'
import MyUtil from 'store/utility'
import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
import WishlistModal from "components/Modals/WishlistModal"

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            wishlistShow: false,
            studentId: null,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.actionFormatter = this.actionFormatter.bind(this);
        this.fetchWishlist = this.fetchWishlist.bind(this);
    }
    componentDidMount() {
        this.fetchData();
        // get then set studentId
        this.setState({ studentId: '1' });
    }

    componentDidUpdate() {
        let msg = null
        // if (this.props.successMsg) {
        //     msg = this.props.successMsg
        // }
        // if (msg != null && !this.state.successShow) {
        //     this.setState({ successShow: true, successNotice: msg })
        // }
        // if (this.props.error != null && !this.state.errorShow) {
        //     this.setState({ errorShow: true, searchValue: '' })
        // }
    }

    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }

    handleSearch() {
        this.setState({
            // successShow: true,
            errorShow: false
        })
        this.fetchData(1, 10, this.state.searchValue)
    }

    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }

    fetchWishlist(page = this.props.wishlistPage, sizePerPage = this.props.wishlistSizePerPage, searchValue = this.state.wishlistSearchValue) {
        this.props.onGetWishlist(page - 1, sizePerPage, searchValue)
    }

    actionFormatter(cell, row) {
        if (row.status !== MyConstant.BOOK_COPY_AVAILABLE)
            return (
                <div>
                    <Row className="align-items-center">
                        <Col></Col>
                        <Col>
                            <Button className="btn btn-sm btn-primary btn-block text-truncate" onClick={() => this.handleAddReminder(row.id, this.state.studentId)}>Add to Wishlist</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            )
    }

    statusFormatter(cell, row) {
        let status = ""
        switch (row.status) {
            case "OUT_OF_CIRCULATION":
                status = "Out of circulation"
                break;
            case "NOT_ALLOWED_TO_BORROW":
                status = "Not allowed to borrow"
                break;
            case "ALLOWED_TO_BORROW":
                status = "Allowed to borrow"
                break;
        }
        return (
            status
        )
    }

    actionFormatter(cell, row) {
        if (row.stock <= 0 || row.status !== MyConstant.BOOK_IN_CIRCULATION)
            return (
                <div>
                    <Row className="align-items-center">
                        <Col></Col>
                        <Col>
                            <Button className="btn btn-sm btn-primary btn-block text-truncate" onClick={() => this.handleAddReminder(row.id, this.state.studentId)}>Add to Wishlist</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            )
    }
    
    imageFormatter(cell, row){
        return (<img className="img-thumbnail" src={cell}/>)
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
        this.fetchData(1, 10, this.state.searchValue);
    }

    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };
        const hide = {
            publisher: true,
            publishYear: true,
            language: true,
            totalCopies: true,
            nop: true,
            isbn: true,
            totalAvailableCopies: true,
        }
        let extraData = [];
        extraData.hide = hide;
        extraData.studentId = this.state.studentId

        let display = (
            <div className="content">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.setState({ wishlistShow: true })}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                                My Wishlist
                            </span>
                        </button>
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.data}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="12%" isKey>Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" headerAlign="center" dataFormat={MyUtil.bookDescriptionFormat} formatExtraData={extraData}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' width="12%" dataFormat={this.actionFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}

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
                        <CardHeader className="border-0">
                            {/* <h3 className="mb-0">{MyConstant.BOOKS}</h3> */}
                        </CardHeader>
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
                        {display}

                        <WishlistModal
                            show={this.state.wishlistShow}
                            hide={() => this.setState({ wishlistShow: false })}
                            title="Wishlist"
                            data={this.props.wishlistData}
                            totalSize={this.props.wishlistTotalSize}
                            page={this.props.wishlistPage}
                            sizePerPage={this.props.wishlistSizePerPage}
                            studentId={this.state.studentId}
                            fetchData={this.fetchWishlist}
                        />

                    </Card>
                </Container>




            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.bookStu.loading,
        errorBook: state.bookStu.error,
        errOnFetchBook: state.bookStu.error,
        
        data: state.bookStu.data,
        totalSize: state.bookStu.total,
        page: state.bookStu.page,
        sizePerPage: state.bookStu.sizePerPage,
        
        wishlistData: state.info.wishlistData,
        wishlistTotalSize: state.info.wishlistTotalSize,
        wishlistPage: state.info.wishlistPage,
        wishlistSizePerPage: state.info.wishlistSizePerPage,
        
        successMsg: state.info.successMsg,
        errorInfo: state.info.error,
        errOnFetchInfo: state.info.errOnFetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getBookStudentSide(search, page, size)),
        onAddReminder: (bookId, studentId) => dispatch(actions.addReminder(bookId, studentId)),
        onGetWishlist: (page, size, search) => dispatch(actions.getWishlist(search, page, size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)

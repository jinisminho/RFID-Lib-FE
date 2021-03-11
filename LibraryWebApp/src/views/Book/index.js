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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { FormControl, InputGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import UpdateButton from '../../components/Button/UpdateButton'
import BookFormImg from './bookFormImg'
import CopyForm from './copyForm'
import ConfirmCopyForm from './copyComfirmForm'
import {
    Card,
    Container
} from "reactstrap";
import { storage } from '../../firebase'
import { Link } from 'react-router-dom'
import * as MyConstant from '../Util/Constant'
import AddToWishlistLibModal from "components/Modals/AddToWishlistLibModal";
import CommonErrorModal from "components/Modals/CommonErrorModal";
import CommonSuccessModal from "components/Modals/CommonSuccessModal";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            confirmDelete: false,
            deleteId: null,
            copyShow: false,
            copyData: null,
            updateFormShow: false,
            updateData: null,
            confirmFormShow: false,
            imageLoading: false,
            price: null,
            copyType: null,
            showAddToWishlistForm: false,
            addToWishlistId: false,
            successShowOther: false,
            errorShowOther: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this);
        this.getAuthorData = this.getAuthorData.bind(this);
        this.getGenreData = this.getGenreData.bind(this);
        this.bookDescriptionFormat = this.bookDescriptionFormat.bind(this);

    }
    componentDidMount() {
        this.fetchData();
        this.getAuthorData();
        this.getGenreData()
        this.getCopyTypes()
    }
    componentDidUpdate() {
        let msg = null
        if (this.props.addSuccess) {
            msg = "Add book successfully"
        }
        if (this.props.updateSuccess) {
            msg = "Update book successfully"
        }
        if (this.props.deleteSuccess) {
            msg = "Delete book successfully"
        }
        if (this.props.copySuccess) {
            msg = "Add book copy successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
        if (this.props.bookCopyData != null && !this.state.confirmFormShow) {
            this.setState({ confirmFormShow: true })
        }
        if (this.props.bookCopyData == null && this.state.confirmFormShow) {
            this.setState({ confirmFormShow: false })
        }
    }
    getAuthorData() {
        this.props.onGetAuthor()
    }
    getGenreData() {
        this.props.onGetGenre()
    }
    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }
    getCopyTypes() {
        this.props.onGetCopyType()
    }
    handleSearch() {
        this.setState({
            successShow: false,
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
    handleAddCancel = () => {
        this.setState({
            addFormShow: false,
            cancelAdd: true,
        })
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }
    handleAddSubmit(values) {
        const uploadTask = storage.ref(`images/book/${values.img[0].name}`).put(values.img[0])
        uploadTask.on('state_changed',
            (snapshot) => {
                this.setState({ imageLoading: true, addFormShow: false })
            },
            (error) => {
                // console.log(error)
                this.setState({ imageLoading: false })
            },
            () => {
                storage.ref('images/book').child(values.img[0].name).getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({ imageLoading: false })
                    values["img"] = url
                    values.publishYear = values.publishYear.getFullYear()
                    let authorList = []
                    values.authorIds.forEach(element => {
                        authorList.push(element["value"])
                    });
                    values.authorIds = authorList

                    let genreList = []
                    values.genreIds.forEach(element => {
                        genreList.push(element["value"])
                    });
                    values.genreIds = genreList
                    values["creatorId"] = this.props.userid
                    this.props.onAddBook(values)
                })
            }
        )

    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, successShowOther: false, errorShowOther: false })
        this.fetchData(1, this.props.sizePerPage, this.state.searchValue);
    }
    handleUpdateCancel = () => {
        this.setState({
            updateFormShow: false,
            updateData: null,
        })
    }
    handleCopyCancel = () => {
        this.setState({
            copyShow: false,
            copyData: null,
        })
    }
    handleUpdateSubmit(values) {
        values.publishYear = values.publishYear.getFullYear()
        let authorList = []
        values.authorIds.forEach(element => {
            authorList.push(element["value"])
        });
        values.authorIds = authorList

        let genreList = []
        values.genreIds.forEach(element => {
            genreList.push(element["value"])
        });
        values.genreIds = genreList
        if (Array.isArray(values.img)) {
            const uploadTask = storage.ref(`images/book/${values.img[0].name}`).put(values.img[0])
            uploadTask.on('state_changed',
                (snapshot) => {
                    this.setState({ imageLoading: true, updateFormShow: false })
                },
                (error) => {
                    // console.log(error)
                    this.setState({ imageLoading: false })
                },
                () => {
                    storage.ref('images/book').child(values.img[0].name).getDownloadURL().then(url => {
                        this.setState({ imageLoading: false })
                        values["img"] = url
                        values["updateBy"] = this.props.userid
                        this.props.onUpdateBook(values)
                    })
                }
            )
        } else {
            this.setState({ updateFormShow: false })
            values["updateBy"] = this.props.userid
            this.props.onUpdateBook(values)
        }

    }
    handleCopySubmit(values) {
        this.setState({ copyShow: false, price: values.price, copyType: values.copyTypeId })
        delete values["title"]
        delete values["id"]
        this.props.onGenerateBarcode(values)
    }
    handleDeleteSubmit() {
        this.setState({ confirmDelete: false })
        this.props.onDeleteBook(this.state.deleteId)
    }
    handleDeleteCancel = () => {
        this.setState({
            confirmDelete: false,
            deleteId: null,
        })
    }
    getConfirmInitialValues = () => {
        let barcode = []
        if (this.props.bookCopyData && this.props.bookCopyData.generatedBarcodes.length > 0) {
            this.props.bookCopyData.generatedBarcodes.forEach(el => {
                barcode.push({ "barcode": el })
            });
        }
        let copyType = ""
        if (this.props.copyTypes) {
            this.props.copyTypes.forEach(element => {
                if (element.value == this.state.copyType) {
                    copyType = element.label
                }
            });
        }
        return {
            isbn: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.isbn : '',
            author: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.authors : '',
            price: this.state.price ? this.state.price : '',
            title: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.title : '',
            edition: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.edition : '',
            copyType: copyType,
            members: barcode,
            img: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.img : '',
            id: this.props.bookCopyData ? this.props.bookCopyData.bookInfo.bookId : ''
        };
    }
    handleConfirmCancel = () => {
        this.setState({
            confirmFormShow: false,
        })
        this.fetchData()
    }
    handleConfirmSubmit = (values) => {
        let data = {}
        let barcodes = []
        values.members.forEach(element => {
            barcodes.push(element.barcode)
        });
        data["bookId"] = values.id
        data["creatorId"] = this.props.userid
        data["copyTypeId"] = this.state.copyType
        data["price"] = this.state.price
        data["barcodes"] = barcodes
        this.props.onAddCopy(data)
        this.setState({
            confirmFormShow: false,
            copyType: null,
            price: null
        })
    }
    activeFormatter(cell, row) {
        const statusToShow = [MyConstant.BOOK_IN_CIRCULATION, MyConstant.BOOK_LIB_USE_ONLY]
        let addToWishlistButton = (row.stock == 0) && statusToShow.includes(row.status) ? (<Button className="btn btn-primary" onClick={() => this.setState({
            showAddToWishlistForm: true,
            addToWishlistId: row.id
        })}>Add to wishlist</Button>) : null
        return (
            <div>
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row
                })} />
                {/* <DeleteButton clicked={() => this.setState({
                    confirmDelete: true,
                    deleteId: row.id
                })} /> */}
                <Button className="btn btn-primary" onClick={() => this.setState({
                    copyShow: true,
                    copyData: row
                })}>Make Copy</Button>
                { addToWishlistButton}
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
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={cell} />)
    }
    bookDescriptionFormat(cell, row) {
        let title = row.title ? (
            <Link to={{
                pathname: this.props.location.pathname.includes('/admin') ? '/admin/bookDetail' : '/librarian/book/detail',
                state: {
                    book: row,
                }
            }}><h1 className="font-weight-bolder">{row.title}{row.subtitle ? " : " + row.subtitle : null}</h1></Link>
        ) : null;
        let author = []
        row.author.forEach(el => author.push(el.name))

        return (
            <>
                {title}
                <p>by {author.join(", ")}</p>
                <p>Edition: {row.edition}</p>
                <p>ISBN: {row.isbn}</p>
                <p>Number of available copy: {row.stock ? row.stock : 0}/{row.numberOfCopy}</p>
                <p>Status: {MyConstant.BOOK_STATUS_ADD_LIST[row.status]}</p>
                <p>Call number: {row.callNumber}</p>
            </>
        )
    }
    getInitialAddStatus() {
        return {
            status: Object.keys(MyConstant.BOOK_STATUS_ADD_LIST)[0]
        }
    }
    getInitialValues = () => {
        let author = []
        let genre = []
        if (this.state.updateData) {
            this.state.updateData.author.forEach(el => {
                author.push({ "value": el.id, "label": el.name })
            })
            this.state.updateData.genres.forEach(el => {
                genre.push({ "value": el.id, "label": el.name })
            })
        }
        return {
            isbn: this.state.updateData ? this.state.updateData.isbn : '',
            title: this.state.updateData ? this.state.updateData.title : '',
            subtitle: this.state.updateData ? this.state.updateData.subtitle : '',
            callNumber: this.state.updateData ? this.state.updateData.callNumber : '',
            publisher: this.state.updateData ? this.state.updateData.publisher : '',
            publishYear: this.state.updateData ? new Date(this.state.updateData.publishYear.toString()) : '',
            language: this.state.updateData ? this.state.updateData.language : '',
            pageNumber: this.state.updateData ? this.state.updateData.pageNumber : '',
            edition: this.state.updateData ? this.state.updateData.edition : '',
            status: this.state.updateData ? this.state.updateData.status : '',
            authorIds: author,
            genreIds: genre,
            img: this.state.updateData ? this.state.updateData.img : '',
            id: this.state.updateData ? this.state.updateData.id : ''
        };
    }
    getInitialCopyValues() {
        return {
            isbn: this.state.copyData ? this.state.copyData.isbn : '',
            title: this.state.copyData ? this.state.copyData.title : '',
            id: this.state.copyData ? this.state.copyData.id : '',
            copyTypeId: this.props.copyTypes ? this.props.copyTypes[0]["value"] : ""
        };
    }

    handleAddToWishlistSubmit(values) {
        this.setState({ showAddToWishlistForm: false, successShowOther: true, errorShowOther: true })
        this.props.onAddReminder(this.state.addToWishlistId, values.patronId)
    }
    handleAddToWishListCancel = () => {
        this.setState({
            showAddToWishlistForm: false,
            addToWishlistId: null,
        })
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
        let display = (
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-4 pl-4">
                        <InputGroup className="mb-3">
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Search by ISBN or title" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Book
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
                    keyField="id"
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="50%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="30%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal size="lg" backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookFormImg initialValues={this.getInitialAddStatus()} authorList={this.props.authorData} genreList={this.props.genreData} handleCancel={() => this.handleAddCancel()} onSubmit={(values) => this.handleAddSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal size="lg" backdrop="static" show={this.state.updateFormShow} onHide={() => this.handleUpdateCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookFormImg authorList={this.props.authorData} genreList={this.props.genreData} initialValues={this.getInitialValues()} handleCancel={() => this.handleUpdateCancel()} onSubmit={(values) => this.handleUpdateSubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.copyShow} onHide={() => this.handleCopyCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Make Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CopyForm options={this.props.copyTypes} initialValues={this.getInitialCopyValues()} handleCancel={() => this.handleCopyCancel()} onSubmit={(values) => this.handleCopySubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal dialogClassName="two-col-modal" backdrop="static" show={this.state.confirmFormShow} onHide={() => { this.handleConfirmCancel() }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmCopyForm initialValues={this.getConfirmInitialValues()} handleCancel={() => this.handleConfirmCancel()} onSubmit={(value) => this.handleConfirmSubmit(value)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmDelete} onHide={() => this.handleDeleteCancel()}>
                    <Modal.Header className="bg-danger" closeButton>
                        <Modal.Title>Delete Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-danger display-1"><i className="fas fa-trash-alt"></i></h1>
                        <h4>You will not be able to recover this book</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleDeleteCancel()}>
                            Close
                    </Button>
                        <Button variant="danger" onClick={() => this.handleDeleteSubmit()}>
                            OK
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
        if (this.props.loading || this.state.imageLoading) {
            display = <Spinner />
        }
        return (
            <>
                {/* <Header /> */}
                <Container className="mt-md-3" fluid>
                    <Card className="shadow">
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
                                <h2>{this.props.error}</h2>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleModalClose()}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <AddToWishlistLibModal
                            show={this.state.showAddToWishlistForm}
                            hide={() => this.handleAddToWishListCancel()}
                            title="Add to wishlist"
                            submit={(values) => this.handleAddToWishlistSubmit(values)}
                        />
                        <CommonErrorModal show={this.props.errorInfo && this.state.errorShowOther} hide={() => this.handleModalClose()} msg={this.props.errorInfo} />
                        <CommonSuccessModal show={this.props.successMsgInfo && this.state.successShowOther} hide={() => this.handleModalClose()} msg={this.props.successMsgInfo} />
                        {display}
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.book.loading,
        data: state.book.data,
        error: state.book.error,
        totalSize: state.book.total,
        page: state.book.page,
        sizePerPage: state.book.sizePerPage,
        deleteSuccess: state.book.deleteSuccess,
        copySuccess: state.book.copySuccess,
        updateSuccess: state.book.updateSuccess,
        addSuccess: state.book.addSuccess,
        bookCopyData: state.book.bookCopyData,
        authorData: state.book.authorData,
        genreData: state.book.genreData,
        copyTypes: state.book.copyTypes,
        userid: state.Auth.userId,

        successMsgInfo: state.info.successMsg,
        errorInfo: state.info.error,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getBook(page, size, search)),
        onDeleteBook: (id) => dispatch(actions.deleteBook(id)),
        onUpdateBook: (data) => dispatch(actions.updateBook(data)),
        onAddBook: (data) => dispatch(actions.addBook(data)),
        onAddCopy: (data) => dispatch(actions.addBookCopy(data)),
        onGenerateBarcode: (data) => dispatch(actions.generateCopyBarcode(data)),
        onGetAuthor: () => dispatch(actions.getAuthor()),
        onGetCopyType: () => dispatch(actions.getBookCopyType()),
        onGetGenre: () => dispatch(actions.getGenre()),
        onAddReminder: (bookId, patronId) => dispatch(actions.addReminder(bookId, patronId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)

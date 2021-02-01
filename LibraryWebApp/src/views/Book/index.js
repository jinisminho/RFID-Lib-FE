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
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import UpdateButton from '../../components/Button/UpdateButton'
import DeleteButton from '../../components/Button/DeleteButton'
import BookForm from './bookForm'
import BookFormImg from './bookFormImg'
import CopyForm from './copyForm'
import ConfirmCopyForm from './copyComfirmForm'
import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
import {storage} from '../../firebase'

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
            confirmFormShow:false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this);
        this.getAuthorData = this.getAuthorData.bind(this);
        this.getGenreData = this.getGenreData.bind(this);
    }
    componentDidMount() {
        this.fetchData();
        this.getAuthorData();
        this.getGenreData()
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
            this.setState({ errorShow: true, searchValue:'' })
        }
        if(this.props.bookCopyData!=null && !this.state.confirmFormShow){
            this.setState({confirmFormShow:true})
        }
    }
    getAuthorData(){
        this.props.onGetAuthor()
    }
    getGenreData(){
        this.props.onGetGenre()
    }
    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
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
        const uploadTask = storage.ref(`images/${values.img[0].name}`).put(values.img[0])
        uploadTask.on('state_changed',
        (snapshot)=>{
            this.setState({imageLoading:true})
        },
        (error)=>{
            console.log(error)
            this.setState({imageLoading:false})
        },
        ()=>{
            storage.ref('images').child(values.img[0].name).getDownloadURL().then(url =>{
                this.setState({ addFormShow: false })
                values["img"]=url
                this.props.onAddBook(values)
            })
        }
        )
        
    }
    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        this.fetchData(1, 10, this.state.searchValue);
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
        if(Array.isArray(values.img)){
            const uploadTask = storage.ref(`images/${values.img[0].name}`).put(values.img[0])
            uploadTask.on('state_changed',
            (snapshot)=>{
                this.setState({imageLoading:true})
            },
            (error)=>{
                console.log(error)
                this.setState({imageLoading:false})
            },
            ()=>{
                storage.ref('images').child(values.img[0].name).getDownloadURL().then(url =>{
                    this.setState({ updateFormShow: false })
                    values["img"]=url
                    this.props.onUpdateBook(values)
                })
            }
            )
        }else{
            this.setState({ updateFormShow: false })
            this.props.onUpdateBook(values)
        }
        
    }
    handleCopySubmit(values) {
        this.setState({ copyShow: false })
        this.props.onGenerateBarcode(values)
    }
    handleDeleteSubmit() {
        this.setState({ confirmDelete: false})
        this.props.onDeleteBook(this.state.deleteId)
    }
    handleDeleteCancel = () => {
        this.setState({
            confirmDelete: false,
            deleteId: null,
        })
    }
    getConfirmInitialValues = () => {
        let barcode=[]
        if(this.props.bookCopyData && this.props.bookCopyData.barcode.length>0){
            this.props.bookCopyData.barcode.forEach(el => {
                barcode.push({"barcode":el})
            });
        }
        return {
            isbn: this.props.bookCopyData ? this.props.bookCopyData.isbn : '',
            author: this.props.bookCopyData ? this.props.bookCopyData.author : '',
            price: this.props.bookCopyData ? this.props.bookCopyData.price : '',
            title: this.props.bookCopyData ? this.props.bookCopyData.title : '',
            edition: this.props.bookCopyData ? this.props.bookCopyData.edition : '',
            noc: this.props.bookCopyData ? this.props.bookCopyData.noc : '',
            members:barcode
        };
    }
    handleConfirmCancel = () => {
        this.setState({
            confirmFormShow: false,
        })
        this.fetchData()
    }
    handleConfirmSubmit=(values)=>{
        this.setState({ confirmFormShow: false })
        this.props.onAddCopy(values)
    }
    activeFormatter(cell, row) {
        return (
            <div>
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row
                })} />
                <DeleteButton clicked={() => this.setState({
                    confirmDelete: true,
                    deleteId: row.id
                })}/>      
                <Button className="btn btn-sm btn-primary" onClick={() => this.setState({
                    copyShow: true,
                    copyData: row
                })}>Make Copy</Button>        
            </div>
        )
    }
    statusFormatter(cell, row) {
        let status=""
        switch (row.status) {
            case "OUT_OF_CIRCULATION":
                status="Out of circulation"
                break;
            case "NOT_ALLOWED_TO_BORROW":
                status="Not allowed to borrow"
                break;
            case "ALLOWED_TO_BORROW":
                status="Allowed to borrow"
                break;
        }
        return (
            status
        )
    }
    imageFormatter(cell, row){
        return (<img className="img-thumbnail" src={cell}/>)
    }
    bookDescriptionFormat(cell, row) {
        let author=row.author.join(", ")
        let position="Available at "+row.ddc
        let position_class= "text-success"
        if(row.status=="NOT_AVAILABLE"){
            position="Not available"
            position_class="text-danger"
        }
        return (
            <>
                <a href="https://www.google.com"><h2 className="font-weight-bolder">{row.title}: {row.sub}</h2></a>
                <p>by {author}</p>
                <p>Edition: {row.edition}</p>
                <p className={position_class}>{position}</p>
            </>
            )
    }
    getInitialValues = () => {
        let author = []
        let genre=[]
        if(this.state.updateData){
            this.state.updateData.author.forEach(el=>{
                author.push({"value":el,"label":el})
            })
            this.state.updateData.genres.forEach(el=>{
                genre.push({"value":el,"label":el})
            })
        }
        return {
            isbn: this.state.updateData ? this.state.updateData.isbn : '',
            title: this.state.updateData ? this.state.updateData.title : '',
            sub: this.state.updateData ? this.state.updateData.sub : '',
            ddc: this.state.updateData ? this.state.updateData.ddc : '',
            publisher: this.state.updateData ? this.state.updateData.publisher : '',
            publishyear: this.state.updateData ? this.state.updateData.publishyear : '',
            language: this.state.updateData ? this.state.updateData.language : '',
            nop: this.state.updateData ? this.state.updateData.nop : '',
            edition: this.state.updateData ? this.state.updateData.edition : '',
            status: this.state.updateData ? this.state.updateData.status : '',
            author: author,
            genres: genre,
            img: this.state.updateData ? this.state.updateData.img : '',
            id:this.state.updateData ? this.state.updateData.id : ''
        };
    }
    getInitialCopyValues(){
        return {
            isbn: this.state.copyData ? this.state.copyData.isbn : '',
            title: this.state.copyData ? this.state.copyData.title : '',
            id:this.state.copyData ? this.state.copyData.id : ''
        };
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
                    <TableHeaderColumn dataField="img"  dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="50%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="30%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
                <Modal size="lg" backdrop="static" show={this.state.addFormShow} onHide={() => this.handleAddCancel()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BookFormImg authorList={this.props.authorData} genreList={this.props.genreData} handleCancel={() => this.handleAddCancel()} onSubmit={(values) => this.handleAddSubmit(values)} />
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
                        <CopyForm initialValues={this.getInitialCopyValues()} handleCancel={() => this.handleCopyCancel()} onSubmit={(values) => this.handleCopySubmit(values)} />
                    </Modal.Body>
                </Modal>
                <Modal backdrop="static" show={this.state.confirmFormShow} onHide={() => {this.handleConfirmCancel()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Book Copy</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmCopyForm initialValues={this.getConfirmInitialValues()} handleCancel={() => this.handleConfirmCancel()} onSubmit={(value) => this.handleConfirmSubmit(value)}/>
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
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                <Header />
                <Container className="mt-3" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            {/* <h3 className="mb-0">Book tables</h3> */}
                        </CardHeader>
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
        genreData: state.book.genreData
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
        onGetGenre: () => dispatch(actions.getGenre())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)

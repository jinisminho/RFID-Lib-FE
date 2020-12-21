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
import { Navbar,FormGroup, FormControl } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
} from "reactstrap";
class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        this.fetchData();
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
        console.log(page,sizePerPage)
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
    }
    activeFormatter(cell, row) {        
        return (
            <div>
                <button type="button" rel="tooltip" data-placement="left" title="" className="btn btn-success btn-simple btn-icon" data-original-title="Edit Book">
                    <i className="fa fa-edit"></i>
                </button>
                <button type="button" rel="tooltip" data-placement="left" title="" className="btn btn-danger btn-simple btn-icon " data-original-title="Remove">
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        )
    }
    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            hideSizePerPage: true,
        };
        let display= (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4 puul-left">
                    <Navbar>
                            <FormGroup>
                                <FormControl   value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                                <button onClick={() => this.handleSearch()} className="btn btn-simple  "><span><i className="fa fa-search"></i></span></button>
                            </FormGroup>
                            </Navbar>                    
                    </div>
                    <div className="col-md-4 col-lg-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-info btn-fill btn-wd pull-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Category
                        </button>
                    </div>
                </div>

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
                >
                    <TableHeaderColumn dataField="isbn" isKey dataAlign="center">ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataAlign="center">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" dataAlign="center" >Author</TableHeaderColumn>
                    <TableHeaderColumn dataField="publisher" dataAlign="center">Publisher</TableHeaderColumn>
                    <TableHeaderColumn dataField="language" dataAlign="center" >Language</TableHeaderColumn>
                    <TableHeaderColumn dataField="nop" dataAlign="center" >Number of page</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" >Category</TableHeaderColumn>
                    <TableHeaderColumn dataField="edition" dataAlign="center" >Edition</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
            </div>
        )    
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Card tables</h3>
                            </CardHeader>
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
        updateSuccess: state.book.updateSuccess,
        addSuccess: state.book.addSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getBook(page, size, search))
        // onDeleteBook: (id) => dispatch(actions.deleteBook(id)),
        // onUpdateBook: (data) => dispatch(actions.updatBook(data)),
        // onAddBook: (data) => dispatch(actions.addBook(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)

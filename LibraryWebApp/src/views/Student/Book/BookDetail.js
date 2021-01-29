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
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'
import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
import MyUtil from 'store/utility'
class BookDetail extends React.Component {
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
            book: this.props.location.state.book
        }
    }
    componentDidMount() {
    }
    componentDidUpdate() {
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
        let thisBook = [];
        thisBook.push(row)
        console.log(row, thisBook);
        let author = row.author.join(", ")
        let position = "Available at " + row.ddc
        let position_class = "text-success"
        if (row.status == "NOT_AVAILABLE") {
            position = "Not available"
            position_class = "text-danger"
        }
        return (
            <>
                <Link to={{
                    pathname: '/student/book/detail',
                    state: {
                        book: thisBook
                    }
                }}><h2 className="font-weight-bolder text-info">{row.title}: {row.sub}</h2></Link>
                <p>by {author}</p>
                <p>Edition: {row.edition}</p>
                <p className={position_class}>{position}</p>
            </>
        )
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
            position : true,
            totalCopies : true
        }
        const hide2 = {
            title : true,
            author: true,
            publisher: true,
            publishYear: true,
            edition : true,
            language: true,
            nop: true,
            warn: true,
        }
        const verticalCenter = {
            // margin: "0",
            // position: "absolute",
            // top: "300%"
            minHeight: "100%",  /* Fallback for browsers do NOT support vh unit */
            minHeight: '100vh', /* These two lines are counted as one :-)       */

            display: 'flex',
            alignItems: 'center'
        };
        let display = (
            <div className="content">
                <BootstrapTable
                    data={this.state.book}
                    options={options}
                    condensed
                    // className="ml-4 mr-4"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="30%" isKey>Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataFormat={MyUtil.bookDescriptionFormat}  formatExtraData={hide}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="20%" dataFormat={MyUtil.bookDescriptionFormat}  formatExtraData={hide2}>Description</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}
            </div>
        )
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                <Header />
                {/* <Container style={verticalCenter} fluid> */}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)

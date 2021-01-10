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
import NotiModal from '../../components/Modals/NotiModal'
import { Alert } from 'react-bootstrap'
import {
    Card,
    CardHeader,
    CardFooter,
    Container
} from "reactstrap";
import WhislistModal from "components/Modals/WhislistModal"
import MyUltil from 'store/ultility'
class BookStu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            whislistShow: false,
            studentId: null,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this);
        this.fetchWhislist = this.fetchWhislist.bind(this);
    }
    componentDidMount() {
        this.fetchData();
        // get then set studentId
        this.setState({ studentId: 'test' });
    }
    componentDidUpdate() {
        let msg = null
        if (this.props.reqReminderSuccess) {
            msg = "Request reminder succussful"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
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

    fetchWhislist(page = this.props.whislistPage, sizePerPage = this.props.whislistSizePerPage, searchValue = this.state.whislistSearchValue) {
        this.props.onGetWhislist(page - 1, sizePerPage, searchValue)
    }

    activeFormatter(cell, row) {
        if(row.stock <= 0)
        return (
            <div>
                <Button className="btn btn-sm btn-primary" onClick={() => this.handleAddReminder(row.id, this.state.studentId)}>Remind me later</Button>
            </div>
        )
    }

    handleAddReminder(bookId,studentId) {
        this.setState({
            errorShow: true,
            successShow: true
        })
        this.props.onAddReminder(bookId,studentId);
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
                            <FormControl value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="e.g. George Orwell, 0439708184, &quot;On the Origin of Species&quot;" />
                            <InputGroup.Append>
                                <button onClick={() => this.handleSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-8 pr-4 pull-right">
                        <button onClick={() => this.setState({ whislistShow: true })}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            <i className="ni ni-notification-70"></i> Whislist
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
                    keyField="id"
                >
                    <TableHeaderColumn dataField="isbn" width="12%"dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="55%" headerAlign="center" dataFormat={MyUltil.bookDescriptionFormat} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="12%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Category</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" width="20%" dataFormat={this.activeFormatter} >Action</TableHeaderColumn>
                </BootstrapTable>
                {/* delete popup */}


            </div>
        )

        if (this.props.loading) {
            display = <Spinner />
        }

        let errorMsg = null
        let msg = null
        if (this.props.error && this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }
        if (this.props.successMsg && this.state.successShow) {
            msg = <Alert key="success" variant="success" onClose={() => this.setState({ successShow: false })} dismissible>{this.props.successMsg}</Alert>
        } else {

        }

        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Book</h3>
                        </CardHeader>
                        {errorMsg}
                        {msg}
                        {display}

                    </Card>

                    <WhislistModal
                            show={this.state.whislistShow}
                            hide={() => this.setState({ whislistShow: false })}
                            title="Whisist"
                            data={this.props.whislistData}
                            totalSize={this.props.whislistTotalSize}
                            page={this.props.whislistPage}
                            studentId={this.state.studentId}
                            fetchData={this.fetchWhislist}
                        />

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.bookStu.loading,
        data: state.bookStu.data,
        error: state.bookStu.error,
        totalSize: state.bookStu.total,
        page: state.bookStu.page,
        sizePerPage: state.bookStu.sizePerPage,
        successMsg : state.info.successMsg,
        whislistData: state.bookStu.whislistData,
        whislistTotalSize: state.bookStu.whislistTotalSize,
        whislistPage: state.bookStu.whislistPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getBookStudentSide(search, page, size)),
        onAddReminder: (bookId, studentId) => dispatch(actions.addReminder(bookId, studentId)),
        onGetWhislist: (page, size, search) => dispatch(actions.getWhislist(search, page, size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStu)
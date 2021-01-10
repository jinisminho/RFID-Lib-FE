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
import { Route, Switch, Redirect } from "react-router-dom";

// reactstrap components
import { Container, Row, Col, Alert } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import SearchForm from 'components/Forms/SearchForm'
import SearchResult from 'views/Search/SearchResult'
import BookDetailModal from '../components/Modals/BookDetailModal';

class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showDetail: false,
            detailData: null,
            searchStr: ''
        }
        this.fetchData = this.fetchData.bind(this);
        this.setStateDetailData = this.setStateDetailData.bind(this);
        this.handleDetailClose = this.handleDetailClose.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);

    }

    componentDidMount() {
        document.body.classList.add("bg-default");
    }
    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchStr = this.state.searchStr) {
        this.props.onFetchData(page - 1, sizePerPage, searchStr)
    }
    setStateDetailData(rowData, rowMeta) {
        var objArr = []

        objArr.push(this.props.data[rowMeta["rowIndex"]])

        this.setState({
            showDetail: true,
            detailData: objArr
        })
    }
    handleDetailClose = () => {
        this.setState({
            showDetail: false,
            detailData: null
        })
    }

    handleSearch(searchVal) {     
        
        const doFetchData = async () => {
            await this.setState({
                successShow: false,
                errorShow: false,
                searchStr: searchVal
            })
            await this.fetchData(1, this.props.sizePerPage, this.state.searchStr)           
            this.props.history.push('/search/result');

            return
        }

        return doFetchData()

    }

    handlePageChange(page) {
        this.fetchData(page+1, this.props.sizePerPage, this.state.searchStr);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchStr);

    }

    render() {
        let form = <SearchForm editClassName="shadow mw-100" onSubmit={(value) => this.handleSearch(value.search)} formTitle="Quick Search for Book" placeholder="e.g. George Orwell, 0439708184, &quot;On the Origin of Species&quot;" />

        return (
            <>
                <div className="main-content">
                    <AuthNavbar />
                    <div className="header bg-gradient-info py-7 py-lg-8">
                        <Container>
                            <div className="header-body text-center mb-7">
                                <Row className="justify-content-center">
                                    <Col lg="5" md="6">
                                        <h1 className="text-white">FPT University Library</h1>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <div className="separator separator-bottom separator-skew zindex-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="fill-default"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </div>
                    {/* Page content */}
                    <Container className="mt--8 pb-5" style={{ "maxWidth": '80%' }}>
                        <Row className="justify-content-center">
                            <Col className="col-md-5 col-lg-5 col-sm-6 h-100 col-md-offset-3 col-lg-offset-3">
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            {form}
                        </Row>
                        <Row className="justify-content-center">
                            <Route path="/search/result" >
                                <SearchResult
                                    className="mt-1 pb-auto mw-100" 
                                    data={this.props.data}
                                    count={this.props.totalSize}
                                    rowsPerPage={this.props.sizePerPage}
                                    onChangePage={this.handlePageChange}
                                    onChangeRowsPerPage={this.handleSizePerPageChange}
                                    page={this.props.page}
                                    onRowClick={(rowData, rowMeta) => { this.setStateDetailData(rowData, rowMeta) }} />
                            </Route>
                            <BookDetailModal
                                show={this.state.showDetail}
                                hide={() => this.handleDetailClose()}
                                data={this.state.detailData}
                                title="Detail"
                            />
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.guest.data,
        error: state.guest.error,
        totalSize: state.guest.total,
        page: state.guest.page,
        sizePerPage: state.guest.sizePerPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchData: (page, size, searchStr) => dispatch(actions.getBooks(page, size, searchStr)),
        onFetchData: (page, size, searchStr) => dispatch(actions.getBooks(searchStr, page, size)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest)

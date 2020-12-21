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

import routes from "routes.js";
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import SearchForm from 'views/Search/Search'
import SearchResult from 'views/Search/SearchResult'

import Spinner from 'components/Spinner/Spinner'

class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.fetchData = this.fetchData.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }
    
    componentDidMount() {
        document.body.classList.add("bg-default");
    }
    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }
    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchStr = this.props.searchStr) {
        this.props.onFetchData(page - 1, sizePerPage, searchStr)
    }
    getBooks(searchStr) {
        this.props.onGetBooks(searchStr)
        this.props.history.push('/search/result');
    }

    render() {
        let form = <SearchForm onSubmit={(value) => this.getBooks(value.search)} />

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
                    <Container className="mt--8 pb-5">
                        <Row className="justify-content-center">
                            <Col className="col-md-5 col-lg-5 col-sm-6 h-100 col-md-offset-3 col-lg-offset-3">
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            {form}
                        </Row>
                        <Row className="justify-content-center">
                            <Route path="/search/result" ><SearchResult data={this.props.data}/></Route>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchData: (page, size, searchStr) => dispatch(actions.getBooks(page, size, searchStr)),
        onGetBooks: (searchStr) => dispatch(actions.getBooks(searchStr)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest)

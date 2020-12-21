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
import { Container, Row, Col,Alert } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";

import routes from "routes.js";
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import Login from 'views/Login/Login'

import Spinner from 'components/Spinner/Spinner'
class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
  }
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  // getRoutes = routes => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/auth") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  render() {
    let form = <Login onSubmit={values => this.props.onAuth(values["username"], values["password"])} />
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            let msg=null
            switch(this.props.error){
                case "Unauthorized":
                    msg="Username or password is not correct"
                    break;
                default:
                    msg="Error"
                    break
            }
            errorMessage = <Alert color="danger">
            {msg}
          </Alert>
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
          authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome to FPT University Library</h1>
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
              {authRedirect}
              <Col className="col-md-5 col-lg-5 col-sm-6 h-100 col-md-offset-3 col-lg-offset-3">
              {errorMessage}
               </Col>
              {/* <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch> */}
            </Row>
            <Row className="justify-content-center">
               {form}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
      token:state.Auth.token,
      loading: state.Auth.loading,
      error: state.Auth.error,
      isAuthenticated: state.Auth.token !== null,
      authRedirectPath: state.Auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password) => dispatch(actions.auth(username, password)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

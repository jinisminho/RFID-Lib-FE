import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdminLayout from "../../layouts/Admin.js";
import AuthLayout from '../../layouts/Auth';
import GuestLayout from '../../layouts/Guest';
import StudentLayout from '../../layouts/Student';
import LibrarianLayout from '../../layouts/Librarian';
import * as actions from '../../store/actions/index'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false,
        message:''
    }
    this.setShow = this.setShow.bind(this);
  }
  setShow(status){
    this.setState({
      show:status
    })
  }
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  render() {

    let display = (
      <div className="wrapper">
        <Switch>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Route path="/search" render={props => <GuestLayout {...props} />} />
          <Redirect from="*" to="/auth" />
        </Switch>
      </div>
    )
    if (this.props.isAuthenticated) {
      if (localStorage.getItem("role") == "ADMIN") {
        display = (
            <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect to="/admin" />
          </Switch>
        )
      }
      else if (localStorage.getItem("role") == "STUDENT") {
        display = (
            <Switch>
            <Route path="/student" render={props => <StudentLayout {...props} />} />
            <Redirect to="/student" />
          </Switch>
        )
      }
      else if (localStorage.getItem("role") == "LIBRARIAN") {
        display = (
            <Switch>
            <Route path="/librarian" render={props => <LibrarianLayout {...props} />} />
            <Redirect to="/librarian" />
          </Switch>
        )
      }
       else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiryDate')
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        localStorage.removeItem('username')

      }
    }
    return (
      <div>{display}</div>
    )
  };
}

const mapStateToProp = state => {
  return {
    isAuthenticated: state.Auth.token !== null,
    role: state.Auth.role
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));
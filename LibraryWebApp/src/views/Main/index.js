import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AdminLayout from "../../layouts/Admin.js";
import AuthLayout from '../../layouts/Auth';
import GuestLayout from '../../layouts/Guest';
import PatronLayout from '../../layouts/Patron';
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
          {/* <Route path="/search" render={props => <GuestLayout {...props} />} /> */}
          {/* <Redirect from="*" to="/auth" /> */}
        </Switch>
      </div>
    )
    if (this.props.isAuthenticated) {
      if (this.props.role == "ROLE_ADMIN") {
        display = (
            <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect to="/admin" />
          </Switch>
        )
      }
      else if (this.props.role == "ROLE_PATRON") {
        display = (
            <Switch>
            <Route path="/patron" render={props => <PatronLayout {...props} />} />
            <Redirect to="/patron" />
          </Switch>
        )
      }
      else if (this.props.role == "ROLE_LIBRARIAN") {
        display = (
            <Switch>
            <Route path="/librarian" render={props => <LibrarianLayout {...props} />} />
            <Redirect to="/librarian" />
          </Switch>
        )
      }
       else {
        localStorage.removeItem("Userid")
            localStorage.removeItem("Role")
            localStorage.removeItem("Avatar")
            localStorage.removeItem("Username")
        this.props.onLogout()
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
    onLogout: () => dispatch(actions.logout()),
  }
}

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));
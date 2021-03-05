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
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row,Col} from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import ChangePasswordForm from './changePassForm'
import {reset} from 'redux-form';
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorShow: false,
            successShow:false,
            successNotice:""
        }
    }
    componentDidUpdate() {
        let msg= null
        if (this.props.changePasswordSuccess) {
            msg = "Change password successfully"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true})
        }
        
    }
    handleModalClose() {
        this.props.onCloseChangePassword()
        this.setState({ successShow: false, errorShow: false,successNotice:""})

    }
    render() {
        let display = (
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <ChangePasswordForm  onSubmit={(values) => this.props.onChangePassword(this.props.userid,values.currentPassword,values.newPassword)}/>
                </Row>

                <br />
            </div>
        )
        if (this.props.loading) {
            display = <Spinner />
        }
        return (
            <>
                {/* <Header /> */}
                <Container className="mt-md-3">
                <Card className="shadow">
                    <Row className="justify-content-center">
                        <Col className="col-4">
                    
                    <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                    <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
                        {display}
                    </Col>
                    </Row>
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.Auth.loading,
        error: state.Auth.error,
        changePasswordSuccess:state.Auth.changePasswordSuccess,
        userid:state.Auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (id,current, newPw) => dispatch(actions.changePassword(id,current,newPw)),
        onCloseChangePassword: () =>{dispatch(actions.closeChangePassword()); dispatch(reset('changePasswordForm'));},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

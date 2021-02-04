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
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { isValid, isSubmitting, isDirty, submit } from 'redux-form';
import { Alert } from 'react-bootstrap'
import ProfileForm from '../../components/Forms/ProfileForm'
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    Input,
    Container,
} from "reactstrap";
//css


class BookStu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successNotice: '',
            successShow: false,
            errorShow: false,
            edited: false,
            submited: false,
            selectedImage: null,
            studentId: null,
            newEmail: null,
            newFstName: null,
            newLstName: null,
        }
        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {

        const doFetchData = async () => {
            //Get and set student id, reset edited
            await this.setState({
                studentId: '1'
            })

            //Then fetchData
            await this.fetchData(this.state.studentId);

            //Set img src
            // document.getElementById('profileImg').src = require("assets/img/theme/team-4-800x800.jpg")
            document.getElementById('profileImg').src = this.props.profile.img ? this.props.profile.img :"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"

            return
        }

        doFetchData()

    }

    componentDidUpdate() {
        if (this.state.submited) {
            this.setState({ submited: false, edited: false })
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
    }

    fetchData(studentId = this.state.studentId) {
        this.props.onFetchData(studentId)
    }

    getInitialValues = () => {
        return {
            fullname: this.props.profile.fullname,
            email: this.props.profile.email,
            department: this.props.profile.department,
            phone: this.props.profile.phone
        };
    }

    onSubmit = (form) => {
        // console.log(JSON.stringify(form, null, 2));
        this.props.onSubmitUpdate(this.state.studentId, form)
        this.setState({ successShow: true, submited: true })
        this.fetchData()
    }

    render() {
        let display = (
            <>
                <Row className="w-100 m-0 p-0">
                    <Card className="bg-secondary w-100 border-0">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center mx-1 mx-sm-0">
                                <Col xs="9" xl="11">

                                </Col>
                                <Col xs="3" xl="1">
                                    <Button
                                        color="primary"
                                        href="#pablo"
                                        onClick={this.props.submitForm}
                                        size="lg"
                                        disabled={!(this.props.formEnabled || (this.state.edited && this.props.formIsValid))}
                                        label="Submit"
                                        block
                                        text-truncate="true"
                                    >
                                        Save
                                        </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody style={{ height: '168px' }}>
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">


                                    <div className="card-profile-image">
                                        <a href="#pablo">
                                            <img
                                                alt="..."
                                                id="profileImg"
                                                className="rounded-circle"
                                                src='#'
                                            />
                                        </a>
                                    </div>


                                </Col>
                            </Row>
                        </CardBody>
                        <ProfileForm enableReinitialize initialValues={this.getInitialValues()} onSubmit={this.onSubmit} />
                    </Card>
                </Row>

            </>
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
        }

        return (
            <>
                {/* <Header /> */}
                <Container className="mt-3" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            {/* <h3 className="mb-0">Profile</h3> */}
                        </CardHeader>
                        {errorMsg}
                        {msg}
                        {display}
                    </Card>
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
        successMsg: state.info.successMsg,
        profile: state.info.profile,
        formEnabled: isValid('ProfileForm')(state) && !isSubmitting('ProfileForm')(state) && isDirty('ProfileForm')(state),
        formIsValid: isValid('ProfileForm')(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (studentId) => dispatch(actions.getStudentProfile(studentId)),
        submitForm: () => dispatch(submit('ProfileForm')),
        onSubmitUpdate: (studentId, form) => dispatch(actions.updateStudentProfile(studentId, form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStu)
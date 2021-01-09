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
import './student.css';


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
            document.getElementById('profileImg').src = require("assets/img/theme/team-4-800x800.jpg")

            return
        }

        doFetchData()

    }

    componentDidUpdate() {
        if(this.state.submited) {
            this.setState({ submited: false, edited: false})
        }
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true, searchValue: '' })
        }
    }

    fetchData(studentId = this.state.studentId) {
        this.props.onFetchData(studentId)
    }

    fileSelectHandler = (event) => {
        // const image = event.target.files[0]
        // const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // uploadTask.on('state_changed',
        // (snapshot)=>{
        //     this.setState({imageLoading:true})
        // },
        // (error)=>{
        //     console.log(error)
        //     this.setState({imageLoading:false})
        // },
        // ()=>{
        //     this.setState({imageLoading:false})
        //     storage.ref('images').child(image.name).getDownloadURL().then(url =>{
        //         this.props.onUpdateImage(this.state.updateImageId, url)
        //     })
        // }
        // )

        document.getElementById('profileImg').src = window.URL.createObjectURL(event.target.files[0])

        this.setState({ edited: true, selectedImage: event.target.files[0] })
    }

    getInitialValues = () => {
        return {
            username: this.props.usrName,
            email: this.props.email,
            fstName: this.props.fstName,
            lstName: this.props.lstName
        };
    }

    onSubmit = (form) => {
        // console.log(JSON.stringify(form, null, 2));
        this.props.onSubmitUpdate(this.state.studentId, this.state.selectedImage, form)
        this.setState({successShow: true, submited: true})
        this.fetchData()
    }

    render() {
        let display = (
            <div className="content">
                <Row>
                    <Col>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="11">

                                    </Col>
                                    <Col xs="1">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={this.props.submitForm}
                                            size="lg"
                                            disabled={!(this.props.formEnabled || (this.state.edited && this.props.formIsValid))}
                                            label="Submit"
                                            block
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody style={{ height: '168px' }}>
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">

                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Upload new Profile Picture</Tooltip>}>
                                            <div className="my-card-profile-image">
                                                <a href="#pablo" onClick={() => { document.getElementById("selectImage").click() }}>
                                                    <img
                                                        alt="..."
                                                        id="profileImg"
                                                        className="rounded-circle"
                                                        src='#'
                                                    />
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                                    </svg>

                                                    <input onChange={this.fileSelectHandler} accept="image/*" id="selectImage" type="file" style={{ display: 'none' }} />
                                                </a>
                                            </div>
                                        </OverlayTrigger>

                                    </Col>
                                </Row>
                            </CardBody>
                            <ProfileForm enableReinitialize initialValues={this.getInitialValues()} onSubmit={this.onSubmit}/>
                            <CardBody>


                            </CardBody>
                        </Card>
                    </Col>
                </Row>
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
        }

        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">Profile</h3>
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
        usrName: state.info.usrName,
        email: state.info.email,
        fstName: state.info.fstName,
        lstName: state.info.lstName,
        profile: state.info.profile,
        formEnabled: isValid('ProfileForm')(state) && !isSubmitting('ProfileForm')(state) && isDirty('ProfileForm')(state),
        formIsValid: isValid('ProfileForm')(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (studentId) => dispatch(actions.getStudentProfile(studentId)),
        submitForm: () => dispatch(submit('ProfileForm')),
        onSubmitUpdate: (studentId,iamge,form) => dispatch(actions.updateStudentProfile(studentId,iamge,form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStu)
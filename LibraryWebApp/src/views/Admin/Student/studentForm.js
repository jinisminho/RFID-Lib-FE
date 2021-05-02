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
import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import DropZoneField from "../../../components/Dropzone/Dropzone";
import 'react-datepicker/dist/react-datepicker.css';
import * as MyConstant from '../../Util/Constant'
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Label,
    Col
} from "reactstrap";
import { Popover, OverlayTrigger, Row } from 'react-bootstrap'

const renderField = ({ input, placeholder, type, meta: { touched, error }, title, isRequired }) => (
    <>
        <Row>
            <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
        </Row>
        <Row>
            <InputGroup className="input-group-alternative">
                <Input {...input} placeholder={placeholder} type={type} />
                {touched && ((error && <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="right"
                    overlay={
                        <Popover>
                            <Popover.Content>
                                <span className="text-danger">{error}</span>
                            </Popover.Content>
                        </Popover>
                    }
                >
                    <Button onClick={(e) => e.preventDefault()} className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
                </OverlayTrigger>))}
            </InputGroup>
        </Row>
    </>
)
const renderSelectOptions = (option) => (
    <option key={option} value={option}>{MyConstant.GENDER_LIST[option]}</option>
)
const renderSelectField = ({ input, meta: { touched, error }, title, options, isRequired }) => {
    return (
        <>
            <Row>
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Row>
            <Row >
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
                        {options ? options.map(renderSelectOptions) : null}
                    </select>
                    {touched && ((error && <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="right"
                        overlay={
                            <Popover>
                                <Popover.Content>
                                    <span className="text-danger">{error}</span>
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <Button onClick={(e) => e.preventDefault()} className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
                    </OverlayTrigger>))}
                </InputGroup>
            </Row>
        </>
    )
}
const renderSelectOptionsPatron = (option) => (
    <option key={option.id} value={option.id}>{option.name}</option>
)
const renderSelectPatron = ({ input, meta: { touched, error }, title, options, isRequired }) => {
    return (
        <>
            <Row>
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Row>
            <Row >
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
                        {options ? options.map(renderSelectOptionsPatron) : null}
                    </select>
                    {touched && ((error && <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="right"
                        overlay={
                            <Popover>
                                <Popover.Content>
                                    <span className="text-danger">{error}</span>
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <Button onClick={(e) => e.preventDefault()} className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
                    </OverlayTrigger>))}
                </InputGroup>
            </Row>
        </>
    )
}
const validateImage = value =>{
    let msg=undefined
    let imgExt=["PNG","JPEG","JPG","BMP","GIF"]
    if(!value){
      msg="Required"
    }else if(typeof value=="object"){ 
      if(!value[0]){
        msg="Image file is not valid"
      }else if(!imgExt.includes(value[0].name.split(".")[1].toUpperCase())){
        msg="Image file is not valid"
      }
    } 
    return msg
  }

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'Address is required';
    } else if (values.address.length < 3) {
        errors.address = 'Must be 3 characters or more';
    }
    if (!values.fullName) {
        errors.fullName = 'Patron name is required';
    } else if (values.fullName.length > 100) {
        errors.fullName = 'Patron name length is less than or equal 100';
    }else if(!/^[a-zA-Z\s]+$/i.test(values.fullName)){
        errors.fullName = 'Patron name is not valid';
    }
    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^(0)[0-9]{9}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone (ex: 0123456789)';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,2}$/i.test(values.email)) {
        errors.email = 'Invalid email address (ex: rfidlib@gmail.com)'
    }
    if (!values.rfid) {
        errors.rfid = 'RFID is required';
    }
    if (!values.gender) {
        errors.gender = 'Gender is required';
    }
    if (!values.patronTypeId) {
        errors.patronTypeId = 'Patron Type is required';
    }
    return errors;
};
const onKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); //<===== This stops the form from being submitted
    }
}
const RfidNormalizer = value => {
    return value.trim().toUpperCase()
}
class StudentForm extends Component {
    state = { imageFile: [] };
    componentDidMount() {
        if (this.props.initialValues) {
            if (this.props.initialValues.avatar) {
                this.setState({ imageFile: [this.props.initialValues.avatar] })
            }
        }
    }
    handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });
    render = () => (
        <Card className="bg-secondary shadow border-0">
            <CardBody>
                <Form onSubmit={this.props.handleSubmit} onKeyDown={onKeyPress}>
                    <Row className="text-center justify-content-center mb-5">
                        <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
                            <FormGroup className="mb-3">
                                <Field
                                    name="avatar"
                                    component={DropZoneField}
                                    type="file"
                                    imagefile={this.state.imageFile}
                                    handleOnDrop={this.handleOnDrop}
                                    validate={validateImage}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
                            <Row>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="rfid"
                                            component={renderField}
                                            type="text"
                                            isRequired
                                            placeholder="Enter RFID Number"
                                            normalize={RfidNormalizer}
                                            title="RFID Number"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="fullName"
                                            component={renderField}
                                            type="text"
                                            isRequired
                                            placeholder="Enter Full Name"
                                            title="Name"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="email"
                                            component={renderField}
                                            type="email"
                                            isRequired
                                            placeholder="Email"
                                            title="Email"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="phone"
                                            component={renderField}
                                            type="text"
                                            isRequired
                                            placeholder="Enter phone number"
                                            title="Phone"
                                        />
                                    </FormGroup>
                                </Col>
                                {/* <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="address"
                                            component={renderField}
                                            type="text"
                                            placeholder="Enter address"
                                            title="Address"
                                        />
                                    </FormGroup>
                                </Col> */}
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="gender"
                                        title="Gender"
                                        isRequired
                                        options={Object.keys(MyConstant.GENDER_LIST)}
                                        component={renderSelectField} />
                                        </FormGroup>
                                </Col>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="patronTypeId"
                                        type="select"
                                        placeholder="Select Patron Type"
                                        title="Patron Type"
                                        isRequired
                                        options={this.props.patronTypes}
                                        component={renderSelectPatron} />
                                        </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        {/* <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
                            <FormGroup className="mb-3">
                            <Field
                                name="dob"
                                type="text"
                                placeholder="Date of birth"
                                title="Date of birth"
                                component={FieldDatePicker} />
                            </FormGroup>
                        </Col> */}

                    </Row>
                    <div className="row">
                    <div className="col-6 text-left">
                        <span className="text-danger">* Required field</span>
                    </div>
                    <div className="col-6 text-right">
                    <button onClick={this.props.handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Cancel
                </button>
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Save
                </button>
                </div>
                </div>
                </Form>
            </CardBody>
        </Card>
    )
}
export default reduxForm({
    form: 'studentAddForm',
    validate
})(StudentForm)

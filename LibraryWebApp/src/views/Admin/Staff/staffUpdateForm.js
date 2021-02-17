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
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import * as MyConstant from '../../Util/Constant'
import moment from 'moment'
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

const renderField = ({ input, placeholder, type, meta: { touched, error }, title }) => (
    <>
      <Row>
        <Label>{title}</Label>
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
  const renderSelectField = ({ input, meta: { touched, error }, title, options }) => {
    return(
    <>
        <Row>
                <Label>{title}</Label>
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
  )}
const validateImage = value => !value ? "Required" : undefined

const validate = values => {
    const errors = {};
    if (!values.fullName) {
        errors.fullName = 'Staff name is required';
    } else if (values.fullName.length > 100) {
        errors.fullName = 'Staff name length is less than 100';
    }
    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^(0)[0-9]{9}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone';
    }
    if (!values.rfid) {
        errors.rfid = 'RFID is required';
    }
    return errors;
};
const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); //<===== This stops the form from being submitted
    } 
  }
class StaffUpdateForm extends Component {
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
                                            placeholder="Enter RFID Number"
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
                                            placeholder="Enter Staff Full Name"
                                            title="Name"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <FormGroup className="mb-3">
                                        <Field
                                            name="phone"
                                            component={renderField}
                                            type="text"
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
                                <Field
                                    name="gender"
                                    title="Gender"
                                    defaultValue={Object.keys(MyConstant.GENDER_LIST)[0]}
                                    options={Object.keys(MyConstant.GENDER_LIST)}
                                    component={renderSelectField}/>
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
                    <div className="text-right">
                        <button onClick={this.props.handleCancel} type="button" className="btn btn-wd btn-default" >
                            <span className="btn-label">
                            </span> Cancel
                </button>
                        <button type="submit" className="btn btn-wd btn-success ">
                            <span className="btn-label">
                            </span> Save
                </button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}
export default reduxForm({
    form: 'staffUpdateForm',
    validate
})(StaffUpdateForm)

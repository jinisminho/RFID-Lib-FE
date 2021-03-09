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
import * as MyConstant from '../Util/Constant'
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

const renderField = ({ input,isRequired, placeholder, type, meta: { touched, error }, title }) => (
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

const validate = values => {
    const errors = {};
    if (!values.currentPassword) {
        errors.currentPassword = 'Current password is required';
    }
    if (!values.newPassword) {
        errors.newPassword = 'New password is required';
    } else if (values.newPassword.length > 50 || values.newPassword.length < 6) {
        errors.newPassword = 'New password length is between 6 and 50';
    } else if (values.newPassword == values.currentPassword) {
        errors.newPassword = 'New password is similar to current password';
    }
    if (!values.confirm) {
        errors.confirm = 'Confirm password is required';
    } else if (values.confirm != values.newPassword) {
        errors.confirm = 'Password mismatch';
    }
    return errors;
};

class ChangePasswordForm extends Component {
    render = () => (
            <CardBody>
                <Form onSubmit={this.props.handleSubmit}>
                    <FormGroup className="mb-3">
                        <Field
                            name="currentPassword"
                            component={renderField}
                            type="password"
                            placeholder="Current password"
                            isRequired={true}
                            title="Current password"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="newPassword"
                            component={renderField}
                            type="password"
                            placeholder="New password"
                            isRequired={true}
                            title="New password"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="confirm"
                            component={renderField}
                            type="password"
                            placeholder="Confirm password"
                            isRequired={true}
                            title="Confirm password"
                        />
                    </FormGroup>
                    <div className="row mt-2">
                            <div className="col-6 text-left">
                                <span className="text-danger">* Required field</span>
                            </div>
                            <div className="col-6 text-right">
                        <button type="submit" className="btn btn-wd btn-success ">
                            <span className="btn-label">
                            </span> Save
                </button>
                    </div>
                    </div>
                </Form>
            </CardBody>
    )
}
export default reduxForm({
    form: 'changePasswordForm',
    validate
})(ChangePasswordForm)

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
import { Field, FieldArray, reduxForm } from 'redux-form';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    CardFooter
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <>
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
    </>
)

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'Address  is required';
    } else if (values.address.length < 3) {
        errors.address = 'Must be 3 characters or more';
    }
    if (!values.firstname) {
        errors.firstName = 'First name is required';
    } else if (values.firstName.length > 100) {
        errors.firstName = 'First name length is less than 100';
    }
    if (!values.lastname) {
        errors.lastName = 'Last name is required';
    } else if (values.lastName.length > 50) {
        errors.lastName = 'Last name length is less than 50';
    }
    if (!values.username) {
        errors.username = 'Username is required';
    } else if (values.username.length < 6) {
        errors.username = 'Must be 6 characters or more';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }
    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^(0)[0-9]{9}$/i.test(values.phone)) {
        errors.phone = 'Invalid phone';
    }
    if (!values.socialId) {
        errors.socialId = 'Social ID is required';
    } else if (!/^[0-9]{12}$/i.test(values.socialId)) {
        errors.socialId = 'Invalid Social ID';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.dob) {
        errors.dob = 'Date of birth is required';
    }
    return errors;
};

const StaffForm = ({
    handleSubmit,
    handleCancel
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-barcode" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="firstName"
                            component={renderField}
                            type="text"
                            placeholder="Enter first name"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-book-bookmark" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="lastName"
                            component={renderField}
                            type="text"
                            placeholder="Enter last Name"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-closed-captioning" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="username"
                            component={renderField}
                            type="text"
                            placeholder="Enter username"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-book-bookmark" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="password"
                            component={renderField}
                            type="password"
                            placeholder="Enter password"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-newspaper" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="email"
                            component={renderField}
                            type="email"
                            placeholder="Email"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-language" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="phone"
                            component={renderField}
                            type="text"
                            placeholder="Enter phone number"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-list-alt" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="address"
                            component={renderField}
                            type="text"
                            placeholder="Enter address"
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-list-alt" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                                    name="dob"
                                    component="input"
                                    className="form-control"
                                    type="date"
                                />
                    </InputGroup>
                </FormGroup>
                <div className="form-group">
                            <label className="control-label">Gender</label>
                            <div>

                                <Field name="gender" component={renderField}
                                    type="radio" value="M"
                                    label='Male'

                                />

                                <br />

                                <Field name="gender" component={renderField} label='Female'
                                    type="radio" value="F"
                                />

                            </div>
                        </div>
                <div className="text-right">
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
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
);

export default reduxForm({
    form: 'fieldArrays',
    validate
})(StaffForm)

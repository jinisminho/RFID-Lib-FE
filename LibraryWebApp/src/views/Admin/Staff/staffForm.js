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
    CardFooter,
    Label
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

const validate = values => {
    const errors = {};
    if (!values.address) {
        errors.address = 'Address  is required';
    } else if (values.address.length < 3) {
        errors.address = 'Must be 3 characters or more';
    }
    if (!values.name) {
        errors.name = 'Staff name is required';
    } else if (values.name.length > 100) {
        errors.name = 'Staff name length is less than 100';
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
                    <Field
                        name="name"
                        component={renderField}
                        type="text"
                        placeholder="Enter Staff Name"
                        title="Name"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="username"
                        component={renderField}
                        type="text"
                        placeholder="Enter username"
                        title="Username"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="password"
                        component={renderField}
                        type="password"
                        placeholder="Enter password"
                        title="Password"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="email"
                        component={renderField}
                        type="email"
                        placeholder="Email"
                        title="Email"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="phone"
                        component={renderField}
                        type="text"
                        placeholder="Enter phone number"
                        title="Phone"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="address"
                        component={renderField}
                        type="text"
                        placeholder="Enter address"
                        title="Address"
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Row>
                        <Label>Date of Birth</Label>
                    </Row>
                    <Row>
                        <InputGroup className="input-group-alternative">
                            <Field
                                name="dob"
                                component="input"
                                className="form-control"
                                type="date"
                            />
                        </InputGroup>
                    </Row>
                </FormGroup>
                <div className="form-group">
                    <label className="font-weight-bold mr-4">Gender:</label>
                    <Field name="gender" checked component="input" type="radio" value="M" /><label className="ml-1 mr-3"> Male</label>
                    <Field name="gender" component="input" type="radio" value="F" /><label className="ml-1 mr-3">Female</label>
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

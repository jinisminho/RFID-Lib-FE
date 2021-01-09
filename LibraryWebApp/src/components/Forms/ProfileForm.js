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
import { Field, reduxForm } from 'redux-form';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import { Popover, OverlayTrigger, Row, Col } from 'react-bootstrap'

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error } }) => (
    <>
        <Input {...input} disabled={disabled} placeholder={placeholder} type={type} />
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
    const errors = {}
    if (!values.email) {
        errors.email = 'Email is required'
    }
    return errors
}

let ProfileForm = ({
    handleSubmit
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="6">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-circle-08" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    disabled
                                    component={renderField} />
                            </InputGroup>
                        </FormGroup>

                    </Col>
                    <Col lg="6">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    component={renderField} />
                            </InputGroup>
                        </FormGroup></Col>
                </Row><Row>
                    <Col lg="6">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-caps-small" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    name="fstName"
                                    type="text"
                                    placeholder="First Name"
                                    component={renderField} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-caps-small" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                    name="lstName"
                                    type="text"
                                    placeholder="Last Name"
                                    component={renderField} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>

            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'ProfileForm',
    validate
})(ProfileForm)
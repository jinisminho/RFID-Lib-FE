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
    Label
} from "reactstrap";
import { Popover, OverlayTrigger, Row, Col } from 'react-bootstrap'

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error }, title }) => (
    <>
        {/* <div className="input-group-prepend">
            <span className="input-group-text">{title}</span>
        </div>
        <Input {...input} disabled={disabled} placeholder={placeholder} type={type} className="pl-2" />
        {touched && ((error && <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="left"
            overlay={
                <Popover>
                    <Popover.Content>
                        <span className="text-danger">{error}</span>
                    </Popover.Content>
                </Popover>
            }
        >
            <Button onClick={(e) => e.preventDefault()} className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
        </OverlayTrigger>))} */}


        <Row>
            <Col lg="3">
                <Label>{title}:</Label>
            </Col>
            <Col lg="9">
                <InputGroup className="input-group-alternative">
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
                </InputGroup>
            </Col>
        </Row>
    </>
)
const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Email is required'
    }
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (values.phone) {
        if (!values.phone.match(regex)) {
            errors.phone = 'Invalid Format'
        }
        if (values.phone.length != 10) {
            errors.phone = 'Must be 10 digits'
        }
    } else {
        errors.phone = 'Phone is required'
    }

    return errors
}

let ProfileForm = ({
    handleSubmit
}) => (
    <Card className="bg-secondary border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="3"/>
                    <Col lg="6">
                        <Row>
                            <FormGroup className="mb-3 ml-3 w-100">
                                <Field
                                    name="fullname"
                                    type="text"
                                    title="Fullname"
                                    placeholder="Fullname"
                                    disabled
                                    component={renderField} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup className="mb-3 ml-3 w-100">
                                <Field
                                    name="email"
                                    type="text"
                                    title="Email"
                                    placeholder="Email"
                                    disabled
                                    component={renderField} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup className="mb-3 ml-3 w-100">
                                <Field
                                    name="phone"
                                    type="text"
                                    title="Phone"
                                    placeholder="Phone Number"
                                    component={renderField} />
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col lg="3"/>
                </Row>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'ProfileForm',
    validate
})(ProfileForm)
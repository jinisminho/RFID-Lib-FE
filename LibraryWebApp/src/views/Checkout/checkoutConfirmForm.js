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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

const renderField = ({ input, isRequired, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Col>
            <Col lg="9">
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
            </Col>
        </Row>

    </>
)
const validate = values => {
    const errors = {}
    if (!values.reason) {
        errors.reason = 'Reason is required'
    }
    return errors
}




const CheckoutConfirmForm = ({
    handleSubmit
}) => (
    <Card className="bg-secondary shadow border-0 w-100">
        <CardBody>
            <Form onSubmit={handleSubmit}>
            <Row>
                <FormGroup className="mb-3 w-100">
                    <Field
                        name="reason"
                        type="textarea"
                        placeholder="Reason"
                        title="Reason"
                        isRequired={true}
                        component={renderField} />
                    </FormGroup>
            </Row>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'CheckoutConfirmForm',
    validate
})(CheckoutConfirmForm)

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
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Label
} from "reactstrap";
import { Popover, OverlayTrigger, Row } from 'react-bootstrap'

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Label>{title}</Label>
        </Row>
        <Row>
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
        </Row>

    </>
)
const validate = values => {
    const errors = {}
    if (!values.code) {
        errors.code = 'Code is required'
    }
    if (!values.book) {
        errors.book = 'Book is required';
    }
    return errors
}
const CopyForm = ({
    handleSubmit,
    handleCancel
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Field
                        name="isbn"
                        type="text"
                        placeholder="ISBN"
                        title="ISBN"
                        disabled
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="title"
                        type="text"
                        placeholder="Title"
                        title="Title"
                        disabled
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="edition"
                        type="text"
                        placeholder="Edition"
                        title="Edition"
                        disabled
                        component={renderField} />
                </FormGroup>

                <FormGroup className="mb-3">
                    <Field
                        name="rfidcode"
                        type="text"
                        placeholder="RFID Code"
                        title="RFID Code"
                        component={renderField} />
                </FormGroup>
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
})(CopyForm)

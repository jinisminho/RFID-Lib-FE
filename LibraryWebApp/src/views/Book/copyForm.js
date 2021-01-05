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
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'
const renderField = ({ input,disabled, placeholder, type, meta: { touched, error } }) => (
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
            <Button onClick={(e)=>e.preventDefault()}  className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
        </OverlayTrigger>))}
    </>
)
const renderCode = ({ fields, meta: { error, submitFailed } }) => (
    <>
        {fields.map((member, index) =>
            <InputGroup className="mb-3" key={index}>
                <Field
                    name={`${member}.code`}
                    type="text"
                    placeholder="Book's code"
                    component={renderField}
                    label="Book's Code" />
                <InputGroupAddon addonType="append">
                    <button
                        className="btn btn-wd btn-danger "
                        type="button"
                        onClick={() => fields.remove(index)}>x</button>
                </InputGroupAddon>
            </InputGroup>
        )}
        <button className="btn btn-wd btn-primary " type="button" onClick={() => fields.push({})}>Add Copy</button>
        {submitFailed && error && <span className="text-danger">{error}</span>}
    </>
)

const validate = values => {
    const errors = {}
    if (!values.members || !values.members.length) {
        errors.members = { _error: 'At least one code must be entered' }
    } else {
        const membersArrayErrors = []
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {}
            if (!member || !member.code) {
                memberErrors.code = "Book's code is required"
                membersArrayErrors[memberIndex] = memberErrors
            }
            return memberErrors
        })
        if (membersArrayErrors.length) {
            errors.members = membersArrayErrors
        }
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
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-barcode" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="isbn"
                            type="text"
                            placeholder="isbn"
                            disabled
                            component={renderField} />
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
                            name="title"
                            type="text"
                            placeholder="title"
                            disabled
                            component={renderField} />
                    </InputGroup>
                </FormGroup>
                <FieldArray name="members" component={renderCode} />
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

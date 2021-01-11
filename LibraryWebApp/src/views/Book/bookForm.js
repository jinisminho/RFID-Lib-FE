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
import { Popover, OverlayTrigger } from 'react-bootstrap'
import Row from "reactstrap/lib/Row";

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
const renderFieldAlter = ({ input, placeholder, type, meta: { touched, error } }) => (
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
const renderAuthors = ({ fields, meta: { error, submitFailed } }) => (
    <>
        <Row>
            <Label>Author</Label>
        </Row>
        {fields.map((member, index) =>
            <Row key={index}>
                <InputGroup className="mb-3 input-group-alternative">
                    <Field
                        name={`${member}.author`}
                        type="text"
                        placeholder="Author's name"
                        component={renderFieldAlter}
                        label="Author's Name" />
                    <InputGroupAddon addonType="append">
                        <button
                            className="btn btn-wd btn-danger "
                            type="button"
                            onClick={() => fields.remove(index)}>x</button>
                    </InputGroupAddon>
                </InputGroup>
            </Row>

        )}
        <Row>
            <button className="btn btn-wd btn-primary " type="button" onClick={() => fields.push({})}>Add Author</button>
            {submitFailed && error && <span className="text-danger">{error}</span>}
        </Row>

    </>
)
const validateNumber = value => {
    if (value < 1) {
        return 1
    } else {
        return value
    }
}
const validate = values => {
    const errors = {}
    if (!values.isbn) {
        errors.isbn = 'ISBN is required'
    }
    if (!values.title) {
        errors.title = 'Book title is required'
    }
    if (!values.publisher) {
        errors.publisher = 'Publisher is required'
    }
    if (!values.language) {
        errors.language = 'Language is required'
    }
    if (!values.nop) {
        errors.nop = 'Number of page is required'
    } else if (!/^[0-9]+$/i.test(values.nop)) {
        errors.nop = 'Number of page is not valid'
    }
    if (!values.category) {
        errors.category = 'Category is required'
    }
    if (!values.sub) {
        errors.sub = 'Sub title is required'
    }
    if (!values.ddc) {
        errors.ddc = 'DDC title is required'
    }
    if (!values.edition) {
        errors.edition = 'Edition is required'
    } else if (!/^[0-9]+$/i.test(values.edition)) {
        errors.edition = 'Edition is not valid'
    }
    if (!values.members || !values.members.length) {
        errors.members = { _error: 'At least one author must be entered' }
    } else {
        const membersArrayErrors = []
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {}
            if (!member || !member.author) {
                memberErrors.author = 'Author name is required'
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
const BookForm = ({
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
                        component={renderField} />

                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="title"
                        type="text"
                        placeholder="Title"
                        title="Title"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="sub"
                        type="text"
                        placeholder="Sub Title"
                        title="Sub Title"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="ddc"
                        type="text"
                        placeholder="DDC"
                        title="DDC"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="publisher"
                        type="text"
                        placeholder="Publisher"
                        title="Publisher"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="language"
                        type="text"
                        placeholder="Language"
                        title="Language"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="nop"
                        normalize={validateNumber}
                        type="number"
                        placeholder="Number of page"
                        title="Number of page"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="category"
                        type="text"
                        placeholder="Category"
                        title="Category"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="edition"
                        normalize={validateNumber}
                        type="number"
                        placeholder="Edition"
                        title="Edition"
                        component={renderField} />
                </FormGroup>
                <FieldArray name="members" component={renderAuthors} />
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
})(BookForm)

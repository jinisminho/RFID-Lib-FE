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
            <Button onClick={(e)=>e.preventDefault()}  className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
        </OverlayTrigger>))}
    </>
)
const renderAuthors = ({ fields, meta: { error, submitFailed } }) => (
    <>
        {fields.map((member, index) =>
            <InputGroup className="mb-3" key={index}>
                <Field
                    name={`${member}.author`}
                    type="text"
                    placeholder="Author's name"
                    component={renderField}
                    label="Author's Name" />
                <InputGroupAddon addonType="append">
                    <button
                        className="btn btn-wd btn-danger "
                        type="button"
                        onClick={() => fields.remove(index)}>x</button>
                </InputGroupAddon>
            </InputGroup>
        )}
        <button className="btn btn-wd btn-primary " type="button" onClick={() => fields.push({})}>Add Author</button>
        {submitFailed && error && <span className="text-danger">{error}</span>}
    </>
)
const validateNumber = value => {
    if(value < 1) {
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
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-barcode" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="isbn"
                            type="text"
                            placeholder="ISBN"
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
                            placeholder="Title"
                            component={renderField} />
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
                            name="publisher"
                            type="text"
                            placeholder="Publisher"
                            component={renderField} />
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
                            name="language"
                            type="text"
                            placeholder="Language"
                            component={renderField} />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-file" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="nop"
                            normalize={validateNumber}
                            type="number"
                            placeholder="Number of page"
                            component={renderField} />
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
                            name="category"
                            type="text"
                            placeholder="Category"
                            component={renderField} />
                    </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fas fa-code-branch" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="edition"
                            normalize={validateNumber}
                            type="number"
                            placeholder="Edition"
                            component={renderField} />
                    </InputGroup>
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

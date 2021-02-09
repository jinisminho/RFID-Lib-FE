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
    InputGroup,
    Label,
    Row,
    Col
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'
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
const renderSelectOptions = (option) => (
    <option key={option.label} value={option.value}>{option.label}</option>
)
const renderSelectField = ({ input, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Label>{title}</Label>
        </Row>
        <Row>
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
                        {options ? options.map(renderSelectOptions) : null}
                    </select>
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
    if (!values.price) {
        errors.price = 'Price is required'
    } else if (!/^[0-9]+$/i.test(values.price)) {
        errors.price = 'Price is not valid'
    }

    if (!values.numberOfCopies) {
        errors.numberOfCopies = 'Number of copy is required'
    } else if (!/^[0-9]+$/i.test(values.numberOfCopies)) {
        errors.numberOfCopies = 'Number of copy is not valid'
    }
    return errors
}
const CopyForm = ({
    handleSubmit,
    handleCancel,
    options
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                    <Field
                        name="isbn"
                        type="text"
                        placeholder="isbn"
                        title="ISBN"
                        disabled
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="title"
                        type="text"
                        placeholder="title"
                        title="Title"
                        disabled
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="copyTypeId"
                        title="Copy Type"
                        options={options}
                        component={renderSelectField}>
                    </Field>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="price"
                        type="number"
                        placeholder="Price"
                        title="Price"
                        normalize={validateNumber}
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="numberOfCopies"
                        type="number"
                        title="Number of copy"
                        normalize={validateNumber}
                        placeholder="Number of copy"
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
    form: 'bookMakeCopyForm',
    validate
})(CopyForm)

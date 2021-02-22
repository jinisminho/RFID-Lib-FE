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
import { Popover, OverlayTrigger, Row, Col } from 'react-bootstrap'

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}</Label>
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
    if (!values.code) {
        errors.code = 'Code is required'
    }
    if (!values.book) {
        errors.book = 'Book is required';
    }
    return errors
}
const renderFixedField = ({ meta, title }) => (
    <>
        <Row>
            <Label>{title + ": " + (meta.initial ? meta.initial : null)}</Label>
        </Row>
    </>
)

const renderSelectOptions = (option) => (
    <option key={option.id} value={option.id}>{option.name}</option>
)

const renderSelectField = ({ input, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}</Label>
            </Col>
            <Col lg="9">
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
            </Col>
        </Row>
    </>
)
const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); //<===== This stops the form from being submitted
    } 
  }
const validateNumber = value => {
    if (value < 1) {
        return 1
    } else {
        return value
    }
}

const CopyForm = ({
    handleSubmit,
    handleCancel,
    options,
    initialValues
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit} onKeyDown={onKeyPress}>
                <Row>
                    <Col lg="2"><Row><img className="img-thumbnail" src={initialValues.img}/></Row></Col>
                    <Col lg={{ size: 3, offset: 1 }}>
                        
                        <FormGroup className="mb-3">
                            <Field
                                name="barcode"
                                type="text"
                                placeholder="Barcode"
                                title="Barcode"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="isbn"
                                type="text"
                                placeholder="ISBN"
                                title="ISBN"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="title"
                                type="text"
                                placeholder="Title"
                                title="Title"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="subtitle"
                                type="text"
                                placeholder="Subtitle"
                                title="Subtitle"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="authors"
                                type="text"
                                placeholder="Author"
                                title="Author"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="edition"
                                type="text"
                                placeholder="Edition"
                                title="Edition"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>


                    </Col>
                    <Col lg="6" className="border-left">
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
                                name="copyType"
                                title="Copy Type"
                                options={options}
                                component={renderSelectField}>
                            </Field>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="rfid"
                                type="text"
                                placeholder="RFID Code"
                                title="RFID Code"
                                component={renderField} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ size: 'auto', offset: 9 }}>
                        <div className="text-right mt-2">
                            <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                <span className="btn-label">
                                </span> Cancel
                </button>
                            <button type="submit" className="btn btn-wd btn-success ">
                                <span className="btn-label">
                                </span> Save
                </button>
                        </div>
                    </Col>
                </Row>


            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'fieldArrays',
    validate
})(CopyForm)

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
                <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            {index+1}
                            </InputGroupText>
                        </InputGroupAddon>
                <Field
                    name={`${member}.barcode`}
                    type="text"
                    placeholder="Book's barcode"
                    component={renderField}
                    disabled
                    label="Book's barcode" />
            </InputGroup>
        )}
    </>
)

const ConfirmCopyForm = ({
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
                            placeholder="Title"
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
                            name="author"
                            type="text"
                            placeholder="Author"
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
                            name="edition"
                            type="text"
                            placeholder="Edition"
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
                            name="price"
                            type="text"
                            placeholder="Price"
                            disabled
                            component={renderField} />
                    </InputGroup>
                </FormGroup>
                <div style={{maxHeight: "400px", overflowY:"scroll"}}>
                <FieldArray name="members" component={renderCode} />
                </div>
                <div className="text-right">
                <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                    <span className="btn-label">
                    </span> Cancel
                </button>
                <button type="submit" className="btn btn-wd btn-success ">
                    <span className="btn-label">
                    </span> OK
                </button>
            </div>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'ConfirmCopyForm'
})(ConfirmCopyForm)

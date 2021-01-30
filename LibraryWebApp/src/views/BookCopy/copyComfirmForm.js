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
    Row,
    Col,
    Container,
    Label
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Label>{title}</Label>
        </Row>
        <Row>
            <InputGroup className="input-group-alternative">
                <Input {...input} placeholder={placeholder} type={type} disabled={disabled} />
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

const renderFieldAlter = ({ input, placeholder, disabled, type, meta: { touched, error } }) => (
    <>
        <Input {...input} placeholder={placeholder} type={type} disabled={disabled} />
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

// const renderCode = ({ fields, meta: { error, submitFailed } }) => (
//     <>
//         {fields.map((member, index) =>
//             <InputGroup className="mb-3" key={index}>
//                 <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                         {index + 1}
//                     </InputGroupText>
//                 </InputGroupAddon>
//                 <Field
//                     name={`${member}.barcode`}
//                     type="text"
//                     placeholder="Book's barcode"
//                     component={renderField}
//                     disabled
//                     label="Book's barcode" />
//             </InputGroup>
//         )}
//     </>
// )

const renderCode = ({ fields, meta: { error, submitFailed } }) => (
    <>
        <Row  className="ml-0 ml-sm-2">
            <Label>Generated Barcode(s) - Total: {fields.length}</Label>
        </Row>
        <Row className="ml-0 ml-sm-2">
            <div style={{ maxHeight: "400px", overflowY: "scroll", boxSizing: "border-box", width: "100%", paddingRight: "5px" }}>
                {fields.map((member, index) =>
                    // <Row key={index}>
                    <InputGroup className="mb-3 input-group-alternative" key={index}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                {index + 1}
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name={`${member}.barcode`}
                            type="text"
                            placeholder="Book's barcode"
                            component={renderFieldAlter}
                            disabled
                            label="Book's barcode" />
                    </InputGroup>
                    // </Row>

                )}
            </div>
        </Row>
    </>
)

const renderFixedField = ({ meta, title }) => (
    <>
        <Row>
            <Label>{title + ": " + (meta.initial ? meta.initial : null)}</Label>
        </Row>
    </>
)

const ConfirmCopyForm = ({
    handleSubmit,
    handleCancel
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="6">
                        <FormGroup className="mb-3">
                            <Field
                                name="isbn"
                                type="text"
                                placeholder="isbn"
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
                                name="author"
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
                        <FormGroup className="mb-3">
                            <Field
                                name="price"
                                type="text"
                                placeholder="Price"
                                title="Price"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="copyType"
                                type="text"
                                placeholder="Copy Type"
                                title="Copy Type"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                    </Col>
                    <Col lg="6" className="border-left">
                        <FieldArray name="members" component={renderCode} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="0" lg={{ size: 'auto', offset: 9 }}>
                        <div className="text-right mt-2">
                            <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                <span className="btn-label">
                                </span> Cancel
                </button>
                            <button type="submit" className="btn btn-wd btn-success ">
                                <span className="btn-label">
                                </span> Confirm
                </button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'ConfirmCopyForm'
})(ConfirmCopyForm)

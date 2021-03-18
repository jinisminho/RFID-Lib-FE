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
    Row,
    Col,
    Label,
    InputGroup
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

const validate = values => {
    const errors = {}
   
    if (!values.fine) {
        errors.fine = 'Book lost fine is required'
    } else if (!/^[0-9]+$/i.test(values.fine)) {
        errors.fine = 'Book lost fine is not valid'
    } else if (parseInt(values.fine) < 1000 || parseInt(values.fine) > 1000000000) {
        errors.fine = 'Book lost fine is between 1000 VND and 1000000000 VND'
    }

    return errors
}
const renderField = ({ input, disabled, isRequired, placeholder, type, meta: { touched, error }, title, isPrice}) => (
    <>
        <Row>
            <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
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

const renderFixedField = ({ meta, title ,isPrice}) => (
    <>
        <Row>
            <Label>{title + ": " + (meta.initial ? meta.initial : null)+(isPrice?" VND":"")}</Label>
        </Row>
    </>
)

const BookLostConfirmForm = ({
    handleSubmit,
    handleCancel
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-5 mx-1">
                        <FormGroup className="mb-3">
                            <Field
                                name="isbn"
                                type="text"
                                placeholder="isbn"
                                title="ISBN"
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="title"
                                type="text"
                                placeholder="Title"
                                title="Title"
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="author"
                                type="text"
                                placeholder="Author"
                                title="Author"
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="edition"
                                type="text"
                                placeholder="Edition"
                                title="Edition"
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="overdueDays"
                                type="text"
                                placeholder="Overdue Day(s)"
                                title="Overdue Day(s)"
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="overdueFee"
                                type="text"
                                placeholder="Overdue Fee"
                                title="Overdue Fee"
                                isPrice
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="lostBookFineNotInMarket"
                                type="text"
                                placeholder="Lost book fine not in market"
                                title="Lost book fine not in market"
                                isPrice
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="lostBookFineInMarket"
                                type="text"
                                placeholder="Lost book fine in market"
                                title="Lost book fine in market"
                                isPrice
                                component={renderFixedField} />
                        </FormGroup>
                    </Col>
                    <Col lg="6" className="border-left ">
                    <FormGroup className="mb-3 px-2">
                            <Field
                                name="fine"
                                type="number"
                                placeholder="Lost book fine"
                                title="Lost book fine"
                                isRequired
                                isPrice
                                component={renderField} />
                        </FormGroup>
                        <FormGroup className="mb-3 px-2">
                            <Field
                                name="reason"
                                type="textarea"
                                placeholder="Note"
                                title="Note"
                                component={renderField} />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="row mt-2">
                            <div className="col-6 text-left">
                                <span className="text-danger">* Required field</span>
                            </div>
                            <div className="col-6 text-right">
                                <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                    <span className="btn-label">
                                    </span> Cancel
                </button>
                                <button type="submit" className="btn btn-wd btn-success ">
                                    <span className="btn-label">
                                    </span> Confirm
                </button>
                            </div>
                        </div>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'BookLostConfirmForm',
    validate
})(BookLostConfirmForm)

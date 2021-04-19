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
import { connect } from 'react-redux'
import * as actions from 'store/actions/index'
import * as MyConstant from '../../views/Util/Constant'


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

const renderField = ({ input, disabled, isRequired, placeholder, type, meta: { touched, error }, title }) => (
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
    if (!values.name) {
        errors.name = 'Name is required'
    }
    if (!values.maxBorrowNumber) {
        errors.maxBorrowNumber = 'Total checkouts allowed is required';
    }
    if (MyConstant.MIN_NUMBER_BORROW_PAT > values.maxBorrowNumber || values.maxBorrowNumber > MyConstant.MAX_NUMBER_BORROW_PAT) {
        errors.maxBorrowNumber = "Total checkouts allowed must be " + MyConstant.MIN_NUMBER_BORROW_PAT + "-" + MyConstant.MAX_NUMBER_BORROW_PAT
    }
    return errors
}

const validateNumber = value => {
    if (value < 0) {
        return 0
    } else {
        return value
    }
}

class AddNewPatronTypeForm extends React.Component {
    render() {
        const {
            handleSubmit,
            handleCancel,
            submitting,
            pristine
        } = this.props

        return (
            <Card className="bg-secondary shadow border-0">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <Field
                                name="name"
                                type="text"
                                placeholder="Name"
                                isRequired={true}
                                title="Name"
                                component={renderField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="maxBorrowNumber"
                                type="number"
                                placeholder="Total Checkouts Allowed"
                                isRequired={true}
                                title="Total Checkouts Allowed"
                                normalize={validateNumber}
                                component={renderField} />
                        </FormGroup>
                        <div className="text-right mt-2">
                            <div className="text-left">
                                <span className="text-danger">* Required field</span>
                            </div>
                            <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                <span className="btn-label">
                                </span> Cancel
                </button>
                            <button type="submit" className="btn btn-wd btn-success ">
                                <span className="btn-label">
                                </span> Confirm
                </button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default reduxForm({
    form: 'addNewPatronTypeForm',
    validate
})(AddNewPatronTypeForm)

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
    if (!values.copyType) {
        errors.copyType = 'Copy type is required'
    }
    if (!values.patronType) {
        errors.patronType = 'Patron type is required';
    }
    if (!values.dueDuration) {
        errors.dueDuration = 'Due durarion is required'
    }
    if (!values.extendDueDuration) {
        errors.extendDueDuration = 'Extend due duration is required';
    }
    if (!values.maxBorrowNumber) {
        errors.maxBorrowNumber = 'Max borrow number is required'
    }
    if (!values.maxExtendTime) {
        errors.maxExtendTime = 'Max extend time is required';
    }
    return errors
}

const validateNumber = value => {
    if (value < 1) {
        return 1
    } else {
        return value
    }
}

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
                        <option value="">Select</option>
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

class AddBorrowPolicyForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        this.props.onGetPatronType();
        this.props.onGetCopyType();
    }

    render() {
        const {
            handleSubmit,
            handleCancel,
            patronTypes,
            copyTypes,
            submitting,
            pristine
        } = this.props

        return (
            <Card className="bg-secondary shadow border-0">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg="6">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="patronTypeId"
                                        title="Patron Type"
                                        options={patronTypes}
                                        component={renderSelectField}>
                                    </Field>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Field
                                        name="copyTypeId"
                                        title="Copy Type"
                                        options={copyTypes}
                                        component={renderSelectField}>
                                    </Field>
                                </FormGroup>

                            </Col>
                            <Col lg="6" className="border-left">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="dueDuration"
                                        type="number"
                                        placeholder="Due Duration"
                                        title="Due Duration"
                                        normalize={validateNumber}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="maxBorrowNumber"
                                        type="number"
                                        placeholder="Max Borrow Number"
                                        title="Max Borrow Number"
                                        normalize={validateNumber}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="maxExtendTime"
                                        type="number"
                                        placeholder="Max Extend Time"
                                        title="Max Extend Time"
                                        normalize={validateNumber}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="extendDueDuration"
                                        type="number"
                                        placeholder="Extend Due Duration"
                                        title="Extend Due Duration"
                                        normalize={validateNumber}
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
                                        </span> Confirm
                </button>
                                </div>
                            </Col>
                        </Row>


                    </Form>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        patronTypes: state.policy.patronTypes,
        copyTypes: state.copy.copyTypes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCopyType: () => dispatch(actions.getCopyType()),
        onGetPatronType: () => dispatch(actions.getPatronType()),
    }
}

AddBorrowPolicyForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBorrowPolicyForm)

export default reduxForm({
    form: 'tagRFIDForm',
    validate
})(AddBorrowPolicyForm)

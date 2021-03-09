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
    InputGroup,
    Label
} from "reactstrap";
import { Popover, OverlayTrigger, Row, Col } from 'react-bootstrap'

const renderField = ({ input, isRequired, placeholder, type, meta: { touched, error }, title }) => (
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
    if (!values.bookCopyTypeId) {
        errors.bookCopyTypeId = 'Copy type is required'
    }
    if (!values.patronTypeId) {
        errors.patronTypeId = 'Patron type is required';
    }
    if (!values.dueDuration) {
        errors.dueDuration = 'Due durarion is required'
    }
    if (!values.extendDueDuration) {
        errors.extendDueDuration = 'Renew due duration is required';
    }
    if (!values.maxBorrowNumber) {
        errors.maxBorrowNumber = 'Max borrow number is required'
    }
    if (!values.maxExtendTime) {
        errors.maxExtendTime = 'Max renew time is required';
    }
    if (MyConstant.MIN_DUE_DURATION > values.dueDuration || values.dueDuration > MyConstant.MAX_DUE_DURATION) {
        errors.dueDuration = "Due duration must be " + MyConstant.MIN_DUE_DURATION + "-" + MyConstant.MAX_DUE_DURATION
    }
    if (MyConstant.MIN_EXTEND_DUE_DURATION > values.extendDueDuration || values.extendDueDuration > MyConstant.MAX_EXTEND_DUE_DURATION) {
        errors.extendDueDuration = "Renew due duration must be " + MyConstant.MIN_EXTEND_DUE_DURATION + "-" + MyConstant.MAX_EXTEND_DUE_DURATION
    }
    if (MyConstant.MIN_NUMBER_BORROW > values.maxNumberCopyBorrow || values.maxNumberCopyBorrow > MyConstant.MAX_NUMBER_BORROW) {
        errors.maxNumberCopyBorrow = "Max number borrow must be " + MyConstant.MIN_NUMBER_BORROW + "-" + MyConstant.MAX_NUMBER_BORROW
    }
    if (MyConstant.MIN_EXTEND_TIME > values.maxExtendTime || values.maxExtendTime > MyConstant.MAX_EXTEND_TIME) {
        errors.maxExtendTime = "Max renew time must be " + MyConstant.MIN_EXTEND_TIME + "-" + MyConstant.MAX_EXTEND_TIME
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

const renderSelectField = ({ input, isRequired, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
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
                                        isRequired={true}
                                        component={renderSelectField}>
                                    </Field>
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Field
                                        name="bookCopyTypeId"
                                        title="Copy Type"
                                        options={copyTypes}
                                        isRequired={true}
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
                                        isRequired={true}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="maxNumberCopyBorrow"
                                        type="number"
                                        placeholder="Max Borrow Number"
                                        title="Max Borrow Number"
                                        normalize={validateNumber}
                                        isRequired={true}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="maxExtendTime"
                                        type="number"
                                        placeholder="Max Renew Time"
                                        title="Max Renew Time"
                                        normalize={validateNumber}
                                        isRequired={true}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="extendDueDuration"
                                        type="number"
                                        placeholder="Renew Due Duration"
                                        title="Renew Due Duration"
                                        normalize={validateNumber}
                                        isRequired={true}
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

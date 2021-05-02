import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import * as actions from 'store/actions/index'
import { formValueSelector } from 'redux-form'
import Spinner from '../../components/Spinner/Spinner'

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

const renderField = ({ input, disabled, isRequired, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Col>
            <Col lg="9">
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
            </Col>
        </Row>

    </>
)

const validate = values => {
    const errors = {}
    if (!values.searchValue) {
        errors.searchValue = 'RFID/Email is required'
    }
    if (values.active == false) {
        errors.searchValue = 'This patron is inactive'
    }
    if (values.err) {
        errors.searchValue = values.err
    }
    return errors
}

const renderFixedField = ({ meta, title, myValue }) => (
    <>
        <Row>
            <span className="font-weight-bold">{title + ": "}</span>&nbsp;<span> {(meta.initial ? meta.initial : (myValue ? myValue : ""))}</span>
        </Row>
    </>
)

const selector = formValueSelector('addToWishlistLibForm')

const RfidNormalizer = value => {
    if (value.trim().toUpperCase().includes("PAT#")) {
        return value.trim().toUpperCase().split("PAT#")[1];
    }
    return value.trim()
}

class AddToWishlistLibForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.props.onReset();
    }

    componentDidUpdate(prevProps) {
        if (!(Object.keys(this.props.myValues).length === 0)) {
            this.props.change('patronId', this.props.myValues.accountId);
            this.props.change('active', this.props.myValues.active);
        }
        if (this.props.errorMsg !== prevProps.errorMsg) {
            this.props.change('err', this.props.errorMsg);
        }
    }

    componentWillUnmount() {
        this.props.onReset();
    }

    fetchData(value) {
        value = value ? value : ""
        if (value.trim().toUpperCase().includes("PAT#")) {
            this.props.onFetchData(value.trim().toUpperCase().split("PAT#")[1]);
        }
        else { //DEFAULT
            this.props.onFetchData(value.trim().toUpperCase());
        }
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); //<===== This stops the form from being submitted
        }
    }

    resetForm() {
        this.props.onReset();
        this.props.change('patronId', null);
        this.props.change('active', null);
        this.props.change('err', null);
    }

    render() {
        const {
            handleSubmit,
            handleCancel,
            myValues,
            submitting,
            pristine,
            invalid
        } = this.props

        let button = !(Object.keys(myValues).length === 0) ?
            (
                <>
                    <button onClick={() => { this.resetForm() }} type="button" className="btn btn-wd btn-secondary " disabled={submitting || pristine}>
                        <span className="btn-label">
                        </span> Reset
        </button>
                    <button type="submit" className="btn btn-wd btn-success " disabled={(myValues ? (Object.keys(myValues).length === 0) : true) || submitting || pristine || invalid}>
                        <span className="btn-label">
                        </span> Confirm
            </button>
                </>
            )
            : (<button onClick={() => { this.fetchData(this.props.searchValue); }} type="button" className="btn btn-wd btn-primary " disabled={submitting || pristine}>
                <span className="btn-label">
                </span> Search
            </button>)

        let leftSide = (
            <>
                {myValues.avatar ? (<Col lg="2"><Row><img className="img-thumbnail" src={myValues.avatar} onError={(e) => e.target.src = require("assets/img/theme/no-image.png")} /></Row></Col>) : null}
                <Col lg={{ size: 3, offset: 1 }}>
                    <FormGroup className="mb-3">
                        <Field
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            title="Full Name"
                            myValue={myValues.fullName}
                            component={renderFixedField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="email"
                            type="text"
                            placeholder="Email"
                            title="Email"
                            myValue={myValues.email}
                            component={renderFixedField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            title="Phone"
                            myValue={myValues.phone}
                            component={renderFixedField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="gender"
                            type="text"
                            placeholder="Gender"
                            title="Gender"
                            myValue={myValues.gender}
                            component={renderFixedField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="active"
                            type="text"
                            placeholder="Status"
                            title="Status"
                            myValue={myValues.active ? "Active" : (myValues.active == false ? "Inactive" : null)}
                            component={renderFixedField} />
                    </FormGroup>
                </Col>
            </>
        )
        if (this.props.studentLoading)
            leftSide = (<Spinner />)

        return (

            <Card className="bg-secondary shadow border-0">
                <CardBody>
                    <Form onSubmit={handleSubmit} onKeyDown={this.onKeyPress}>
                        <Row>
                            {leftSide}
                            <Col lg="6" className="border-left">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="searchValue"
                                        type="text"
                                        placeholder="RFID or Email"
                                        title="RFID/Email"
                                        disabled={!(Object.keys(myValues).length === 0)}
                                        isRequired={true}
                                        normalize={RfidNormalizer}
                                        // onBlur={this.fetchData}
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
                                {button}
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
        myValues: state.infoLside.studentData ? state.infoLside.studentData : {},
        studentLoading: state.infoLside.studentLoading,
        errorMsg: state.infoLside.error,
        searchValue: selector(state, 'searchValue'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (key) => dispatch(actions.getStudent_Lib(key)),
        onReset: () => dispatch(actions.resetStatesInfo_Lib()),
    }
}

AddToWishlistLibForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToWishlistLibForm)

export default reduxForm({
    form: 'addToWishlistLibForm',
    validate
})(AddToWishlistLibForm)

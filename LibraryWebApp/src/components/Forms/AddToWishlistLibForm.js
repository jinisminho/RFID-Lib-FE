import React from "react";
import { Field, FieldArray, reduxForm } from 'redux-form';
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
    if (!values.searchValue) {
        errors.searchValue = 'RFID/Email is required'
    }
    return errors
}

const renderFixedField = ({ meta, title, myValue }) => (
    <>
        <Row>
            <Label>{title + ": " + (meta.initial ? meta.initial : (myValue ? myValue : ""))}</Label>
        </Row>
    </>
)

class AddToWishlistLibForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.props.myValues) this.props.change('patronId', this.props.myValues.accountId)
    }

    fetchData(event, newValue, previousValue, name) {
        this.props.onFetchData(newValue);
    }
    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); //<===== This stops the form from being submitted
        }
    }
    render() {
        const {
            handleSubmit,
            handleCancel,
            // initialValues,
            myValues,
            submitting,
            pristine
        } = this.props

        return (

            <Card className="bg-secondary shadow border-0">
                <CardBody>
                    <Form onSubmit={handleSubmit} onKeyDown={this.onKeyPress}>
                        <Row>
                            {myValues.avatar ? (<Col lg="2"><Row><img className="img-thumbnail" src={myValues.avatar} /></Row></Col>) : null}
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
                            </Col>
                            <Col lg="6" className="border-left">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="searchValue"
                                        type="text"
                                        placeholder="RFID or Email"
                                        title="RFID/Email"
                                        onBlur={this.fetchData}
                                        component={renderField} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={{ size: 'auto', offset: 7 }}>
                                <div className="text-right mt-2">
                                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                        <span className="btn-label">
                                        </span> Cancel
                </button>
                                    <button type="submit" className="btn btn-wd btn-success " disabled={myValues ? myValues.length == 0 : true || submitting || pristine}>
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
        // initialValues: state.book.bookToTagData,
        myValues: state.infoLside.studentData ? state.infoLside.studentData : [],
        // myValues: state.copy.bookToTagData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (key) => dispatch(actions.getStudent_Lib(key)),
    }
}

AddToWishlistLibForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToWishlistLibForm)

export default reduxForm({
    form: 'addToWishlistLibForm',
    // enableReinitialize: true,
    validate
})(AddToWishlistLibForm)

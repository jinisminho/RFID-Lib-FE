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
    if (!values.barcode) {
        errors.barcode = 'Barcode is required'
    }
    if (!values.rfid) {
        errors.rfid = 'RFID is required';
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

class TagRFIDForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(event, newValue, previousValue, name) {
        this.props.onFetchData(newValue);
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
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            {myValues.img ? (<Col lg="2"><Row><img className="img-thumbnail" src={myValues.img} /></Row></Col>): null}
                            <Col lg={{ size: 3, offset: 1 }}>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="isbn"
                                        type="text"
                                        placeholder="ISBN"
                                        title="ISBN"
                                        myValue={myValues.isbn}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        title="Title"
                                        myValue={myValues.title}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="sub"
                                        type="text"
                                        placeholder="Subtitle"
                                        title="Subtitle"
                                        myValue={myValues.sub}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="author"
                                        type="text"
                                        placeholder="Author"
                                        title="Author"
                                        myValue={myValues.author}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="edition"
                                        type="text"
                                        placeholder="Edition"
                                        title="Edition"
                                        myValue={myValues.edition}
                                        component={renderFixedField} />
                                </FormGroup>
                            </Col>
                            <Col lg="6" className="border-left">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="barcode"
                                        type="text"
                                        placeholder="Barcode"
                                        title="Barcode"
                                        onBlur={this.fetchData}
                                        component={renderField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="rfid"
                                        type="text"
                                        placeholder="RFID"
                                        title="RFID"
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
        myValues: state.copy.bookToTagData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (key) => dispatch(actions.getCopyByBarcode(key)),
    }
}

TagRFIDForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRFIDForm)

export default reduxForm({
    form: 'tagRFIDForm',
    // enableReinitialize: true,
    validate
})(TagRFIDForm)

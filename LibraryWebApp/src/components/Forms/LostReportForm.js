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
    if (!values.reason) {
        errors.reason = 'Reason is required'
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

class LostReportForm extends React.Component {
    constructor(props) {
        super(props);
        // this.fetchData = this.fetchData.bind(this);
    }

    // componentDidMount() {
    //     // this.fetchData()
    // }

    // fetchData(event, newValue, previousValue, name) {
    //     this.props.onFetchData(newValue);
    // }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); //<===== This stops the form from being submitted
        }
    }

    render() {
        const {
            handleSubmit,
            handleCancel,
            initialValues,
            // myValues,
            submitting,
            pristine
        } = this.props

        return (

            <Card className="bg-secondary shadow border-0">
                <CardBody>
                    <Form onSubmit={handleSubmit} onKeyDown={this.onKeyPress}>
                        <Row>
                            {initialValues.img ? (<Col lg="2"><Row><img className="img-thumbnail" src={initialValues.img} /></Row></Col>) : null}
                            <Col lg={{ size: 3, offset: 1 }}>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="isbn"
                                        type="text"
                                        placeholder="ISBN"
                                        title="ISBN"
                                        myValue={initialValues.isbn}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        title="Title"
                                        myValue={initialValues.title}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="subtitle"
                                        type="text"
                                        placeholder="Subtitle"
                                        title="Subtitle"
                                        myValue={initialValues.subtitle}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="author"
                                        type="text"
                                        placeholder="Author"
                                        title="Author"
                                        myValue={initialValues.authors}
                                        component={renderFixedField} />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Field
                                        name="edition"
                                        type="text"
                                        placeholder="Edition"
                                        title="Edition"
                                        myValue={initialValues.edition}
                                        component={renderFixedField} />
                                </FormGroup>
                            </Col>
                            <Col lg="6" className="border-left">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="reason"
                                        type="textarea"
                                        placeholder="Reason"
                                        title="Reason"
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
                                <button type="submit" className="btn btn-wd btn-success " disabled={submitting || pristine}>
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

// const mapStateToProps = state => {
//     return {
//         // initialValues: state.book.bookToTagData,
//         myValues: state.copy.bookToTagData,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onFetchData: (key) => dispatch(actions.getCopyByBarcode(key)),
//     }
// }

// LostReportForm = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LostReportForm)

export default reduxForm({
    form: 'lostReportForm',
    // enableReinitialize: true,
    validate
})(LostReportForm)

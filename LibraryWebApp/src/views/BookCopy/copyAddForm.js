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
import React,{ Component } from "react";
import { Field, reduxForm } from 'redux-form';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Label,
    Row,
    Col
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'
import {BOOK_COPY_PRICE_NOTE} from '../Util/Constant'

const renderField = ({ input, placeholder,isRequired, type, meta: { touched, error }, title }) => (
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



const renderSelectOptions = (option) => (
    <option key={option.id} value={option.id}>{option.name}</option>
)

const renderSelectField = ({ input,isRequired, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Col>
            <Col lg="9">
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
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

const renderSelectNoteOptions = (option) => (
    <option key={option.id} value={option.value}>{option.label}</option>
)

const renderSelectNoteField = ({ input,isRequired, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Col lg="3">
                <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
            </Col>
            <Col lg="9">
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
                        {options ? options.map(renderSelectNoteOptions) : null}
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

const validateNumber = value => {
    if (value < 1) {
        return 1
    } else {
        return value
    }
}
const validate = values => {
    const errors = {}
    if (!values.isbn) {
        errors.isbn = 'ISBN is required'
    }
    if (!(values.copyTypeId && values.copyTypeId !=="")) {
        errors.copyTypeId = 'Copy type is required'
    }
    if (!values.price) {
        errors.price = 'Price is required'
    } else if (!/^\d*(\.\d+)?$/i.test(values.price)) {
        errors.price = 'Price is not valid'
    }else if(parseFloat(values.price)<1000 || parseFloat(values.price)>1000000000){
        errors.price = 'Price must be between 1000 VND and 1000000000 VND '
    }

    if (!values.numberOfCopies) {
        errors.numberOfCopies = 'Number of copy is required'
    } else if (!/^[0-9]+$/i.test(values.numberOfCopies)) {
        errors.numberOfCopies = 'Number of copy is not valid'
    }else if(parseInt(values.numberOfCopies)>50){
        errors.numberOfCopies = 'Number of copy must be less than or equal 50'
    }
    if(!values.otherNote){
        errors.otherNote = 'Please input price note';
    }else if(values.note.length > 500){
        errors.otherNote = 'Note is less than or equal 500 characters';
    }
    return errors
}

class CopyAddForm extends Component {
    state = { noteVal: BOOK_COPY_PRICE_NOTE[0].value};
    
    render = () => {
        let otherNote = null
        if(this.state.noteVal=="Other"){
            otherNote=<FormGroup className="mb-3">
            <Field
                name="otherNote"
                type="textarea"
                placeholder="Note"
                component={renderField} />
        </FormGroup>
        }
        return (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={this.props.handleSubmit}>
                <FormGroup className="mb-3">
                    <Field
                        name="isbn"
                        type="text"
                        placeholder="ISBN"
                        title="ISBN"
                        isRequired={true}
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="copyTypeId"
                        title="Copy Type"
                        isRequired={true}
                        options={this.props.options}
                        component={renderSelectField}>
                    </Field>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="numberOfCopies"
                        type="number"
                        normalize={validateNumber}
                        title="Number of copy"
                        placeholder="Number of copy"
                        isRequired={true}
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="price"
                        type="number"
                        placeholder="Price"
                        title="Price"
                        isRequired={true}
                        normalize={validateNumber}
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="note"
                        placeholder="Price note"
                        title="Price Note"
                        onChange={(e)=>this.setState({noteVal:e.target.value})}
                        options={BOOK_COPY_PRICE_NOTE}
                        component={renderSelectNoteField} />
                </FormGroup>
                {otherNote}
                <div className="row">
                    <div className="col-6 text-left">
                        <span className="text-danger">* Required field</span>
                    </div>
                    <div className="col-6 text-right">
                    <button onClick={this.props.handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Cancel
                </button>
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Next
                </button>
                </div>
                </div>
            </Form>
        </CardBody>
    </Card>
        )}};

export default reduxForm({
    form: 'CopyAddForm',
    validate
})(CopyAddForm)

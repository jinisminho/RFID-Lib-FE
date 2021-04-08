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
import React ,{ Component } from "react";
import { Field, reduxForm } from 'redux-form';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Label,
    Row,
} from "reactstrap";
import { Popover, OverlayTrigger,InputGroup } from 'react-bootstrap'
import {BOOK_COPY_PRICE_NOTE} from '../Util/Constant'
const renderField = ({ input, disabled, isRequired, placeholder, type, meta: { touched, error }, title,isPrice }) => (
    <>
        <Row>
            <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
        </Row>
        <Row>
            <InputGroup className="input-group-alternative">
                <Input {...input} disabled={disabled} placeholder={placeholder} type={type} />
                {isPrice && <InputGroup.Append>
                               <button className="btn btn-simple"><span className="font-weight-bold">VND</span></button> 
                </InputGroup.Append>}
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
const renderSelectOptions = (option) => (
    <option key={option.label} value={option.value}>{option.label}</option>
)
const renderSelectField = ({ input, isRequired, meta: { touched, error }, title, options }) => (
    <>
        <Row>
            <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
        </Row>
        <Row>
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
        </Row>
    </>
)

const renderSelectNote = ({ input, isRequired, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
        </Row>
        <Row>
            <InputGroup className="input-group-alternative">
                <select name="note" className="form-control">
                    <option value="Gia Tren Bia">Gia tren bia</option>
                    <option value="Bao gom cac chi phi">Bao gom cac chi phi</option>
                    <option value="Other">Other</option>
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
                { input.value == 'Other' ? 
                    <FormGroup className="mb-3">
                    <Field
                        name="other"
                        type="text"
                        placeholder="other note"
                        title="Other note"
                        component={renderField} />
                    </FormGroup> 
                    : null
                }
            </InputGroup>
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
    if (!values.price) {
        errors.price = 'Price is required'
    } else if (!/^\d*(\.\d+)?$/i.test(values.price)) {
        errors.price = 'Price is not valid'
    } else if (parseFloat(values.price) < 1000 || parseFloat(values.price) > 1000000000) {
        errors.price = 'Price must be between 1000 VND and 1000000000 VND'
    }

    if (!values.numberOfCopies) {
        errors.numberOfCopies = 'Number of copy is required'
    } else if (!/^[0-9]+$/i.test(values.numberOfCopies)) {
        errors.numberOfCopies = 'Number of copy is not valid'
    } else if (parseInt(values.numberOfCopies) > 5000) {
        errors.numberOfCopies = 'Number of copy is less than or equal 5000'
    }
    if (!(values.copyTypeId && values.copyTypeId !== "")) {
        errors.copyTypeId = 'Copy type is required'
    }
    if(!values.otherNote){
        errors.otherNote = 'Please input price note';
    }else if(values.note.length > 500){
        errors.otherNote = 'Note is less than or equal 500 characters';
    }
    return errors
}
class CopyForm extends Component {
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
    return(
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={this.props.handleSubmit}>
                <FormGroup className="mb-3">
                    <Field
                        name="isbn"
                        type="text"
                        placeholder="isbn"
                        title="ISBN"
                        disabled
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="title"
                        type="text"
                        placeholder="title"
                        title="Title"
                        disabled
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
                        title="Number of copy"
                        isRequired={true}
                        normalize={validateNumber}
                        placeholder="Number of copy"
                        component={renderField} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Field
                        name="price"
                        type="number"
                        placeholder="Price"
                        isRequired={true}
                        title="Price"
                        isPrice
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
                        component={renderSelectField} />
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
                            </span> Save
                </button>
                    </div>
                </div>
            </Form>
        </CardBody>
    </Card>
    )}}

export default reduxForm({
    form: 'bookMakeCopyForm',
    validate
})(CopyForm)

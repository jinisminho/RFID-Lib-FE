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
import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    InputGroup,
    Label,
    Col
} from "reactstrap";
import { Popover, OverlayTrigger, Row } from 'react-bootstrap'

const renderSelectOptionsPatron = (option) => (
    <option key={option.id} value={option.id}>{option.name}</option>
)
const renderSelectPatron = ({ input, meta: { touched, error }, title, options }) => {
    return (
        <>
            <Row>
                <Label>{title}</Label>
            </Row>
            <Row >
                <InputGroup className="input-group-alternative">
                    <select {...input} className="form-control">
                        {options ? options.map(renderSelectOptionsPatron) : null}
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
}
const renderFileField = ({ input:{onChange}, meta: { error,dirty }, title }) => {
    return (
        <>
            <Row>
                <Label>{title}</Label>
            </Row>
            <Row >
                <InputGroup className="input-group-alternative">
                <input
                className="input-group-alternative form-control"
                    type='file'
                    accept='.xls, .xlsx'
                    onChange={onChange}
                />
                    {dirty && ((error && <OverlayTrigger
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
}
const validate = values => {
    const errors = {};
    if (!values.patronTypeId) {
        errors.patronTypeId = 'Patron Type is required';
    }
    let fileExt=["XLS","XLSX"]
    if(!values.file){
        errors.file="Required"
    }else if(typeof values.file=="object"){ 
      if(!values.file){
        errors.file="Import file is not valid"
      }else if(values.file.length==0){
        errors.file="Required"
      }else if(!fileExt.includes(values.file[0].name.split(".")[1].toUpperCase())){
        errors.file="Import file is not valid"
      }
    } 
    return errors;
};

const onKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); //<===== This stops the form from being submitted
    }
}

class ImportForm extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
      }
    onChange(e) {
        return e.target.files[0]
      }
    render=()=>(
        <Card className="bg-secondary shadow border-0">
            <CardBody>
                <Form onSubmit={this.props.handleSubmit} onKeyDown={onKeyPress}>
                    <Row className="text-center justify-content-center mb-5">
                    <Col className=" col-5 mx-2">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="patronTypeId"
                                        type="select"
                                        placeholder="Select Patron Type"
                                        title="Patron Type"
                                        options={this.props.patronTypes}
                                        component={renderSelectPatron} />
                                        </FormGroup>
                        </Col>
                    <Col className="col-6 mx-2">
                                <FormGroup className="mb-3">
                                    <Field
                                        name="file"
                                        type="input"
                                        title="Import file"
                                        onChange={this.onChange}
                                        component={renderFileField} />
                                        </FormGroup>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <button onClick={this.props.handleCancel} type="button" className="btn btn-wd btn-default" >
                            <span className="btn-label">
                            </span> Cancel
                </button>
                        <button type="submit" className="btn btn-wd btn-success ">
                            <span className="btn-label">
                            </span> Save
                </button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}
export default reduxForm({
    form: 'importForm',
    validate
})(ImportForm)

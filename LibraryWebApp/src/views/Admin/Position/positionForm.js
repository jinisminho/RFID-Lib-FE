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
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
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
    Col
} from "reactstrap";
import { Popover, OverlayTrigger, Row } from 'react-bootstrap'

const renderField = ({ input, placeholder, type, meta: { touched, error }, title, isRequired }) => (
    <>
      <Row>
        <Label>{title}{isRequired ? <span className="text-danger">*</span> : null}</Label>
      </Row>
      <Row>
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
      </Row>
    </>
  )
 
  

const validate = values => {
    const errors = {};
    if (!values.shelf) {
        errors.shelf = 'Author name is required';
    } else if (values.shelf.length > 100) {
        errors.shelf = 'Shelf length is less than or equal 100';
    }
    if (!values.line) {
      errors.line = 'Line is required'
    } else if (!/^[0-9]+$/i.test(values.line)) {
      errors.line = 'Line is not valid'
    }else if(parseInt(values.line)>100000){
      errors.line = 'Line is less than 100000'
    }
    if (!values.rfid) {
      errors.rfid = 'RFID is required';
  }
    return errors;
};
const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); //<===== This stops the form from being submitted
    } 
  }

class PositionForm extends Component {
   
    render = () => (
        <Card className="bg-secondary shadow border-0">
            <CardBody>
                <Form onSubmit={this.props.handleSubmit} onKeyDown={onKeyPress}>
                    <FormGroup className="mb-3">
                        <Field
                            name="shelf"
                            type="text"
                            placeholder="Enter Shelf"
                            title="Shelf"
                            isRequired={true}
                            component={renderField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="line"
                            type="number"
                            placeholder="Enter Line"
                            title="Line"
                            isRequired={true}
                            component={renderField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="rfid"
                            type="text"
                            placeholder="Enter RFID Number"
                            title="RFID Number"
                            isRequired={true}
                            component={renderField} />
                    </FormGroup>
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
    )
}
export default reduxForm({
    form: 'positionForm',
    validate
})(PositionForm)

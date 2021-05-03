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
    if (!values.name) {
        errors.name = 'Author name is required';
    } else if (values.name.length > 50) {
        errors.name = 'Author name length is less than or equal 50';
    }else if(!/^[a-zA-Z\s]+$/i.test(values.name)){
      errors.name = 'Author name is not valid';
  }
    if (!values.birthYear) {
        errors.birthYear = 'Birth year is required'
      } 
      if (!values.country) {
        errors.country = 'Country is required'
      } else if (values.country.length > 50) {
        errors.country = 'Country length is less than or equal 50';
    }
    return errors;
};
const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); //<===== This stops the form from being submitted
    } 
  }

  const FieldDatePicker = ({ input, placeholder,isRequired,meta: { touched, error },title }) => (
    <>
      <Row>
        <Label>{title}{isRequired?<span className="text-danger">*</span>:null}</Label>
      </Row>
      <Row>
        <InputGroup className="input-group-alternative">
          <DatePicker
          className="form-control"
          dateFormat="yyyy"
          selected={input.value || null}
          onChange={input.onChange}
          showYearPicker
          maxDate={new Date()}
          disabledKeyboardNavigation
          placeholderText={placeholder}
      />
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
      
  );
class AuthorForm extends Component {
   
    render = () => (
        <Card className="bg-secondary shadow border-0">
            <CardBody>
                <Form onSubmit={this.props.handleSubmit} onKeyDown={onKeyPress}>
                    <FormGroup className="mb-3">
                        <Field
                            name="name"
                            type="text"
                            placeholder="Author's name"
                            title="Name"
                            isRequired={true}
                            component={renderField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                            name="country"
                            type="text"
                            placeholder="Country"
                            title="Country"
                            isRequired={true}
                            component={renderField} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Field
                        name="birthYear"
                        type="text"
                        isRequired={true}
                        placeholder="Birth Year"
                        title="Birth Year"
                        component={FieldDatePicker} />
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
    form: 'authorForm',
    validate
})(AuthorForm)

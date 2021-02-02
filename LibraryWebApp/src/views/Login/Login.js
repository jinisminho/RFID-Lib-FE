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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

const renderField = ({ input, placeholder, type, meta: { touched, error} }) => (
    <>
                <Input className="pl-3" {...input} placeholder={placeholder} type={type} />
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
      </>
)
const required = value => value ? undefined : 'Required'
const Login = ({
  submitting,
  handleSubmit,
}) => (
  <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent ">
                <h2 className="text-center">Sign in</h2>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    validate={[required]}
                    component={renderField} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    validate={[required]}
                    component={renderField} />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                <Button className="my-4" color="primary" type="submit" disabled={submitting}>
                    Sign in
                </Button>
                </div>
              </Form>
              
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
        </Col>
      </>
);

export default reduxForm({
  form: 'FieldLevelValidationForm',
})(Login)

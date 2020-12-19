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
const renderField = ({ input, placeholder, type}) => (
    <Input {...input} placeholder={placeholder} type={type} />
)
const Search = ({
  submitting,
  handleSubmit,
}) => (
  <>
    <Col>
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent ">
          <h2 className="text-center">Quick search for books</h2>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-zoom-split-in" />
                      </InputGroupText>
                    </InputGroupAddon>
                    {/* <Input name="search" placeholder="Search" type="text" /> */}
                    <Field
                    name="search"
                    type="text"
                    placeholder="Search"
                    component={renderField} />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col lg="1.5">
                <Button color="primary" type="submit" disabled={submitting}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </>
);

export default reduxForm({
  form: 'FieldLevelValidationForm',
})(Search)

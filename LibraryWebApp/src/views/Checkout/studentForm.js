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
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

// const renderField = ({ input, disabled,placeholder, type, meta: { touched, error } }) => (
//     <>
//         <Input {...input}  disabled={disabled} placeholder={placeholder} type={type} />
//         {touched && ((error && <OverlayTrigger
//             trigger={['hover', 'focus']}
//             placement="right"
//             overlay={
//                 <Popover>
//                     <Popover.Content>
//                         <span className="text-danger">{error}</span>
//                     </Popover.Content>
//                 </Popover>
//             }
//         >
//             <Button onClick={(e)=>e.preventDefault()}  className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
//         </OverlayTrigger>))}
//     </>
// )

const renderField = ({ input, disabled, placeholder, type, meta: { touched, error }, title }) => (
    <>
        <Row>
            <Label>{title}</Label>
        </Row>
        <Row>
            <InputGroup className="input-group-alternative">
                <Input {...input} placeholder={placeholder} type={type} disabled={disabled} />
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

const StudentForm = () => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form>
                {/* <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-circle-08" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Field
                            name="name"
                            props={{
                                disabled: true, 
                              }}
                            type="text"
                            placeholder="Name"
                            component={renderField} />
                    </InputGroup>
                </FormGroup> */}
                <FormGroup className="mb-3">
                    <Field
                        name="name"
                        // props={{
                        //     disabled: true,
                        // }}
                        disabled
                        type="text"
                        title="Name"
                        placeholder="Name"
                        component={renderField} />
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'fieldArrays'
})(StudentForm)

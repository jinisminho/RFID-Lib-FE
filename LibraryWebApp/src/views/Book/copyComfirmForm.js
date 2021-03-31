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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Barcode from 'react-barcode'
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'


const renderFieldAlter = ({ input, placeholder, disabled, type, meta: { touched, error } }) => (
    <>
        <Input className="pl-3" {...input} placeholder={placeholder} type={type} disabled={disabled} />
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


const renderFixedField = ({ meta, title }) => (
    <>
        <Row>
            <span className="font-weight-bold">{title + ": "}</span>&nbsp;<span> {(meta.initial ? meta.initial : null)}</span>
        </Row>
    </>
)
const barcodeFormat = (cell, row)=> {
    return (
            <Barcode value={cell} format="CODE39" width={1} flat={true}/>
        )
}
const ConfirmCopyForm = ({
    handleSubmit,
    handleCancel,
    initialValues
}) => (
    <Card className="bg-secondary shadow border-0">
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg="2"><Row><img className="img-thumbnail" src={initialValues.img} /></Row></Col>
                    <Col lg={{ size: 3, offset: 1 }}>
                        <FormGroup className="mb-3">
                            <Field
                                name="isbn"
                                type="text"
                                placeholder="isbn"
                                title="ISBN"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="title"
                                type="text"
                                placeholder="Title"
                                title="Title"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="author"
                                type="text"
                                placeholder="Author"
                                title="Author"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="edition"
                                type="text"
                                placeholder="Edition"
                                title="Edition"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="price"
                                type="text"
                                placeholder="Price"
                                title="Price"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Field
                                name="copyType"
                                type="text"
                                placeholder="Copy Type"
                                title="Copy Type"
                                disabled
                                component={renderFixedField} />
                        </FormGroup>
                    </Col>
                    <Col lg="6" className="border-left">
                    <BootstrapTable
                        data={initialValues.members}
                        options={{
                            sizePerPage: 3,
                            prePage: '<',
                            nextPage: '>',
                            firstPage: '<<',
                            lastPage: '>>',
                            hideSizePerPage: true,
                        }}
                        pagination
                        striped
                        hover
                        condensed
                        className="ml-4 mr-4"
                        bordered={false}
                        tableHeaderClass={"col-hidden"}
                >
                    <TableHeaderColumn dataField="barcode" isKey dataFormat={barcodeFormat}>Barcode</TableHeaderColumn>
                </BootstrapTable>
                    </Col>
                </Row>
                <Row>
                    <Col xs="0" lg={{ size: 'auto', offset: 9 }}>
                        <div className="text-right mt-2">
                            <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                                <span className="btn-label">
                                </span> Cancel
                </button>
                            <button type="submit" className="btn btn-wd btn-success ">
                                <span className="btn-label">
                                </span> Confirm
                </button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </CardBody>
    </Card>
);

export default reduxForm({
    form: 'BookConfirmCopyForm'
})(ConfirmCopyForm)

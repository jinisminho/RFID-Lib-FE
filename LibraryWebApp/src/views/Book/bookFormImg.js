import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DropZoneField from "../../components/Dropzone/Dropzone";
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
  Col,
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import * as MyConstant from '../Util/Constant'

const validateImage = value =>{
  let msg=undefined
  let imgExt=["PNG","JPEG","JPG","BMP","GIF"]
  if(!value){
    msg="Required"
  }else if(typeof value=="object"){ 
    if(!value[0]){
      msg="Image file is not valid"
    }else if(!imgExt.includes(value[0].name.split(".")[1].toUpperCase())){
      msg="Image file is not valid"
    }
  } 
  return msg
}
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
  }else if(!/^[0-9]{10,13}$/i.test(values.isbn)){
    errors.isbn = 'ISBN length is between 10 and 13 digits'
  }
  if (!values.title) {
    errors.title = 'Book title is required'
  }else if(!values.title>255){
    errors.title = 'Book title is less than 255 charaters'
  }
  if (!values.publisher) {
    errors.publisher = 'Publisher is required'
  }else if(!values.publisher>255){
    errors.publisher = 'Publisher is less than 255 charaters'
  }
  if (!values.language) {
    errors.language = 'Language is required'
  }else if(!values.language.length>30){
    errors.language = 'Language is less than 30 charaters'
  }
  if (!values.pageNumber) {
    errors.pageNumber = 'Number of page is required'
  } else if (!/^[0-9]+$/i.test(values.pageNumber)) {
    errors.pageNumber = 'Number of page is not valid'
  }else if(parseInt(values.pageNumber)>100000){
    errors.pageNumber = 'Number of page is less than 100000'
  }
  if (values.subtitle) {
    if(!values.subtitle>255){
      errors.subtitle = 'Subtitle is less than 255 charaters'
    }
  }
  if (!values.callNumber) {
    errors.callNumber = 'Call number is required'
  }
  // else if(!values.callNumber.length>50 || !/^[0-9]{3}[.][0-9A-Z]+$/i.test(values.callNumber)){
  //   errors.callNumber = 'Call number is not valid (ex: 123.ABC)'
  // }
  // if (!values.ddc) {
  //   errors.ddc = 'DDC is required'
  // }else if(!/^-?\d{3}(\.\d+)?$/.test(values.ddc)){
  //   errors.ddc = 'DDC is not valid (ex: 123.123)'
  // }
  if (!values.edition) {
    errors.edition = 'Edition is required'
  } else if (!/^[0-9]+$/i.test(values.edition)) {
    errors.edition = 'Edition is not valid'
  }else if(parseInt(values.edition)>1000){
    errors.edition = 'Edition page is less than 1000'
  }
  if (!values.publishYear) {
    errors.publishYear = 'Publish year is required'
  } 
  // if (!values.genreIds || values.genreIds.length==0) {
  //   errors.genreIds = 'Genre is required'
  // } 
  if (!values.authorIds || values.authorIds.length==0) {
    errors.authorIds = 'Author is required'
  } 
  if (!values.status) {
    errors.status = 'Status is required'
  } 
  
  return errors
}
const renderSelectOptions = (option) => (
  <option key={option} value={option}>{MyConstant.BOOK_STATUS_ADD_LIST[option]}</option>
)
const renderSelectField = ({ input,isRequired, meta: { touched, error }, title, options }) => {
  return(
  <>
      <Row>
              <Label>{title}{isRequired?<span className="text-danger">*</span>:null}</Label>
          </Row>
          <Row >
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
)}
 
const renderField = ({ input, placeholder,isRequired, type, meta: { touched, error }, title }) => (
  <>
    <Row>
      <Label>{title}{isRequired?<span className="text-danger">*</span>:null}</Label>
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
const renderSelect = ({ input,placeholder,isRequired, meta: { touched, error }, title,data }) => {
  return(
  <>
    <Row>
      <Label>{title}{isRequired?<span className="text-danger">*</span>:null}</Label>
    </Row>
    <Row>
      <InputGroup >
      <Select
          {...input}
          closeMenuOnSelect={false}
          isMulti
          className="w-100"
          placeholder={placeholder}
          options={data}
          onChange={(value) => input.onChange(value)}
          onBlur={() => input.onBlur()}
          // value={(input.value === '') ? null : data.find(obj => input.value.includes(obj.value))}
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
  </>)
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
class BookFormImg extends Component {
  state = { imageFile: []};
  componentDidMount(){
    if(this.props.initialValues){
      if(this.props.initialValues.img){
        this.setState({imageFile:[this.props.initialValues.img]})
      }
    }
  }
  handleOnDrop = newImageFile => this.setState({ imageFile: newImageFile });
  render = () => (
    <Card className="bg-secondary shadow border-0">
      <CardBody>
        <Form onSubmit={this.props.handleSubmit}>
          <Row className="text-center justify-content-center">
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="img"
                  component={DropZoneField}
                  type="file"
                  imagefile={this.state.imageFile}
                  handleOnDrop={this.handleOnDrop}
                  validate={validateImage}
                />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <Row>
                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <FormGroup className="mb-3">
                    <Field
                      name="isbn"
                      type="text"
                      isRequired={true}
                      placeholder="ISBN"
                      title="ISBN"
                      component={renderField} />
                  </FormGroup>
                </Col>
                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <FormGroup className="mb-3">
                    <Field
                      name="title"
                      type="text"
                      isRequired={true}
                      placeholder="Title"
                      title="Title"
                      component={renderField} />
                  </FormGroup>
                </Col>
                <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <FormGroup className="mb-3">
                    <Field
                      name="subtitle"
                      type="text"
                      placeholder="Sub Title"
                      title="Sub Title"
                      component={renderField} />
                  </FormGroup>
                </Col>
                {/* <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <FormGroup className="mb-3">
                    <Field
                      name="callNumber"
                      type="text"
                      isRequired={true}
                      placeholder="Call Number"
                      title="Call Number"
                      component={renderField} />
                  </FormGroup>
                </Col> */}
                
              </Row>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="publisher"
                  type="text"
                  isRequired={true}
                  placeholder="Publisher"
                  title="Publisher"
                  component={renderField} />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
                  <FormGroup className="mb-3">
                    <Field
                      name="callNumber"
                      type="text"
                      isRequired={true}
                      placeholder="Call number"
                      title="Call number"
                      component={renderField} />
                  </FormGroup>
                </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="publishYear"
                  type="text"
                  isRequired={true}
                  placeholder="Publish year"
                  title="Publish Year"
                  component={FieldDatePicker} />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="language"
                  type="text"
                  isRequired={true}
                  placeholder="Language"
                  title="Language"
                  component={renderField} />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="pageNumber"
                  normalize={validateNumber}
                  type="number"
                  isRequired={true}
                  placeholder="Number of page"
                  title="Number of page"
                  component={renderField} />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="edition"
                  normalize={validateNumber}
                  type="number"
                  isRequired={true}
                  placeholder="Edition"
                  title="Edition"
                  component={renderField} />
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                        name="status"
                        title="Status"
                        isRequired={true}
                        defaultValue={Object.keys(MyConstant.BOOK_STATUS_ADD_LIST)[0]}
                        options={Object.keys(MyConstant.BOOK_STATUS_ADD_LIST)}
                        component={renderSelectField}>
                    </Field>
              </FormGroup>
            </Col>
            <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
              <FormGroup className="mb-3">
                <Field
                  name="authorIds"
                  type="select"
                  isRequired={true}
                  placeholder="Select Author"
                  title="Author"
                  data={this.props.authorList}
                  component={renderSelect} />
              </FormGroup>
            </Col>
            {/* <Col className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-2">
                <Field
                  name="genreIds"
                  type="select"
                  isRequired={true}
                  placeholder="Select Genre"
                  title="Genre"
                  data={this.props.genreList}
                  component={renderSelect} />
            </Col> */}
          </Row>
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
  );
}

export default reduxForm({ form: "UploadImageForm",validate })(BookFormImg);

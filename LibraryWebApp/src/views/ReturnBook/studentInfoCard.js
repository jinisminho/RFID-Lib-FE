
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
import { Height } from "@material-ui/icons";

const StudentInfoCard = ({student})  =>{
  return (
      <div className="container border-left m-3" >
          <div className="row">
          <div className="pl-3">
            <img width='150' height='200' src={student.img}  alt="" className="img-rounded" onError={(e) => e.target.src = require("assets/img/theme/no-image.png")}/>
          </div>
          <div className="pl-4">
          <div>
            <p><b>Name:</b> {student.name}</p>
          </div>
          <div>
            <p><b>Department:</b> {student.department}</p>
          </div>
          <div>
            <p><b>Email:</b> {student.username}</p>
          </div>
          </div>
          </div>
      </div>
  )
}


export default StudentInfoCard
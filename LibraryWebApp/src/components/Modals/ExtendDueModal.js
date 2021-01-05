import React from "react";
import { Modal } from "react-bootstrap";
import ExtendDueForm from "../Forms/ExtendDueForm";

const extendDueModal = props => {
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ExtendDueForm
          handleCancel={props.hide}
          onSubmit={props.submit}
          // minDate ={props.minDate}
          // maxDate ={props.maxDate}
          dueDate = {props.dueDate}
          numOfDateToAdd = {props.numOfDateToAdd}
        />
      </Modal.Body>
    </Modal>
  );
};
export default extendDueModal;

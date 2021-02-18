import React from "react";
import { Modal } from "react-bootstrap";
import ExtendDueForm from "../Forms/ExtendDueForm";

const extendDueModal = props => {
  
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        <ExtendDueForm
          handleCancel={props.hide}
          onSubmit={props.submit}
          // minDate ={props.minDate}
          // maxDate ={props.maxDate}
          dueDate = {props.dueDate}
          patronId={props.patronId}
          bookId={props.bookId}
          numOfDateToAdd = {props.numOfDateToAdd}
        />
      </Modal.Body>
    </Modal>
  );
};
export default extendDueModal;

import ExtendDueLibForm from "components/Forms/ExtendDueLibForm";
import React from "react";
import { Modal } from "react-bootstrap";
import ExtendDueForm from "../Forms/ExtendDueForm";

const extendDueModal = props => {
  let form = props.libraianId
    ? (<ExtendDueLibForm
      handleCancel={props.hide}
      onSubmit={props.submit}
      // minDate ={props.minDate}
      // maxDate ={props.maxDate}
      dueDate={props.dueDate}
      bookBorrowingId={props.bookBorrowingId}
      numOfDateToAdd={props.numOfDateToAdd}
      libraianId={props.libraianId}
    />)
    : (<ExtendDueForm
      handleCancel={props.hide}
      onSubmit={props.submit}
      // minDate ={props.minDate}
      // maxDate ={props.maxDate}
      dueDate={props.dueDate}
      bookBorrowingId={props.bookBorrowingId}
      numOfDateToAdd={props.numOfDateToAdd}
    />);
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        {/* <ExtendDueForm
          handleCancel={props.hide}
          onSubmit={props.submit}
          // minDate ={props.minDate}
          // maxDate ={props.maxDate}
          dueDate = {props.dueDate}
          bookBorrowingId={props.bookBorrowingId}
          numOfDateToAdd = {props.numOfDateToAdd}
        /> */}
        {form}
      </Modal.Body>
    </Modal>
  );
};
export default extendDueModal;

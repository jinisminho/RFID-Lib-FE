import React from "react";
import { Modal } from "react-bootstrap";
import './myModal.css';
import AddNewBookCopyTypeForm from "components/Forms/AddNewBookCopyTypeForm";

const AddNewBookCopyTypeModal = props => {

    return (
        <Modal backdrop="static" show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddNewBookCopyTypeForm handleCancel={props.hide} onSubmit={props.submit}/>
            </Modal.Body>
        </Modal>
    );
};
export default AddNewBookCopyTypeModal;
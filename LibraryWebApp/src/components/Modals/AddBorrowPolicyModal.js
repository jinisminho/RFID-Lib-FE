import React from "react";
import { Modal } from "react-bootstrap";
import './myModal.css';
import AddBorrowPolicyForm from "../Forms/AddBorrowPolicyForm"

const addBorrowPolicyModal = props => {

    return (
        <Modal dialogClassName="two-col-modal" backdrop="static" show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddBorrowPolicyForm handleCancel={props.hide} onSubmit={props.submit}/>
            </Modal.Body>
        </Modal>
    );
};
export default addBorrowPolicyModal;
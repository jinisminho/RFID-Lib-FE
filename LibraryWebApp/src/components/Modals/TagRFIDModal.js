import React from "react";
import { Modal } from "react-bootstrap";
import './myModal.css';
import TagRFIDForm from "../Forms/TagRFIDForm"

const extendDueModal = props => {

    return (
        <Modal dialogClassName="two-col-modal" backdrop="static" show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TagRFIDForm handleCancel={props.hide} onSubmit={props.submit}/>
            </Modal.Body>
        </Modal>
    );
};
export default extendDueModal;
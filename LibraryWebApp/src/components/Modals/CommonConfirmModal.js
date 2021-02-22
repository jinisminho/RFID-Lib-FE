import React from "react";
import { Modal, Button } from "react-bootstrap";
import './myModal.css';

const CommonConfirmModal = props => {

    return (
        <Modal backdrop="static" show={props.show} onHide={props.hide} centered>
                    <Modal.Header className="bg-warning" closeButton>
                        <Modal.Title className="text-white">{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <h1>Are you sure?</h1>
                        <h1 className="text-warning display-1"></h1>
                        <h4>{props.msg}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.hide}>
                            Close
                    </Button>
                        <Button variant="warning" onClick={props.clickConfirm}>
                            OK
                    </Button>
                    </Modal.Footer>
                </Modal>
    );
};
export default CommonConfirmModal;
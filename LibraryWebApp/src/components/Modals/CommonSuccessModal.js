import React from "react";
import { Modal, Button } from "react-bootstrap";
import './myModal.css';

const CommonSuccessModal = props => {

    return (
        <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered>
            <Modal.Header className="bg-success" closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h1 className="text-success display-1"><i className="fas fa-check-circle"></i></h1>
                <h2>{props.msg}</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    Close
                                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default CommonSuccessModal;
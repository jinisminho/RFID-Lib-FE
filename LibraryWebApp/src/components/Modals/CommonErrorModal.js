import React from "react";
import { Modal, Button } from "react-bootstrap";
import './myModal.css';

const CommonErrorModal = props => {

    return (
        <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton className="bg-danger">
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h1 className="text-danger display-1"><i className="fas fa-times-circle"></i></h1>
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
export default CommonErrorModal;
import React from "react";
import { Navbar, FormGroup, FormControl, InputGroup, Row, Col, Modal, Button } from 'react-bootstrap'

const NotiModal = (props) => {
    return (
    <Modal show={props.successShow} onHide={() => props.handleModalClose()} backdrop="static" keyboard={false}>
        <Modal.Header className={props.background} closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
            <h1 className={props.text+" display-1"} ><i className={props.icon}></i></h1>
            <h2>{this.state.successNotice}</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleModalClose()}>
                Close
                                </Button>
        </Modal.Footer>
    </Modal>)
}

export default NotiModal
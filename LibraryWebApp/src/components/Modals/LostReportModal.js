import LostReportForm from "components/Forms/LostReportForm";
import React from "react";
import { Modal } from "react-bootstrap";
import './myModal.css';


const LostReportModal = props => {
    return (
        <Modal dialogClassName="two-col-modal" backdrop="static" show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LostReportForm
                    handleCancel={props.hide}
                    onSubmit={props.submit}
                    initialValues = {props.initialValues}/>
            </Modal.Body>
        </Modal>
    );
};
export default LostReportModal;
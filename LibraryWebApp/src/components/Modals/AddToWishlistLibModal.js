import AddToWishlistLibForm from "components/Forms/AddToWishlistLibForm";
import React from "react";
import { Modal } from "react-bootstrap";
import ExtendDueForm from "../Forms/ExtendDueForm";

const AddToWishlistLibModal = props => {
    return (
        <Modal dialogClassName="two-col-modal" backdrop="static" show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-1">
                <AddToWishlistLibForm
                    handleCancel={props.hide}
                    onSubmit={props.submit}
                />
            </Modal.Body>
        </Modal>
    );
};
export default AddToWishlistLibModal;

import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';
import MyUtil from 'store/utility'


const wishlistModal = (props) => {
    const options = {
        onPageChange: handlePageChange,
        page: props.page,
        sizePerPage: props.sizePerPage,
        prePage: '<',
        nextPage: '>',
        firstPage: '<<',
        lastPage: '>>',
        hideSizePerPage: true,
    };

    function handlePageChange(page, sizePerPage) {
        props.fetchData(page, sizePerPage, props.patronId);
    }

    function thisOnShow() {
        props.fetchData(1, props.sizePerPage, props.patronId);
    }

    function thisImageFormatter(cell, row) {
        return MyUtil.imageFormatter(row.book.img,row.book)
    }

    function thisBookDescriptionFormat(cell, row, extraData) {
        return MyUtil.bookDescriptionFormat(cell, row.book, extraData)
    }

    const hide = {
        publisher: true,
        publishYear: true,
        language: true,
        totalCopies: true,
        nop: true,
        totalAvailableCopies: true,
        position: true,
    }
    let extraData = [];
    extraData.hide = hide;
    extraData.patronId = props.patronId

    return (


        <Modal dialogClassName="book-detail-modal" backdrop="static" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.hide} onShow={thisOnShow} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BootstrapTable
                    data={props.data}
                    options={options}
                    fetchInfo={{ dataTotalSize: props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="id"
                >
                    <TableHeaderColumn dataField="img" dataFormat={thisImageFormatter} width="10%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="90%" headerAlign="center" dataFormat={thisBookDescriptionFormat} formatExtraData={extraData}>Description</TableHeaderColumn>
                </BootstrapTable>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default wishlistModal
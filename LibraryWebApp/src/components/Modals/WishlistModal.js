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
        props.fetchData(page, sizePerPage, props.studentId);
    }

    function thisOnShow() {
        props.fetchData(1, props.sizePerPage, props.studentId);
    }

    const hide = {
        publisher: true,
        publishYear: true,
        language: true,
        totalCopies: true,
        nop: true
    }

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
                >
                    <TableHeaderColumn dataField="img" dataFormat={MyUtil.imageFormatter} width="10%" isKey>Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="90%" headerAlign="center" dataFormat={MyUtil.bookDescriptionFormat} formatExtraData={hide}>Description</TableHeaderColumn>
                </BootstrapTable>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default wishlistModal
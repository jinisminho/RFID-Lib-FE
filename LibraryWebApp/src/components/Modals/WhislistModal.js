import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';
import MyUltil from 'store/ultility'


const whislistModal = (props) => {
    const options = {
        onPageChange: handlePageChange,
        page: props.page,
        sizePerPage: 5,
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
        props.fetchData(1, 5, props.studentId);
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
                    keyField="id"
                >
                    <TableHeaderColumn dataField="isbn" width="12%" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ISBN</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="55%" headerAlign="center" dataFormat={MyUltil.bookDescriptionFormat} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" width="12%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Category</TableHeaderColumn>
                </BootstrapTable>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default whislistModal
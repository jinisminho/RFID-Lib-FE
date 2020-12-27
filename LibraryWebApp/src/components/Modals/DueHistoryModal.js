import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';


const extendedDueModal = (props) => {

  return (
    
    
    <Modal dialogClassName="book-detail-modal" backdrop="static" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.hide} onShow={props.onShow} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapTable
          data={props.data}
          striped
          hover
          scrollTop={ 'Top' }
          height="400px"
        >
          <TableHeaderColumn dataField="id" isKey dataAlign="center">ID</TableHeaderColumn>
          <TableHeaderColumn dataField="dateDue" dataAlign="center">Due</TableHeaderColumn>
          <TableHeaderColumn dataField="dateExtended" dataAlign="center">Extended On</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default extendedDueModal
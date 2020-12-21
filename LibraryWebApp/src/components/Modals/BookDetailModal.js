import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';


const bookDetailModal = (props) => {
  function getName(cell, row) {
    console.log(cell);

    let res = "";

    cell.forEach(element => {
      res += element["name"] + "; "
    });

    return res;
  }

  return (
    
    
    <Modal dialogClassName="book-detail-modal" backdrop="static" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.hide} centered>
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
        >
          <TableHeaderColumn dataField="title" isKey dataAlign="center" width="15%">Title</TableHeaderColumn>
          <TableHeaderColumn dataField="authors" dataFormat={getName} dataAlign="center" width="15%">Authors</TableHeaderColumn>
          <TableHeaderColumn dataField="isbn" dataAlign="center" width="15%">ISBN</TableHeaderColumn>
          <TableHeaderColumn dataField="publisher" dataAlign="center" width="15%">Publisher</TableHeaderColumn>
          <TableHeaderColumn dataField="language" dataAlign="center" width="15%">Language</TableHeaderColumn>
          <TableHeaderColumn dataField="nop" dataAlign="center" width="5%">NOP</TableHeaderColumn>
          <TableHeaderColumn dataField="category" dataAlign="center" width="15%">Category</TableHeaderColumn>
          <TableHeaderColumn dataField="edition" dataAlign="center" width="5%">Edition</TableHeaderColumn>
          <TableHeaderColumn dataField="stock" dataAlign="center" width="5%">Available</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default bookDetailModal
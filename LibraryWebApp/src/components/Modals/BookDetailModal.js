import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';


const bookDetailModal = (props) => {
  function getName(cell, row) {

    let res = "";

    let i = 0;

    cell.forEach(element => {
      i < cell.length - 1 ? res += " " + element["name"] + " , " : res += " " + element["name"] + " ";
      i++;
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
          <TableHeaderColumn dataField="title" isKey dataAlign="center" width="24%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField="author" dataFormat={getName} dataAlign="center" width="15%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Authors</TableHeaderColumn>
          <TableHeaderColumn dataField="isbn" dataAlign="center" width="15%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ISBN</TableHeaderColumn>
          <TableHeaderColumn dataField="publisher" dataAlign="center" width="10%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Publisher</TableHeaderColumn>
          <TableHeaderColumn dataField="language" dataAlign="center" width="5%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Language</TableHeaderColumn>
          <TableHeaderColumn dataField="nop" dataAlign="center" width="5%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>NOP</TableHeaderColumn>
          <TableHeaderColumn dataField="category" dataAlign="center" width="10%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Category</TableHeaderColumn>
          <TableHeaderColumn dataField="edition" dataAlign="center" width="6%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Edition</TableHeaderColumn>
          <TableHeaderColumn dataField="stock" dataAlign="center" width="10%" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Available</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default bookDetailModal
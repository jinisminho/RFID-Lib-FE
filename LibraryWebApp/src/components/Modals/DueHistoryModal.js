import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';
import MyUtil from "store/utility"
import Row from 'reactstrap/lib/Row';
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';


const extendedDueModal = (props) => {

  function indexFormatter(cell, row, enumObject, index) {
    return index
  }

  function dateFormatter(cell, row) {
    return cell ? toDateTime(cell) : ''
  }

  function toDateTime(date) {
    return moment(MyUtil.convertToDate(date)).format(MyConstant.DATETIME)
  }

  return (


    <Modal dialogClassName="book-detail-modal" backdrop="static" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.hide} onShow={props.onShow} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Row className="ml-2">
            Book: {props.book.title ? props.book.title : ""} {props.book.subtitle ? " - " + props.book.subtitle : ""} {props.book.edition ? " - Edition [" + props.book.edition + "]" : ""}
          </Row>
          <Row className="ml-2">
            Barcode: {props.book.barcode ? props.book.barcode : ""}
          </Row>
          <Row className="ml-2">
            Borrowed At: {props.data ? (props.data[1].borrowedAt ? toDateTime(props.data[1].borrowedAt) : "") : ""}
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapTable
          data={props.data}
          striped
          hover
          scrollTop={'Top'}
          height="400px"
          keyField="id"
        >
          <TableHeaderColumn dataField="#" dataFormat={indexFormatter} dataAlign="center">#</TableHeaderColumn>
          <TableHeaderColumn dataField="renewedAt" dataFormat={dateFormatter} dataAlign="center">Renewed At</TableHeaderColumn>
          <TableHeaderColumn dataField="dueDate" dataFormat={dateFormatter} dataAlign="center">Due Date</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default extendedDueModal
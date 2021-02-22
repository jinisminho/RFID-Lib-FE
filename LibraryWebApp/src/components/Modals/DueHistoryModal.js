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
    return cell ? moment(MyUtil.convertToDate(cell)).format(MyConstant.DATE) : null
  }

  function toDateTime(date) {
    return moment(MyUtil.convertToDateTime(date)).format(MyConstant.DATETIME)
  }

  function datetimeFormatter(cell, row) {
    return cell ? moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME) : null
  }

  const bookCopy = props.bookCopy
  const book = bookCopy ? bookCopy.book : null;

  return (

    <Modal dialogClassName="book-detail-modal" backdrop="static" aria-labelledby="contained-modal-title-vcenter" show={props.show} onHide={props.hide} onShow={props.onShow} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Row className="ml-2">
            Book:{book ? ((book.title ? book.title : "") + (book.subtitle ? " - " + book.subtitle : "") + (book.edition ? " - Edition [" + book.edition + "]" : "")) : null}
          </Row>
          <Row className="ml-2">
            Barcode: {bookCopy.barcode ? bookCopy.barcode : ""}
          </Row>
          <Row className="ml-2">
            Borrowed At: {props.bookBorrowing ? (props.bookBorrowing.borrowing.borrowedAt ? toDateTime(props.bookBorrowing.borrowing.borrowedAt) : "") : ""}
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
          <TableHeaderColumn dataField="extendedAt" dataFormat={datetimeFormatter} dataAlign="center">Renewed At</TableHeaderColumn>
          <TableHeaderColumn dataField="dueAt" dataFormat={dateFormatter} dataAlign="center">Due Date</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default extendedDueModal
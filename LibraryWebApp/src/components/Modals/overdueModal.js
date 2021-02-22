import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';
import MyUtil from "store/utility"

const OverDueModal = (props) => {
  
    const titleFormatter=(cell, row) => {
        let res = row.title;
        res += row.edition ? " - Edition[" + row.edition + "]" : "";
        return res;
    }
    const dateFormatter=(cell, row) => {
            return moment(MyUtil.convertToDate(cell)).format(MyConstant.DATETIME)
        }
    const ifNullFormatter=(cell, row)=> {
            return cell ? cell : " - "
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
          keyField={props.data.id}
        >
          <TableHeaderColumn isKey={true} dataField="book" dataFormat={titleFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Book</TableHeaderColumn>
          <TableHeaderColumn dataField="borrowedAt" dataFormat={dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Borrowed At</TableHeaderColumn>
          <TableHeaderColumn dataField="dueDate" dataFormat={dateFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Due Date</TableHeaderColumn>
          <TableHeaderColumn dataField="overdueDays" dataFormat={ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Overdue Day(s)</TableHeaderColumn>
          <TableHeaderColumn dataField="fine" dataFormat={ifNullFormatter} dataAlign="center" tdStyle={{whiteSpace:'normal',wordWrap:'break-word'}}>Fine</TableHeaderColumn>
        </BootstrapTable>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default OverDueModal
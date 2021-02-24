import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './myModal.css';
import MyUtil from "store/utility"
import Row from 'reactstrap/lib/Row';
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';


const FeePolicyHistoryModal = (props) => {

    function datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }

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
                    options={props.options}
                    fetchInfo={{ dataTotalSize: props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                >
                    <TableHeaderColumn dataField="id" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} isKey={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="overdueFinePerDay" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Overdue Fine Per Day ({MyConstant.CURRENCY})</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxPercentageOverdueFine" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Max Percentage Overdue Fine (%)</TableHeaderColumn>
                    <TableHeaderColumn dataField="documentProcessing_Fee" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Document Processing Fee ({MyConstant.CURRENCY})</TableHeaderColumn>
                    <TableHeaderColumn dataField="missingDocMultiplier" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Missing Doc Multiplier</TableHeaderColumn>
                    <TableHeaderColumn dataField="createdAt" dataFormat={datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Created At</TableHeaderColumn>
                </BootstrapTable>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default FeePolicyHistoryModal
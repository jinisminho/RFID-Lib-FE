import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Alert, Tab, Tabs } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col
} from "reactstrap";
import MyUtil from "store/utility"
import * as MyConstant from '../Util/Constant'
import UpdateButton from '../../components/Button/UpdateButton'
import DeleteButton from '../../components/Button/DeleteButton'
import AddBorrowPolicyModal from "components/Modals/AddBorrowPolicyModal";
import FeePolicyHistoryModal from "components/Modals/FeePolicyHistoryModal";
import CommonConfirmModal from "components/Modals/CommonConfirmModal"
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import moment from 'moment';
import Select from 'react-select';


class Policy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successNotice: '',
            successShow: false,
            errorShow: false,
            addNewBorrowPolicyShow: false,
            feeHistoryShow: false,
            updateBorrowShow: false,
            deleteBorrowShow: false,
            updatePatronShow: false,
            updateFeeShow: false,
            tab: 1,
            borrow: null,
            lastFeeChanged: null,
            borrowChanged: null,
            borrowToDel: null,
        }
        this.fetchData = this.fetchData.bind(this);
        this.fetchDataBorrow = this.fetchDataBorrow.bind(this);
        this.fetchDataPatron = this.fetchDataPatron.bind(this);
        this.fetchDataFee = this.fetchDataFee.bind(this);
        this.handlePageChangeBorrow = this.handlePageChangeBorrow.bind(this);
        this.handlePageChangePatron = this.handlePageChangePatron.bind(this);
        this.handlePageChangeFee = this.handlePageChangeFee.bind(this);
        this.feeActionFormatter = this.feeActionFormatter.bind(this);
        this.borrowActionFormatter = this.borrowActionFormatter.bind(this);
        this.bookCopyTypeFormatter = this.bookCopyTypeFormatter.bind(this);
        this.protoTypeFormatter = this.protoTypeFormatter.bind(this);
        this.patronActionFormatter = this.patronActionFormatter.bind(this);
        this.datetimeFormatter = this.datetimeFormatter.bind(this);
        this.afterSaveCell_fee = this.afterSaveCell_fee.bind(this);
        this.cellValidator = this.cellValidator.bind(this);
        this.handleSelectPat = this.handleSelectPat.bind(this);
        this.handleSelectCpy = this.handleSelectCpy.bind(this);
        this.handleSelectPatAlt = this.handleSelectPatAlt.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.borrowPage > 1 && this.props.borrow.length == 0)
            this.fetchDataBorrow(1);
        if (this.props.borrowTypes && this.props.borrowTypes !== prevProps.borrowTypes) {
            let patTypesOpts = []
            let bookCpyTypesOpts = []
            patTypesOpts.push({ "value": "clear", "label": "SELECT THIS TO RESET" })
            bookCpyTypesOpts.push({ "value": "clear", "label": "SELECT THIS TO RESET" })
            this.props.borrowTypes.patronTypes.forEach(el => {
                patTypesOpts.push({ "value": el.id, "label": el.name })
            })
            this.props.borrowTypes.bookCopyTypes.forEach(el => {
                bookCpyTypesOpts.push({ "value": el.id, "label": el.name })
            })
            this.setState({ patTypesOpts: patTypesOpts, bookCpyTypesOpts: bookCpyTypesOpts })
        }
        if (this.props.patronTypes && this.props.patronTypes !== prevProps.patronTypes) {
            let patTypesAltOpts = []
            patTypesAltOpts.push({ "value": "clear", "label": "SELECT THIS TO RESET" })
            this.props.patronTypes.forEach(el => {
                patTypesAltOpts.push({ "value": el.id, "label": el.name })
            })
            this.setState({ patTypesAltOpts: patTypesAltOpts })
        }
        
    }

    handlePageChangeBorrow(page, sizePerPage) {
        this.fetchDataBorrow(page, sizePerPage, this.state.selectedPat, this.state.selectedCpy);
    }

    handlePageChangePatron(page, sizePerPage) {
        this.fetchDataPatron(page, sizePerPage, this.state.selectedPatAlt);
    }

    handlePageChangeFee(page, sizePerPage) {
        this.fetchDataFeePolicies(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);

    }

    fetchData(page, sizePerPage, searchValue) {
        this.fetchDataBorrow(page, sizePerPage, searchValue)
        this.fetchDataPatron(page, sizePerPage, searchValue)
        this.fetchDataFee()
    }

    fetchDataBorrow(page = this.props.borrowPage, sizePerPage = this.props.sizePerPage, patId = this.state.selectedPat, cpyId = this.state.selectedCpy) {
        this.props.onFetchDataBorrow(page - 1, sizePerPage, patId, cpyId)
        this.props.onFetchTypesBorrow()
    }

    fetchDataPatron(page = this.props.patronPage, sizePerPage = this.props.sizePerPage, patId = this.state.selectedPatAlt) {
        this.props.onFetchDataPatron(page - 1, sizePerPage, patId)
        this.props.onFetchTypesPatron()
    }

    fetchDataFee() {
        this.props.onFetchDataFee()
    }

    fetchDataFeePolicies(page = this.props.feePage, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.getFeePolicyHistory(page - 1, sizePerPage, searchValue)
    }

    borrowActionFormatter(cell, row) {
        return (
            <div>
                <UpdateButton tooltipMsg="Save" clicked={() => this.setState({ updateBorrowShow: true, borrowChanged: row })} />
                <DeleteButton clicked={() => this.setState({ deleteBorrowShow: true, borrowToDel: row })} />
            </div>
        )
    }

    updateBorrowPolicySubmit = (values) => {
        if (values) this.props.onUpdateBorrowPolicy(values)
        this.setState({ updateBorrowShow: false, successShow: true, errorShow: true })
        this.fetchDataBorrow()
    }

    deleteBorrowPolicySubmit = (value) => {
        if (value) this.props.onDeleteBorrowPolicy(value)
        this.setState({ deleteBorrowShow: false, successShow: true, errorShow: true })
        this.fetchDataBorrow()
    }

    patronActionFormatter(cell, row) {
        return (
            <div>
                <UpdateButton tooltipMsg="Save" clicked={() => this.setState({ updatePatronShow: true, patronChanged: row })} />
            </div>
        )
    }

    updatePatronPolicySubmit = (values) => {
        if (values) this.props.onUpdatePatronPolicy(values)
        this.setState({ updatePatronShow: false, successShow: true, errorShow: true })
        this.fetchDataPatron()
    }

    feeActionFormatter(cell, row) {
    }

    updateFeePolicySubmit = (values) => {
        if (values) this.props.onUpdateFeePolicy(values)
        this.setState({ updateFeeShow: false, lastFeeChanged: null, successShow: true, errorShow: true })
        this.fetchDataFee()
    }

    handleAddNewBorrowPolicyCancel = () => {
        this.setState({
            addNewBorrowPolicyShow: false,
        })
        this.handleModalClose()
    }

    handleAddNewBorrowPolicySubmit = values => {
        this.props.onAddBorrowPolicy(values)
        this.setState({ addNewBorrowPolicyShow: false, successShow: true, errorShow: true })
        this.fetchDataBorrow()
    }

    handleFeePolicyHistoryClose = () => {
        this.setState({
            feeHistoryShow: false,
        })
        this.handleModalClose()
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false, updateBorrowShow: false, deleteBorrowShow: false, updatePatronShow: false, updateFeeShow: false })
        this.fetchData();
    }

    afterSaveCell(row, cellName, cellValue) {
        row[cellName] = Number(cellValue);
    }

    afterSaveCell_fee(row, cellName, cellValue) {
        row[cellName] = Number(cellValue);
        this.setState({ lastFeeChanged: row })
    }

    protoTypeFormatter(cell, row) {
        return cell ? cell.name : null
    }

    bookCopyTypeFormatter(cell, row) {
        return cell ? cell.name : null
    }

    datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }

    cellValidator(cellValue, cellName) {
        var value = {};
        value[cellName] = cellValue
        // validation here
        const nan = isNaN(parseInt(cellValue, 10));
        if (nan) {
            return 'Value must be a integer';
        }
        if (MyConstant.MIN_DUE_DURATION > value.dueDuration || value.dueDuration > MyConstant.MAX_DUE_DURATION) {
            return "Due duration must be " + MyConstant.MIN_DUE_DURATION + "-" + MyConstant.MAX_DUE_DURATION
        }
        if (MyConstant.MIN_EXTEND_DUE_DURATION > value.extendDueDuration || value.extendDueDuration > MyConstant.MAX_EXTEND_DUE_DURATION) {
            return "Renew due duration must be " + MyConstant.MIN_EXTEND_DUE_DURATION + "-" + MyConstant.MAX_EXTEND_DUE_DURATION
        }
        if (MyConstant.MIN_NUMBER_BORROW_PAT > value.maxBorrowNumber || value.maxBorrowNumber > MyConstant.MAX_NUMBER_BORROW_PAT) {
            return "Max borrow number must be " + MyConstant.MIN_NUMBER_BORROW_PAT + "-" + MyConstant.MAX_NUMBER_BORROW_PAT
        }
        if (MyConstant.MIN_NUMBER_BORROW > value.maxNumberCopyBorrow || value.maxNumberCopyBorrow > MyConstant.MAX_NUMBER_BORROW) {
            return "Max borrow number must be " + MyConstant.MIN_NUMBER_BORROW + "-" + MyConstant.MAX_NUMBER_BORROW
        }
        if (MyConstant.MIN_EXTEND_TIME > value.maxExtendTime || value.maxExtendTime > MyConstant.MAX_EXTEND_TIME) {
            return "Max renew time must be " + MyConstant.MIN_EXTEND_TIME + "-" + MyConstant.MAX_EXTEND_TIME
        }
        if (MyConstant.MIN_FINE_PER_DAY > value.overdueFinePerDay || value.overdueFinePerDay > MyConstant.MAX_FINE_PER_DAY) {
            return "Overdue fine per day must be " + MyConstant.MIN_FINE_PER_DAY + "-" + MyConstant.MAX_FINE_PER_DAY
        }
        if (MyConstant.MIN_PERCENTAGE_OVERDUE_FINE > value.maxPercentageOverdueFine || value.maxPercentageOverdueFine > MyConstant.MAX_PERCENTAGE_OVERDUE_FINE) {
            return "Max percentage overdue fine must be " + MyConstant.MIN_PERCENTAGE_OVERDUE_FINE + "-" + MyConstant.MAX_PERCENTAGE_OVERDUE_FINE
        }
        if (MyConstant.MIN_DOC_PROCESSING_FEE > value.documentProcessing_Fee || value.documentProcessing_Fee > MyConstant.MAX_DOC_PROCESSING_FEE) {
            return "Document processing fee must be " + MyConstant.MIN_DOC_PROCESSING_FEE + "-" + MyConstant.MAX_DOC_PROCESSING_FEE
        }
        if (MyConstant.MIN_DOC_MULTIPLIER > value.missingDocMultiplier || value.missingDocMultiplier > MyConstant.MAX_DOC_MULTIPLIER) {
            return "Missing doc multiplier must be " + MyConstant.MIN_DOC_MULTIPLIER + "-" + MyConstant.MAX_DOC_MULTIPLIER
        }
        return true
    }

    handleSelectPat(el) {
        if (el.value == "clear") {
            this.setState({
                selectedPat: null, selectedPatEl: null,
            }, this.fetchDataBorrow(1, this.props.sizePerPage, null, this.state.selectedCpy))
        }
        else {
            this.setState({
                selectedPat: el.value, selectedPatEl: el,
            }, this.fetchDataBorrow(1, this.props.sizePerPage, el.value, this.state.selectedCpy))
        }
    }

    handleSelectCpy(el) {
        if (el.value == "clear") {
            this.setState({
                selectedCpy: null, selectedCpyEl: null
            }, this.fetchDataBorrow(1, this.props.sizePerPage, this.state.selectedPat, null))
        }
        else {
            this.setState({
                selectedCpy: el.value, selectedCpyEl: el
            }, this.fetchDataBorrow(1, this.props.sizePerPage, this.state.selectedPat, el.value))
        }

    }

    handleSelectPatAlt(el) {
        if (el.value == "clear") {
            this.setState({
                selectedPatAlt: null, selectedPatAltEl: null,
            }, this.fetchDataPatron(1, this.props.sizePerPage, null))
        }
        else {
            this.setState({
                selectedPatAlt: el.label, selectedPatAltEl: el,
            }, this.fetchDataPatron(1, this.props.sizePerPage, el.label))
        }
    }

    render() {

        const options_borrow = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.borrowPage,
            onPageChange: this.handlePageChangeBorrow,
        };

        const options_patron = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.patronPage,
            onPageChange: this.handlePageChangePatron,
        };

        const options_fees = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.feeSizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.feePage,
            onPageChange: this.handlePageChangeFee,
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell,
        };

        const cellEditProp_fee = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell_fee,
        };



        let borrow_policy = this.props.borrow ? (
            <div className="content mt-2">
                <Row className="w-100 m-0 p-0">
                    <Col className="col-2">
                        <Select
                            closeMenuOnSelect={false}
                            options={this.state.patTypesOpts}
                            onChange={(e) => this.handleSelectPat(e)}
                            value={this.state.selectedPatEl}
                            placeholder="Select patron types..."
                        />
                    </Col>
                    <Col className="col-2">
                        <Select
                            closeMenuOnSelect={false}
                            options={this.state.bookCpyTypesOpts}
                            onChange={(e) => this.handleSelectCpy(e)}
                            value={this.state.selectedCpyEl}
                            placeholder="Select copy types..."
                        />
                    </Col>

                    <Col className="pull-right">
                        <button onClick={() => this.setState({ addNewBorrowPolicyShow: true })}
                            type="button" className="btn btn-primary btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add New
                        </button>
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.borrow}
                    options={options_borrow}
                    fetchInfo={{ dataTotalSize: this.props.borrowTotalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    cellEdit={cellEditProp}
                >
                    <TableHeaderColumn dataField="patronType" dataAlign="center" dataFormat={this.protoTypeFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} editable={false}>Patron Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="bookCopyType" dataAlign="center" dataFormat={this.bookCopyTypeFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} editable={false}>Book Copy Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="dueDuration" editable={{ validator: (value, row) => { return this.cellValidator(value, "dueDuration") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Borrow Period (Days)</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxNumberCopyBorrow" editable={{ validator: (value, row) => { return this.cellValidator(value, "maxNumberCopyBorrow") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Checkouts Allowed (Count)</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxExtendTime" editable={{ validator: (value, row) => { return this.cellValidator(value, "maxExtendTime") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Renewals Allowed (Count)</TableHeaderColumn>
                    <TableHeaderColumn dataField="extendDueDuration" editable={{ validator: (value, row) => { return this.cellValidator(value, "extendDueDuration") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Renewal Period (Days)</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataAlign="center" width="12%" dataFormat={this.borrowActionFormatter} editable={false} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Action</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let patron_policy = this.props.patron ? (
            <div className="content mt-2">
                <Row className="w-100 m-0 p-0">
                    {/* <Col className="pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-info btn-fill float-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add New Policy
                        </button>
                    </Col> */}
                    <Col className="col-2">
                        <Select
                            closeMenuOnSelect={false}
                            options={this.state.patTypesAltOpts}
                            onChange={(e) => this.handleSelectPatAlt(e)}
                            value={this.state.selectedPatAltEl}
                            placeholder="Select patron types..."
                        />
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.patron}
                    options={options_patron}
                    fetchInfo={{ dataTotalSize: this.props.patronTotalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                    cellEdit={cellEditProp}
                >
                    <TableHeaderColumn dataField="name" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} editable={false}>Patron Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxBorrowNumber" editable={{ validator: (value, row) => { return this.cellValidator(value, "maxBorrowNumber") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Total Checkouts Allowed</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataAlign="center" width="10%" dataFormat={this.patronActionFormatter} editable={false} >Action</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let fee_policy = this.props.fee ? (
            <div className="content mt-2">
                <Row className="w-100 m-0 p-0">
                    <Col className="pull-right">
                        <button onClick={() => { this.setState({ updateFeeShow: true }) }}
                            type="button" rel="tooltip"
                            className="btn btn-success btn-fill float-right" disabled={!this.state.lastFeeChanged}>
                            <i className="fa fa-edit"></i> Update
                        </button>
                        <div>
                            <button className="btn btn-fill btn-primary float-right mr-1" onClick={() => this.setState({
                                feeHistoryShow: true,
                            })} ><i className="ni ni-collection" /> History </button>
                        </div>
                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.fee}
                    // remote
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4 mb-5"
                    keyField="id"
                    cellEdit={cellEditProp_fee}
                >
                    <TableHeaderColumn dataField="overdueFinePerDay" editable={{ validator: (value, row) => { return this.cellValidator(value, "overdueFinePerDay") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Overdue Fine Per Day ({MyConstant.CURRENCY})</TableHeaderColumn>
                    <TableHeaderColumn dataField="maxPercentageOverdueFine" editable={{ validator: (value, row) => { return this.cellValidator(value, "maxPercentageOverdueFine") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Max Overdue Fine (% of Book Price)</TableHeaderColumn>
                    <TableHeaderColumn dataField="documentProcessing_Fee" editable={{ validator: (value, row) => { return this.cellValidator(value, "documentProcessing_Fee") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Document Processing Fee ({MyConstant.CURRENCY})</TableHeaderColumn>
                    <TableHeaderColumn dataField="missingDocMultiplier" editable={{ validator: (value, row) => { return this.cellValidator(value, "missingDocMultiplier") } }} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Missing Doc Multiplier</TableHeaderColumn>
                    <TableHeaderColumn dataField="createdAt" dataFormat={this.datetimeFormatter} dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} editable={false}>Created At</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='action' dataAlign="center" width="10%" dataFormat={this.feeActionFormatter} editable={ false }>Action</TableHeaderColumn> */}
                </BootstrapTable>

                {/* delete popup */}
            </div>
        ) : null;

        let errorMsg = null
        let msg = null
        if (this.props.errOnFetch && this.state.errorShow) {
            errorMsg = <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.errOnFetch} />
        }
        if (this.props.error && this.state.errorShow) {
            errorMsg = <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
        }
        if (this.props.successMsg && this.state.successShow) {
            msg = <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
        }

        return (
            <>
                {/* <Header /> */}

                <Container className="mt-3" fluid>

                    <Row className="justify-content-center">
                        <Row className="shadow mt-1 pb-auto w-100">
                            <Card className="shadow mt-1 pb-auto w-100">
                                {/* <CardHeader className="border-0 ">
                                <h3 className="mb-0">Student Infomation</h3>
                            </CardHeader> */}
                                {errorMsg}
                                {msg}
                            </Card>
                        </Row>
                        <Row className="shadow mt-1 pb-auto w-100">
                            <Card className="shadow pb-auto w-100">
                                {/* <CardHeader className="border-0">
                                    <h3 className="mb-0">{MyConstant.BORROW_POLICY}</h3>
                                </CardHeader> */}
                                <Tabs defaultActiveKey="borrow" onSelect={() => this.fetchData()} id="my-uncontrolled-tab" >
                                    <Tab eventKey="borrow" title="Borrow">
                                        {borrow_policy}
                                    </Tab>
                                    <Tab eventKey="patron" title="Patron">
                                        {patron_policy}
                                    </Tab>
                                    <Tab eventKey="fee" title="Fee">
                                        {fee_policy}
                                    </Tab>
                                </Tabs>
                            </Card>
                        </Row>
                    </Row>


                    <Row className="justify-content-center">
                        <AddBorrowPolicyModal title="Add new" show={this.state.addNewBorrowPolicyShow} hide={() => this.handleAddNewBorrowPolicyCancel()} submit={values => this.handleAddNewBorrowPolicySubmit(values)} />
                        <FeePolicyHistoryModal title="Fee policy history" onShow={() => this.props.getFeePolicyHistory(0, this.props.feeSizePerPage)} show={this.state.feeHistoryShow} hide={() => this.handleFeePolicyHistoryClose()} options={options_fees} data={this.props.feePolicies} totalSize={this.props.feeTotalSize} />
                        <CommonConfirmModal title="Update borrow policy" show={this.state.updateBorrowShow} hide={() => this.handleModalClose()} clickConfirm={() => this.updateBorrowPolicySubmit(this.state.borrowChanged)} msg="Do you want to update this policy?" />
                        <CommonConfirmModal title="Delete borrow policy" show={this.state.deleteBorrowShow} hide={() => this.handleModalClose()} clickConfirm={() => this.deleteBorrowPolicySubmit(this.state.borrowToDel.id)} msg="Do you want to delete this policy?" />
                        <CommonConfirmModal title="Update patron policy" show={this.state.updatePatronShow} hide={() => this.handleModalClose()} clickConfirm={() => this.updatePatronPolicySubmit(this.state.patronChanged)} msg="Do you want to update this policy?" />
                        <CommonConfirmModal title="Update fee policy" show={this.state.updateFeeShow} hide={() => this.handleModalClose()} clickConfirm={() => this.updateFeePolicySubmit(this.state.lastFeeChanged)} msg="Do you want to update this policy?" />






                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        successMsg: state.policy.successMsg,
        error: state.policy.error,
        loading: state.policy.loading,
        borrow: state.policy.borrowPolicy,
        patron: state.policy.patronPolicy,
        fee: state.policy.feePolicy,
        feePolicies: state.policy.feePolicies,
        borrowTotalSize: state.policy.borrowTotal,
        patronTotalSize: state.policy.patronTotal,
        feeTotalSize: state.policy.feeTotal,
        borrowPage: state.policy.borrowPage,
        patronPage: state.policy.patronPage,
        feePage: state.policy.feePage,
        sizePerPage: state.policy.sizePerPage,
        feeSizePerPage: state.policy.feeSizePerPage,
        updateSuccess: state.policy.updateSuccess,
        borrowTypes: state.policy.borrowTypes,
        patronTypes: state.policy.patronTypes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataBorrow: (page, size, patId, cpyId) => dispatch(actions.getBorrowPolicy(page, size, patId, cpyId)),
        onFetchDataPatron: (page, size, patId) => dispatch(actions.getPatronPolicy(page, size, patId)),
        onFetchDataFee: () => dispatch(actions.getFeePolicy()),
        onAddBorrowPolicy: (data) => dispatch(actions.addBorrowPolicy(data)),
        onUpdateBorrowPolicy: (data) => dispatch(actions.updateBorrowPolicy(data)),
        onDeleteBorrowPolicy: (id) => dispatch(actions.deleteBorrowPolicy(id)),
        onUpdatePatronPolicy: (data) => dispatch(actions.updatePatronPolicy(data)),
        getFeePolicyHistory: (page, size) => dispatch(actions.getFeePolicies(page, size)),
        onUpdateFeePolicy: (data) => dispatch(actions.updateFeePolicy(data)),
        onFetchTypesBorrow: () => dispatch(actions.getTypesForBorrow()),
        onFetchTypesPatron: () => dispatch(actions.getPatronType()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Policy)
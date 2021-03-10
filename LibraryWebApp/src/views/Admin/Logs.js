import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import {
    Card,
    Container,
    Row,
    Col
} from "reactstrap";
import {
    InputGroup,
    FormControl,
    Button,
} from "react-bootstrap"
import MyUtil from "store/utility"
import * as MyConstant from '../Util/Constant'
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import moment from 'moment';
import { Link } from 'react-router-dom'
import DatePicker from '../../components/DateRangePicker/DatePicker'

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successNotice: '',
            successShow: false,
            errorShow: false,
            date: new Date(),
            calendarShow: false,
            formValue: null,
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleFormControl = this.handleFormControl.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate() {
    }

    handlePageChangeLog(page, sizePerPage) {
        this.fetchDataAlarmLogs(page, sizePerPage, this.state.date);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.date);

    }

    fetchData(page, sizePerPage, searchValue) {
        this.fetchDataAlarmLogs(page, sizePerPage, searchValue)
    }

    fetchDataAlarmLogs(page = this.props.logPage, sizePerPage = this.props.sizePerPage, searchValue = this.state.date) {
        this.props.onFetchDataAlarmLogs(page - 1, sizePerPage, searchValue)
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        this.fetchData();
    }

    datetimeFormatter(cell, row) {
        return moment(MyUtil.convertToDateTime(cell)).format(MyConstant.DATETIME)
    }

    bookDescriptionFormat(cell, row) {
        let thisCopy = row.bookCopy
        return (
            <>
                <Link to={{
                    pathname: '/admin/copyDetail',
                    state: {
                        copy: thisCopy,
                    }
                }}><h1 className="font-weight-bolder">{thisCopy.book.title}{thisCopy.book.subtitle ? " : " + thisCopy.book.subtitle : null}</h1></Link>
                <p>Barcode: {thisCopy.barcode}</p>
            </>
        )
    }

    imageFormatter(cell, row) {
        let thisCopy = row.bookCopy
        return (<img className="img-thumbnail" src={thisCopy.book.img} />)
    }

    handleSelect(date) {
        this.setState({ date: date })
        this.fetchData(this.props.logPage, this.props.sizePerPage, date)
    }

    handleFormControl(event) {
        let fieldValue = event.target.value;
        let regex = /^\d{4}-\d{2}-\d{2}$/;
        if (regex.test(fieldValue)) {
            if (moment(fieldValue).format(MyConstant.DATE) != 'Invalid date') {
                this.setState({ formValue: null, date: MyUtil.convertToDate(fieldValue) })
                this.fetchData(this.props.logPage, this.props.sizePerPage, fieldValue)
                return
            }
        }
        this.setState({ formValue: fieldValue })
    }

    render() {

        const options = {
            onSizePerPageList: this.handleSizePerPageChange,
            sizePerPage: this.props.sizePerPage,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
            page: this.props.logPage,
            onPageChange: this.handlePageChangeLog,
        };

        let calendar = this.state.calendarShow ?
            (
                <DatePicker date={this.state.date} onChange={this.handleSelect} />
            ) : null;

        let log = this.props.log ? (
            <div className="content mt-7 mt-md-3">
                <Row className="w-100 m-0 p-0">
                    <Col xs={12} xl={2} className="pl-4">
                        <InputGroup className="">
                            <InputGroup.Prepend>
                                <Button onClick={() => this.setState({ calendarShow: !this.state.calendarShow })}><i className="ni ni-calendar-grid-58" /></Button>
                            </InputGroup.Prepend>
                            <FormControl
                                className="pl-5"
                                placeholder="Choose date for logs..."
                                aria-label="Choose date for logs..."
                                aria-describedby="basic-addon2"
                                value={this.state.formValue ? this.state.formValue : moment(MyUtil.convertToDate(this.state.date)).format(MyConstant.DATE)}
                                onChange={this.handleFormControl}
                            />

                        </InputGroup>
                        {/* {calendar} */}
                    </Col>
                    <Col xs={12} xl={10} className="pr-4 pull-right">

                    </Col>
                </Row>
                <Row className="w-100 m-0 p-0">
                    <Col xs={1} md={0} className="">

                    </Col>
                    <Col xs={10} md={12} className="">
                        {calendar}
                    </Col>
                    <Col xs={1} md={0} className="">

                    </Col>
                </Row>

                <br />
                <BootstrapTable
                    data={this.props.log}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.logTotalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="10%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" headerAlign="center" dataFormat={this.bookDescriptionFormat} >Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="loggedAt" dataFormat={this.datetimeFormatter} >Logged at</TableHeaderColumn>
                </BootstrapTable>

                {/* delete popup */}
            </div >
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
                                {log}
                            </Card>
                        </Row>
                    </Row>


                    <Row className="justify-content-center">
                    </Row>

                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.logs.error,
        loading: state.logs.loading,
        successMsg: state.logs.successMsg,
        sizePerPage: state.logs.sizePerPage,

        log: state.logs.log,
        logTotalSize: state.logs.logTotal,
        logPage: state.logs.logPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataAlarmLogs: (page, size, date) => dispatch(actions.getAlarmLogIn1Date(page, size, date)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs)
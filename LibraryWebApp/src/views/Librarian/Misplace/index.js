import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Modal, Button, InputGroup, FormControl } from 'react-bootstrap'
import * as actions from 'store/actions/index'
import { connect } from 'react-redux'
import Spinner from 'components/Spinner/Spinner'
import {
    Card,
    Container
} from "reactstrap";
import BarcodeReader from 'react-barcode-reader'
import DeleteButton from 'components/Button/DeleteButton'
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"
import Select from 'react-select';
import { FlareSharp } from "@material-ui/icons";
import './misplaced.css';


class Misplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successShow: false,
            errorShow: false,
            confirmShow: false,
            bookSearchValue: "",
            isSampling: true,
            isChecking: false,
            shelvesOpts: [],
            linesOpts: [],
            selectingShelf: null,
            selectingLine: null,
            selectPositionId: null,
            isSampleScanning: false,
            missingBooks: null,
        }
        this.handleSampleScan = this.handleSampleScan.bind(this)
        this.handleCheckScan = this.handleCheckScan.bind(this)
        this.handleSelectShelf = this.handleSelectShelf.bind(this)
        this.rowClassNameFormat = this.rowClassNameFormat.bind(this)
    }
    componentDidMount() {
        this.clearBookData()
        this.props.onGetShelves()
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSampling !== prevState.isSampling) {
            this.props.onGetShelves()
            this.clearBookData()
            this.clearChecking()
            this.setState({
                linesOpts: [],
                selectingShelf: null,
                selectingLine: null,
                selectPositionId: null,
                isCheckScanning: false,
            })
        }
        if (this.props.shelves !== prevProps.shelves) {
            let shelvesOpts = []
            this.props.shelves.forEach(el => {
                shelvesOpts.push({ "value": el, "label": el })
            })
            this.setState({ shelvesOpts: shelvesOpts })
        }
        if (this.props.lines && this.props.lines !== prevProps.lines) {
            let linesOpts = []
            this.props.lines.forEach(el => {
                linesOpts.push({ "value": el.id, "label": el.line })
            })
            this.setState({ linesOpts: linesOpts })
        }
    }

    inputBookChangedHandler = (event) => {
        this.setState({ bookSearchValue: event.target.value })
    }

    handleModalClose() {
        this.setState({ successShow: false, errorShow: false })
        // this.clearBookData()
    }

    handleSearch() {
        this.props.onGetBook(this.state.bookSearchValue.trim())
    }

    clearReturnBookError() {
        this.setState({ errorShow: false })
    }

    startSampling() {
        this.setState({ isSampling: true, isChecking: false })
    }

    startChecking() {
        this.setState({ isSampling: false, isChecking: true })
    }

    handleSelectShelf(el) {
        this.setState({
            selectingShelf: el.value,
            selectingLine: null,
            selectPositionId: null,
        })
        this.props.onGetLines(el.value)
    }

    handleSelectLine(el) {
        this.setState({ selectingLine: el.label, selectPositionId: el.value })
    }

    handleSelectLineAlt(el) {
        this.setState({ selectingLine: el.label, selectPositionId: el.value })
        this.props.onGetInitialPositions(el.value)
    }

    handleSampleScan(data) {
        var found = false;
        if (data.trim().toUpperCase().includes("PAT#")) {
            data = data.trim().toUpperCase().split("PAT#")[1];
        }

        if (this.props.bookData) {
            for (var i = 0; i < this.props.bookData.length; i++) {
                if (this.props.bookData[i].rfid == data.trim()) {
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            this.setState({
                errorShow: true,
            })
            this.props.onGetBook(data.trim())
        }
    }

    handleCheckScan(data) {
        var found = false;
        if (data.trim().toUpperCase().includes("PAT#")) {
            data = data.trim().toUpperCase().split("PAT#")[1];
        }

        if (this.props.initPos) {
            for (var i = 0; i < this.props.initPos.length; i++) {
                if (this.props.initPos[i].rfid == data.trim()) {
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            let audio = new Audio(require("assets/sound/beep.mp3"))
            audio.play()
        }

        if (this.props.bookData) {
            for (var i = 0; i < this.props.bookData.length; i++) {
                if (this.props.bookData[i].rfid == data.trim()) {
                    return
                }
            }
        }

        this.setState({
            errorShow: true,
        })
        this.props.onGetBook(data.trim())
    }

    commonFormat(cell, row, extraData) {
        switch (extraData) {
            case "title":
                return row.book.title + (row.book.subtitle ? ((row.book.title ? ":" : "") + row.book.subtitle) : "")
            case "author":
                return row.book.authors
            case "edition":
                return row.book.edition
            case "callNumber":
                return row.book.callNumber
            case "initialPos":
                return row.position ? ("Shelf: " + row.position.shelf + " - Line: " + row.position.line) : ''
            default:
                break;
        }
    }

    startScanChecking(e) {
        this.clearBookData()
        this.clearChecking()
        if (!this.props.initPos || !this.state.selectPositionId || !this.state.selectingLine) return
        this.setState({ isCheckScanning: true })
        e.target.blur()
    }

    startScanSampling(e) {
        if (!this.state.selectPositionId) return
        this.setState({ isSampleScanning: true })
        e.target.blur()
    }

    clearBookData(e) {
        this.props.onClearBook()
        this.setState({
            bookSearchValue: "",
            isSampleScanning: false,
        })
        if(e) e.target.blur()
    }

    clearChecking() {
        this.props.onClearBook()
        this.setState({
            bookSearchValue: "",
            missingBooks: null,
        })
    }

    finishChecking(e) {
        e.target.blur()

        const doFinish = async () => {
            await this.setState({
                isCheckScanning: false,
            })
            if (this.state.missingBooks) {
                await this.clearChecking()
                return
            }
            if (this.props.bookData) {
                for (var i = 0; i < this.props.initPos.length; i++) {
                    if (!this.props.bookData.some(e => e.rfid === this.props.initPos[i].rfid)) {
                        await this.setState({
                            missingBooks: this.state.missingBooks ? [...this.state.missingBooks, this.props.initPos[i]] : [...[], this.props.initPos[i]]
                        })
                    }
                }
            }
            if(!this.state.missingBooks) await this.clearChecking()
            return
        }

        return doFinish()

    }

    finishSampling(e) {
        this.setState({
            successShow: true,
            errorShow: true,
            isSampleScanning: false,
        })

        let bookCodeList = null
        if (this.props.bookData) {
            bookCodeList = []
            for (var i = 0; i < this.props.bookData.length; i++) {
                bookCodeList.push(this.props.bookData[i].rfid)
            }
        }

        let data = { positionId: this.state.selectPositionId, rfids: bookCodeList, updater: this.props.currentUserId }
        this.props.onSaveSampledPosition(data)
        if (this.state.selectPositionId && bookCodeList && this.props.currentUserId) {
            this.clearBookData()
        }
        e.target.blur()
    }

    rowClassNameFormat(row, rowIdx) {
        if (this.props.initPos) {
            for (var i = 0; i < this.props.initPos.length; i++) {
                if (this.props.initPos[i].rfid == row.rfid.trim()) {
                    return ''
                }
            }
        }

        return 'alert-row'
    }

    render() {

        const options = {
            sizePerPage: 5,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>',
            hideSizePerPage: true,
        };

        let barcode1 = this.state.isSampleScanning ? <BarcodeReader
            onScan={this.handleSampleScan}
            onError={(e) => console.log(e)}
        /> : null

        let barcode2 = this.state.isCheckScanning ? <BarcodeReader
            onScan={this.handleCheckScan}
            onError={(e) => console.log(e)}
        /> : null

        let sampling = this.state.isSampling ? (
            <>
                {barcode1}

                <div className="content mt-2">
                    <Row className="w-100 m-0 p-0">
                        <Col className="col-2">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.shelvesOpts}
                                onChange={(e) => this.handleSelectShelf(e)}
                                isDisabled={this.state.isSampleScanning}
                            />
                        </Col>
                        <Col className="col-2">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.linesOpts}
                                onChange={(e) => this.handleSelectLine(e)}
                                isDisabled={this.state.isSampleScanning}
                            />
                        </Col>
                        {/* <Col className="col-4 mb-3 pl-4">
                            <InputGroup className="mb-3">
                                <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Search book by barcode" />
                                <InputGroup.Append>
                                    <button onClick={() => this.handleSampleScan(this.state.bookSearchValue)} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> */}
                        <Col className="pull-right">
                            <div>
                                <button className="btn btn-fill btn-primary float-right mr-1" onClick={(e) => this.finishSampling(e)} disabled={!this.props.bookData}> Finish </button>
                            </div>
                            <div>
                                <button className="btn btn-fill btn-primary float-right mr-1" onClick={(e) => this.clearBookData(e)} disabled={!this.state.selectPositionId}> Clear </button>
                            </div>
                            <div>
                                <button className="btn btn-fill btn-primary float-right mr-1" onClick={(e) => this.startScanSampling(e)} disabled={!this.state.selectPositionId}> Scan </button>
                            </div>
                        </Col>

                    </Row>

                    <br />
                    <BootstrapTable
                        data={this.props.bookData ? this.props.bookData : []}
                        options={options}
                        striped
                        hover
                        pagination
                        condensed
                        className="ml-4 mr-4"
                        keyField="id"
                    >
                        <TableHeaderColumn dataField="barcode" >Barcode</TableHeaderColumn>
                        <TableHeaderColumn dataField="rfid" >RFID</TableHeaderColumn>
                        <TableHeaderColumn dataField="callNumber" dataFormat={this.commonFormat} formatExtraData="callNumber">Call number</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataFormat={this.commonFormat} formatExtraData="title">Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="author" dataFormat={this.commonFormat} formatExtraData="author">Author</TableHeaderColumn>
                        <TableHeaderColumn dataField="edition" dataFormat={this.commonFormat} formatExtraData="edition">Edition</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </>
        ) : null

        let missingBooks = this.state.missingBooks ? (
            <>
                <Row className="w-100 m-0 p-0">
                    <Col>
                        <div className="d-flex">
                            <hr className="my-auto" width="5%" />
                            <div className="px-6"><p className="h2">Missing Books</p></div>
                            <hr className="my-auto flex-grow-1" />
                        </div>
                    </Col>
                </Row>

                <BootstrapTable
                    data={this.state.missingBooks ? this.state.missingBooks : []}
                    options={options}
                    // striped
                    hover
                    pagination
                    condensed
                    className="ml-4 mr-4"
                    keyField="id"
                // trClassName={this.rowClassNameFormat}
                >
                    <TableHeaderColumn dataField="title" dataFormat={this.commonFormat} formatExtraData="initialPos">Initial Position</TableHeaderColumn>
                    <TableHeaderColumn dataField="barcode" >Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField="rfid" >RFID</TableHeaderColumn>
                    <TableHeaderColumn dataField="callNumber" dataFormat={this.commonFormat} formatExtraData="callNumber">Call number</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataFormat={this.commonFormat} formatExtraData="title">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="author" dataFormat={this.commonFormat} formatExtraData="author">Author</TableHeaderColumn>
                    <TableHeaderColumn dataField="edition" dataFormat={this.commonFormat} formatExtraData="edition">Edition</TableHeaderColumn>
                </BootstrapTable>
            </>
        ) : null;

        let checking = this.state.isChecking ? (
            <>
                {barcode2}

                <div className="content mt-2">
                    <Row className="w-100 m-0 p-0">
                        <Col className="col-2">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.shelvesOpts}
                                onChange={(e) => this.handleSelectShelf(e)}
                                isDisabled={this.props.bookData || this.state.isCheckScanning}
                            />
                        </Col>
                        <Col className="col-2">
                            <Select
                                closeMenuOnSelect={false}
                                options={this.state.linesOpts}
                                onChange={(e) => this.handleSelectLineAlt(e)}
                                isDisabled={this.props.bookData || this.state.isCheckScanning}
                            />
                        </Col>
                        {/* <Col className="col-4 mb-3 pl-4">
                            <InputGroup className="mb-3">
                                <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Search book by barcode" />
                                <InputGroup.Append>
                                    <button onClick={() => this.handleCheckScan(this.state.bookSearchValue)} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col> */}
                        <Col className="pull-right">
                            <div>
                                <button className="btn btn-fill btn-primary float-right mr-1" onClick={(e) => this.finishChecking(e)} disabled={!this.props.bookData}> {this.state.missingBooks ? "Clear" : "Finish"} </button>
                            </div>
                            <div>
                                <button className="btn btn-fill btn-primary float-right mr-1" onClick={(e) => this.startScanChecking(e)} disabled={!this.state.selectPositionId}> Scan </button>
                            </div>
                        </Col>

                    </Row>

                    <br />
                    <BootstrapTable
                        data={this.props.bookData ? this.props.bookData : []}
                        options={options}
                        // striped
                        hover
                        pagination
                        condensed
                        className="ml-4 mr-4"
                        keyField="id"
                        trClassName={this.rowClassNameFormat}
                    >
                        <TableHeaderColumn dataField="title" dataFormat={this.commonFormat} formatExtraData="initialPos">Initial Position</TableHeaderColumn>
                        <TableHeaderColumn dataField="barcode" >Barcode</TableHeaderColumn>
                        <TableHeaderColumn dataField="rfid" >RFID</TableHeaderColumn>
                        <TableHeaderColumn dataField="callNumber" dataFormat={this.commonFormat} formatExtraData="callNumber">Call number</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataFormat={this.commonFormat} formatExtraData="title">Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="author" dataFormat={this.commonFormat} formatExtraData="author">Author</TableHeaderColumn>
                        <TableHeaderColumn dataField="edition" dataFormat={this.commonFormat} formatExtraData="edition">Edition</TableHeaderColumn>
                    </BootstrapTable>

                    <br />
                    {missingBooks}
                </div>

            </>
        ) : null

        if (this.props.bookLoading && this.props.loading) {
            sampling = <Spinner />
            checking = <Spinner />
        }

        return (
            <>
                <Container className="mt-3" fluid>
                    <Card className="shadow w-100 mb-2">
                        <Row className="w-100 mt-3 p-0">
                            <Col className="col-12 mb-3 pull-right">
                                <button onClick={() => this.startChecking()}
                                    type="button" className="btn btn-info btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Check
                                </button>
                                <button onClick={() => this.startSampling()}
                                    type="button" className="btn btn-info btn-fill float-right mr-3" >
                                    <span className="btn-label">
                                    </span> Sample
                        </button>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="shadow w-100">
                        {sampling}
                        {checking}
                    </Card>
                </Container>

                <CommonSuccessModal show={this.props.successMsg && this.state.successShow} hide={() => this.handleModalClose()} msg={this.props.successMsg} />
                <CommonErrorModal show={this.props.bookError && this.state.errorShow} hide={() => this.clearReturnBookError()} msg={this.props.bookError} />
                <CommonErrorModal show={this.props.error && this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.position.loading,
        error: state.position.error,
        bookData: state.position.bookData,
        bookLoading: state.position.bookLoading,
        bookError: state.position.bookError,
        successMsg: state.position.successMsg,
        shelves: state.position.shelves,
        lines: state.position.lines,
        currentUserId: state.Auth.userId,
        initPos: state.position.initPos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetBook: (search) => dispatch(actions.getScannedBook(search)),
        onClearBook: () => dispatch(actions.clearScannedBook()),
        onClearReturnBookError: () => dispatch(actions.clearReturnBookError()),
        onDeleteBook: (id) => dispatch(actions.deleteReturnBook(id)),
        onGetShelves: () => dispatch(actions.getShelves()),
        onGetLines: (shelf) => dispatch(actions.getLines(shelf)),
        onSaveSampledPosition: (data) => dispatch(actions.saveSampledPosition(data)),
        onGetInitialPositions: (positionId) => dispatch(actions.getInitialPositions(positionId)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Misplace)



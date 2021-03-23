/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Modal, Button, FormControl, InputGroup } from 'react-bootstrap'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import StudentHeader from '../../components/Headers/StudentHeader.js';
import BarcodeReader from 'react-barcode-reader'
import {
    Card,
    CardHeader,
    Container
} from "reactstrap";
import CommonSuccessModal from "components/Modals/CommonSuccessModal"
import CommonErrorModal from "components/Modals/CommonErrorModal"

class SearchBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            finishList: [],
            title: 'CLICK "START" TO SCAN',
            successNotice: "",
            successShow: false,
            errorShow: false,
            scanning: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleSelectBook = this.handleSelectBook.bind(this)
        this.handleScan = this.handleScan.bind(this)
    }
    componentDidMount() {
        this.fetchData()
    }
    componentDidUpdate() {
        let msg = null
        if (this.props.deleteSuccess) {
            msg = "Search books finish"
        }
        if (msg != null && !this.state.successShow) {
            this.setState({ successShow: true, successNotice: msg })
        }
    }

    fetchData() {
        this.props.onFetchData(this.props.userid)
    }
    handleModalClose() {
        this.setState({
            finishList: [],
            title: 'CLICK "START" TO SCAN',
            successNotice: "",
            successShow: false,
            errorShow: false
        })
    }
    bookDescriptionFormat(cell, row) {
        let position = ""
        position = row.positionList.map(el => "Shelf: " + el.shelf + "-Line: " + el.line).join(", ")
        if (position == "") {
            position = "No longer available"
        } else if (position == "Shelf: N/A-Line: N/A") {
            position = "N/A"
        }

        return (
            <div>
                <h2 className="font-weight-bolder">{row.title}{row.subtitle ? ":" + " " + row.subtitle : ""}</h2>
                <p>by <span className="font-weight-bold">{row.authorNames}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.edition}</p>
                <p><span className="font-weight-bold">Locations:</span> {position}</p>
                <p><span className="font-weight-bold">Call Number:</span> {row.callNumber}</p>
                <p><span className="font-weight-bold">ISBN:</span> {row.isbn}</p>
            </div>
        )
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.img} />)
    }
    handleScan=(data)=> {
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].copyRfidList.includes(data.trim()) && !this.state.finishList.includes(data.trim())) {
                const audioEl = document.getElementsByClassName("audio-element")[0]
                audioEl.play()
            }
        }
    }

    handleSelectBook(row, isSelect, rowIndex, e) {
        if (isSelect) {
            let tmpArr = []
            row.copyRfidList.forEach(el => {
                if (!this.state.finishList.includes(el)) {
                    tmpArr.push(el)
                }
            });
            this.setState({
                finishList: [...this.state.finishList, ...tmpArr]
            })
        } else {
            var array = [...this.state.finishList];
            row.copyRfidList.forEach(el => {
                var index = array.indexOf(el)
                if (index !== -1) {
                    array.splice(index, 1);
                }
            });
            this.setState({ finishList: array });
        }
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
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.handleSelectBook,
            unselectable:(this.props.data?this.props.data.filter(el => !el.available):[]).map(el=>el.id)
        };
        let barcodeReader = null
        let btn = (
            <button disabled={this.props.data.length==0 || this.props.data.filter(el => el.available).length==0} onClick={() => this.setState({ scanning: true, title:"SCANNING BOOKS" })}
                type="button" className="btn btn-info btn-fill float-right" >
                <span className="btn-label">
                </span> Start
            </button>
        )
        if (this.state.scanning) {
            btn = (
                <button onClick={() => {
                    this.setState({ scanning: false, title:'CLICK "START" TO SCAN' })
                    this.props.onFinishScan(this.props.userid)
            }}
                    type="button" className="btn btn-info btn-fill float-right" >
                    <span className="btn-label">
                    </span> Finish
                </button>)
            barcodeReader = (<BarcodeReader
                onScan={this.handleScan}
                onError={(e) => console.log(e)}
            />)
        }

        let bookDisplay = (
            <Container className="mt-4" fluid>
                <Card className="shadow w-100">
                    <CardHeader className="border-0">
                    </CardHeader>
                    <Row>
                        <Col className="col-4 pl-4">
                            {/* <InputGroup className="mb-3">
                                <FormControl value={this.state.bookSearchValue ? this.state.bookSearchValue : ""} onChange={(event => this.inputBookChangedHandler(event))} type="text" placeholder="Search book by barcode" />
                                <InputGroup.Append>
                                    <button onClick={() => this.handleBookSearch()} className="btn btn-simple"><span><i className="fa fa-search"></i></span></button>
                                </InputGroup.Append>
                            </InputGroup> */}
                        </Col>
                        <Col className="col-8 mb-3 pr-4 pull-right">
                            {btn}
                            <button disabled={this.props.data.length==0} onClick={() => this.props.onFinishScan(this.props.userid)}
                                type="button" className="btn btn-info btn-fill float-right mr-3" >
                                <span className="btn-label">Clear
                            </span>
                            </button>
                        </Col>
                    </Row>
                </Card>
                <BootstrapTable
                    data={this.props.data}
                    options={options}
                    pagination
                    striped
                    hover
                    condensed
                    className="mt-3"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="id"
                    selectRow={selectRow}
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="20%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                </BootstrapTable>
            </Container>)
        if (this.props.loading) {
            bookDisplay = <Spinner />
        }

        return (
            <>
                <StudentHeader title={this.state.title} />
                {barcodeReader}
                {bookDisplay}
                <audio className="audio-element">
                    <source src={require("assets/sound/bell.wav")}></source>
                </audio>
                <CommonSuccessModal show={this.state.successShow} hide={() => {
                    this.props.onClearFinish()
                    this.handleModalClose()
                    }} 
                    msg={this.state.successNotice} />
                <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        userid: state.Auth.userId,
        error: state.search.error,
        data: state.search.data,
        loading: state.search.loading,
        deleteSuccess: state.search.deleteSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (id) => dispatch(actions.getSearchList(id)),
        onFinishScan:(id) => dispatch(actions.finishSearchBook(id)),
        onClearFinish:() => dispatch(actions.clearFinish())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBook)

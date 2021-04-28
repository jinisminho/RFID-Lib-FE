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
import { Row, Col} from 'react-bootstrap'
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
import CommonConfirmModal from "components/Modals/CommonConfirmModal"

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
            confirmMessage:"",
            confirmTitle:"",
            confirmShow:false,
            currentBook:null
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
        let positionClass= ""
        position = row.positionList.map(el => "Shelf: " + el.shelf + "-Row: " + el.line).join(", ")
        if (position == "") {
            position = "No longer available"
            positionClass = "text-danger"
        } else if (position == "Shelf: N/A-Row: N/A") {
            position = "N/A"
        }

        return (
            <div>
                <h2 className="font-weight-bolder">{row.title}{row.subtitle ? ":" + " " + row.subtitle : ""}</h2>
                <p><span className="font-weight-bold">Locations:</span> <span className={positionClass}>{position}</span></p>
                <p><span className="font-weight-bold">Call Number:</span> {row.callNumber}</p>
            </div>
        )
    }
    imageFormatter(cell, row) {
        return (<img className="img-thumbnail" src={row.img} />)
    }
    handleScan=(data)=> {
        if(data.trim().length != 24){
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].copyRfidList.includes(data.trim()) && !this.state.finishList.includes(data.trim())) {
                const audioEl = document.getElementsByClassName("audio-element")[0]
                audioEl.pause()
                audioEl.currentTime = 0;
                audioEl.play()
                this.setState({
                    currentBook:this.props.data[i].id
                })
            }
        }
        }
    }

    handleSelectBook(row, isSelect, e) {
        if (isSelect) {
            let tmpArr = []
            row.copyRfidList.forEach(el => {
                if (!this.state.finishList.includes(el)) {
                    tmpArr.push(el)
                }
            });
            this.setState({
                finishList: [...this.state.finishList, ...tmpArr],
                currentBook:null
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
        e.target.blur()
    }
    handleConfirm(){
        this.setState({
            confirmTitle:"",
            confirmMessage:"",
            confirmShow:false,
            scanning: false,
            title:'CLICK "START" TO SCAN'
        })
        this.props.onFinishScan(this.props.userid)
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
            <button disabled={this.props.data.length==0 || this.props.data.filter(el => el.available).length==0} onClick={(e) => {this.setState({ scanning: true, title:"SCANNING BOOKS" }); e.target.blur()}}
                type="button" className="btn btn-primary btn-fill float-right" >
                <span className="btn-label">
                </span> Start
            </button>
        )
        const rowStyleFormat=(row, rowIdx)=> {
            return { backgroundColor: row?row.id==this.state.currentBook?"rgb(210, 244, 210)":"":"" };
          }
        if (this.state.scanning) {
            btn = (
                <button onClick={() => {
                    this.setState({confirmShow:true, confirmMessage:"Do you want to stop looking for books?",confirmTitle:"Finish search books"})
            }}
                    type="button" className="btn btn-primary btn-fill float-right" >
                    <span className="btn-label">
                    </span> Finish
                </button>)
            barcodeReader = (<BarcodeReader
                onScan={this.handleScan}
                onError={(e) => console.log(e)}
            />)
        }

        let bookDisplay = (
            <Container className="mt-2" fluid>
                <Card className="shadow w-100">
                    <Row>
                        <Col className="col-12 mt-3 mb-3 pr-4 pull-right">
                            {btn}
                            <button disabled={this.props.data.length==0 || this.state.scanning} onClick={() => this.setState({ confirmShow:true, confirmMessage:"Do you want to clear book search list?",confirmTitle:"Confirm clear book"})}
                                type="button" className="btn btn-primary btn-fill float-right mr-3" >
                                <span className="btn-label">Clear
                            </span>
                            </button>
                        </Col>
                    </Row>
                </Card>
                <BootstrapTable
                    data={this.props.data}
                    // options={options}
                    // pagination
                    striped
                    hover
                    condensed
                    className="mt-3"
                    bordered={false}
                    tableHeaderClass={"col-hidden"}
                    keyField="id"
                    selectRow={selectRow}
                    maxHeight='600px'
                    trStyle={rowStyleFormat}
                >
                    <TableHeaderColumn dataField="img" dataFormat={this.imageFormatter} width="7%">Image</TableHeaderColumn>
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
                <CommonConfirmModal title={this.state.confirmTitle} show={this.state.confirmShow} hide={() => this.setState({confirmShow:false,confirmMessage:"",confirmTitle:""})} clickConfirm={() => this.handleConfirm()} msg={this.state.confirmMessage}/>

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

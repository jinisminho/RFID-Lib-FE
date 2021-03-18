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
import {Row, Col, Modal, Button,FormControl,InputGroup} from 'react-bootstrap'
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
           finishList:[],
           title:'CLICK "START" TO SCAN',
           successNotice:"",
           successShow:false,
           errorShow:false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleSelectBook = this.handleSelectBook.bind(this)
    }
    componentDidMount(){
        this.fetchData()
    }
    componentDidUpdate() {
    }
    
    fetchData() {
        this.props.onFetchData(this.props.userid)
    }
    handleModalClose() {
        this.setState({
            finishList:[],
            title:'CLICK "START" TO SCAN',
            successNotice:"",
            successShow:false,
            errorShow:false
        })
    }
    bookDescriptionFormat(cell, row) {
        let position=""
        position=row.positionList.map(el=>"Shelf: "+el.shelf+"-Line: "+el.line).join(", ")
        return (
            <div>
                <h2 className="font-weight-bolder">{row.title}{row.subtitle?":" +" "+row.subtitle:""}</h2>
                <p>by <span className="font-weight-bold">{row.authorNames}</span></p>
                <p><span className="font-weight-bold">Edition:</span> {row.edition}</p>
                <p><span className="font-weight-bold">Position:</span> {position}</p>
                <p><span className="font-weight-bold">ISBN:</span> {row.isbn}</p>
            </div>
            )
    }
    imageFormatter(cell, row){
        return (<img className="img-thumbnail" src={row.img}/>)
    }
    handleScan(data) {
        if (this.props.studentData != null) {
            if (!(this.state.bookCodeList.includes(data.trim()) || data.trim().length!=24)) {
                this.setState({
                    successShow: false,
                    errorShow: false,
                    bookCodeList: [...this.state.bookCodeList, data.trim()]
                })
                this.props.onGetBook(data.trim(),this.props.studentData.id)
            }
        } else if(data.trim().toUpperCase().includes("PAT#")) {
            this.setState({
                successShow: false,
                errorShow: false
            })
            this.props.onFetchData(data.trim().toUpperCase().split("PAT#")[1])
        }
    }

    handleSelectBook(row, isSelect, rowIndex, e){
        if(isSelect){
            let tmpArr=[]
            row.copyRfidList.forEach(el => {
                if(!this.state.finishList.includes(el)){
                    tmpArr.push(el)
                }
            });
            this.setState({
                searchList:[...this.state.finishList,[...tmpArr]]
            })
        }else{
            var array = [...this.state.finishList]; 
            row.copyRfidList.forEach(el => {
                var index = array.indexOf(row.id)
                if (index !== -1) {
                    array.splice(index, 1);
                }
            });
            this.setState({searchList: array});
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
            // onSelect:this.handleSelectBook,
          };
            let bookDisplay =(
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
                                <button disabled={!(this.state.checkoutAllow && this.props.bookData.length>0)} onClick={() => this.props.onCheckPolicy(this.props.bookData,this.props.studentData.id,this.props.userid)}
                                    type="button" className="btn btn-info btn-fill float-right" >
                                    <span className="btn-label">
                                    </span> Start
                        </button>
                                <button onClick={() => this.handleModalClose()}
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
                    selectRow={ selectRow }
                >
                    <TableHeaderColumn dataField="img"  dataFormat={this.imageFormatter} width="30%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" width="60%" headerAlign="center" dataFormat={this.bookDescriptionFormat}>Description</TableHeaderColumn>
                </BootstrapTable>
                </Container>)
                if(this.props.loading){
                    bookDisplay=<Spinner/>
                }
        
        return (
            <>
                <StudentHeader title={this.state.title} />
                <BarcodeReader
                    onScan={this.handleScan}
                    onError={(e) => console.log(e)}
                />
                {bookDisplay}
                <CommonSuccessModal show={this.state.successShow} hide={() => this.handleModalClose()} msg={this.state.successNotice} />
                <CommonErrorModal show={this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error}/>
            </>
        );
}
}
const mapStateToProps = state => {
    return {
        userid:state.Auth.userId,
        error: state.search.error,
        data: state.search.data,
        loading: state.search.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (id) => dispatch(actions.getSearchList(id)),
        // onGetBook: (search,id) => dispatch(actions.getStudentBook(search,id)),
        // onCheckout: (studentid, booklist,reason,libid,mail) => dispatch(actions.checkout(studentid, booklist,reason,libid,mail)),
        // onClearData: () => dispatch(actions.clearData()),
        // onDeleteBook: (id) => dispatch(actions.deleteCheckoutBook(id)),
        // onClearBookError: () => dispatch(actions.clearBookError()),
        // onCheckPolicy: (data,patronid,libid) => dispatch(actions.checkPolicy(data,patronid,libid)),
        // onCancelConfirm:()=>dispatch(actions.cancelConfirm()),
        // onSubmitConfirmForm:() => dispatch(submit("CheckoutConfirmForm"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBook)

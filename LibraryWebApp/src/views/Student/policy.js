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
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
} from "reactstrap";
import CommonErrorModal from "components/Modals/CommonErrorModal";
//css


class BookStu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorShow: false,
        }
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate() {
        if (this.props.error != null && !this.state.errorShow) {
            this.setState({ errorShow: true })
        }
    }

    fetchData() {
        this.props.onFetchData()
    }

    handleModalClose() {
        this.setState({ errorShow: false })
        this.fetchData();
    }
    categoryFormatter(cell, row) {
        return row.bookCopyType.name
    }
    quantityFormatter(cell, row) {
        return row.maxBorrowNumber + " books"
    }
    dueFormatter(cell, row) {
        return row.dueDuration + " days"
    }
    renewFormatter(cell, row) {
        let tmp = ""
        if (row.maxExtendTime > 0) {
            tmp = row.maxExtendTime + " times, adding " + row.extendDueDuration + " days to the original due date"
        } else {
            tmp = "Not allowed"
        }
        return tmp
    }
    render() {
        let borrowPolicy = null
        if (this.props.data && this.props.data.patronTypes) {
            borrowPolicy = this.props.data.patronTypes.data.map(el => {
                return (
                    <div key={el.id} className="mb-5">
                        <h3>{el.name}</h3>
                        <br />
                        <p>A {el.name} can borrow a <mark>total of {el.maxBorrowNumber} books</mark> of all categories. For each category, a {el.name} can borrow:</p>
                        <BootstrapTable
                            data={el.borrowPolicies}
                            striped
                            hover
                            condensed
                            className="mt-3"
                            bordered={false}
                            keyField="id"
                        >
                            <TableHeaderColumn dataField="category" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} headerAlign="center" dataFormat={this.categoryFormatter} width="25%">Book Group</TableHeaderColumn>
                            <TableHeaderColumn dataField="quantity" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} width="25%" headerAlign="center" dataFormat={this.quantityFormatter}>Checkouts Allowed*</TableHeaderColumn>
                            <TableHeaderColumn dataField="action" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} width="25%" headerAlign="center" dataFormat={this.dueFormatter}>Borrow Period</TableHeaderColumn>
                            <TableHeaderColumn dataField="renewTime" dataAlign="center" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} width="25%" headerAlign="center" dataFormat={this.renewFormatter}>Renewal Allowed</TableHeaderColumn>
                        </BootstrapTable>
                        
                    <i>
                       <p>*Checkouts allowed is the total number of books a patron can borrow at a time (including books that patron currently keeping)</p> 
                    </i>
                    </div>
                )
            });
        }
        let display = (
            <>
                <h1 className="text-center">Library Services</h1>
                <div>
                    <h2>Borrow and Renew</h2>
                    <p>A patron can only borrow 1 copy for each book title. Renew can be used to extend the book’s borrow duration (extended days are added to the original due date).</p>
                </div>
                <Row className="w-100 m-0 p-0">
                    {borrowPolicy}
                </Row>
                <div>
                    <h2>Return and Fine</h2>
                    <p>Patrons should return all borrowing books before the due date. Patrons who return after the due date will be fined an amount of money.</p>
                    <p><span className="font-weight-bold">Overdue fine:</span> {this.props.data?this.props.data.feePolicy.overdueFinePerDay:""} VND/overdue day*/book</p>
                    <p>If the borrowed book is lost, the patron will also be fined. Includes overdue fine if the lost book is overdue.</p>
                    <ul>
                        <li><span className="font-weight-bold">Lost book fine</span>
                        <ul>
                            <li>If the book is still available in the market: Fine (VND) = Lost book’s price** + {this.props.data?this.props.data.feePolicy.documentProcessingFee:""} (Document processing fee)</li>
                            <li>If the book is no longer available to buy: Fine (VND) = Lost book’s price x {this.props.data?this.props.data.feePolicy.missingDocMultiplier:""} times</li>
                        </ul>
                        </li>
                    </ul>
                    <i>
                        <p>*Does not include Saturdays and Sundays.</p>
                        <p>**Lost book’s price is based on what the library recorded when the book is added to the library multiplied by {this.props.data?this.props.data.feePolicy.maxPercentageOverdue:""}%.</p>
                        <p>***The fine policy used is the policy in circulation when the book was borrowed, not the latest circulation policy</p>
                    </i>
                </div>
                <div>
                    <h2>Self-Service</h2>
                    <ul>
                        <li>Self-service kiosks: Patron can checkout (borrow) or return books at the self-service kiosks. Self-service kiosks can be found inside the library area.</li>
                        <li>Book drop station: Patron can return books at the book drop stations without having to come directly to the library. Book drop stations can be found at some places in the school campus.</li>
                        <li>Find books with book reader: By adding the desired books to the "Search list" from the patron web application, the patron can then use the book readers available inside the library to search for those books position on the shelf.</li>
                    </ul>
                    <p><i>Note: Overdue books can only be returned at the librarian counter.</i></p>
                </div>
                <div>
                    <h2>Library Staff</h2>
                    <p>For more details and support please contact the librarians.</p>
                </div>
            </>
        )

        if (this.props.loading) {
            display = <Spinner />
        }

        return (
            <>
                {/* <Header /> */}
                <Container className="mt-3">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                        </CardHeader>
                        <CardBody>

                            {display}
                        </CardBody>
                    </Card>
                </Container>
                <CommonErrorModal show={this.props.error && this.state.errorShow} hide={() => this.handleModalClose()} msg={this.props.error} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.stuPolicy.loading,
        data: state.stuPolicy.data,
        error: state.stuPolicy.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: () => dispatch(actions.getPolicy()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStu)
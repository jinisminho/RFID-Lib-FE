import React from 'react';
import { reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import MyUtil from "store/utility"
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';
import * as actions from 'store/actions/index'
import { connect } from 'react-redux'

function toDateTime(date) {
    return moment(MyUtil.convertToDate(date)).format(MyConstant.DATE)
}

class ExtendDueForm extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        console.log(this.props.bookId,this.props.patronId);
        this.props.onCheckPolicy(this.props.bookId,this.props.patronId)
    }

    render() {
        const {
            handleSubmit,
            handleCancel,
            submitting,
        } = this.props


        let dueDate = this.props.newDueDate ? (
            <>
            <p className="font-weight-bold">{"Please return before: " + this.props.newDueDate}</p>
            </>
        ) : null

        const reasons = (reason) => (
            <p key={reason}>{reason}</p>
        )
        
        let policyViolation = this.props.policyViolation ? (
            <>
            <p className="font-weight-bold">{"This book can not be renew because: "}</p>
            {/* {this.props.policyViolation ? this.props.policyViolation.forEach(element => <p className="font-weight-bold">{element}</p>) : null} */}
            {this.props.policyViolation ? this.props.policyViolation.map(reasons) : null}
            </>
        ) : null

        return (
            <div className="card border-0">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {dueDate}
                            {policyViolation}
                        </div>
                        <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                            <span className="btn-label">
                            </span> Back
                        </button>
                        &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success " disabled={submitting || this.props.policyViolation || !this.props.newDueDate}>
                            <span className="btn-label">
                            </span> Confirm
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        newDueDate: state.info.newDueDate,
        policyViolation: state.info.policyViolation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckPolicy: (bookId, patronId) => dispatch(actions.checkPolicyRemainder(bookId, patronId)),
    }
}

ExtendDueForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExtendDueForm)

export default reduxForm({
    form: 'extendDueForm'
})(ExtendDueForm)
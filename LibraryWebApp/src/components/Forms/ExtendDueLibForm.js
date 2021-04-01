import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import MyUtil from "store/utility"
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';
import * as actions from 'store/actions/index'
import { connect } from 'react-redux'
// reactstrap components
import {
    Button,
    FormGroup,
    Input,
    InputGroup,
} from "reactstrap";
import { Popover, OverlayTrigger } from 'react-bootstrap'

const renderField = ({ input, isRequired, placeholder, type, meta: { touched, error }, title }) => (
    <>
        {/* <Label>{title}</Label> */}
        <p className="font-weight-bold">{title}{isRequired ? <span className="text-danger">*</span> : null}</p>
        <InputGroup className="input-group-alternative">
            <Input {...input} placeholder={placeholder} type={type} />
            {touched && ((error && <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={
                    <Popover>
                        <Popover.Content>
                            <span className="text-danger">{error}</span>
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button onClick={(e) => e.preventDefault()} className="text-danger"><i className="fas fa-exclamation-circle"></i></Button>
            </OverlayTrigger>))}
        </InputGroup>
    </>
)

const validate = values => {
    const errors = {}
    if (!values.reason) {
        errors.reason = 'Reason is required'
    } else if (values.reason.length > 500) {
        errors.reason = "Reason's max lenght is 500"
    }

    return errors
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
        this.props.onCheckPolicy(this.props.bookBorrowingId)
    }

    render() {
        const {
            handleSubmit,
            handleCancel,
            submitting,
            pristine
        } = this.props


        let dueDate = this.props.newDueDate && this.props.isRenewable ? (
            <>
                <span className="font-weight-bold">New Due Date: </span> <span>{moment(MyUtil.convertToDate(this.props.newDueDate)).format(MyConstant.DATE)}</span>
            </>
        ) : null

        const reasons = (reason) => (
            <p key={reason}>{reason}</p>
        )

        let policyViolation_sub = this.props.isRenewable ? (
            <FormGroup className="mb-3 w-100">
                <Field
                    name="reason"
                    type="textarea"
                    placeholder="Reason"
                    title="If you want to renew, please enter reason:"
                    isRequired={true}
                    component={renderField} />
            </FormGroup>
        ) : (
            <p className="font-weight-bold text-danger">This borrowing is not able to renew.</p>
        )


        let policyViolation = this.props.policyViolation && this.props.policyViolation.length != 0 ? (
            <>
                <p className="font-weight-bold">{"Policy violations: "}</p>
                {/* {this.props.policyViolation ? this.props.policyViolation.forEach(element => <p className="font-weight-bold">{element}</p>) : null} */}
                {this.props.policyViolation ? this.props.policyViolation.map(reasons) : null}
                {policyViolation_sub}
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
                        {policyViolation && this.props.isRenewable ? (<div className="text-left">
                            <span className="text-danger">* Required field</span>
                        </div>) : null}
                        <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                            <span className="btn-label">
                            </span> Back
                        </button>
                        &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success " disabled={submitting || (this.props.isViolated ? pristine : false) || !this.props.libraianId || !this.props.isRenewable}>
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
        isRenewable: state.info.isRenewable,
        isViolated: state.info.isViolated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckPolicy: (bookBorrowingId) => dispatch(actions.checkPolicyRemainder(bookBorrowingId)),
    }
}

ExtendDueForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExtendDueForm)

export default reduxForm({
    form: 'extendDueLibForm',
    validate
})(ExtendDueForm)
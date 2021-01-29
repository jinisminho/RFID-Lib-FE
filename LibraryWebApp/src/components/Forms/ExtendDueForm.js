import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import MyUtil from "store/utility"
import * as MyConstant from '../../views/Util/Constant'
import moment from 'moment';

// const FieldDatePicker = ({ input, placeholder, minDate, maxDate }) => (
//     <DatePicker
//         className="plus-icon"
//         dateFormat="yyyy/MM/dd"
//         selected={input.value || null}
//         onChange={input.onChange}
//         minDate={minDate}
//         maxDate={maxDate}
//         disabledKeyboardNavigation
//         placeholderText={placeholder}
//     />
// );

function thisDueDate(dueDate, numOfDateToAdd) {
    let date = MyUtil.convertToDate(dueDate)
    date.setDate(date.getDate() + numOfDateToAdd)
    return toDateTime(date)
};

function toDateTime(date) {
    return moment(MyUtil.convertToDate(date)).format(MyConstant.DATE)
  }

const ExtendDueForm = ({
    handleSubmit,
    handleCancel,
    // minDate,
    // maxDate,
    dueDate,
    numOfDateToAdd
}) => (
        <div className="card border-0">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <p className="font-weight-bold">{"Please return before: " + thisDueDate(dueDate, numOfDateToAdd ? numOfDateToAdd : MyConstant.DEFAULT_DATE_TO_ADD)}</p>
                        {/* <Field name={"datePicker"} component={FieldDatePicker} placeholder="YYYY/MM/DD" minDate={minDate} maxDate={maxDate}/>                            */}
                        <input type="hidden" id="newDueDate" name="newDueDate" value={thisDueDate(dueDate, numOfDateToAdd ? numOfDateToAdd : 1)}></input>
                    </div>
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Back
                        </button>
                        &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Confirm
                        </button>
                </form>
            </div>
        </div>
    );

export default reduxForm({
    form: 'extendDueForm'
})(ExtendDueForm)
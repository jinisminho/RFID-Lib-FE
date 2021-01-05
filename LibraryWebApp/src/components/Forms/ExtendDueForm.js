import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
import MyUltil from "store/ultility"

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
    let date = MyUltil.convertToDate(dueDate)
    date.setDate(date.getDate() + numOfDateToAdd)
    return date
};

const ExtendDueForm = ({
    handleSubmit,
    handleCancel,
    // minDate,
    // maxDate,
    dueDate,
    numOfDateToAdd
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">{"New Due Date:  "} <p className="font-weight-bold">{"" + thisDueDate(dueDate, numOfDateToAdd ? numOfDateToAdd : 1)}</p></label>
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
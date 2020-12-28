import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';

const FieldDatePicker = ({ input, placeholder, minDate, maxDate }) => (
    <DatePicker
        className="plus-icon"
        dateFormat="yyyy/MM/dd"
        selected={input.value || null}
        onChange={input.onChange}
        minDate={minDate}
        maxDate={maxDate}
        disabledKeyboardNavigation
        placeholderText={placeholder}
    />
);

const ExtendDueForm = ({
    handleSubmit,
    handleCancel,
    minDate,
    maxDate
}) => (
        <div className="card">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">New Due Date: </label>
                        <Field name={"datePicker"} component={FieldDatePicker} placeholder="YYYY/MM/DD" minDate={minDate} maxDate={maxDate}/>                           
                    </div>
                    <button onClick={handleCancel} type="button" className="btn btn-wd btn-default" >
                        <span className="btn-label">
                        </span> Back
                        </button>
                        &nbsp;&nbsp;
                    <button type="submit" className="btn btn-wd btn-success ">
                        <span className="btn-label">
                        </span> Submit 
                        </button>
                </form>
            </div>
        </div>
    );

export default reduxForm({
    form: 'extendDueForm'
})(ExtendDueForm)
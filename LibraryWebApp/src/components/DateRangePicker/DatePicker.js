import React, { Component } from 'react';
// import { Calendar } from 'react-date-range';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import * as MyConstant from '../../views/Util/Constant'
// export default class DatePicker extends Component {
//   render() {
//     return (
//         <Calendar
//         date={this.props.date ? this.props.date : new Date()}
//         maxDate={new Date()}
//         showSelectionPreview={true}
//         onChange={this.props.onChange}
//         direction="horizontal"
//         showMonthArrow={this.props.showMonthArrow ? this.props.showMonthArrow : false}
//       />
//     );
//   }
// }
export default class DatePicker extends Component {
  render() {
    return (
      <DateRangePicker
        initialSettings={{
          singleDatePicker: true,
          showDropdowns: true,
          startDate: moment(),
          maxDate: moment(),
          minYear: 1901,
          maxYear: parseInt(moment().format('YYYY'), 10),
          locale: {
            format: MyConstant.DATE_PICKER_FORMAT,
          },
        }}
        onCallback={(start) => {
          this.props.onChange(start.format(MyConstant.DATE_PICKER_FORMAT));
        }}

      >
        <input type="text" className="form-control col-4" />
      </DateRangePicker>

    );
  }
}
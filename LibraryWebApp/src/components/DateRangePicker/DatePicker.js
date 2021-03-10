import React, { Component } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
export default class DatePicker extends Component {
  render() {
    return (
        <Calendar
        date={this.props.date ? this.props.date : new Date()}
        maxDate={new Date()}
        showSelectionPreview={true}
        onChange={this.props.onChange}
        direction="horizontal"
        showMonthArrow={this.props.showMonthArrow ? this.props.showMonthArrow : false}
      />
    );
  }
}

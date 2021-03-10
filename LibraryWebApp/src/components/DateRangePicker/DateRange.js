import React, { Component } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
export default class DateRange extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

  render() {
    return (
      <DateRangePicker
          onChange={item => {
            if(item.selection.endDate> new Date()){
              item.selection.endDate=new Date()
            }
            this.setState({...item.selection}, () => {
              this.props.onChange(item.selection.startDate,item.selection.endDate)
            })
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={[this.state]}
          maxDate={new Date()}
          direction="horizontal"
        />
    );
  }
}

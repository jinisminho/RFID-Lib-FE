import React, { Component } from 'react';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import * as MyConstant from '../../views/Util/Constant'
import DateRangePicker from 'react-bootstrap-daterangepicker';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
// export default class DateRange extends Component {
//   state = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
//   };

//   render() {
//     return (
//       <DateRangePicker
//           onChange={item => {
//             if(item.selection.endDate> new Date()){
//               item.selection.endDate=new Date()
//             }
//             this.setState({...item.selection}, () => {
//               this.props.onChange(item.selection.startDate,item.selection.endDate)
//             })
//           }}
//           showSelectionPreview={true}
//           moveRangeOnFirstSelection={false}
//           months={2}
//           ranges={[this.state]}
//           maxDate={new Date()}
//           direction="horizontal"
//           dateDisplayFormat={MyConstant.DATE_PICKER_FORMAT}
//         />
//     );
//   }
// }
export default class DateRange extends Component {
  render() {
    return (
      <DateRangePicker
      initialSettings={{ 
        startDate: moment(), 
        endDate: moment() ,
        showDropdowns: true ,
        maxDate:moment(),
        locale: {
          format: MyConstant.DATE_PICKER_FORMAT,
        },
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [
            moment().subtract(1, 'days').toDate(),
            moment().subtract(1, 'days').toDate(),
          ],
          'This Month': [
            moment().startOf('month').toDate(),
            moment().endOf('month').toDate(),
          ],
          'Last Month': [
            moment().subtract(1, 'month').startOf('month').toDate(),
            moment().subtract(1, 'month').endOf('month').toDate(),
          ],
          'Q1': [
            moment().quarter(1).startOf('quarter').toDate(),
            moment().quarter(1).endOf('quarter').toDate(),
          ],
          'Q2': [
            moment().quarter(2).startOf('quarter').toDate(),
            moment().quarter(2).endOf('quarter').toDate(),
          ],
          'Q3': [
            moment().quarter(3).startOf('quarter').toDate(),
            moment().quarter(3).endOf('quarter').toDate(),
          ],
          'Q4': [
            moment().quarter(4).startOf('quarter').toDate(),
            moment().quarter(4).endOf('quarter').toDate(),
          ],
          'This year': [
            moment().startOf('year').toDate(),
            moment().endOf('year').toDate(),
          ],
        },
      }}
      maxDate={new Date()}
      
      onApply={(event, picker) => this.props.onChange(picker.startDate.format(MyConstant.DATE_PICKER_FORMAT),picker.endDate.format(MyConstant.DATE_PICKER_FORMAT))}
>
  <input type="text" className="form-control" />
</DateRangePicker>
    );
  }
}

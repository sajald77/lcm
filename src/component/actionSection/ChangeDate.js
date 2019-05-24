import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class ChangeDate extends Component {
    constructor (props) {
        super(props)
        };
    
      render(
        
      ) {
        return <DatePicker
        selected={this.props.selected}
        welcomePage={this.props.welcomePage}
        onChange={this.props.handleChangeDate}
        minDate={moment()}
        maxDate={moment().add(5, "days")}
        showDisabledMonthNavigation />
     ;
      }
}
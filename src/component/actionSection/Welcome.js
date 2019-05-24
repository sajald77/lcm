import React, { Component } from 'react';
import ChangeDate from "./ChangeDate";

export default class Welcome extends Component {
    constructor(props) {
        super(props);


    }
   
    render() {
        return (
            <div>
                <h1> <i className="fa fa-user-circle-o" aria-hidden="true"></i> Welcome {this.props.userName}</h1>
	<h1>
     <div className="text-center">  Selected Date:  <br />
    <ChangeDate className="ptop"
    welcomePage={this.props.welcomePage}
    handleChangeDate={this.props.handleChangeDate}
    selected={this.props.selected}
    />
      </div>   
	</h1> 
            </div>
        )
    }
}

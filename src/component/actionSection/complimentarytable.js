import React from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import HoldtoSell from './holdtosell';
import ComplimentaryCancle from "./ComplimentaryCancle"


class Complimentarytable extends React.Component {
  constructor(props) {
    super(props);
    
   
  }

 
  onCellEdit = (row, fieldName, value) => {
    const { data } = this.state;
    let rowIdx;
    const targetRow = data.find((prod, i) => {
      if (prod.id === row.id) {
        rowIdx = i;
        return true;
      }
      return false;
    });
    if (targetRow) {
      targetRow[fieldName] = value;
      data[rowIdx] = targetRow;
      this.setState({ data });
    }
  }

  editNow = (row) => {
    this.products = this.products.filter((product) => {
      return product.id !== row[0];
    })}

  onAddRow = (row) => {
    this.products.push(row);
    this.setState({
      data: this.products
    });
  }
  
  
  createCustomInsertButton = () => {
  
    return (
      <button style={ { color: 'white' } } className="btn" onClick={this.onClick } >Cancle</button>
    );
  }
 
  
 

  onDeleteRow = (row) => {
    this.products = this.products.filter((product) => {
      return product.id !== row[0];
    });

    this.setState({
      data: this.products
    });
  }

  render() {
    return (
      <RemoteAlternative
      banklist={this.props.banklist}
       handleHide={this.props.handleHide}
      // onSubmit={row => this.props.holdtosell(row)} 
        
        cancellingSingleSeat={this.props.cancellingSingleSeat}
        unhold={row =>this.props.holdtoUnhold(row)}
        holdtable={this.props.holdtable}
        complimentarytable={this.props.complimentarytable}
        onCellEdit={ this.onCellEdit }
        onAddRow={ this.onAddRow }
        createCustomInsertButton={this.createCustomInsertButton}
        createCustomInsertButton1={this.createCustomInsertButton1}
        { ...this.state } />
    );
  }
}

class RemoteAlternative extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      datatohold:[],
      rowseat:[]
    }
  }

  remote(remoteObj) {
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  buttonFormatter=(cell, row)=>{
    let onClick=()=>{
      
       this.setState({
        holdtobook:row,
        rowseat:row.seat.split(',')
      })
  
    }
        return (
          <div>

          <ComplimentaryCancle
           row={this.state.rowseat} 
           
          banklist={this.props.banklist}
          rowData={this.state.holdtobook}
           onSubmit={row => this.props.cancellingSingleSeat(row)} 
           handleHide={this.props.handleHide}
          onClick={onClick}/>
          </div>
        );
          }
    
        

        buttonFormatter1=(cell, row)=>{
          let onClick=()=>{
            
            this.setState({
              datatobook:row
            })
            this.props.unhold(row);
          }
              return (  
              <button className=" btn-danger btn" onClick={onClick} >Unhold</button>
            );
              }
  render() {
    const cellEditProp = {
      mode: 'click'
    };
   
   
    



    return (
      <BootstrapTable data={this.props.complimentarytable}
                    
                      remote={ this.remote }
                    
                      search pagination
                      
                      options={ {
                        onDeleteRow: this.props.onDeleteRow, 
                      } }>
        <TableHeaderColumn  width='40'  dataField='sn' isKey={ true }>Id</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='customer_name' >Name</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='customer_email' >Email</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='customer_mobile' >Mobile</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='movie' >Movie</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='category' >Category</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='screen' >Screen</TableHeaderColumn>
        <TableHeaderColumn  width='70'  dataField='seat' >Seat</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='show_date' >Show Date</TableHeaderColumn>
        <TableHeaderColumn  width='50'  dataField='show_time' >Show Time</TableHeaderColumn>
        {/* <TableHeaderColumn  width='40'  dataField='release_time' >Release Time</TableHeaderColumn> */}
        <TableHeaderColumn width="20"   dataField="button" dataFormat={this.buttonFormatter}>Cancel</TableHeaderColumn>
      
      </BootstrapTable>
    );
  }
}


  export default Complimentarytable;
import React from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import HoldtoSell from './holdtosell';

class CollectionTable extends React.Component {
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

 

  onAddRow = (row) => {
    this.products.push(row);
    this.setState({
      data: this.products
    });
  }
  
  
  createCustomInsertButton = () => {
  
    return (
      <button style={ { color: 'white' } } className="btn" onClick={this.onClick } >Pay</button>
    );
  }
  createCustomInsertButton1 = () => {
  
    return (
      <button style={ { color: 'white' } } className="btn" onClick={this.onClick } >Unhold</button>
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
      updateSeat={this.props.updateSeat}
      cancellingSingleSeat={this.props.cancellingSingleSeat}
      banklist={this.props.banklist}
       handleHide={this.props.handleHide}
      // onSubmit={row => this.props.holdtosell(row)} 
        holdtosell={this.props.holdtosell}
        unhold={row =>this.props.holdtoUnhold(row)}
        tableData={this.props.holdtable}
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
        datatobook:row,
        rowseat:row.seat.split(',')
      })
  
    }
        return (
          <div>

          <HoldtoSell
           updateSeat={this.props.updateSeat}
           cancellingSingleSeat={this.props.cancellingSingleSeat}
           row={this.state.rowseat} 
          banklist={this.props.banklist}
          rowData={this.state.datatobook}
          holdtosell={this.props.holdtosell} 
          //  onSubmit={row => this.props.holdtosell(row)} 
           handleHide={this.props.handleHide}
          onClick={onClick}/>
          </div>
        );
          }
    
  render() {
    const cellEditProp = {
      mode: 'click'
    };
   
    return (
      <BootstrapTable data={ this.props.tableData}>
        
        <TableHeaderColumn   dataField='screen' isKey={ true } searchable={ true }>Screen</TableHeaderColumn>
        <TableHeaderColumn   dataField='category' >category</TableHeaderColumn>
        
        <TableHeaderColumn   dataField='no_of_tickets' >no_of_tickets</TableHeaderColumn>
        
        <TableHeaderColumn   dataField='gross_total' >gross_total</TableHeaderColumn>
        
        
      </BootstrapTable>
    );
  }
}


  export default CollectionTable;
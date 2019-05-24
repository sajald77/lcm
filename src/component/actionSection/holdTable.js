import React from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import HoldtoSell from './holdtosell';

class HoldTable extends React.Component {
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
      <BootstrapTable data={ this.props.tableData}
                    
                      
                    
                      search pagination
                      
                      options={ {
                        onDeleteRow: this.props.onDeleteRow, 
                      } }>
        <TableHeaderColumn  width='40'  dataField='hold_id' isKey={ true }>Hold Id</TableHeaderColumn>
        <TableHeaderColumn width='40'  dataField='customer_name' searchable={ true }>Name</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='movie' >Movie</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='screen' >Screen</TableHeaderColumn>
        <TableHeaderColumn  width='70'  dataField='seat' >Seat</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='category' >Category</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='show_date' >Show Date</TableHeaderColumn>
        <TableHeaderColumn  width='50'  dataField='show_time' >Show Time</TableHeaderColumn>
        <TableHeaderColumn  width='40'  dataField='release_time' >Release Time</TableHeaderColumn>
        <TableHeaderColumn width="20"   dataField="button" dataFormat={this.buttonFormatter}>Pay</TableHeaderColumn>
        
      </BootstrapTable>
    );
  }
}


  export default HoldTable;
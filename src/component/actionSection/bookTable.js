import React from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BooktoSell from "./booktosell";

class BookTable extends React.Component {
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
      tableData={this.props.tableData}
      onCellEdit={ this.onCellEdit }
      onAddRow={ this.onAddRow }
      handleHide={this.props.handleHide}
      bookingtosell={this.props.bookingtosell} 
        { ...this.state } />
    );
  }
}

class RemoteAlternative extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      datatobook:[],
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
     console.log('rowwwwwwwww===================>>>>>>>>>>>', row);
     console.log('cellllllllllll===================>>>>>>>>>>>', cell);
     this.setState({
       datatobook:row,
       rowseat:row.seat.split(',')
     })
   
    }
    return (
      <div>
        <BooktoSell 
         updateSeat={this.props.updateSeat}
         cancellingSingleSeat={this.props.cancellingSingleSeat}
         row={this.state.rowseat} 
         banklist={this.props.banklist}
         rowData={this.state.datatobook}
         bookingtosell={this.props.bookingtosell} 
        //  onSubmit={row => this.props.bookingtosell(row)} 
         handleHide={this.props.handleHide}
        onClick={onClick}/>
      </div>
      );
    }

  render() {
    // const cellEditProp = {
    //   mode: 'click'
    // };
    
  

    return (
      <BootstrapTable data={this.props.tableData}
                    
                    search pagination
                 hover condensed
                    
                     
                      options={ {
                        // onCellEdit: this.props.onCellEdit,
                        onDeleteRow: this.props.onDeleteRow,
                        // onAddRow: this.props.onAddRow
                      } }>
            {/* <TableHeaderColumn dataField='sn' isKey={ true } searchable={ true }>No</TableHeaderColumn> */}
            <TableHeaderColumn width='40'  dataField='customer_name' isKey={ true } searchable={ true }>Name</TableHeaderColumn>
            <TableHeaderColumn width='40'  dataField='customer_email'>Email</TableHeaderColumn>           
            <TableHeaderColumn width='40' dataField='customer_mobile'>Phone</TableHeaderColumn> 
            <TableHeaderColumn width='30' dataField='booking_code'>Code</TableHeaderColumn>    
            <TableHeaderColumn width='40' dataField='movie'>Movie Name</TableHeaderColumn>   
            <TableHeaderColumn width='60'   dataField='seat'>Seat </TableHeaderColumn> 
            <TableHeaderColumn  width='40'  dataField='category' >Category</TableHeaderColumn>
            <TableHeaderColumn width='40' dataField='show_time'>Show Time</TableHeaderColumn> 
            <TableHeaderColumn width='50' dataField='show_date'>Show Date</TableHeaderColumn> 
            <TableHeaderColumn width='50'  dataField='booking_source'>Source</TableHeaderColumn>  
            <TableHeaderColumn width='50'  dataField='release_time'>Release Time</TableHeaderColumn>  
            <TableHeaderColumn width="50"   dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>


      </BootstrapTable>
    );
  }
}


  export default BookTable;


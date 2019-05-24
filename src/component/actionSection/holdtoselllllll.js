import React from "react";
import {Modal ,Button,Popover} from "react-bootstrap";

import FormUsed from "../sideBar/formused";
// import HoldtoSell from "./holdtosell";


class HoldtoSell extends React.Component {
  
    constructor(props, context) {
      super(props, context);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.removeSeat=this.removeSeat.bind(this);
      this.state = {
        show: false,
        row:[],
        datatobook:this.props.rowData,
        cardtype:"cash"
        
      };
    }

  
    componentWillReceiveProps(nextProps){
      if(JSON.stringify(nextProps.row) !== JSON.stringify(this.props.row) ){      
        
        this.setState({
          row: nextProps.row,
          datatobook:nextProps.rowData
        })
      }
    }
      
   



    handleClose() {
      this.setState({ show: false });
    }
  
   
    handleShow() {
      this.setState({ show: true });
    }
  


  seatnull =()=>{
    
    if (this.state.row.length == 1){
     
     {this.handleClose()} 
  } 
  }

removeSeat=(index)=>{
  {this.seatnull()}
  let seatlist= this.state.row;
  seatlist.splice(index,1);
  this.setState({row: seatlist})

}

    render() {
   console.log("banklist={this.props.banklist}",this.props.banklist)
   console.log("row of state", this.state.row)
      const popover = (
        <Popover id="modal-popover" title="popover">
        </Popover>
      );
    
  
      return (
        <div>
          
          <div className="btn btn-default"
           onClick={()=>{this.props.onClick();this.handleShow()}}
        > PAY NOW </div>
         
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Pay </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <form>
              {/* booked seat here */}
              <p> Booked Seats</p>
             <ul className="seat-selected-booked">
        {this.state.row.map((seat,index)=> 

        <li key={index} onClick={() => this.removeSeat(index,seat)}>{seat}  
        <i className="fa fa-window-close" aria-hidden="true"
         ></i></li> )}
      </ul>
      {/* booked seat here */}
      </form>
      <FormUsed
       onSubmit={row => this.props.holdtosell(row)} 
       banklist={this.props.banklist}
       row={this.state.row}
       rowData={this.state.datatobook}
       handleClose= {this.handleClose}
       handleHide={this.props.handleHide}
       onClick={this.props.onClick}
      />
              
      
                          
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  export default HoldtoSell;
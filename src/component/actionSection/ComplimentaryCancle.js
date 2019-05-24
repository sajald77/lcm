import React from "react";
import {Modal ,Button,Popover,Tooltip,OverlayTrigger, Form,FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";

class ComplimentaryCancle extends React.Component {
  
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
      
   
  seatnull =()=>{
  
    if (this.state.row.length == 1){
  
     {this.handleClose()} 
  } 
  }

  

    handleClose() {
      this.setState({ show: false });
    }
  
   
    handleShow() {
      this.setState({ show: true });
    }
  




removeSeat=(index)=>{
  {this.seatnull()}
  let seatlist= this.state.row;
  seatlist.splice(index,1);
  this.setState({row: seatlist})
}
onSubmit=(e)=>{
      
    e.preventDefault();
    this.props.onSubmit({
        ...this.state,
        row:this.props.row
    });
   
    this.setState({
      firstName:'',
      email:'',
      number:'',
      row:this.props.row
  })
   
};



    render() {
 
      const popover = (
        <Popover id="modal-popover" title="popover">
        </Popover>
      );
    
  
      return (
        <div>
          
          <div className="btn btn-default"
           onClick={()=>{this.props.onClick();this.handleShow()}}
        > Release</div>
         
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Release </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <form>
              <div className="seat-info-header">
                          <p> Hold Seats</p>
                         <ul className="seat-selected-booked">
                    {this.state.row.map((seat,index)=> 

                    <li key={index} onClick={() => this.removeSeat(index,seat)}>{seat}  
                    <i className="fa fa-window-close" aria-hidden="true"
                     ></i></li> )}
                  </ul>
              </div>
      
              
      


              <button type="submit" className="btn btn-primary" 
              onClick={(e)=>{this.onSubmit(e);this.handleClose()}}
              >Release</button>
            {this.state.cash > 0 ?
              <div className={this.props.totalprice > this.state.cash  ?"return-cash danger ": 'return-cash success '}
              >Return cash  {Math.round(this.state.cash -this.props.totalprice)}</div> : ''}
            
            </form>
                          
            </Modal.Body>
            <Modal.Footer>
              <Button  onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  export default ComplimentaryCancle;
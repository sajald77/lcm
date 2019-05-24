import React from "react";
 import {Modal ,Button,Popover,FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";
import FormUsed from './formused';


class Sellmodal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        cardtype: "cash",
       
      };
    }

    handleClose() {
      this.setState({ show: false });
    }
  
   
    handleShow() {
      this.setState({ show: true });
    }
 
    render() {

     
      const popover = (
        <Popover id="modal-popover" title="popover">
         
        </Popover>
      );
    
  
      return (
        <div>
          
          <div className="btn btn-default" onClick={this.handleShow}> PAY NOW </div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Pay </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           <FormUsed
             handleHide={this.props.handleHide}
              banklist={this.props.banklist}
              fields={this.props.fields}
              onSubmit={fields => this.props.soldClicked(fields)}
              totalprice={this.props.totalprice}
             handleClose= {this.handleClose}
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

  export default Sellmodal;
import React from "react";
import {Modal ,Button,Popover,Tooltip,OverlayTrigger,ButtonToolbar, Form,FormControl,Col,FormGroup,ControlLabel} from "react-bootstrap";
 import HoldTable from "./holdTable";
 



class Holdmodal extends React.Component {
    constructor(props, context) {
      super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }


  render() {
    return (
      <ButtonToolbar >
       
       <span onClick={this.handleShow}>
       <i className="fa fa-hand-rock-o" aria-hidden="true"> </i> Hold List</span> 

        <Modal autoFocus={true}
        
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal modal-lg modal-dialog"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            Hold Table
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
              
          <HoldTable
           updateSeat={this.props.updateSeat}
           cancellingSingleSeat={this.props.cancellingSingleSeat}
          banklist={this.props.banklist}
          handleHide={this.handleHide}
          holdtosell={this.props.holdtosell}
          holdtoUnhold={this.props.holdtoUnhold}
          holdtable={this.props.holdtable}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

  export default Holdmodal;
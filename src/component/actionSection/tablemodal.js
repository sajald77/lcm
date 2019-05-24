import React from "react";
import {Modal ,Button,Popover,Tooltip,OverlayTrigger,ButtonToolbar, Form,FormControl,Col,FormGroup,ControlLabel} from "react-bootstrap";
import BookTable from "./bookTable";


class Tablemodal extends React.Component {
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
       <i className="fa fa-table" aria-hidden="true"></i> Booking List</span> 

        <Modal
        
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal modal-lg modal-dialog"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            Booked Table
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
           <BookTable 
            updateSeat={this.props.updateSeat}
            cancellingSingleSeat={this.props.cancellingSingleSeat}
            seatCatagorycancle={this.props.seatCatagorycancle}
           onClick={this.booktable} 
            banklist={this.props.banklist}
           bookingtosell={this.props.bookingtosell}
           handleHide={this.handleHide}
           holdtoUnhold={this.props.holdtoUnhold}
           tableData={this.props.tableData}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

  export default Tablemodal;
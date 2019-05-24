import React from "react";
import {Modal ,Button,Popover,Tooltip,OverlayTrigger,ButtonToolbar, Form,FormControl,Col,FormGroup,ControlLabel} from "react-bootstrap";
 import CollectionTable from './collectionTable';
 



class Collectionmodal extends React.Component {
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
const showTime= this.props.myCollection_showTime;


    
    return (
      <ButtonToolbar >
       
       <span onClick={this.handleShow}>
       <i className="fa fa-tachometer" aria-hidden="true"> </i> My Collection</span> 

        <Modal autoFocus={true}
        
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal modal-lg modal-dialog"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
           My Collection
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >

              <h1 className="show_Time"> Show Time</h1>
    <div className="myCollection-div">
    {showTime.map((data, index) => <h1  onClick={()=>this.props.myCollection(data)} 
    className="myCollection-tag" 
    key={index}>{data}</h1>)}
    </div>

         {(this.props.my_collection.length == 0)? <h1>Please select time</h1>
         :
         <div>
 <CollectionTable
           
          holdtable={this.props.my_collection}/>
<div className="totalCollection">
<h1 className="collection_total">Total Collection={ this.props.my_Collection_Total}</h1>
<h1 className="collection_Tickettotal">Total Ticket Sell={ this.props.my_Collection_TicketTotal}</h1>
</div>
         </div>     
         
          }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

  export default Collectionmodal;
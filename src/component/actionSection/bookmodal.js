import React from "react";
import {Modal ,Button,Popover,FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";





class Modalhold extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        
      };
    }
  

    change =e =>{
        
      this.setState({
          [e.target.name]:e.target.value
      });
  };


    handleClose() {
      this.setState({ show: false });
    }
  
   
    handleShow() {
      this.setState({ show: true });
    }
  
    onSubmit=(e)=>{
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({
          firstName:'',
          email:'',
          number:'',
      })
      
  };
    render() {
      const popover = (
        <Popover id="modal-popover" title="popover">
         
        </Popover>
      );
      
  
      return (
        <div>
          <span onClick={this.handleShow}>
          <i  className="fa fa-floppy-o" aria-hidden="true"></i>   Book</span>
  
          <Modal show={this.state.show} onHide={this.handleClose}
          
          autoFocus={true}
          
          >
            <Modal.Header closeButton>
              <Modal.Title>Reserve</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
              <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control" 
                 name='firstName'
                 value={this.state.firstname}
                 onChange={e=>this.change(e)} 
                />
               
              </div>
              <div className="form-group">
                <label >Email address</label>
                <input type="email" className="form-control"  
                name="email"
                value={this.state.email}
                onChange={e=>this.change(e)} 
                />
              </div>
              <div className="form-group">
                <label >Phone</label>
                <input type="text" className="form-control" 
                name="number"
                value={this.state.number}
                onChange={e=>this.change(e)} 
                />
              </div>
             
              <FormGroup controlId="formControlsSelect">
      <ControlLabel>Time</ControlLabel>
      <FormControl componentClass="select" placeholder="60" 
      name="time"
      value={this.state.time}
      onChange={e=>this.change(e)} >
        <option value="60">60</option>
        <option value="55">55</option>
        <option value="50">50</option>
        <option value="45">45</option>
        <option value="40">40</option>
        <option value="35">35</option>
        <option value="30">30</option>
        <option value="25">25</option>
        <option value="20">20</option>
        <option value="15">15</option>
        <option value="10">10</option>
        <option value="05">05</option>
      </FormControl>
    </FormGroup>

             

              <button type="submit" className="btn btn-primary" 
              onClick={(e)=>{this.onSubmit(e);this.handleClose()}}
              >Submit</button>
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

  export default Modalhold;
import React, { Component } from 'react';
import {FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";

class FormUsed extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          cardtype: "cash",
          datatobook:this.props.rowData,
          bank:this.props.banklist[0].bank ,
           row:[],
           
        };
      }



        


    change =e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };


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
     
        return (
            <div>
                 <form>
             
             <Tab.Container  defaultActiveKey="first">
            <Row className="clearfix">
              <Col className="mid-lev" sm={12}>
                <Nav bsStyle="pills" stacked>
                  <NavItem className="mid-lev-btn" eventKey="first">Pay</NavItem>
                  <NavItem  className="mid-lev-btn" eventKey="second">Details</NavItem>
                  <NavItem  className="mid-lev-btn" eventKey="third">Membership</NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="first">
                          <FormGroup controlId="formControlsSelect" 
                          >
                          <ControlLabel>Payment Type</ControlLabel>
                          
                            <FormControl componentClass="select" placeholder="select" 
                          name="cardtype"
                          value={this.state.cardtype}
                          onChange={e=>this.change(e)} >
                            <option value="cash">cash</option>
                            <option value="card">card</option>
                          </FormControl>
                        
                        </FormGroup>
                                
                        <FormGroup controlId="bankSelect" className={(this.state.cardtype ===  "cash") ? " displayNone" :" block" }>
                        <ControlLabel>Bank</ControlLabel>
                      <FormControl componentClass="select" placeholder="Bank name" 
                          name="bank"
                          value={this.state.bank}
                          onChange={e=>this.change(e)} >
                              {this.props.banklist.map(list=>{
                              return(<option value={list.bank}>{list.bank}</option>)
                              
                          })}
                        </FormControl>
                          </FormGroup>
                    
                    
                      <FormGroup controlId="formInlineName"
                      className={(this.state.cardtype ===  "cash") ? " " :" displayNone" }
                      >
                        <ControlLabel>Cash paid</ControlLabel>
                        <FormControl type="number" 
                        name="cash"
                        value={this.state.cash}
                        onChange={e=>this.change(e)}  />
                      </FormGroup>
                                          
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
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
                          <input type="number"  className="form-control" 
                          name="number"
                          value={this.state.number}
                          onChange={e=>this.change(e)} 
                          />
                        </div>
                        <FormGroup controlId="formControlsSelect" 
                >
               
                            <ControlLabel>Payment Type</ControlLabel>
                            
                              <FormControl componentClass="select" placeholder="select" 
                            name="cardtype"
                            value={this.state.cardtype}
                            onChange={e=>this.change(e)} >
                              <option value="cash">cash</option>
                              <option value="card">card</option>
                            </FormControl>
                          
                          </FormGroup>
                                  
                          <FormGroup controlId="bankSelect" className={(this.state.cardtype ===  "cash") ? " displayNone" :" block" }>
                          <ControlLabel>Bank</ControlLabel>
                        <FormControl componentClass="select" placeholder="Bank name" 
                            name="bank"
                            value={this.state.bank}
                            onChange={e=>this.change(e)} >
                                {this.props.banklist.map(list=>{
                                return(<option value={list.bank}>{list.bank}</option>)
                                
                            })}
                          </FormControl>
                            </FormGroup>
                      
                      
                        <FormGroup controlId="formInlineName"
                        className={(this.state.cardtype ===  "cash") ? " " :" displayNone" }
                        >
                          <ControlLabel>Cash paid</ControlLabel>
                          <FormControl type="number" 
                          name="cash"
                          value={this.state.cash}
                          onChange={e=>this.change(e)}  />
                        </FormGroup>
          


                 </Tab.Pane>
                  <Tab.Pane eventKey="third">
                      <div className="form-group">
                          <label >Membership</label>
                          <input type="text" className="form-control"  
                          name="Membership"
                          value={this.state.membership}
                          onChange={e=>this.change(e)} 
                          />
                      </div>
                      
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Payment Type</ControlLabel>
                          
                          <FormControl componentClass="select" placeholder="select" 
                          name="cardtype"
                          value={this.state.cardtype}
                          onChange={e=>this.change(e)} >
                            <option value="cash">cash</option>
                            <option value="card">card</option>
                          </FormControl>
                        
                        </FormGroup>
                                
                        <FormGroup controlId="bankSelect" className={(this.state.cardtype ===  "cash") ? " displayNone" :" block" }>
                        <ControlLabel>Bank</ControlLabel>
                      <FormControl componentClass="select" placeholder="Bank name" 
                          name="bank"
                          value={this.state.bank}
                          onChange={e=>this.change(e)} >
                              {this.props.banklist.map(list=>{
                              return(<option value={list.bank}>{list.bank}</option>)
                              
                          })}
                        </FormControl>
                          </FormGroup>
                    
                    
                      <FormGroup controlId="formInlineName"
                      className={(this.state.cardtype ===  "cash") ? " " :" displayNone" }
                      >
                        <ControlLabel>Cash paid</ControlLabel>
                        <FormControl type="number" 
                        name="cash"
                        value={this.state.cash}
                        onChange={e=>this.change(e)}  />
                      </FormGroup>
          
               
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
                </Tab.Container>
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>{this.onSubmit(e);this.props.handleClose();this.props.handleHide();}}
                        >Pay</button>
                      {this.state.cash > 0 ?
                        <div className={this.props.totalprice > this.state.cash  ?"return-cash danger ": 'return-cash success '}
                        >Return cash  {Math.round(this.state.cash -this.props.totalprice)}</div> : ''}
                      </form> 



            </div>
        );
    }
}

export default FormUsed;
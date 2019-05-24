import React, { Component } from 'react';
import {FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";

class MainModalBook extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          cardtype: "cash",
          bank:this.props.banklist[0].bank ,
          datatobook:this.props.rowData,
           row:this.props.rowData.seat.split(','),
           price:this.props.rowData.price.split(',').map(Number),
           sum:this.props.rowData.total,
           time:this.props.rowData.release_time
           
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
            row:this.state.row
        });
        this.setState({
          firstName:'',
          email:'',
          number:'',
         
         
      })
   {this.props.handleClose()}
    {this.props.handleHide()}
        
    };


    onUpdate=(e)=>{
      e.preventDefault();
      this.props.onupdateseat({
          ...this.state,
          row:this.state.row
      });
      this.setState({
        firstName:'',
        email:'',
        number:'',
        time:'',
        
       
    })
    {this.props.handleClose()}
    {this.props.handleHide()}
  };
//   onRelease=(e)=>{
//     e.preventDefault();
//     this.props.holdtosell({
//         ...this.state,
//         row:this.state.row
//     });
//     this.setState({
//       firstName:'',
//       email:'',
//       number:'',
     
//   })
    
// };
onRelease=(e)=>{
  e.preventDefault();
  this.props.cancellingSingleSeat({
      ...this.state,
      row:this.state.row
  });
  this.setState({
    firstName:'',
    email:'',
    number:'',
   
})
{this.props.handleClose()}
{this.props.handleHide()}
};

include =(arr, obj) => {
  for(var i=0; i<arr.length; i++) {
      if (arr[i] == obj) return true;
  }
} 



    seatnull =()=>{
    
      if (this.state.row.length == 1){
       
        {this.props.handleClose()} 
    } 
    }

    
  
  removeSeat=(index)=>{
    console.log(index)
    {this.seatnull()}
    console.log("index of seat",index)
    let seatlist= this.state.row;
    let priceList= this.state.price;
    seatlist.splice(index,1);
    priceList.splice(index,1);
    let sum = this.state.price.reduce((a, b) => a + b, 0);
  console.log(sum)
    this.setState({
      row: seatlist,
      price:priceList,
      sum:sum
    })
  console.log(this.state.price)
  
  
  }
  





    render() {

      
  console.log("seaton del", this.props.rowData.release_time)
        return (
            <div>
                 <form>
                    <div className="seat-info-header">
                            {/* booked seat here */}
                            <p> Seats</p>
                           <ul className="seat-selected-booked">
                      {this.state.row.map((seat,index)=> 

                      <li key={index} onClick={() => this.removeSeat(index,seat)}>{seat}  
                      <i className="fa fa-window-close" aria-hidden="true"
                       ></i></li> )}
                    </ul>
                    {/* booked seat here */}
                    </div>
     

             
             <Tab.Container  
              defaultActiveKey= "first"
             >
               {/* <span className={  ?  " " :"displayNone"}>  */}
            <Row className="clearfix navlist-details">
              <Col className="mid-lev" sm={12}>
                <Nav bsStyle="pills" stacked>
                  <NavItem 
                  className= "nav-button"
                  eventKey="first">Pay</NavItem>
                  <NavItem  className="nav-button" eventKey="second">Details</NavItem>
                 
                  <NavItem  
                  className="nav-button" 
                  eventKey="third">Membership</NavItem>
                 
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation className="custom-tab">
                  <Tab.Pane eventKey="first">
                          <FormGroup controlId="formControlsSelect" 
                          >
                          <ControlLabel>Payment Type: {this.props.rowData.payment_type} </ControlLabel>
                          
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
                          <label >Total : Rs.{Math.round(this.state.sum,2)}</label>
                    
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
                          <label >Name : {this.props.rowData["customer_name"]}</label>
                          
                         
                        </div>
                        <div className="form-group">
                          <label >Email address: {this.props.rowData.customer_email}</label>
                        
                        </div>
                        <div className="form-group">
                          <label >Phone :{this.props.rowData.customer_mobile}</label>
                         
                        </div>
                        <label >Total : Rs.{Math.round(this.state.sum,2)}</label>
                          <span 
                            className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary") ? "" : "displayNone" }
                        >        
                              <div className="form-group">
                          <label >Payment Type  :{this.props.rowData.payment_type}</label>
                        </div>    
                        <div 
                       className={(this.props.rowData.payment_type == "card") ? "form-group": "displayNone" }
                        >
                          <label >Bank  :{this.props.rowData.bank}</label>
                        </div>    

                        </span>              


                        
                        <FormGroup controlId="formControlsSelect" >

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
                                                    
                                            <label >Total : Rs.{this.props.rowData.grand_total}</label>
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
              

        <FormGroup
       
       
        controlId="formControlsSelect">
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
                         
                </Tab.Content>
              </Col>
            </Row>
                </Tab.Container>
              
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>this.onRelease(e)}
                        >
                        Release
                        </button>

                                 
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>this.onUpdate(e)}
                        >
                     Update
                        </button>
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>this.onSubmit(e)}
                        >
                     Pay
                        </button>
                     
                      {this.state.cash > 0 ?
                        <div className={this.state.sum > this.state.cash  ?"return-cash danger ": 'return-cash success '}
                        >
                        {this.state.sum > this.state.cash  ?"Rs.": 'Return Rs.'}
                        {Math.round(this.state.cash -this.state.sum,2)}</div> : ''}
                 
                      </form> 
                      



            </div>
        );
    }
}

export default MainModalBook;
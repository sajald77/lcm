import React, { Component } from 'react';
import {FormControl,Col,FormGroup,ControlLabel,Tab,Row,Nav,NavItem} from "react-bootstrap";
import {hallCategory} from "./utils"

class SingleSeatDetails extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          cardtype: "cash",
          bank:this.props.banklist[0].bank ,
          datatobook:this.props.rowData,
           row:JSON.parse(this.props.globaldata.seat)[this.props.category],
           price:JSON.parse(this.props.globaldata.price)[this.props.category].map(Number),
           sum:this.props.globaldata.grand_total,
           time:this.props.globaldata.release_time,
          
           
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
          comment:'',
         
         
      })
        
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
        comment:'',
        
       
    })
    
  };
  onRelease=(e)=>{
    e.preventDefault();
    this.props.holdtosell({
        ...this.state,
        row:this.state.row
    });
    this.setState({
      firstName:'',
      email:'',
      number:'',
      comment:'',
     
  })
    
};
onbookRelease=(e)=>{
  e.preventDefault();
  this.props.bookingtosell({
      ...this.state,
      row:this.state.row
  });
  this.setState({
    firstName:'',
    email:'',
    number:'',
    comment:'',
   
})
  
};

include =(arr, obj) => {
  for(var i=0; i<arr.length; i++) {
      if (arr[i] == obj) return true;
  }
} 



    seatnull =()=>{
    
      if (this.state.row.length == 1){
       
        {this.props.seatclose()} 
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
      console.log("seat on seat wise",JSON.parse(this.props.globaldata.seat)[hallCategory.high],this.props.globaldata.price)
      let sellroles=this.props.roles.split(',')
      
  console.log("seaton del", this.props.globaldata.grand_total,this.props.roles)
        return (
            <div>
              <form>
             
              {/* booked seat here */}
                 <div className="seat-info-header">
                    <p>Seats</p>
                    <ul className="seat-selected-booked">
                       {this.state.row.map((seat,index)=> 

                       <li key={index} onClick={() => this.removeSeat(index,seat)}>{seat}  
                       <i className="fa fa-window-close" aria-hidden="true"
                        ></i></li> )}
                    </ul>
                 </div>
      {/* booked seat here */}
     

             
             <Tab.Container  
              defaultActiveKey={this.props.seatCatagorycancle  == "sell" || this.props.seatCatagorycancle == "complimentary" || !this.include(this.props.roles.split(","), "sell")  ? "second" : "first" }
             >
               {/* <span className={  ?  " " :"displayNone"}>  */}
            <Row className="clearfix navlist-details">
              <Col className="mid-lev" sm={12}>
                <Nav bsStyle="pills" stacked>
                  <NavItem 
                  className={(this.props.seatCatagorycancle == "sell"  || this.props.seatCatagorycancle == "complimentary" || !this.include(this.props.roles.split(","), "sell") ) ? "nav-button displayNone" : " nav-button" }
                  eventKey="first">Pay</NavItem>

                  <NavItem className={(this.props.seatCatagorycancle == "sell"  || this.props.seatCatagorycancle == "complimentary" || !this.include(this.props.roles.split(","), "sell") ) ? "nav-button active" : " nav-button" } eventKey="second">Details</NavItem>
                 
                  <NavItem  
                  className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary" || !this.include(this.props.roles.split(","), "sell") ) ? "nav-button displayNone" : " nav-button" }
                  eventKey="third">Membership</NavItem>
                 
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content animation className="custom-tab">
                  <Tab.Pane eventKey="first">
                      <FormGroup controlId="formControlsSelect" 
                      >
                      <ControlLabel>Payment Type: {this.props.globaldata.payment_type} </ControlLabel>
                      
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
                        <label >Name : {this.props.globaldata["customer_name"]}</label>
                        <label >Email address: {this.props.globaldata.customer_email}</label>
                        <label >Phone :{this.props.globaldata.customer_mobile}</label>
                        <label >Total : Rs.{Math.round(this.state.sum,2)}</label>
                          <span className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary") ? "" : "displayNone" } >        
                              <div className="form-group">
                                 <label >Payment Type  :{this.props.globaldata.payment_type}</label>

                                 <div className={(this.props.globaldata.payment_type == "card") ? "displayNone": "form-group" } >
                                    <label >Reason for release :</label>
                                      <FormControl
                                        type="text"
                                        name="comment"
                                        value={this.state.comment}
                                        placeholder="Enter your Comment here"
                                        onChange={e=>this.change(e)}
                                      />
                                 </div>
                        
                              </div> 
                        <div className={(this.props.globaldata.payment_type == "card") ? "form-group": "displayNone" }>
                          <label >Bank  :{this.props.globaldata.bank}</label>
                        </div>    

                        </span>              

                        <span className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary") ? "displayNone" : "" }>
                           <span className={ this.include(this.props.roles.split(","), "sell") ?  " " :"displayNone"}> 
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
                                                      </span>
                                                    </span>

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
                                                    
                                            <label >Total : Rs.{this.props.globaldata.grand_total}</label>
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
          className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary" || !this.include(this.props.roles.split(","), "sell") ) ? "displayNone" : " " }
       
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
        <option value="5">05</option>
      </FormControl>
    </FormGroup>
                         
                </Tab.Content>
              </Col>
            </Row>
                </Tab.Container>
                <span className={ this.include(this.props.roles.split(","), "sell" ) ?  " " :"displayNone"}> 
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>this.onSubmit(e)}
                        >
                        Release
                        </button>

                                  <span
                                  
                                  className={(this.props.seatCatagorycancle == "sell" || this.props.seatCatagorycancle == "complimentary" ) ? "displayNone" : "" }>
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>this.onUpdate(e)}
                        >
                     Update
                        </button>
                        <button type="submit" className="btn btn-primary" 
                        onClick={(e)=>{this.props.seatCatagorycancle == "hold" ? this.onRelease(e) : this.onbookRelease(e)}}
                        >
                     Pay
                        </button>
                        </span>
                      {this.state.cash > 0 ?
                        <div className={this.state.sum > this.state.cash  ?"return-cash danger ": 'return-cash success '}
                        >
                        {this.state.sum > this.state.cash  ?"Rs.": 'Return Rs.'}
                        {Math.round(this.state.cash -this.state.sum,2)}</div> : ''}
                    </span>
                      </form> 
                      



            </div>
        );
    }
}

export default SingleSeatDetails;
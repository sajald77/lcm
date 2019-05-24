import React, { Component } from "react";
import Sellmodal from "./sellmodal";
import { hallCategory } from "../../utils";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      cardtype: "cash",
      firstName: "",
      email: "",
      number: ""
    };
  }
  include = (arr, obj) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  };

  handleHide = () => {
    console.log("handle");
  };

  render() {
    let sellroles = this.include(this.props.roles.split(","), "sell");

    // let selectedSeat = this.props.selectedSeat;

    let myObj = this.props.count;
    // let newArr = Object.keys(myObj);
    let totalval = this.props.totalprice || 0;

    let countValue = Object.values(myObj);

    let bSeats = this.props.PlatinumMainSeats || [];
    let bLength = bSeats
      .map(o => o["seat-status"])
      .filter(i => i === "selected").length;

    let sSeats = this.props.GoldMainSeats || [];
    let sLength = sSeats
      .map(o => o["seat-status"])
      .filter(i => i === "selected").length;

    let cSeats = this.props.CabinMainSeats || [];
    let cLength = cSeats
      .map(o => o["seat-status"])
      .filter(i => i === "selected").length;

    // platinum seats info
    if (bLength > 0) {
      var bOneSeatInfo = bSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"]);
      var bOneSeatTotal = bSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"])
        .reduce((a, b) => a + b, 0);
      var bSelected = bSeats
        .map(o => o["seat-status"])
        .filter(i => i === "selected").length;
      var bBasicPrice = bOneSeatInfo[0];
      var bTotal = bBasicPrice * bSelected;
    } else {
      var bSelected = 0;
      var bOneSeatTotal = 0;
      var bBasicPrice = 0;
      var bTotal = 0;
    }

    // Gold seats info
    if (sLength > 0) {
      var sOneSeatInfo = sSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"]);
      var sOneSeatTotal = sSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"])
        .reduce((a, b) => a + b, 0);
      var sSelected = sSeats
        .map(o => o["seat-status"])
        .filter(i => i === "selected").length;
      var sBasicPrice = sOneSeatInfo[0];
      var sTotal = sBasicPrice * sSelected;
    } else {
      var sSelected = 0;
      var sOneSeatTotal = 0;
      var sBasicPrice = 0;
      var sTotal = 0;
    }

    // Cabin seats info
    if (cLength > 0) {
      var cOneSeatInfo = cSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"]);
      var cOneSeatTotal = cSeats
        .filter(i => i["seat-status"] === "selected")
        .map(price => price["category-price"])
        .reduce((a, b) => a + b, 0);
      var cSelected = cSeats
        .map(o => o["seat-status"])
        .filter(i => i === "selected").length;
      var cBasicPrice = cOneSeatInfo[0];
      var cTotal = cBasicPrice * cSelected;
    } else {
      var cSelected = 0;
      var cOneSeatTotal = 0;
      var cBasicPrice = 0;
      var cTotal = 0;
    }

    var grandTotal = bTotal + sTotal + cTotal;

    if (this.props.seatCatagory.length == 0 || totalval == 0 || !sellroles) {
      return (
        <div>
          <h1> TICKET MINI CART</h1>
        </div>
      );
    } else {
      return (
        <div className="constant-part">
          <h1> TICKET MINI CART</h1>
          <p>Ticket Type</p>

          {bSelected > 0 && <p>{hallCategory.high} x {bSelected} = {bTotal}</p>}

          {sSelected > 0 && <p>{hallCategory.low} x {sSelected} = {sTotal}</p>}

          {cSelected > 0 && <p>Cabin x {cSelected} = {cTotal}</p>}

          <h1> Total Price </h1>

          <p className="price">
            Rs. {grandTotal}
          </p>

          <div
            className="btn btn-default Big-btn"
            onClick={() => this.props.soldClicked(this.state)}
          >
            {" "}PAY NOW{" "}
          </div>

          <Sellmodal
            // onSubmit={fields => this.props.bookedclicked(fields)}
            banklist={this.props.banklist}
            handleHide={this.handleHide}
            fields={this.props.fields}
            soldClicked={this.props.soldClicked}
            totalprice={this.props.totalprice}
          />
        </div>
      );
    }
  }
}

export default Cart;

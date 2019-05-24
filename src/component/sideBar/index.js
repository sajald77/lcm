import React, { Component } from "react";
import Cart from "./cart";
import { hallCategory } from "../../utils";

export default class SideBar extends Component {
  render() {
    // <ul className={selectedSeat.length > 0 ?"seat-selected-list": ''}>
    //   {selectedSeat.map((seat,index)=>
    //   <li key={index}>{seat['seat-name']}</li> )}
    // </ul>

    if (this.props.movieEmpty) {
      return <div className=" " />;
    }

    let selectedSeat = this.props.selectedSeat;
    let seats = this.props.seats;
    let bSeats = this.props.bSeats;
    let sSeats = this.props.sSeats;
    let cSeats = this.props.cSeats;
    let seatsInfo = this.props.toSellSeatsInfo;

    // console.log('length===========>>>>??????', bSeats.length);

    // platinum seats info
    if (bSeats.length > 0) {
      var bsold = bSeats.map(o => o["seat-status"]).filter(i => i === "sold")
        .length;
      var bselected = bSeats
        .map(o => o["seat-status"])
        .filter(i => i === "selected").length;
      var bbookedSeat = bSeats
        .map(o => o["seat-status"])
        .filter(i => i === "reserved").length;
      var bavailable = bSeats
        .map(o => o["seat-status"])
        .filter(i => i === "available").length;
      var bhold = bSeats.map(o => o["seat-status"]).filter(i => i === "hold")
        .length;
      var btotal = bsold + bbookedSeat + bavailable + bhold;
    } else {
      var bselected = 0;
      var bsold = 0;
      var bbookedSeat = 0;
      var bavailable = 0;
      var bhold = 0;
      var btotal = bsold + bbookedSeat + bavailable + bhold;
    }

    // gold seats info
    if (sSeats.length > 0) {
      var ssold = sSeats.map(o => o["seat-status"]).filter(i => i === "sold")
        .length;
      var sbookedSeat = sSeats
        .map(o => o["seat-status"])
        .filter(i => i === "reserved").length;
      var savailable = sSeats
        .map(o => o["seat-status"])
        .filter(i => i === "available").length;
      var shold = sSeats.map(o => o["seat-status"]).filter(i => i === "hold")
        .length;
      var stotal = ssold + sbookedSeat + savailable + shold;
    } else {
      var ssold = 0;
      var sbookedSeat = 0;
      var savailable = 0;
      var shold = 0;
      var stotal = ssold + sbookedSeat + savailable + shold;
    }

    // Cabin seats info
    if (cSeats.length > 0) {
      var csold = cSeats.map(o => o["seat-status"]).filter(i => i === "sold")
        .length;
      var cbookedSeat = cSeats
        .map(o => o["seat-status"])
        .filter(i => i === "reserved").length;
      var cavailable = cSeats
        .map(o => o["seat-status"])
        .filter(i => i === "available").length;
      var chold = cSeats.map(o => o["seat-status"]).filter(i => i === "hold")
        .length;
      var ctotal = csold + cbookedSeat + cavailable + chold;
    } else {
      var csold = 0;
      var cbookedSeat = 0;
      var cavailable = 0;
      var chold = 0;
      var ctotal = csold + cbookedSeat + cavailable + chold;
    }

    // All seats info
    let soldTotal = bsold + ssold + csold;
    let bookedSeatTotal = bbookedSeat + sbookedSeat + cbookedSeat;
    let availableTotal = bavailable + savailable + cavailable;
    let holdTotal = bhold + shold + chold;
    let allTotal = soldTotal + bookedSeatTotal + availableTotal + holdTotal;

    return (
      <div className="col-sm-2 side-bar">

        <div className="scroll-part">
          <h1>SELECTED SEAT</h1>

          {seatsInfo[0].length > 0 &&
            <div className="seat-detail">
              <div className="head">{hallCategory.high}</div>
              <ul className="seat-selected-list">
                {seatsInfo[0].map((seat, index) => <li key={index}>{seat}</li>)}
              </ul>
            </div>}
          {seatsInfo[1].length > 0 &&
            <div className="seat-detail">
              <div className="head">{hallCategory.low}</div>
              <ul className="seat-selected-list">
                {seatsInfo[1].map((seat, index) => <li key={index}>{seat}</li>)}
              </ul>
            </div>}
          {seatsInfo[2].length > 0 &&
            <div className="seat-detail">
              <div className="head">Cabin</div>
              <ul className="seat-selected-list">
                {seatsInfo[2].map((seat, index) => <li key={index}>{seat}</li>)}
              </ul>
            </div>}

          <h1>SUMMARY</h1>

          <div className="seat-info-wrapper">

            {btotal > 0 &&
              <div className="seat-info">
                <h3>All Seats</h3>
                <ul className="seat-list">
                  <li> Sold seat : {soldTotal} </li>
                  <li> Booked Seat : {bookedSeatTotal} </li>
                  <li> Available Seat: {availableTotal} </li>
                  <li> Hold :{holdTotal}  </li>
                </ul>
              </div>}

            {btotal > 0 &&
              <div className="seat-info">
                <h3>{hallCategory.high}</h3>
                <ul className="seat-list">
                  <li> Selected seat : {bselected} </li>
                  <li> Sold seat : {bsold} </li>
                  <li> Booked Seat : {bbookedSeat} </li>
                  <li> Available Seat: {bavailable} </li>
                  <li> Hold :{bhold}  </li>
                </ul>
              </div>}

            {stotal > 0 &&
              <div className="seat-info">
                <h3>{hallCategory.low}</h3>
                <ul className="seat-list">
                  <li> Sold seat : {ssold} </li>
                  <li> Booked Seat : {sbookedSeat} </li>
                  <li> Available Seat: {savailable} </li>
                  <li> Hold :{shold}  </li>
                </ul>
              </div>}

            {ctotal > 0 &&
              <div className="seat-info">
                <h3>Cabin</h3>
                <ul className="seat-list">
                  <li> Sold seat : {csold} </li>
                  <li> Booked Seat : {cbookedSeat} </li>
                  <li> Available Seat: {cavailable} </li>
                  <li> Hold :{chold}  </li>
                </ul>
              </div>}

          </div>
        </div>

        <Cart
          banklist={this.props.banklist}
          roles={this.props.roles}
          PlatinumMainSeats={this.props.PlatinumMainSeats}
          GoldMainSeats={this.props.GoldMainSeats}
          CabinMainSeats={this.props.CabinMainSeats}
          selectedSeat={this.props.selectedSeat}
          count={this.props.count}
          totalprice={this.props.totalprice}
          seatCatagory={this.props.seatCatagory}
          fields={this.props.fields}
          soldClicked={this.props.soldClicked}
        />

      </div>
    );
  }
}

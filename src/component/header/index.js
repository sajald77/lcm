import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      isFullscreen: true
    };
  }

  render() {
    const { selectedMovie } = this.props;
    // console.log("props", this.props.selectedMovie[0])
    if (this.props.movieEmpty) {
      return (
        <div className="   ">
          <h1>Please Change the Date </h1>
        </div>
      );
    }
    return (
      <div className="top-menus">

        <ul className="header-nav">
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["available-seat-image"]}
              />{" "}
              <p>AVAILABLE</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["selected-seat-image"]}
              />{" "}
              <p>SELECTED</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["hold-seat-image"]}
              />{" "}
              <p>HOLD</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["reserved-seat-image"]}
              />{" "}
              <p>RESERVED</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["sold-seat-image"]}
              />{" "}
              <p>SOLD</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["complimentary-seat-image"]}
              />{" "}
              <p>COMPLIMENTARY</p> {" "}
            </div>{" "}
          </li>
          <li>
            {" "}<div className="col">
              {" "}{" "}
              <img
                alt="seat"
                src={selectedMovie.screens["unavailable-seat-image"]}
              />{" "}
              <p>UNAVAILABLE</p> {" "}
            </div>{" "}
          </li>

        </ul>

      </div>
    );
  }
}

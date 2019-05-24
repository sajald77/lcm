import React, { Component } from "react";
import screen from "../img/screen.png";
import nodata from "../img/nodata.png";
import menu from "../img/menu.png";
import reel from "../img/reel.png";
import Header from "../header";
import Screenmodal from "./screenmodal";
import ChangeDate from "../actionSection/ChangeDate";
import { MyLoader } from "../MyLoader";
import { Button } from "react-bootstrap";
import classNames from "classnames";

import { hallCategory } from "../../utils";

export default class Screen extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };
  }

  render() {
    const { orientation } = this.state;

    if (this.props.movieEmpty) {
      return (
        <div className="col-sm-8 seat-section">
          <div className="change-date">
            <div className="text-info">
              <div className="text-wrap">
                <p>There is no Movie available today.</p>
                <h1>Please Change the Date</h1>
              </div>
              <div className="date-wrap">
                <ChangeDate
                  changeDate={this.props.changeDate}
                  handleChangeDate={this.props.handleChangeDate}
                  selected={this.props.selected}
                />
              </div>
            </div>
            <div className="img-wrap">
              <img src={reel} alt="No Movie Available" />
            </div>
          </div>
        </div>
      );
    }

    if (this.props.welcomePage === null) {
      return (
        <div
          className={classNames({
            "col-sm-8 seat-section seat-section-next no-movie-select": this
              .props.isToggleOn,
            "col-sm-8 seat-section": !this.props.isToggleOn
          })}
        >
          <div
            className={classNames({
              "hamburger-menu": this.props.isToggleOn,
              "hamburger-menu unsee": !this.props.isToggleOn
            })}
            onClick={this.props.toggleMenu}
          >
            <div className="img-wrap">
              <img src={menu} alt="Menu" />
            </div>
          </div>
          <div className="img-wrap">
            <img src={nodata} alt="No Movie Selected" />
          </div>
        </div>
      );
    }
    const { selectedMovie } = this.props;
    const { seats, columns, rows, categoryName } = this.props;
    let added = this.props.toggleFullscreen ? " fullscreen " : "";
    let classadded = this.props.isToggleOn
      ? " col-sm-8 seat-section seat-section-next"
      : " col-sm-8 seat-section  ";
    let mainstyle = [added, classadded];
    let seatNames = {
      column: 0
    };

    if (this.props.MyLoading === false) {
      return (
        <div
          className={classNames({
            "col-sm-10 seat-section": this.props.isToggleOn,
            "col-sm-8 seat-section": !this.props.isToggleOn
          })}
          style={{ paddingTop: 140 }}
        >
          {/* <div className="screen-box"> */}
          <MyLoader />
          {/* </div> */}
        </div>
      );
    }

    return (
      <div className={mainstyle}>
        <div
          className={classNames({
            "hamburger-menu with-movie": this.props.isToggleOn,
            "hamburger-menu with-movie unsee": !this.props.isToggleOn
          })}
          onClick={this.props.toggleMenu}
        >
          <div className="img-wrap">
            <img src={menu} alt="Menu" />
          </div>
        </div>

        <Header
          movieEmpty={this.props.movieEmpty}
          selectedMovie={this.props.selectedMovie}
          main_url={this.props.main_url}
        />

        <div className="seat-tabs">
          <Button
            className={this.props.platinumStatus}
            onClick={this.props.platinum}
          >
            {hallCategory.high}
          </Button>
          <Button
            className={this.props.goldStatus}
            onClick={this.props.gold}
          >
            {hallCategory.low}
          </Button>
          <Button
            className={classNames({
              active: this.props.cabinStatus === "active",
              inactive: this.props.cabinStatus === "inactive",
              show: this.props.size > 2,
              hide: !(this.props.size > 2)
            })}
            onClick={this.props.cabin}
          >
            Cabin
          </Button>
        </div>

        <div className="screen-div">
          <div>
            <h2>
              <span className="screen-name">
                {this.props.selectedMovie.screens["screen_name"]}{" "}
              </span>
              {this.props.selectedMovie["movie_name"]}{" "}
              {this.props.selectedMovie["showTime"]}
            </h2>

          </div>
          <div className="screen-box">

            <div
              className={classNames({
                "screen-wrap show": categoryName === hallCategory.high,
                "screen-wrap unsee": !(categoryName === hallCategory.high)
              })}
            >
              <Screenmodal
                size={this.props.size}
                selected={this.props.startDate}
                platinumStatus={this.props.platinumStatus}
                goldStatus={this.props.goldStatus}
                cabinStatus={this.props.cabinStatus}
                platinum={this.props.platinum}
                gold={this.props.gold}
                cabin={this.props.cabin}
                newrows={this.props.rows}
                newcolumns={this.props.columns}
                banklist={this.props.banklist}
                seatDetails={this.props.seatDetails}
                global={this.props.global}
                toggleFullscreen={this.props.isFull}
                isToggleOn={this.props.isToggleOn}
                toggleMenu={this.props.toggleMenu}
                seatSelected={this.props.seatSelected}
                selectedMovie={this.props.selectedMovie}
                onRowSelect={this.props.onRowSelect}
                selectSeat={this.props.selectSeat}
                seats={this.props.platinumSeats}
                date={this.props.global_date}
                mobile={this.props.global_mobile}
                name={this.props.global_name}
                email={this.props.global_email}
                source={this.props.global_source}
                data={this.props.data}
              />
            </div>

            <div
              className={classNames({
                "screen-wrap show": categoryName === hallCategory.low,
                "screen-wrap unsee": !(categoryName === hallCategory.low)
              })}
            >
              <Screenmodal
                size={this.props.size}
                selected={this.props.startDate}
                platinumStatus={this.props.platinumStatus}
                goldStatus={this.props.goldStatus}
                cabinStatus={this.props.cabinStatus}
                platinum={this.props.platinum}
                gold={this.props.gold}
                cabin={this.props.cabin}
                newrows={this.props.rows}
                newcolumns={this.props.columns}
                banklist={this.props.banklist}
                seatDetails={this.props.seatDetails}
                global={this.props.global}
                toggleFullscreen={this.props.isFull}
                isToggleOn={this.props.isToggleOn}
                toggleMenu={this.props.toggleMenu}
                seatSelected={this.props.seatSelected}
                selectedMovie={this.props.selectedMovie}
                onRowSelect={this.props.onRowSelect}
                selectSeat={this.props.selectSeat}
                seats={this.props.goldSeats}
                date={this.props.global_date}
                mobile={this.props.global_mobile}
                name={this.props.global_name}
                email={this.props.global_email}
                source={this.props.global_source}
                data={this.props.data}
              />
            </div>

            <div
              className={classNames({
                "screen-wrap show": categoryName === "Cabin",
                "screen-wrap unsee": !(categoryName === "Cabin")
              })}
            >
              <Screenmodal
                size={this.props.size}
                selected={this.props.startDate}
                platinumStatus={this.props.platinumStatus}
                goldStatus={this.props.goldStatus}
                cabinStatus={this.props.cabinStatus}
                platinum={this.props.platinum}
                gold={this.props.gold}
                cabin={this.props.cabin}
                newrows={this.props.rows}
                newcolumns={this.props.columns}
                banklist={this.props.banklist}
                seatDetails={this.props.seatDetails}
                global={this.props.global}
                toggleFullscreen={this.props.isFull}
                isToggleOn={this.props.isToggleOn}
                toggleMenu={this.props.toggleMenu}
                seatSelected={this.props.seatSelected}
                selectedMovie={this.props.selectedMovie}
                onRowSelect={this.props.onRowSelect}
                selectSeat={this.props.selectSeat}
                seats={this.props.cabinSeats}
                date={this.props.global_date}
                mobile={this.props.global_mobile}
                name={this.props.global_name}
                email={this.props.global_email}
                source={this.props.global_source}
                data={this.props.data}
              />
            </div>

          </div>

          <div>
            {/* <MyLoader /> */}
            <img className="screen-img" src={screen} alt="screen" />
          </div>
        </div>

      </div>
    );
  }
}

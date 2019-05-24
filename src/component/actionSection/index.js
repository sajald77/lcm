import React, { Component } from "react";

import { logo } from "../../utils";
import cross from "../img/cross.png";
import Welcome from "./Welcome";
import BookModal from "./bookmodal";
import Modalhold from "./modalhold";
import Tablemodal from "./tablemodal";
import Holdmodal from "./holdmodal";
import Complimentary from "./complimentary";
import Complimentarymodal from "./Complimentarymodal";
import classNames from "classnames";
import Collectionmodal from "./collectionmodal";

export default class ActionSection extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  logout() {
    this.props.handlelogout();
  }
  refresh() {
    this.props.refresh();
  }

  include = (arr, obj) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  };
  render() {
    // let sellroles=this.props.roles.split(',')

    return (
      <div
        className={classNames({
          "col-sm-2 menu menu-hide":
            this.props.isToggleOn && this.props.dateToggle,
          "col-sm-2 menu": !(this.props.isToggleOn && this.props.dateToggle),
          "no-movie": this.props.movieEmpty
        })}
      >
        <div className="cross">
          <div className="img-wrap" onClick={this.props.toggleMenu}>
            <img src={cross} alt="Cancel" />
          </div>
        </div>
        <div className="logo">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="user">
          <Welcome
            welcomePage={this.props.welcomePage}
            userName={this.props.userName}
            handleChangeDate={this.props.handleChangeDate}
            selected={this.props.selected}
          />
          <hr />
          <section className="action-menu">
            <ul>
              <li onClick={this.refresh}>
                <i className="fa fa-refresh" aria-hidden="true" /> Refresh
              </li>

              <span
                className={
                  this.include(this.props.roles.split(","), "reserve")
                    ? " "
                    : "displayNone"
                }
              >
                <li>
                  <BookModal
                    onSubmit={fields => this.props.bookedclicked(fields)}
                  />
                </li>
              </span>
              <span
                className={
                  this.include(this.props.roles.split(","), "sell")
                    ? " "
                    : "displayNone"
                }
              >
                <li>
                  <Tablemodal
                    updateSeat={this.props.updateSeat}
                    cancellingSingleSeat={this.props.cancellingSingleSeat}
                    seatCatagorycancle={this.props.seatCatagorycancle}
                    banklist={this.props.banklist}
                    bookingtosell={this.props.bookingtosell}
                    tableData={this.props.tableData}
                  />
                </li>
              </span>
              <span
                className={
                  this.include(this.props.roles.split(","), "hold")
                    ? " "
                    : "displayNone"
                }
              >

                <li>
                  <Modalhold
                    onSubmit={fields => this.props.holdClicked(fields)}
                    banklist={this.props.banklist}
                  />
                </li>
              </span>

              <span
                className={
                  this.include(this.props.roles.split(","), "sell")
                    ? " "
                    : "displayNone"
                }
              >
                <li>
                  <Holdmodal
                    updateSeat={this.props.holddateSeathere}
                    cancellingSingleSeat={this.props.cancellingSingleSeathold}
                    seatCatagorycancle={this.props.seatCatagorycancle}
                    banklist={this.props.banklist}
                    holdtosell={this.props.holdtosell}
                    holdtoUnhold={this.props.holdtoUnhold}
                    holdtable={this.props.holdtable}
                  />
                </li>
              </span>

              <li>
                <Collectionmodal
                  my_Collection_TicketTotal={
                    this.props.my_Collection_TicketTotal
                  }
                  my_Collection_Total={this.props.my_Collection_Total}
                  myCollection={this.props.myCollection}
                  myCollection_showTime={this.props.myCollection_showTime}
                  my_collection={this.props.my_collection}
                />
              </li>

              <span
                className={
                  this.include(this.props.roles.split(","), "complimentary")
                    ? " "
                    : "displayNone"
                }
              >
                <li>
                  <Complimentary
                    onSubmit={fields => this.props.complimentary(fields)}
                  />
                </li>
                <li>
                  <Complimentarymodal
                    banklist={this.props.banklist}
                    cancellingSingleSeat={this.props.cancellingSingleSeat}
                    holdtoUnhold={this.props.holdtoUnhold}
                    complimentarytable={this.props.complimentarytable}
                  />
                </li>
              </span>

              <li onClick={this.logout}>
                <i className="fa fa-power-off" aria-hidden="true" /> Logout
              </li>
            </ul>
          </section>

        </div>
      </div>
    );
  }
}

// myCollection_showTime={this.state.myCollection_showTime}
// my_collection={this.state.my_collection}

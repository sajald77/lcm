import React, { Component } from "react";

import "./App.css";
import errorbg from "./component/img/404.png";
import ActionSection from "./component/actionSection";
import Screen from "./component/screen";
// import Header from "./component/header";
import SideBar from "./component/sideBar";
import moment from "moment";
import { Thumbnail } from "react-bootstrap";
import Login from "./login";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import Ticket from "./ticket";
import "./login.css";
import Slider from "react-slick";
import socketIOClient from "socket.io-client";
import { AlertList } from "react-bs-notifier";
import Modal from "react-responsive-modal";
import my_collection from "./api/index";
import show_time from "./api/show_time";
import SingleSeatDetails from "./singleseatdetails";
import { ENGINE_METHOD_DIGESTS } from "constants";
import { hallCategory } from "./utils";

const { ipcRenderer } = window.require("electron");

window.moment = moment;
function* group(alist, index, cols) {
  yield alist.slice(index, index + cols);
  yield* group(alist, index + cols, cols);
}

function* flatten(args) {
  for (let arg of args) {
    yield* arg;
  }
}
class App extends Component {
  state = {
    Platinum: {
      seats: []
    },

    Gold: {
      seats: []
    },
    Cabin: {
      seats: []
    },
    PlatinumMainSeats: [],
    GoldMainSeats: [],
    CabinMainSeats: [],
    category_name: hallCategory.high,
    //  error:true,
    pcname: "rudra",
    sideBarSeat: [],
    bSideBarSeat: [],
    sSideBarSeat: [],
    cSideBarSeat: [],
    newSeatData: [],
    ticketData: [],
    MyLoading: true,
    open: false,
    printLoader: false,
    openseat: false,
    movieEmpty: false,
    testmovieEmpty: null,
    user: "Rudra",
    isAuthenticated: false,
    selectedSeats: [],
    data: {},
    bookedSeat: [],
    holdSeat: [],
    unavailableseats: [],
    loading: true,
    selectedMovie: {},
    movies: [],
    startDate: moment(),
    showTime: [],
    fields: {},
    Sellfields: {},
    tableData: {},
    seatCatagory: [],
    totalprice: 0,
    position: "center",
    alerts: [],
    loadingticket: true,
    timeout: 0,
    isToggleOn: true,
    dateToggle: false,
    isFull: false,
    loader: false,
    timeout: 2400,
    toggleseats: {},
    movielength: 2,
    platinumStatus: "active",
    goldStatus: "inactive",
    cabinStatus: "",
    welcomePage: null,
    myCollection_showTime: [],
    my_collection: [],
    my_Collection_TicketTotal: "",
    my_Collection_Total: "",
    toSellSeats: [[], [], []],
    toSellSeatsInfo: [[], [], []],
    toSellCategory: [[hallCategory.high], [hallCategory.low], ["Cabin"]],

    //  endpoint: "http://10.10.1.10:3000/",
    // endpoint: "https://www.gkmovies.com.np:4000/",

    //  main_url: "http://esigntech.com.au/2018/gk/public/",
    main_url: "http://esigntech.com.au/2019/laxmi-cinemas/public/",

    count: {
      age: 27,
      height: 511,
      roles: "sell,reserve,hold,complementary,cancellation"
    },
    global: {},
    newMessage:
      "This is a test of the Emergency Broadcast System. This is only a test.",
    allSeats: {
      platinumSeats: {
        seats: [],
        rows: 0,
        columns: 0
      },
      goldSeats: {
        seats: [],
        rows: 0,
        columns: 0
      },
      cabinSeats: {
        seats: [],
        rows: 0,
        columns: 0
      }
    },
    seats: {
      seats: [],
      rows: 0,
      columns: 0,
      orientation: "normal",
      seatOrientation: "normal",
      rowStatus: []
    }
  };

  // seatSelected

  // current time

  //  Ctime = new Date();
  // currenttime= Ctime.toLocaleString('en-US', { hour: 'numeric', hour12: true })

  // ALERT=========================================================================
  generate(type) {
    const newAlert = {
      id: new Date().getTime(),
      type: type,
      message: this.state.newMessage
      // headline: `${type}!`,
    };

    this.setState({
      alerts: [...this.state.alerts, newAlert]
    });
  }

  onAlertDismissed(alert) {
    const alerts = this.state.alerts;

    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
    ``;
  }

  clearAlerts() {
    this.setState({
      alerts: []
    });
  }

  onTimeoutChange({ target: { value } }) {
    this.setState({ timeout: +value * 1000 });
  }

  onNewMessageChange({ target: { value } }) {
    this.setState({ newMessage: value });
  }

  onPositionChange({ target: { value } }) {
    this.setState({
      position: value
    });
  }

  // ALERT============================================================================

  // input fields

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      reason: ""
    });
  };

  Sidebartoggle = a => {
    this.setState({
      isToggleOn: a,
      isFull: false
    });
  };
  onPrint = () => {
    ipcRenderer.send("update-notify-value", "hello print");
    console.log("ipc");
  };

  toggleFullscreen = a => {
    this.setState({
      isFull: a,
      isToggleOn: false
    });
  };

  handleLogin = auth => {
    fetch(`${this.state.main_url}api/counter/login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        password: auth.password,
        email: auth.email
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("hauw-------------========", data);
        console.log("checking hall category", hallCategory);
        if (data.error) {
          this.setState({
            message: data.message,
            isAuthenticated: false
          });
        } else {
          this.setState({
            isAuthenticated: true,
            loadingticket: true,
            id: data.data.id,
            roles: data.data.roles,
            key: data.data.api_key,
            userName: data.data.name
          });
          this.bookeddata();
          this.holdDataTable();

          this.banklist();
          {
            this.componentfirst();
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isAuthenticated: false,
          loading: false
        });
      });
  };

  // console.log(this.state.roles)

  // booking modal app
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onSeatModal = () => {
    this.setState({ openseat: true });
  };

  onSeatModalClose = () => {
    this.setState({ openseat: false });
  };

  // login end here!!!!!!
  unavailableseats = s => {
    // category: "Platinum"
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "unavailable";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "unavailable";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "unavailable";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  soldseatssocket = s => {
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "sold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "sold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "sold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  bookseatssocket = s => {
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "reserved";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "reserved";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "reserved";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  counterhold = s => {
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "hold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "hold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "hold";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  complimentaryseat = s => {
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "complimentary";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "complimentary";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "complimentary";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  releaseseat = s => {
    if (s.category == hallCategory.high) {
      const { seats } = this.state.Platinum;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "available";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Platinum: {
          ...this.state.Platinum
        }
      });
    }

    if (s.category == "Cabin") {
      const { seats } = this.state.Cabin;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "available";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Cabin: {
          ...this.state.Cabin
        }
      });
    }

    if (s.category == hallCategory.low) {
      const { seats } = this.state.Gold;
      const newSeats = seats.map(rowSeats => {
        return rowSeats.map(seat => {
          if (seat["seat-name"] === s.seat_name) {
            seat["seat-status"] = "available";
          } else {
            return seat;
          }
        });
      });
      this.setState({
        Gold: {
          ...this.state.Gold
        }
      });
    }
  };

  selectSeat = (row, col) => {
    const socket = socketIOClient(this.state.endpoint);
    let movie = this.state.selectedMovie;
    let seats = [...this.state.seats.seats];
    let seat_op = seats[row][col];
    const dataToSend = {
      screen_id: movie.screens["screen_id"],
      movie_id: movie["movie_id"],
      show_date: movie["date"],
      show_time: movie["showTime"],
      processed_by: "counter",
      user_id: this.state.id,
      seat: seat_op["seat-name"],
      category: this.state.category_name
    };

    let sellingTicketSeatInfo = [...this.state.toSellSeatsInfo];

    if (seats[row][col]["seat-status"] === "available") {
      seats[row][col]["seat-status"] = "selected";
      if (seats[row][col]["category-name"] === hallCategory.high) {
        sellingTicketSeatInfo[0].push(seats[row][col]["seat-name"]);
      } else if (seats[row][col]["category-name"] === hallCategory.low) {
        sellingTicketSeatInfo[1].push(seats[row][col]["seat-name"]);
      } else {
        sellingTicketSeatInfo[2].push(seats[row][col]["seat-name"]);
      }
      socket.emit("hold seat", {
        room: "seats updates",
        msg: JSON.stringify(dataToSend)
      });
    } else if (seats[row][col]["seat-status"] === "selected") {
      seats[row][col]["seat-status"] = "available";
      if (seats[row][col]["category-name"] === hallCategory.high) {
        var seatindex = sellingTicketSeatInfo[0].indexOf(
          seats[row][col]["seat-name"]
        );

        if (seatindex > -1) {
          sellingTicketSeatInfo[0].splice(seatindex, 1);
        }
      } else if (seats[row][col]["category-name"] === hallCategory.low) {
        var seatindex = sellingTicketSeatInfo[1].indexOf(
          seats[row][col]["seat-name"]
        );

        if (seatindex > -1) {
          sellingTicketSeatInfo[1].splice(seatindex, 1);
        }
      } else {
        var seatindex = sellingTicketSeatInfo[2].indexOf(
          seats[row][col]["seat-name"]
        );

        if (seatindex > -1) {
          sellingTicketSeatInfo[2].splice(seatindex, 1);
        }
      }
      socket.emit("release seat", {
        room: "seats updates",
        msg: JSON.stringify(dataToSend)
      });
    } else {
      return;
    }

    let obj = {
      seat_name: seats[row][col]["seat-name"] // Add remaining keys to send to the backend
    };
    let selected = [...this.state.selectedSeats];

    let index = selected.indexOf(seat_op);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(seat_op);
    }

    // let sold= seats.map(o => o["seat-status"]).filter(i => i=="sold").length;
    let seatCatagory = selected.map(seat => ({
      name: seat["category-name"],
      price: seat["category-price"],
      count: 0
    }));
    let seatPrice = selected.map(seat => seat["category-price"]);
    // {this.counterData()}

    if (
      undefined != seatPrice &&
      seatPrice != null &&
      seatPrice != "" &&
      seatPrice.length > 0
    ) {
      var totalprice = seatPrice.reduce(
        (a = 0, b = 0) => (a == null ? 0 : a) + (b == null ? 0 : b)
      );
    }

    let count = {};
    seatCatagory.map(category => {
      if (count.hasOwnProperty(category.name)) {
        let current = count[category.name];
        count[category.name] = {
          ...current,
          count: ++current.count
        };
      } else {
        count[category.name] = {
          ...category,
          count: 1
        };
      }
    });

    this.setState({
      ...this.state,
      seats: {
        ...this.state.seats,
        seats
      },

      count,
      selectedSeats: selected,
      toSellSeatsInfo: sellingTicketSeatInfo,
      toSellSeats: [[], [], []],
      seatCatagory,
      totalprice
    });
    this.platinumSeats();
    this.goldSeats();
    this.cabinSeats();
  };

  seatDetails = (row, col) => {
    console.log("seat_details", row, col);
    let movie = this.state.selectedMovie;
    let seats = [...this.state.seats.seats];
    let seat_op = seats[row][col]["seat-name"];

    if (seats[row][col]["seat-status"] === "sold") {
      console.log(seats[row][col]["seat-name"]);
      {
        this.seatDetailapi(seat_op, "sell");
      }
    } else if (seats[row][col]["seat-status"] === "hold") {
      {
        this.seatDetailapi(seat_op, "hold");
      }
    } else if (seats[row][col]["seat-status"] === "reserved") {
      {
        this.seatDetailapi(seat_op, "reserve");
      }
    } else if (seats[row][col]["seat-status"] === "complimentary") {
      {
        this.seatDetailapi(seat_op, "complimentary");
      }
    } else {
      console.log("");
    }

    this.setState({
      seatcancle: seat_op
    });
  };

  cancellingSingleSeat = seat => {
    this.setState({
      openseat: false,
      seatCatagorycancle: "complimentary"
    });
    //  console.log("seat,ss",this.state.seatcancl.toString())

    // Parameters: screen_id, movie_id, show_date, show_time, seat_name, status(hold/reserve/sell/complimentary)
    fetch(`${this.state.main_url}api/counter/cancel-seat`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        status: this.state.seatCatagorycancle,
        seat_name: [seat.row.join()],
        category: [this.state.category_name],
        reason_for_return: seat["comment"],

        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          singleseatdetails: data,
          newMessage: data.message
        });
        this.generate("info");
      })
      .catch(error => {
        console.log(error);
      });
    this.holdDataTable();
    // {this.seatDetailapi()}
  };

  cancellingSingleSeathere = seat => {
    this.setState({
      openseat: false
    });
    //  console.log("seat,ss",this.state.seatcancl.toString())

    // Parameters: screen_id, movie_id, show_date, show_time, seat_name, status(hold/reserve/sell/complimentary)
    fetch(`${this.state.main_url}api/counter/cancel-seat`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: seat.datatobook["screen_id"],
        movie_id: seat.datatobook["movie_id"],
        show_date: seat.datatobook["show_date"],
        show_time: seat.datatobook["show_time"],
        status: "reserve",
        seat_name: [seat.row.join()],
        category: [seat.datatobook.category],
        reason_for_return: seat["comment"],
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          singleseatdetails: data,
          newMessage: data.message
        });
        this.generate("info");
      })
      .catch(error => {
        console.log(error);
      });
    this.bookeddata();
    this.holdDataTable();
    // {this.seatDetailapi()}
  };

  cancellingSingleSeathold = seat => {
    this.setState({
      openseat: false
    });
    //  console.log("seat,ss",this.state.seatcancl.toString())

    // Parameters: screen_id, movie_id, show_date, show_time, seat_name, status(hold/reserve/sell/complimentary)
    fetch(`${this.state.main_url}api/counter/cancel-seat`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: seat.datatobook["screen_id"],
        movie_id: seat.datatobook["movie_id"],
        show_date: seat.datatobook["show_date"],
        show_time: seat.datatobook["show_time"],
        status: "hold",
        seat_name: [seat.row.join()],
        category: [seat.datatobook.category],
        computer_name: this.state.pcname,
        reason_for_return: seat["comment"]
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          singleseatdetails: data,
          newMessage: data.message
        });
        this.generate("info");
        this.holdDataTable();
      })
      .catch(error => {
        console.log(error);
      });
    this.holdDataTable();
    // {this.seatDetailapi()}
  };

  cancellingcomplimentarySeat = seat => {
    this.setState({
      openseat: false,
      seatCatagorycancle: "complimentary"
    });
    //  console.log("seat,ss",this.state.seatcancl.toString())

    // Parameters: screen_id, movie_id, show_date, show_time, seat_name, status(hold/reserve/sell/complimentary)
    fetch(`${this.state.main_url}api/counter/cancel-seat`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: seat.datatobook.screen_id,
        movie_id: seat.datatobook.movie_id,
        show_date: seat.datatobook.show_date,
        show_time: seat.datatobook.show_time,
        status: "reserved",
        seat_name: [seat.row.join()],
        category: [this.state.category_name],
        computer_name: this.state.pcname,
        reason_for_return: seat["comment"]
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          singleseatdetails: data,
          newMessage: data.message
        });
        {
          this.ComplimentaryTable();
        }
        this.generate("info");
      })
      .catch(error => {
        console.log(error);
      });
    this.holdDataTable();
    // {this.seatDetailapi()}
  };

  updateSeat = d => {
    this.setState({
      openseat: false
    });

    fetch(`${this.state.main_url}api/counter/update`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: this.state.global_code,
        status: this.state.seatCatagorycancle,
        release_time: d.time,
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("-----------------update-----", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateSeathere = d => {
    this.setState({
      openseat: false
    });
    console.log(
      "update time here",
      this.state.global_code,
      d.datatobook["booking_code"],
      this.state.seatCatagorycancle
    );
    fetch(`${this.state.main_url}api/counter/update`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: d.datatobook["booking_code"],
        status: "reserve",
        release_time: d.time,
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("-----------------update-----", data);
      })
      .catch(error => {
        console.log(error);
      });
    this.bookeddata();
  };

  holddateSeathere = d => {
    this.setState({
      openseat: false
    });
    console.log("update time here", d);
    fetch(`${this.state.main_url}api/counter/update`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: d.datatobook["hold_id"],
        status: "hold",
        release_time: d.time,
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("-----------------update-----", data);
      })
      .catch(error => {
        console.log(error);
      });
    this.bookeddata();
    this.holdDataTable();
  };

  seatDetailapi = (seat, aaa) => {
    console.log("seat--------------detail", seat, aaa);
    let seat_names = seat.toString();

    fetch(`${this.state.main_url}api/counter/seat-wise-detail`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        status: aaa,
        category: [this.state.category_name],
        seat_name: seat_names,
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("----------------------", data.data);
        this.setState({
          global_date: data.data["date_time"],
          global_name: data.data["customer_name"],
          global_mobile: data.data["customer_mobile"],
          global_source: data.data["source"],
          global_email: data.data["customer_email"],
          global_code: data.data["code"],
          globaldata: data.data,
          seatCatagorycancle: aaa
        });

        this.onSeatModal();
        this.holdDataTable();
      })
      .catch(error => {
        console.log(error);
      });
  };

  booktosell = row => {
    console.log("row ----------------------------------->", row.datatobook);

    this.setState({
      loader: true,
      openseat: false
    });

    console.log("bookingtosell", row);
    fetch(`${this.state.main_url}api/counter/seats/book-to-sell`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        booking_code: this.state.global_code,
        payment_mode: row.cardtype,
        counter_id: this.state.id,
        seats: [row.row.join()],
        category: [this.state.category_name],
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("data--here ata booking ", data);

        // {this.counterData()}
        this.setState({
          loader: false,
          ticketData: data.data,
          selectedSeats: [],
          loadingticket: false,
          newMessage: data.message
        });
        this.generate("success");
        this.onPrint();

        {
          this.bookeddata();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  // hold to sell==================================
  holdsell = row => {
    console.log("hold to to to ===== sell", row.row.join(), row.row);
    this.setState({
      loader: true,
      openseat: false
    });

    fetch(`${this.state.main_url}api/counter/seats/hold-to-sell`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        hold_id: this.state.global_code,
        payment_mode: row.cardtype,
        counter_id: this.state.id,
        seats: [row.row.join()],
        category: [this.state.category_name],
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("hold to sell", data);

        this.setState({
          ticketData: data.data,
          selectedSeats: [],
          loadingticket: false,
          loader: false,
          newMessage: data.message
        });

        this.generate("success");
        this.onPrint();
        {
          this.counterData();
        }
        {
          this.bookeddata();
        }
        this.holdDataTable();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  onRowSelect = (rowIndex, selected) => {
    if (this.state.category_name == hallCategory.high) {
      let { seats } = this.state.seats;
      let rowStatus = this.state.seats.seats[rowIndex];
      let rows = seats[rowIndex];
      const seatsOnRow = seats[rowIndex];

      const r = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                return "selected";
              } else if (!selected && seat["seat-status"] === "selected") {
                return "available";
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });
      let toggleseat = [];
      let toggleoffseat = [];

      // ===================================================================================

      seats[rowIndex] = r;

      const s = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                toggleseat.push(seat["seat-name"]);
              } else if (!selected && seat["seat-status"] === "selected") {
                toggleoffseat.push(seat["seat-name"]);
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });

      let nestedSelectedSeats = seats.map(seatRow => {
        return seatRow.filter(seat => seat["seat-status"] === "selected");
      });
      let selectedSeats = [...flatten(nestedSelectedSeats)];

      //  ====================== Dead code, never used again =================
      let seatname = selectedSeats.map(seat => seat["seat-name"]);
      // =======================================================

      let seatPrice = selectedSeats.map(seat => seat["category-price"]);

      if (
        undefined != seatPrice &&
        seatPrice != null &&
        seatPrice != "" &&
        seatPrice.length > 0
      ) {
        var totalprice = seatPrice.reduce(
          (a = 0, b = 0) => (a == null ? 0 : a) + (b == null ? 0 : b)
        );
      }

      // let sold= seats.map(o => o["seat-status"]).filter(i => i=="sold").length;
      let seatCatagory = selectedSeats.map(seat => ({
        name: seat["category-name"],
        price: seat["category-price"],
        count: 0
      }));

      let count = {};
      seatCatagory.map(category => {
        if (count.hasOwnProperty(category.name)) {
          let current = count[category.name];
          count[category.name] = {
            ...current,
            count: ++current.count
          };
        } else {
          count[category.name] = {
            ...category,
            count: 1
          };
        }
      });

      let selectedallseat = r;
      let sellingTicketSeatInfo = [...this.state.toSellSeatsInfo];

      let movie = this.state.selectedMovie;
      let newPlatinum = this.state.Platinum;
      newPlatinum.seats[rowIndex] = r;

      for (var i = 0; i < selectedallseat.length; ++i) {
        let vu = selectedallseat[i]["seat-name"];

        var seatSelected = [...this.state.selectedSeats];
        if (selectedallseat[i]["seat-status"] == "selected") {
          //  var arr = [5, 15, 110, 210, 550]; // selectedallseat[i]["seat-name"]
          var index = sellingTicketSeatInfo[0].indexOf(
            selectedallseat[i]["seat-name"]
          );

          if (index > -1) {
            // sellingTicketSeatInfo[0].splice(index, 1);
            console.log("spliced=========", sellingTicketSeatInfo);
          } else {
            seatSelected.push(selectedallseat[i]["seat-name"]);

            sellingTicketSeatInfo[0].push(selectedallseat[i]["seat-name"]);
          }
        } else {
          var index = sellingTicketSeatInfo[0].indexOf(
            selectedallseat[i]["seat-name"]
          );
          if (index > -1) {
            seatSelected.splice(index, 1);
            sellingTicketSeatInfo[0].splice(index, 1);
          }
        }
        // console.log('SeatSelect========>>>>>>>>>>>>>>>', seatSelected);
        //  if (this.state.selectSeat.indexOf(i)) {

        // } else {
        //   console.log("no");
        // }
      }

      const socket = socketIOClient(this.state.endpoint);

      // let seat_op= seats[row][col];

      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: selected ? toggleseat.toString() : toggleoffseat.toString(),
        category: this.state.category_name
      };

      if (selected) {
        socket.emit("hold seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      } else {
        socket.emit("release seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      }

      this.setState({
        ...this.state,
        totalprice,
        seats: {
          ...this.state.seats,
          seats,
          rowStatus
        },
        selectedSeats: seatSelected,
        count,
        toSellSeatsInfo: sellingTicketSeatInfo,
        Platinum: newPlatinum,
        seatCatagory
      });

      this.platinumSeats();
    }

    if (this.state.category_name == "Cabin") {
      let { seats } = this.state.seats;
      let rowStatus = this.state.seats.seats[rowIndex];
      let rows = seats[rowIndex];
      const seatsOnRow = seats[rowIndex];

      const r = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                return "selected";
              } else if (!selected && seat["seat-status"] === "selected") {
                return "available";
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });
      let toggleseat = [];
      let toggleoffseat = [];

      // ===================================================================================

      seats[rowIndex] = r;

      const s = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                toggleseat.push(seat["seat-name"]);
              } else if (!selected && seat["seat-status"] === "selected") {
                toggleoffseat.push(seat["seat-name"]);
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });

      let nestedSelectedSeats = seats.map(seatRow => {
        return seatRow.filter(seat => seat["seat-status"] === "selected");
      });
      let selectedSeats = [...flatten(nestedSelectedSeats)];

      //  ====================== Dead code, never used again =================
      let seatname = selectedSeats.map(seat => seat["seat-name"]);
      // =======================================================

      let seatPrice = selectedSeats.map(seat => seat["category-price"]);

      if (
        undefined != seatPrice &&
        seatPrice != null &&
        seatPrice != "" &&
        seatPrice.length > 0
      ) {
        var totalprice = seatPrice.reduce(
          (a = 0, b = 0) => (a == null ? 0 : a) + (b == null ? 0 : b)
        );
      }

      // let sold= seats.map(o => o["seat-status"]).filter(i => i=="sold").length;
      let seatCatagory = selectedSeats.map(seat => ({
        name: seat["category-name"],
        price: seat["category-price"],
        count: 0
      }));

      let count = {};
      seatCatagory.map(category => {
        if (count.hasOwnProperty(category.name)) {
          let current = count[category.name];
          count[category.name] = {
            ...current,
            count: ++current.count
          };
        } else {
          count[category.name] = {
            ...category,
            count: 1
          };
        }
      });

      let selectedallseat = r;
      let sellingTicketSeatInfo = [...this.state.toSellSeatsInfo];

      let movie = this.state.selectedMovie;
      let newPlatinum = this.state.Cabin;
      newPlatinum.seats[rowIndex] = r;

      for (var i = 0; i < selectedallseat.length; ++i) {
        let vu = selectedallseat[i]["seat-name"];

        let seatSelected = [...this.state.selectedSeats];
        if (selectedallseat[i]["seat-status"] == "selected") {
          //  var arr = [5, 15, 110, 210, 550]; // selectedallseat[i]["seat-name"]
          var index = sellingTicketSeatInfo[2].indexOf(
            selectedallseat[i]["seat-name"]
          );

          if (index > -1) {
            // sellingTicketSeatInfo[2].splice(index, 1);
            console.log("Do nothing");
          } else {
            seatSelected.push(selectedallseat[i]["seat-name"]);

            sellingTicketSeatInfo[2].push(selectedallseat[i]["seat-name"]);
          }
        } else {
          var index = sellingTicketSeatInfo[2].indexOf(
            selectedallseat[i]["seat-name"]
          );
          if (index > -1) {
            seatSelected.splice(index, 1);
            sellingTicketSeatInfo[2].splice(index, 1);
          }
        }
        //  if (this.state.selectSeat.indexOf(i)) {

        // } else {
        //   console.log("no");
        // }
      }

      const socket = socketIOClient(this.state.endpoint);

      // let seat_op= seats[row][col];

      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: selected ? toggleseat.toString() : toggleoffseat.toString(),
        category: this.state.category_name
      };

      if (selected) {
        socket.emit("hold seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      } else {
        socket.emit("release seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      }

      this.setState({
        ...this.state,
        totalprice,
        seats: {
          ...this.state.seats,
          seats,
          rowStatus
        },
        selectedSeats,
        count,
        toSellSeatsInfo: sellingTicketSeatInfo,
        Cabin: newPlatinum,
        seatCatagory
      });
      this.cabinSeats();
    }

    if (this.state.category_name == hallCategory.low) {
      let { seats } = this.state.seats;
      let rowStatus = this.state.seats.seats[rowIndex];
      let rows = seats[rowIndex];
      const seatsOnRow = seats[rowIndex];

      const r = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                return "selected";
              } else if (!selected && seat["seat-status"] === "selected") {
                return "available";
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });

      let toggleseat = [];
      let toggleoffseat = [];

      // ===================================================================================

      seats[rowIndex] = r;

      const s = seatsOnRow.map(seat => {
        if (Object.keys(seat).length) {
          return {
            ...seat,
            "seat-status": (() => {
              if (selected && seat["seat-status"] === "available") {
                toggleseat.push(seat["seat-name"]);
              } else if (!selected && seat["seat-status"] === "selected") {
                toggleoffseat.push(seat["seat-name"]);
              }
              return seat["seat-status"];
            })()
          };
        } else {
          return seat;
        }
      });

      let nestedSelectedSeats = seats.map(seatRow => {
        return seatRow.filter(seat => seat["seat-status"] === "selected");
      });
      let selectedSeats = [...flatten(nestedSelectedSeats)];

      //  ====================== Dead code, never used again =================
      let seatname = selectedSeats.map(seat => seat["seat-name"]);
      // =======================================================

      let seatPrice = selectedSeats.map(seat => seat["category-price"]);

      if (
        undefined != seatPrice &&
        seatPrice != null &&
        seatPrice != "" &&
        seatPrice.length > 0
      ) {
        var totalprice = seatPrice.reduce(
          (a = 0, b = 0) => (a == null ? 0 : a) + (b == null ? 0 : b)
        );
      }

      // let sold= seats.map(o => o["seat-status"]).filter(i => i=="sold").length;
      let seatCatagory = selectedSeats.map(seat => ({
        name: seat["category-name"],
        price: seat["category-price"],
        count: 0
      }));

      let count = {};
      seatCatagory.map(category => {
        if (count.hasOwnProperty(category.name)) {
          let current = count[category.name];
          count[category.name] = {
            ...current,
            count: ++current.count
          };
        } else {
          count[category.name] = {
            ...category,
            count: 1
          };
        }
      });

      let selectedallseat = r;
      let sellingTicketSeatInfo = [...this.state.toSellSeatsInfo];

      let movie = this.state.selectedMovie;
      let newPlatinum = this.state.Gold;
      newPlatinum.seats[rowIndex] = r;

      for (var i = 0; i < selectedallseat.length; ++i) {
        let vu = selectedallseat[i]["seat-name"];

        let seatSelected = [...this.state.selectedSeats];
        if (selectedallseat[i]["seat-status"] == "selected") {
          //  var arr = [5, 15, 110, 210, 550]; // selectedallseat[i]["seat-name"]
          var index = sellingTicketSeatInfo[1].indexOf(
            selectedallseat[i]["seat-name"]
          );

          if (index > -1) {
            // sellingTicketSeatInfo[1].splice(index, 1);
            console.log("Do nothing");
          } else {
            seatSelected.push(selectedallseat[i]["seat-name"]);

            sellingTicketSeatInfo[1].push(selectedallseat[i]["seat-name"]);
          }
        } else {
          var index = sellingTicketSeatInfo[1].indexOf(
            selectedallseat[i]["seat-name"]
          );
          if (index > -1) {
            seatSelected.splice(index, 1);
            sellingTicketSeatInfo[1].splice(index, 1);
          }
        }
      }

      const socket = socketIOClient(this.state.endpoint);

      // let seat_op= seats[row][col];

      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: selected ? toggleseat.toString() : toggleoffseat.toString(),
        category: this.state.category_name
      };

      if (selected) {
        socket.emit("hold seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      } else {
        socket.emit("release seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
      }

      this.setState({
        ...this.state,
        totalprice,
        seats: {
          ...this.state.seats,
          seats,
          rowStatus
        },
        selectedSeats,
        toSellSeatsInfo: sellingTicketSeatInfo,
        count,
        Gold: newPlatinum,
        seatCatagory
      });
      this.goldSeats();
    }
  };

  holdClicked = fields => {
    console.log("hold clicked", fields);
    console.log("data recived from hold", fields.time);

    const { selectedMovie, newSeatData, dataCatg } = this.state;

    const catgDate = dataCatg;

    for (var k = 0; k < catgDate.length; k++) {
      // let seats = [...this.state.seats.seats];

      let columns_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-columns"
        ];

      let rows_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-rows"
        ];

      let seats = [...this.state[`${catgDate[k]}`].seats];
      const setInfo_ = newSeatData.data["seat-info"];
      let somram = this.state[`${catgDate[k]}`];
      let seats_ = this.formatSeats(
        rows_,
        columns_,
        setInfo_[`${catgDate[k]}`]
      );

      for (var i = 0; i < rows_; ++i) {
        for (var j = 0; j < columns_; ++j) {
          if (seats[i][j]["seat-status"] === "selected") {
            seats[i][j]["seat-status"] = "hold";
          }
          // console.log("cool", somram[i][j]);
        }
      }

      this.setState({
        Platinum: this.state.Platinum,
        Gold: this.state.Gold,
        Cabin: this.state.Cabin,
        loadingticket: false,
        holdSeat: [...this.state.selectedSeats],
        seatCatagory: [],
        totalprice: 0,
        sideBarSeat: setInfo_[`${catgDate[k]}`]
        // category_name: [`${catgDate[k]}`]
      });
      console.log(
        "setsInfo====================>>>>>>>>>>>>>>>>",
        this.state.sideBarSeat
      );
    }
    console.log("times", k);

    // API Work

    let sellingTicketSeat = [...this.state.toSellSeatsInfo];
    let sellingTicketCategory = [...this.state.toSellCategory];

    for (var i = 2; i >= 0; i--) {
      if (
        !Array.isArray(sellingTicketSeat[i]) ||
        !sellingTicketSeat[i].length
      ) {
        sellingTicketSeat.splice(i, 1);
        sellingTicketCategory.splice(i, 1);
      }
    }

    for (var i = 0; i < sellingTicketSeat.length; i++) {
      sellingTicketSeat[i] = sellingTicketSeat[i].toString();
      sellingTicketCategory[i] = sellingTicketCategory[i].toString();
    }

    // let seatname = this.state.selectedSeats.map(i => i["seat-name"]);
    // let seat_names = seatname.toString().split();
    fetch(`${this.state.main_url}api/counter/seats/hold`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "api-token": this.state.key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        // seat_name:seat_names,
        seat_name: sellingTicketSeat,
        // category:[this.state.category_name],
        category: sellingTicketCategory,
        counter_id: this.state.id,
        customer_name: fields.firstName,
        customer_mobile: fields.number,
        computer_name: this.state.pcname,
        customer_email: fields.email,
        release_time: parseInt(fields.time) || 60
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("hod data", data);

        this.setState({
          selectedSeats: [],
          toSellSeatsInfo: [[], [], []],
          toSellSeats: [[], [], []],
          toSellCategory: [[hallCategory.high], [hallCategory.low], ["Cabin"]],
          newMessage: "Hold Successful"
        });
        this.generate("success");

        {
          this.holdDataTable();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  // booking seat=============================================================================
  bookedClicked = fields => {
    const { selectedMovie, newSeatData, dataCatg } = this.state;

    const catgDate = dataCatg;

    for (var k = 0; k < catgDate.length; k++) {
      // let seats = [...this.state.seats.seats];

      let columns_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-columns"
        ];

      let rows_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-rows"
        ];

      let seats = [...this.state[`${catgDate[k]}`].seats];
      const setInfo_ = newSeatData.data["seat-info"];
      let somram = this.state[`${catgDate[k]}`];
      let seats_ = this.formatSeats(
        rows_,
        columns_,
        setInfo_[`${catgDate[k]}`]
      );

      for (var i = 0; i < rows_; ++i) {
        for (var j = 0; j < columns_; ++j) {
          if (seats[i][j]["seat-status"] === "selected") {
            seats[i][j]["seat-status"] = "reserved";
          }
          // console.log("cool", somram[i][j]);
        }
      }

      this.setState({
        Platinum: this.state.Platinum,
        Gold: this.state.Gold,
        Cabin: this.state.Cabin,
        // selectedSeats: [],
        loadingticket: false,
        // toSellSeatsInfo: [[], [], []],
        // toSellSeats: [[], [], []],
        seatCatagory: [],
        bookedSeat: [...this.state.selectedSeats],
        fields: [...this.state.fields, fields],
        sideBarSeat: setInfo_[`${catgDate[k]}`]
        // category_name: [`${catgDate[k]}`]
      });
      console.log(
        "setsInfo====================>>>>>>>>>>>>>>>>",
        this.state.sideBarSeat
      );
    }
    console.log("times", k);

    // API Work

    let sellingTicketSeat = [...this.state.toSellSeatsInfo];
    let sellingTicketCategory = [...this.state.toSellCategory];

    for (var i = 2; i >= 0; i--) {
      if (
        !Array.isArray(sellingTicketSeat[i]) ||
        !sellingTicketSeat[i].length
      ) {
        sellingTicketSeat.splice(i, 1);
        sellingTicketCategory.splice(i, 1);
      }
    }

    for (var i = 0; i < sellingTicketSeat.length; i++) {
      sellingTicketSeat[i] = sellingTicketSeat[i].toString();
      sellingTicketCategory[i] = sellingTicketCategory[i].toString();
    }

    let seatname = this.state.selectedSeats.map(i => i["seat-name"]);
    let seat_names = seatname.toString().split();

    fetch(`${this.state.main_url}api/counter/seats/reserve`, {
      method: "post",
      headers: {
        "api-token": this.state.key,
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        // seat_name:seat_names,
        seat_name: sellingTicketSeat,
        // category:[this.state.category_name],
        category: sellingTicketCategory,
        counter_id: this.state.id,
        customer_name: fields.firstName,
        customer_mobile: fields.number,
        customer_email: fields.email,
        computer_name: this.state.pcname,
        release_time: parseInt(fields.time)
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("book data", data);
        if (data.data === undefined) {
          {
            this.counterData();
          }
          this.setState({
            selectedSeats: [],
            totalprice: 0,
            newMessage: "reservation failed"
          });
          this.generate("danger");
        } else {
          {
            this.bookeddata();
          }
          {
            this.counterData();
          }
          this.setState({
            bookingCode: data.data,
            selectedSeats: [],
            toSellSeatsInfo: [[], [], []],
            toSellSeats: [[], [], []],
            toSellCategory: [
              [hallCategory.high],
              [hallCategory.low],
              ["Cabin"]
            ],
            totalprice: 0,
            loader: false,
            newMessage: ` Booking Code: ${data.data}`
          });

          // {this.counterData()}
          // this.generate("success");
          this.onOpenModal();
          let id = this.state.tableData.length;

          let tdata = {
            firstName: fields.firstName,
            //  id:  id ? id : 0,
            email: fields.email,
            number: fields.number,
            movieName: this.state.selectedMovie["movie_name"],
            seatSelected: seatname.toString(),
            showDate: this.state.selectedMovie.date,
            showTime: this.state.selectedMovie.showTime,
            bookingCode: this.state.bookingCode
          };
        }
      })
      .catch(error => {
        this.setState({
          newMessage: "Booking Failed",
          loading: false,
          error: true,
          loadingticket: true
        });
        this.generate("danger");
      });
  };

  // booking seat+==============================================================================

  bookeddata = () => {
    // this.setState({
    //   loader:true,
    // })
    fetch(`${this.state.main_url}api/counter/seats/booked`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("booktable================>", data);

        // const bookdata=data.data.seat.map((book,index) => {
        //   return {
        //     seat:book[index].seat
        //   }

        // })

        // console.log("bookdata=========>  > >", bookdata)

        this.setState({
          //  loader:false,
          tableData: data.data
        });
      });
  };

  // bookedData==============================

  // bank details
  banklist = () => {
    fetch(`${this.state.main_url}api/counter/bank-lists`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("bank data:", data.data);

        this.setState({
          banklist: data.data
        });
      });
  };

  // bank details

  // holdDatatable
  holdDataTable = () => {
    fetch(`${this.state.main_url}api/counter/seats/holded`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("holdtable:", data);
        this.setState({
          holdtable: data.data
        });
      });
  };

  ComplimentaryTable = () => {
    fetch(`${this.state.main_url}api/counter/seats/complimentary`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("comp---------------table:", data);
        this.setState({
          complimentarytable: data.data
        });
      });
  };

  // Counter Data===========

  counterData = () => {
    fetch(`${this.state.main_url}api/counter`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        if (data.error == false) {
          const movies = data.data
            .map(mov => {
              const movie = mov["movie-detail"];
              const timeDetail = mov["schedule-detail"];
              const seatDetails = mov["seat-detail"];
              const screens = mov["screen-detail"];
              return {
                ...movie,
                time: `${timeDetail["show-date"]} ${timeDetail["show-time"]}`,
                showTime: `${timeDetail["show-time"]}`,
                date: `${timeDetail["show-date"]}`,
                title: movie["movie_name"] || "Unknown",
                imageSource: movie.image,
                seats: seatDetails,
                screens
              };
            })
            .filter(movie => {
              return (
                moment(movie.time).format("YYYY-MM-DD") ===
                this.state.startDate.format("YYYY-MM-DD")
              );
            });
          let columns_ = this.state.seats.cols;
          let rows_ = this.state.seats.rows;
          const setInfo_ = this.state.selectedMovie.seats;

          // let seats_ = this.formatSeats(rows_, columns_, setInfo_);
          // console.log("counter data",data.data)
          this.setState({
            data: data.data

            // seats: {
            //    seats: seats_,
            //  cols: columns_,
            //  rows: rows_
            // }
          });
        } else {
          this.setState({
            newMessage: "Too Many Requests"
            // timeout: 500,
          });
          // this.generate("danger");
        }
      });
  };

  complimentary = fields => {
    const { selectedMovie, newSeatData, dataCatg } = this.state;

    const catgDate = dataCatg;

    for (var k = 0; k < catgDate.length; k++) {
      // let seats = [...this.state.seats.seats];

      let columns_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-columns"
        ];

      let rows_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-rows"
        ];

      let seats = [...this.state[`${catgDate[k]}`].seats];
      const setInfo_ = newSeatData.data["seat-info"];
      let somram = this.state[`${catgDate[k]}`];
      let seats_ = this.formatSeats(
        rows_,
        columns_,
        setInfo_[`${catgDate[k]}`]
      );

      console.log("seasts====================>>>>>>>>>>>>>>>>", seats_);

      for (var i = 0; i < rows_; ++i) {
        for (var j = 0; j < columns_; ++j) {
          if (seats[i][j]["seat-status"] === "selected") {
            seats[i][j]["seat-status"] = "complimentary";
          }
        }
      }

      this.setState({
        Platinum: this.state.Platinum,
        Gold: this.state.Gold,
        Cabin: this.state.Cabin,
        loadingticket: false,
        totalprice: 0,
        seatCatagory: [],
        sideBarSeat: setInfo_[`${catgDate[k]}`]
        // category_name: [`${catgDate[k]}`]
      });
    }

    // API Work

    let sellingTicketSeat = [...this.state.toSellSeatsInfo];
    let sellingTicketCategory = [...this.state.toSellCategory];

    // for (var i = 0; i < this.state.selectedSeats.length; ++i) {
    //   if (this.state.selectedSeats[i]["category-name"] === "Platinum") {
    //     sellingTicketSeat[0].push(this.state.selectedSeats[i]["seat-name"]);
    //   } else if (this.state.selectedSeats[i]["category-name"] === "Gold") {
    //     sellingTicketSeat[1].push(this.state.selectedSeats[i]["seat-name"]);
    //   } else {
    //     sellingTicketSeat[2].push(this.state.selectedSeats[i]["seat-name"]);
    //   }
    // }

    for (var i = 2; i >= 0; i--) {
      if (
        !Array.isArray(sellingTicketSeat[i]) ||
        !sellingTicketSeat[i].length
      ) {
        sellingTicketSeat.splice(i, 1);
        sellingTicketCategory.splice(i, 1);
      }
    }

    for (var i = 0; i < sellingTicketSeat.length; i++) {
      sellingTicketSeat[i] = sellingTicketSeat[i].toString();
      sellingTicketCategory[i] = sellingTicketCategory[i].toString();
    }

    // let seatname = this.state.selectedSeats.map(i => i["seat-name"]);
    // let seat_names = seatname.toString().split();

    fetch(`${this.state.main_url}api/counter/seats/complimentary`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },

      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        seat_name: sellingTicketSeat,
        category: sellingTicketCategory,
        counter_id: this.state.id,
        remark: fields.remark || "{Complimentary}",
        customer_email: fields.firstName,
        customer_name: fields.email,
        computer_name: this.state.pcname,
        customer_mobile: fields.number
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("Complimentary data", data);
        if (data.error) {
          this.setState({
            selectedSeats: [],
            loader: false,
            newMessage: data.message
          });
          this.generate("info");
        } else {
          {
            this.counterData();
          }
          this.setState({
            loader: false,
            ticketData: data.data,
            selectedSeats: [],
            toSellSeatsInfo: [[], [], []],
            toSellSeats: [[], [], []],
            toSellCategory: [
              [hallCategory.high],
              [hallCategory.low],
              ["Cabin"]
            ],
            loadingticket: false,
            newMessage: data.message
          });
          this.generate("success");
          this.onPrint();
          this.ComplimentaryTable();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loader: false,
          loading: false,
          error: true
        });
      });

    // const { seats } = this.state.seats;
    // const newSeats = seats.map(rowSeats => {
    //   return rowSeats.map(seat => {
    //     if (Object.keys(seat).length) {
    //       return {
    //         ...seat,
    //         "seat-status": seat["seat-status"] === "selected"
    //           ? "complimentary"
    //           : seat["seat-status"]
    //       };
    //     } else {
    //       return seat;
    //     }
    //   });
    // });

    // this.setState({
    //   ...this.state,
    //   seats: {
    //     ...this.state.seats,
    //     seats: newSeats
    //   },
    //   totalprice: 0,
    //   selectedSeats: []
    // });
  };

  // sold seat+==============================================================================
  // soldClicked = () => {
  //   // let bankName = fields.cardtype == "cash" ? null : fields.bank;

  //   let sellingTicketSeat = [...this.state.toSellSeats];
  //   let sellingTicketCategory = [...this.state.toSellCategory];

  //   for (var i = 0; i < this.state.selectedSeats.length; ++i) {
  //     if (this.state.selectedSeats[i]["category-name"] === "Platinum") {
  //       sellingTicketSeat[0].push(this.state.selectedSeats[i]["seat-name"]);
  //     } else if (this.state.selectedSeats[i]["category-name"] === "Gold") {
  //       sellingTicketSeat[1].push(this.state.selectedSeats[i]["seat-name"]);
  //     } else {
  //       sellingTicketSeat[2].push(this.state.selectedSeats[i]["seat-name"]);
  //     }
  //   }

  //   for (var i = 2; i >= 0; i--) {
  //     if (
  //       !Array.isArray(sellingTicketSeat[i]) ||
  //       !sellingTicketSeat[i].length
  //     ) {
  //       sellingTicketSeat.splice(i, 1);
  //       sellingTicketCategory.splice(i, 1);
  //     }
  //   }

  //   for (var i = 0; i < sellingTicketSeat.length; i++) {
  //     sellingTicketSeat[i] = sellingTicketSeat[i].toString();
  //     sellingTicketCategory[i] = sellingTicketCategory[i].toString();
  //   }

  //   let seatname = this.state.selectedSeats.map(i => i["seat-name"]);
  //   let seat_names = seatname.toString().split();

  //   console.log("seatname--------", [seat_names], [seatname]);
  //   fetch(`${this.state.main_url}api/counter/seats/sell`, {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "api-token": this.state.key
  //     },

  //     body: JSON.stringify({
  //       screen_id: this.state.selectedMovie.screens["screen_id"],
  //       movie_id: this.state.selectedMovie["movie_id"],
  //       show_date: this.state.selectedMovie["date"],
  //       show_time: this.state.selectedMovie["showTime"],
  //       // seat_name:seat_names,
  //       seat_name: sellingTicketSeat,
  //       // category:[this.state.category_name],
  //       category: sellingTicketCategory,
  //       counter_id: this.state.id,
  //       payment_mode: "fields.cardtype",
  //       bank_chose: "bankName",
  //       computer_name: this.state.pcname,
  //       customer_name: "fields.firstName",
  //       customer_email: "fields.email",
  //       customer_mobile: "fields.number"
  //     })
  //   })
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(data => {
  //       // console.log("DAta tes ========================>>>>>>>>>>>>>>>>>", data);
  //       if (data.error) {
  //         this.setState({
  //           selectedSeats: [],
  //           loader: false,
  //           newMessage: data.message
  //         });
  //         this.generate("info");
  //       } else {
  //         // {this.counterData()}
  //         this.setState({
  //           // loader: false,
  //           totalprice: 0,
  //           ticketData: data.data,
  //           selectedSeats: [],
  //           loadingticket: false,
  //           toSellSeatsInfo: [[], [], []],
  //           toSellSeats: [[], [], []],
  //           toSellCategory: [["Platinum"], ["Gold"], ["Cabin"]],
  //           newMessage: data.message
  //         });

  //         //save sold seat in state-->

  //         this.generate("success");
  //         this.onPrint();
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({
  //         loader: false,
  //         loading: false,
  //         error: true
  //       });
  //     });

  //   console.log("selected seat", this.state.toSellSeatsInfo);
  //   const remadeSeats = this.state.newSeatData.data["seat-info"];
  //   console.log("newSeatData", remadeSeats["Cabin"]);

  //   // for (var i = 0; i < cubes.length; i++) {
  //   //   for (var j = 0; j < cubes[i].length; j++) {
  //   //     console.log(cubes[i][j]);
  //   //   }
  //   // }
  //   // for (var i = 0; i < remadeSeats.length; i++) {
  //   //   console.log("print it boy");
  //   // }
  //   //   var p = {
  //   //     "p1": "value1",
  //   //     "p2": "value2",
  //   //     "p3": "value3"
  //   // };

  //   // for (var key in remadeSeats) {
  //   //   if (remadeSeats.hasOwnProperty(key)) {
  //   //     console.log(key + " -> " + remadeSeats[key]);
  //   //   }
  //   // }

  //   const { seats } = this.state.seats;

  //   const newSeats = seats.map(rowSeats => {
  //     return rowSeats.map(seat => {
  //       if (Object.keys(seat).length) {
  //         return {
  //           ...seat,
  //           "seat-status": seat["seat-status"] === "selected"
  //             ? "sold"
  //             : seat["seat-status"]
  //         };
  //       } else {
  //         return seat;
  //       }
  //     });
  //   });

  //   this.setState({
  //     ...this.state,
  //     seats: {
  //       ...this.state.seats,
  //       seats: newSeats
  //     },
  //     selectedSeats: []
  //   });
  // };

  // sold seat+==============================================================================

  formatSeats = (rows, cols, seats) => {
    let seat_details = [];
    let index = 0;
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let seat = seats[index];
        row.push(seat);
        index++;
      }
      seat_details.push(row);
    }
    return seat_details;
  };

  movieempty = () => {
    console.log("movie empty socket run");
    const socket = socketIOClient(this.state.endpoint);
    let movie = this.state.selectedMovie;
    let seats = [...this.state.seats.seats];
    const dataToSend = {
      screen_id: movie.screens["screen_id"],
      movie_id: movie["movie_id"],
      show_date: movie["date"],
      show_time: movie["showTime"],
      processed_by: "counter",
      user_id: this.state.id,
      seat: this.state.selectedSeats.map(seat => seat["seat-name"]).toString(),
      category: this.state.category_name
    };
    socket.emit("release seat", {
      room: "seats updates",
      msg: JSON.stringify(dataToSend)
    });
  };

  handleChangeDate = date => {
    console.log("date", date);
    this.setState({
      loader: true,
      welcomePage: null
    });

    this.seatreleasesocket();

    fetch(`${this.state.main_url}api/counter`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        date: date.format("YYYY-MM-DD")
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        if (data.error == false && data.data.length > 0) {
          const movies = data.data
            .map(mov => {
              const movie = mov["movie-detail"];
              const timeDetail = mov["schedule-detail"];
              const seatDetails = mov["seat-detail"];
              const screens = mov["screen-detail"];
              return {
                ...movie,
                time: `${timeDetail["show-date"]} ${timeDetail["show-time"]}`,
                showTime: `${timeDetail["show-time"]}`,
                date: `${timeDetail["show-date"]}`,
                title: movie["movie_name"] || "Unknown",
                imageSource: movie.image,
                seats: seatDetails,
                screens
              };
            })
            .filter(movie => {
              return (
                moment(movie.time).format("YYYY-MM-DD") ===
                date.format("YYYY-MM-DD")
              );
            });
          let columns_ = movies[0].screens["number-of-columns"];
          let rows_ = movies[0].screens["number-of-rows"];
          const setInfo_ = movies[0].seats;
          let seats_ = this.formatSeats(rows_, columns_, setInfo_);

          this.setState({
            seats: {
              seats: seats_,
              cols: columns_,
              rows: rows_
            },
            loader: false,
            movieEmpty: false,
            startDate: date,
            data: data.data,
            date: date,
            selectedSeats: [],
            holdSeat: [],
            bookedSeat: [],
            movies,
            toSellSeatsInfo: [[], [], []],
            bSideBarSeat: [],
            sSideBarSeat: [],
            cSideBarSeat: [],
            PlatinumMainSeats: [],
            GoldMainSeats: [],
            CabinMainSeats: [],
            selectedMovie: movies[0]

            // loading:true
          });
          this.movieempty();
        } else {
          this.setState({
            loader: false,
            newMessage: "No Movies Available on this Date"
          });
          this.generate("info");
        }
      })
      .catch(error => {
        console.log("Error Changing Date: error part ", error.message);
        this.setState({
          loading: true,
          error: true
        });
      });
  };

  refresh = () => {
    this.setState({
      loading: true,
      selectedSeats: [],
      data: {},
      bookedSeat: [],
      holdSeat: [],
      unavailableseats: [],
      loading: true,
      selectedMovie: {},
      movies: [],
      startDate: moment(),
      showTime: [],
      fields: {},
      Sellfields: {},
      tableData: {},
      seatCatagory: [],
      totalprice: 0,
      position: "top-right",
      alerts: [],
      loadingticket: true,
      timeout: 0,
      isToggleOn: true,
      dateToggle: false,
      isFull: false,
      loader: false,
      timeout: 10000,
      toggleseats: {},
      movielength: 2,
      welcomePage: null,
      error: false
    });
    {
      this.componentfirst();
    }
    {
      this.seatreleasesocket();
    }
  };

  newComponentRender = () => {
    this.setState({
      error: false,
      loading: false
    });

    fetch(`${this.state.main_url}api/counter/movie-list`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("newComonentrender", data);
      });
  };

  // component 1st render on the top of all
  componentfirst = () => {
    console.log("componentfirst");
    this.myCollection_showTime();

    this.setState({
      error: false,
      loading: false
    });

    fetch(`${this.state.main_url}api/counter`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log("data-length", data);
        if (data.error == false) {
          if (data.data.length == 0) {
            this.setState({
              movieEmpty: true,
              loading: false
            });
            return;
          }
          console.log("counter first", data.data);
          const movies = data.data
            .map(mov => {
              const movie = mov["movie-detail"];
              const timeDetail = mov["schedule-detail"];
              const seatDetails = mov["seat-detail"];
              const screens = mov["screen-detail"];
              return {
                ...movie,
                time: `${timeDetail["show-date"]} ${timeDetail["show-time"]}`,
                showTime: `${timeDetail["show-time"]}`,
                date: `${timeDetail["show-date"]}`,
                title: movie["movie_name"] || "Unknown",
                imageSource: movie.image,
                //   seats: seatDetails["Platinum"],
                screens
              };
            })
            .filter(movie => {
              return (
                moment(movie.time).format("YYYY-MM-DD") ===
                this.state.startDate.format("YYYY-MM-DD")
              );
            });
          let columns_ = movies[0].screens["number-of-columns"];
          let rows_ = movies[0].screens["number-of-rows"];
          const setInfo_ = movies[0].seats;

          let seats_ = this.formatSeats(rows_, columns_, setInfo_);

          this.bookeddata();
          {
            this.holdDataTable();
          }
          {
            this.banklist();
          }
          {
            this.ComplimentaryTable();
          }
          this.socketmount();

          this.setState({
            data: data.data,
            selectedSeats: [],
            loading: false,
            movies,
            movielength: data.data.length,
            // screen: movies[0].screens,
            selectedMovie: movies[0],
            seats: {
              seats: seats_,
              cols: columns_,
              rows: rows_
            }
          });
        } else {
          this.setState({
            newMessage: data.message
          });
          // this.generate("danger");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  platinumSeats = () => {
    const { Platinum } = this.state;
    let rows_ = Platinum["rows"];
    let columns_ = Platinum["cols"];
    let seats_ = Platinum["seats"];
    let mainSeats = this.formatSeats(rows_, columns_, seats_);
    let seatttts = [];
    if (seats_.length > 0) {
      for (let i = 0; i < rows_; i++) {
        for (let j = 0; j < columns_; j++) {
          seatttts.push(seats_[i][j]);
        }
      }

      this.setState({
        PlatinumMainSeats: seatttts
      });
    }
  };

  goldSeats = () => {
    const { Gold } = this.state;
    let rows_ = Gold["rows"];
    let columns_ = Gold["cols"];
    let seats_ = Gold["seats"];
    let mainSeats = this.formatSeats(rows_, columns_, seats_);
    let seatttts = [];
    if (seats_.length > 0) {
      for (let i = 0; i < rows_; i++) {
        for (let j = 0; j < columns_; j++) {
          seatttts.push(seats_[i][j]);
        }
      }

      this.setState({
        GoldMainSeats: seatttts
      });
    }
  };

  cabinSeats = () => {
    const { Cabin } = this.state;
    let rows_ = Cabin["rows"];
    let columns_ = Cabin["cols"];
    let seats_ = Cabin["seats"];
    let mainSeats = this.formatSeats(rows_, columns_, seats_);
    let seatttts = [];
    if (seats_.length > 0) {
      for (let i = 0; i < rows_; i++) {
        for (let j = 0; j < columns_; j++) {
          seatttts.push(seats_[i][j]);
        }
      }

      this.setState({
        CabinMainSeats: seatttts
      });
    }
  };

  testcomponent = movie => {
    const socket = socketIOClient(this.state.endpoint);
    this.setState({
      MyLoading: false
    });

    let seats = [...this.state.seats.seats];

    const dataToSend = {
      screen_id: movie.screens["screen_id"],
      movie_id: movie["movie_id"],
      show_date: movie["date"],
      show_time: movie["showTime"],
      processed_by: "counter",
      user_id: this.state.id,
      seat: this.state.selectedSeats.map(seat => seat["seat-name"]).toString(),
      category: this.state.category_name
    };
    fetch(`${this.state.main_url}api/counter/single-movie-detail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"]
        //    computer_name:this.state.pcname,
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        socket.emit("release seat", {
          room: "seats updates",
          msg: JSON.stringify(dataToSend)
        });
        let dataCatg = Object.keys(data.data["seat-info"]);
        for (var i = 0; i < dataCatg.length; ++i) {
          let columns_ =
            movie.screens["seat-categories"][dataCatg[i]]["number-of-columns"];

          let rows_ =
            movie.screens["seat-categories"][dataCatg[i]]["number-of-rows"];
          const setInfo_ = data.data["seat-info"];

          var size = Object.keys(movie.screens["seat-categories"]).length;

          let seats_ = this.formatSeats(rows_, columns_, setInfo_[dataCatg[i]]);

          this.setState({
            [dataCatg[i]]: { seats: seats_, rows: rows_, cols: columns_ },
            dataCatg: dataCatg
          });
        }

        let columns_ =
          movie.screens["seat-categories"][hallCategory.high][
            "number-of-columns"
          ];

        let rows_ =
          movie.screens["seat-categories"][hallCategory.high]["number-of-rows"];
        const setInfo_ = data.data["seat-info"];

        var size = Object.keys(movie.screens["seat-categories"]).length;

        let seats_ = this.formatSeats(
          rows_,
          columns_,
          setInfo_[hallCategory.high]
        );

        this.setState({
          seats: {
            seats: seats_,
            cols: columns_,
            rows: rows_
          },
          newSeatData: data,
          size: size,
          MyLoading: true,
          sideBarSeat: setInfo_[hallCategory.high],
          bSideBarSeat: setInfo_[hallCategory.high] || 0,
          sSideBarSeat: setInfo_[hallCategory.low] || 0,
          cSideBarSeat: setInfo_["Cabin"] || 0
        });
      })
      .catch(error => {
        this.setState({
          loading: true,
          error: true
        });
      });
    {
      this.seatreleasesocket();
    }
  };

  onMovieSelected = movie => {
    this.setState({
      selectedMovie: movie,
      MyLoading: false,
      welcomePage: 1,
      category_name: hallCategory.high,
      platinumStatus: "active",
      goldStatus: "inactive",
      cabinStatus: "inactive",
      seatCatagory: [],
      selectedSeats: [],
      toSellSeatsInfo: [[], [], []],
      toSellSeats: [[], [], []]
    });
    {
      this.testcomponent(movie);
    }
    // {this.counterData( )}
  };

  seatreleasesocket = () => {
    if (
      !this.state.toSellSeatsInfo[0] == 0 &&
      !this.state.selectedMovie == {}
    ) {
      console.log("jauieijod=======");
      const socket = socketIOClient(this.state.endpoint);
      let movie = this.state.selectedMovie;
      let seats = [...this.state.seats.seats];
      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: this.state.toSellSeatsInfo[0].toString(),
        category: hallCategory.high
      };
      socket.emit("release seat", {
        room: "seats updates",
        msg: JSON.stringify(dataToSend)
      });
    }

    if (
      !this.state.toSellSeatsInfo[2] == 0 &&
      !this.state.selectedMovie == {}
    ) {
      const socket = socketIOClient(this.state.endpoint);
      let movie = this.state.selectedMovie;
      let seats = [...this.state.seats.seats];
      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: this.state.toSellSeatsInfo[2].toString(),
        category: "Cabin"
      };
      socket.emit("release seat", {
        room: "seats updates",
        msg: JSON.stringify(dataToSend)
      });
    }

    if (
      !this.state.toSellSeatsInfo[1] == 0 &&
      !this.state.selectedMovie == {}
    ) {
      const socket = socketIOClient(this.state.endpoint);
      let movie = this.state.selectedMovie;
      let seats = [...this.state.seats.seats];
      const dataToSend = {
        screen_id: movie.screens["screen_id"],
        movie_id: movie["movie_id"],
        show_date: movie["date"],
        show_time: movie["showTime"],
        processed_by: "counter",
        user_id: this.state.id,
        seat: this.state.toSellSeatsInfo[1].toString(),
        category: hallCategory.low
      };
      socket.emit("release seat", {
        room: "seats updates",
        msg: JSON.stringify(dataToSend)
      });
    }
  };

  handlelogout = () => {
    this.setState({
      isAuthenticated: false
    });
  };
  // BOOKIGN TO SELL===============================
  bookingtosell = row => {
    this.setState({
      loader: true
    });
    fetch(`${this.state.main_url}api/counter/seats/book-to-sell`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        booking_code: row.datatobook["booking_code"],
        payment_mode: row.cardtype || "cash",
        counter_id: this.state.id,
        computer_name: this.state.pcname,
        seats: [row.row.toString()],
        category: [row.datatobook.category]
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        {
          this.bookeddata();
        }
        // {this.counterData()}
        this.setState({
          loader: false,
          ticketData: data.data,
          selectedSeats: [],
          loadingticket: false,
          newMessage: data.message
        });
        this.generate("success");
        this.onPrint();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };
  // BOOKIGN TO SELL===============================
  // hold to sell==================================

  hardRefress = () => {
    this.refresh();
    console.log("hardRefress");
    this.setState({
      isAuthenticated: false,
      alerts: [],
      loading: true,
      selectedSeats: [],
      data: {},
      bookedSeat: [],
      holdSeat: [],
      unavailableseats: [],
      loading: true,
      selectedMovie: {},
      movies: [],
      startDate: moment(),
      showTime: [],
      fields: {},
      Sellfields: {},
      tableData: {},
      seatCatagory: [],
      totalprice: 0,
      position: "top-right",
      alerts: [],
      loadingticket: true,
      timeout: 0,
      isToggleOn: true,
      dateToggle: false,
      isFull: false,
      loader: false,

      toggleseats: {},
      movielength: 2,
      welcomePage: null,
      error: false,

      loadingticket: false,
      id: "",
      roles: "",
      key: "",
      userName: ""
    });
  };

  holdtosell = row => {
    this.setState({
      loader: true
    });

    fetch(`${this.state.main_url}api/counter/seats/hold-to-sell`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        hold_id: row.datatobook["hold_id"],
        payment_mode: row.cardtype || "cash",
        computer_name: this.state.pcname,
        counter_id: this.state.id,
        seats: [row.row.toString()],
        category: [row.datatobook.category]
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          ticketData: data.data,
          selectedSeats: [],
          loadingticket: false,
          loader: false,
          newMessage: data.message
        });

        this.generate("success");
        this.onPrint();
        {
          this.counterData();
        }
        {
          this.bookeddata();
        }
        {
          this.holdDataTable();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  // hold to sell==================================

  // hold to unhold

  holdtoUnhold = row => {
    fetch(`${this.state.main_url}api/counter/seats/hold-to-cancel`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },
      body: JSON.stringify({
        hold_id: row["hold_id"],
        category: [row.datatobook.category],
        computer_name: this.state.pcname
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          newMessage: data.message
        });
        this.generate("success");
        this.holdDataTable();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: true
        });
      });
  };

  socketholdseat = data => {
    if (this.state.isAuthenticated) {
      if (
        data.screen_id == this.state.selectedMovie.screens["screen_id"] &&
        data.show_time == this.state.selectedMovie.showTime &&
        data.movie_id == this.state.selectedMovie["movie_id"] &&
        data.show_date === this.state.selectedMovie.date
      ) {
        if (data.processed_by != "counter" && data.status == "hold") {
          this.unavailableseats(data);
        }
        if (
          data.processed_by == "counter" &&
          data.status == "hold" &&
          data.processed_by_id != this.state.id
        ) {
          this.unavailableseats(data);
        }
      }
    }
  };

  socketrelease = data => {
    if (
      data.show_date === this.state.selectedMovie.date &&
      data.screen_id === this.state.selectedMovie.screens["screen_id"] &&
      data.show_time === this.state.selectedMovie.showTime &&
      data.movie_id === this.state.selectedMovie["movie_id"]
    ) {
      this.releaseseat(data);
    }
  };

  socketsold = data => {
    if (
      data.show_date === this.state.selectedMovie.date &&
      data.screen_id === this.state.selectedMovie.screens["screen_id"] &&
      data.show_time === this.state.selectedMovie.showTime &&
      data.movie_id === this.state.selectedMovie["movie_id"]
    ) {
      this.soldseatssocket(data);
    }
  };

  socketreserve = data => {
    if (
      data.show_date == this.state.selectedMovie.date &&
      data.show_time === this.state.selectedMovie.showTime &&
      data.movie_id === this.state.selectedMovie["movie_id"]
    ) {
      this.bookseatssocket(data);
    } else if (data.processed_by_id == this.state.id) {
      this.bookseatssocket(data);
    }
  };

  socketcounterhold = data => {
    if (
      data.processed_by_id == this.state.id &&
      data.show_date == this.state.selectedMovie.date &&
      data.screen_id === this.state.selectedMovie.screens["screen_id"] &&
      data.show_time === this.state.selectedMovie.showTime &&
      data.movie_id === this.state.selectedMovie["movie_id"]
    ) {
      this.counterhold(data);
    }
  };

  socketcomplimentaryseat = data => {
    if (
      data.show_date == this.state.selectedMovie.date &&
      data.screen_id === this.state.selectedMovie.screens["screen_id"] &&
      data.show_time === this.state.selectedMovie.showTime &&
      data.movie_id === this.state.selectedMovie["movie_id"] &&
      data.processed_by === "counter"
    ) {
      this.complimentaryseat(data);
    }
  };
  // // componentdidmount replaced by socketmount
  socketmount = () => {
    ipcRenderer.send("async", 1);
    ipcRenderer.on("async-reply", (event, arg) => {
      // Print 2
      this.setState({
        pcname: arg
      });

      // Send sync message to main process
    });

    // rejectUnauthorized : false do the job for me.

    // var socket = io.connect( hostname, { secure: true, reconnect: true, rejectUnauthorized : false } );
    const socket = socketIOClient(this.state.endpoint, {
      transports: ["websocket"]
    });
    socket.on("hold seat", data => {
      this.socketholdseat(data);
      // }
    });

    socket.on("release seat", data => {
      this.socketrelease(data);
    });

    socket.on("sold seat", data => {
      this.socketsold(data);
    });

    socket.on("reserve seat", data => {
      this.socketreserve(data);
    });

    socket.on("counter hold seat", data => {
      this.counterhold(data);
    });

    socket.on("complimentary seat", data => {
      this.socketcomplimentaryseat(data);
    });
  };
  componentWillMount() {
    this.setState({
      loadingticket: true
      // id:data.data.id,
      // roles:data.data.roles,
      // key:data.data.api_key,
      // userName:data.data.name
    });
    console.log("mounted ");
    // {this.componentfirst()}
    // this.newComponentRender();
  }

  componentWillUnmount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.removeListener("hold seat", data => {
      this.socketholdseat(data);
    });

    socket.removeListener("release seat", data => {
      this.socketrelease(data);
    });

    socket.removeListener("sold seat", data => {
      this.socketsold(data);
    });

    socket.removeListener("reserve seat", data => {
      this.socketreserve(data);
    });

    socket.removeListener("counter hold seat", data => {
      this.counterhold(data);
    });

    socket.removeListener("complimentary seat", data => {
      this.socketcomplimentaryseat(data);
    });
  }

  toggleMenu = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
      dateToggle: !this.state.dateToggle
    });
  };

  platinum = () => {
    const { selectedMovie, newSeatData } = this.state;

    let seats = [...this.state.seats.seats];

    let columns_ =
      selectedMovie.screens["seat-categories"][hallCategory.high][
        "number-of-columns"
      ];

    let rows_ =
      selectedMovie.screens["seat-categories"][hallCategory.high][
        "number-of-rows"
      ];
    const setInfo_ = newSeatData.data["seat-info"];

    let seats_ = this.formatSeats(rows_, columns_, setInfo_[hallCategory.high]);

    this.setState({
      seats: this.state.Platinum,
      platinumStatus: "active",
      goldStatus: "inactive",
      cabinStatus: "inactive",
      // selectedSeats:[],
      // seatCatagory:[],
      sideBarSeat: setInfo_[hallCategory.high],
      category_name: hallCategory.high
    });
  };

  MysoldClicked = fields => {
    const { selectedMovie, newSeatData, dataCatg } = this.state;

    const catgDate = dataCatg;

    for (var k = 0; k < catgDate.length; k++) {
      // let seats = [...this.state.seats.seats];

      let columns_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-columns"
        ];

      let rows_ =
        selectedMovie.screens["seat-categories"][`${catgDate[k]}`][
          "number-of-rows"
        ];

      let seats = [...this.state[`${catgDate[k]}`].seats];
      const setInfo_ = newSeatData.data["seat-info"];
      let somram = this.state[`${catgDate[k]}`];
      let seats_ = this.formatSeats(
        rows_,
        columns_,
        setInfo_[`${catgDate[k]}`]
      );

      for (var i = 0; i < rows_; ++i) {
        for (var j = 0; j < columns_; ++j) {
          if (seats[i][j]["seat-status"] === "selected") {
            seats[i][j]["seat-status"] = "sold";
          }
        }
      }

      this.setState({
        Platinum: this.state.Platinum,
        Gold: this.state.Gold,
        Cabin: this.state.Cabin,
        // selectedSeats: [],
        loadingticket: false,
        // toSellSeatsInfo: [[], [], []],
        // toSellSeats: [[], [], []],
        seatCatagory: [],
        printLoader: true,
        sideBarSeat: setInfo_[`${catgDate[k]}`]
        // category_name: [`${catgDate[k]}`]
      });
    }

    // API Work

    let sellingTicketSeat = [...this.state.toSellSeatsInfo];
    let sellingTicketCategory = [...this.state.toSellCategory];

    // for (var i = 0; i < this.state.selectedSeats.length; ++i) {
    //   if (this.state.selectedSeats[i]["category-name"] === "Platinum") {
    //     sellingTicketSeat[0].push(this.state.selectedSeats[i]["seat-name"]);
    //   } else if (this.state.selectedSeats[i]["category-name"] === "Gold") {
    //     sellingTicketSeat[1].push(this.state.selectedSeats[i]["seat-name"]);
    //   } else {
    //     sellingTicketSeat[2].push(this.state.selectedSeats[i]["seat-name"]);
    //   }
    // }

    for (var i = 2; i >= 0; i--) {
      if (
        !Array.isArray(sellingTicketSeat[i]) ||
        !sellingTicketSeat[i].length
      ) {
        sellingTicketSeat.splice(i, 1);
        sellingTicketCategory.splice(i, 1);
      }
    }

    for (var i = 0; i < sellingTicketSeat.length; i++) {
      sellingTicketSeat[i] = sellingTicketSeat[i].toString();
      sellingTicketCategory[i] = sellingTicketCategory[i].toString();
    }

    // let seatname = this.state.selectedSeats.map(i => i["seat-name"]);
    // let seat_names = seatname.toString().split();

    fetch(`${this.state.main_url}api/counter/seats/sell`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-token": this.state.key
      },

      body: JSON.stringify({
        screen_id: this.state.selectedMovie.screens["screen_id"],
        movie_id: this.state.selectedMovie["movie_id"],
        show_date: this.state.selectedMovie["date"],
        show_time: this.state.selectedMovie["showTime"],
        // seat_name:seat_names,
        seat_name: sellingTicketSeat,
        // category:[this.state.category_name],
        category: sellingTicketCategory,
        counter_id: this.state.id,
        payment_mode: fields.cardtype,
        bank_chose: "bankName",
        computer_name: this.state.pcname,
        customer_name: fields.firstName,
        customer_email: fields.email,
        customer_mobile: fields.number
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.setState({
            selectedSeats: [],
            loader: false,
            newMessage: data.message
          });
          this.generate("info");
        } else {
          // {this.counterData()}
          this.setState({
            loader: false,
            totalprice: 0,
            ticketData: data.data,

            newMessage: data.message
          });
          this.generate("success");
          this.onPrint();
          //save sold seat in state-->
          this.generateFast();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loader: false,
          loading: false,
          error: true
        });
      });
  };
  generateFast = () => {
    this.setState({
      selectedSeats: [],
      loadingticket: false,
      toSellSeatsInfo: [[], [], []],
      toSellSeats: [[], [], []],
      toSellCategory: [[hallCategory.high], [hallCategory.low], ["Cabin"]],
      printLoader: false
    });
  };

  cabin = () => {
    const { selectedMovie, newSeatData } = this.state;

    // let seats = [...this.state.seats.seats];
    // let seat_op= seats[row][col];
    let columns_ =
      selectedMovie.screens["seat-categories"]["Cabin"]["number-of-columns"];

    let rows_ =
      selectedMovie.screens["seat-categories"]["Cabin"]["number-of-rows"];
    const setInfo_ = newSeatData.data["seat-info"];

    let seats_ = this.formatSeats(rows_, columns_, setInfo_["Cabin"]);

    this.setState({
      seats: this.state.Cabin,
      platinumStatus: "inactive",
      goldStatus: "inactive",
      cabinStatus: "active",
      category_name: "Cabin",
      // selectedSeats:[],
      // seatCatagory:[],
      sideBarSeat: setInfo_["Cabin"]
    });
  };

  gold = () => {
    const { selectedMovie, newSeatData } = this.state;

    // let seats = [...this.state.seats.seats];
    let columns_ =
      selectedMovie.screens["seat-categories"][hallCategory.low][
        "number-of-columns"
      ];

    let rows_ =
      selectedMovie.screens["seat-categories"][hallCategory.low][
        "number-of-rows"
      ];
    const setInfo_ = newSeatData.data["seat-info"];

    let seats_ = this.formatSeats(rows_, columns_, setInfo_[hallCategory.low]);

    this.setState({
      seats: this.state.Gold,
      platinumStatus: "inactive",
      goldStatus: "active",
      cabinStatus: "inactive",
      // selectedSeats:[],
      category_name: hallCategory.low,
      // seatCatagory:[],
      sideBarSeat: setInfo_[hallCategory.low]
    });
  };

  myCollection = async time => {
    try {
      const data = await my_collection(
        this.state.main_url,
        this.state.key,
        time
      );

      console.log("data.datamessage", data.data.length);

      let GrossTotal = [];
      let TicketTotal = [];
      for (let i = 0; i < data.data.length; i++) {
        console.log("data to some", data.data[i]["gross_total"]);
        GrossTotal.push(data.data[i]["gross_total"]);
        TicketTotal.push(data.data[i]["no_of_tickets"]);
      }

      let TicketSum = TicketTotal.reduce((acc, val) => {
        return acc + val;
      });

      let sum = GrossTotal.reduce((acc, val) => {
        return acc + val;
      });

      this.setState({
        my_collection: data.data,
        my_Collection_Total: sum,
        my_Collection_TicketTotal: TicketSum
      });
    } catch (error) {
      console.log(error);
    }
  };

  myCollection_showTime = async () => {
    try {
      const data = await show_time(this.state.main_url, this.state.key);
      console.log("myCollection data", data);

      this.setState({
        myCollection_showTime: data.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { error } = this.state;
    // if (error) {

    //   return (
    //     <div className="errormain">
    //       <img src={errorbg} className="errorbg" />
    //       <button className=" btn-error-bg" onClick={()=>this.hardRefress()}>
    //         {" "}Home{" "}
    //       </button>
    //     </div>
    //   );
    // }

    if (!this.state.isAuthenticated || error) {
      return (
        <Login
          isAuthenticated={this.state.isAuthenticated}
          onlogin={auth => this.handleLogin(auth)}
          message={this.state.message}
          handleLogin={this.handleLogin}
        />
      );
    }

    const { loading } = this.state;

    if (loading) {
      return (
        <div className="loader">
          <div className="center-me"> <div className="lds-hourglass" /></div>
        </div>
      );
    }

    const { data, movies, seats } = this.state;

    let nestedSelectedSeats = seats.seats.map(seatRow => {
      return seatRow.filter(seat => seat["seat-status"] === "selected");
    });

    let selectedSeats = [...flatten(nestedSelectedSeats)];

    // let screen = movies[0].screens ;
    const { open } = this.state;
    const { openseat } = this.state;

    if (this.state.movieEmpty) {
      return (
        <PrintProvider>
          <NoPrint>
            <div className="App no-movie">

              <AlertList
                position={this.state.position}
                alerts={this.state.alerts}
                timeout={this.state.timeout}
                dismissTitle="Begone!"
                onDismiss={this.onAlertDismissed.bind(this)}
              />
              {this.state.loader ? <Loaderscreen /> : ""}

              <div className="container-fluid">
                <div className="row">

                  <ActionSection
                    movieEmpty={this.state.movieEmpty}
                    updateSeat={this.updateSeathere}
                    holddateSeathere={this.holddateSeathere}
                    cancellingSingleSeathold={this.cancellingSingleSeathold}
                    ComplimentaryTable={this.ComplimentaryTable}
                    cancellingSingleSeat={this.cancellingSingleSeathere}
                    banklist={this.state.banklist}
                    isToggleOn={this.state.isToggleOn}
                    toggleMenu={this.toggleMenu}
                    dateToggle={this.state.dateToggle}
                    userName={this.state.userName}
                    welcomePage={this.props.welcomePage}
                    handlelogout={this.handlelogout}
                    refresh={this.refresh}
                    roles={this.state.roles}
                    seatCatagorycancle={this.state.seatCatagorycancle}
                    complimentary={this.complimentary}
                    handleChangeDate={this.handleChangeDate}
                    bookedclicked={this.bookedClicked}
                    bookingtosell={this.bookingtosell}
                    holdtosell={this.holdtosell}
                    holdtoUnhold={this.holdtoUnhold}
                    fields={this.state.fields}
                    tableData={this.state.tableData}
                    holdClicked={this.holdClicked}
                    holdtable={this.state.holdtable}
                    complimentarytable={this.state.complimentarytable}
                    selected={this.state.startDate}
                  />

                  <Screen
                    size={this.state.size}
                    main_url={this.state.main_url}
                    welcomePage={this.state.welcomePage}
                    handleChangeDate={this.handleChangeDate}
                    selected={this.state.startDate}
                    platinumStatus={this.state.platinumStatus}
                    goldStatus={this.state.goldStatus}
                    cabinStatus={this.state.cabinStatus}
                    platinum={this.platinum}
                    gold={this.gold}
                    cabin={this.cabin}
                    MyLoading={this.state.MyLoading}
                    newrows={this.state.rows}
                    newcolumns={this.state.columns}
                    movieEmpty={this.state.movieEmpty}
                    banklist={this.state.banklist}
                    seatDetails={this.seatDetails}
                    global={this.state.global}
                    toggleFullscreen={this.state.isFull}
                    isToggleOn={this.state.isToggleOn}
                    toggleMenu={this.toggleMenu}
                    seatSelected={this.seatSelected}
                    selectedMovie={this.state.selectedMovie}
                    onRowSelect={this.onRowSelect}
                    selectSeat={this.selectSeat}
                    seats={this.state.seats.seats}
                    // rows={this.state.seats.rows}
                    // columns={this.state.seats.columns}
                    date={this.state.global_date}
                    mobile={this.state.global_mobile}
                    name={this.state.global_name}
                    email={this.state.global_email}
                    source={this.state.global_source}
                    data={this.state.data}
                  />
                </div>
              </div>

            </div>

          </NoPrint>

        </PrintProvider>
      );
    }

    return (
      <PrintProvider>

        {/* <Print exclusive> */}
        <Print>

          <Ticket
            ticketData={this.state.ticketData}
            userName={this.state.userName}
            loadingticket={this.state.loadingticket}
          />
        </Print>

        <NoPrint>
          <div className="App">

            {this.state.printLoader &&
              <div className="loader-wrap">
                <div className="lds-roller">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>}

            <AlertList
              position={this.state.position}
              alerts={this.state.alerts}
              timeout={this.state.timeout}
              dismissTitle="Begone!"
              onDismiss={this.onAlertDismissed.bind(this)}
            />
            {this.state.loader ? <Loaderscreen /> : ""}

            <div className="container-fluid">
              <div className="row">

                <ActionSection
                  my_Collection_TicketTotal={
                    this.state.my_Collection_TicketTotal
                  }
                  my_Collection_Total={this.state.my_Collection_Total}
                  myCollection={this.myCollection}
                  myCollection_showTime={this.state.myCollection_showTime}
                  my_collection={this.state.my_collection}
                  movieEmpty={this.state.movieEmpty}
                  updateSeat={this.updateSeathere}
                  holddateSeathere={this.holddateSeathere}
                  cancellingSingleSeathold={this.cancellingSingleSeathold}
                  ComplimentaryTable={this.ComplimentaryTable}
                  cancellingSingleSeat={this.cancellingSingleSeathere}
                  banklist={this.state.banklist}
                  userName={this.state.userName}
                  welcomePage={this.props.welcomePage}
                  handlelogout={this.handlelogout}
                  dateToggle={!this.state.dateToggle}
                  isToggleOn={this.state.isToggleOn}
                  toggleMenu={this.toggleMenu}
                  refresh={this.refresh}
                  roles={this.state.roles}
                  seatCatagorycancle={this.state.seatCatagorycancle}
                  complimentary={this.complimentary}
                  handleChangeDate={this.handleChangeDate}
                  bookedclicked={this.bookedClicked}
                  bookingtosell={this.bookingtosell}
                  holdtosell={this.holdtosell}
                  holdtoUnhold={this.holdtoUnhold}
                  fields={this.state.fields}
                  tableData={this.state.tableData}
                  holdClicked={this.holdClicked}
                  holdtable={this.state.holdtable}
                  complimentarytable={this.state.complimentarytable}
                  selected={this.state.startDate}
                />

                <Screen
                  size={this.state.size}
                  main_url={this.state.main_url}
                  welcomePage={this.state.welcomePage}
                  handleChangeDate={this.handleChangeDate}
                  selected={this.state.startDate}
                  platinumStatus={this.state.platinumStatus}
                  goldStatus={this.state.goldStatus}
                  cabinStatus={this.state.cabinStatus}
                  platinum={this.platinum}
                  gold={this.gold}
                  cabin={this.cabin}
                  categoryName={this.state.category_name}
                  MyLoading={this.state.MyLoading}
                  newrows={this.state.rows}
                  newcolumns={this.state.columns}
                  movieEmpty={this.state.movieEmpty}
                  banklist={this.state.banklist}
                  seatDetails={this.seatDetails}
                  global={this.state.global}
                  toggleFullscreen={this.state.isFull}
                  isToggleOn={this.state.isToggleOn}
                  toggleMenu={this.toggleMenu}
                  seatSelected={this.seatSelected}
                  selectedMovie={this.state.selectedMovie}
                  onRowSelect={this.onRowSelect}
                  selectSeat={this.selectSeat}
                  platinumSeats={this.state.Platinum.seats}
                  goldSeats={this.state.Gold.seats}
                  cabinSeats={this.state.Cabin.seats}
                  // rows={this.state.seats.rows}
                  // columns={this.state.seats.columns}
                  date={this.state.global_date}
                  mobile={this.state.global_mobile}
                  name={this.state.global_name}
                  email={this.state.global_email}
                  source={this.state.global_source}
                  data={this.state.data}
                />

                <SideBar
                  seats={this.state.sideBarSeat}
                  bSeats={this.state.bSideBarSeat}
                  sSeats={this.state.sSideBarSeat}
                  cSeats={this.state.cSideBarSeat}
                  PlatinumMainSeats={this.state.PlatinumMainSeats}
                  GoldMainSeats={this.state.GoldMainSeats}
                  CabinMainSeats={this.state.CabinMainSeats}
                  movieEmpty={this.state.movieEmpty}
                  banklist={this.state.banklist}
                  roles={this.state.roles}
                  Sellfields={this.state.Sellfields}
                  fields={this.state.fields}
                  count={this.state.count}
                  selectedSeat={this.state.selectedSeats}
                  toSellSeatsInfo={this.state.toSellSeatsInfo}
                  bookedSeat={this.state.bookedSeat}
                  holdSeat={this.state.holdSeat}
                  selectedMovie={this.state.selectedMovie}
                  soldClicked={this.MysoldClicked}
                  seatCatagory={this.state.seatCatagory}
                  totalprice={this.state.totalprice}
                />
              </div>
            </div>
            <Movies movies={movies} onClick={this.onMovieSelected} />

          </div>

          <Modal
            open={open}
            onClose={this.onCloseModal}
            center
            classNames={{ overlay: "custom-overlay", modal: "custom-modal" }}
          >
            <h1 className="booking-h">
              Booking Code :{" "}
              <span className="booking-code">  {this.state.newMessage} </span>
            </h1>
          </Modal>

          <Modal open={openseat} onClose={this.onSeatModalClose}>

            <SingleSeatDetails
              category={this.state.category_name}
              bookingtosell={fields => this.booktosell(fields)}
              roles={this.state.roles}
              holdtosell={fields => this.holdsell(fields)}
              seatclose={this.onSeatModalClose}
              onupdateseat={fields => this.updateSeat(fields)}
              onSubmit={fields => this.cancellingSingleSeat(fields)}
              seatCatagorycancle={this.state.seatCatagorycancle}
              globaldata={this.state.globaldata}
              singleseatdetails={this.state.singleseatdetails}
              banklist={this.state.banklist}
            />
          </Modal>

        </NoPrint>

      </PrintProvider>
    );
  }
}

const Loaderscreen = () => {
  return (
    <div className="loader">
      <div className="center-me"> <div className="lds-hourglass" /></div>
    </div>
  );
};
const Movies = ({ movies, onClick, movieEmpty }) => {
  if (movieEmpty) {
    return (
      <div className="container-fluid movies-section">
        <div className="col=sm=12">
          <div className="movie_list nomovies">
            <h2>No Movies Available on this Date</h2>
          </div>
        </div>
      </div>
    );
  }

  let movielength = movies.length > 5 ? 5 : movies.length;

  var settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: movielength,
    slidesToScroll: 3
  };
  const moviesView = movies.map((movie, index) => {
    return (
      <div className="movie-box" onClick={() => onClick(movie)} key={index}>
        <h1>{movie.showTime}</h1>
        <h1>{movie.screens["screen_name"]}</h1>
        <div>

          <Thumbnail src={movie.imageSource} alt="img" />
        </div>
        <h1>{movie.title}</h1>
      </div>
    );
  });

  return (
    <div className="container-fluid movies-section  ">
      <div className="col=sm=12">
        <div className="movie_list">
          <Slider {...settings}>
            {moviesView}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default App;

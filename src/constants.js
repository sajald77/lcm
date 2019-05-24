import React from 'react';
import "./App.css";



const seat_type  = {
    booked: <img src={require("./component/img/booked.png")} alt=""/>,
    available: <img src={require("./component/img/seat.png")} alt=""/>,
    selected: <img src={require("./component/img/selected.png")} alt=""/>,
    reserved: <img src={require("./component/img/selected.png")} alt=""/>,
    sold: <img src={require("./component/img/booked.png")} alt=""/>,
    empty: <img className="small-img" src={require("./component/img/none.png")}  alt=""/>
}

export {
    seat_type
}
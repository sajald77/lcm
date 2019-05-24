import React, { Component } from "react";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import classNames from "classnames";
import { hallCategory } from "./utils";

import { cdc } from "./utils";

class Ticket extends Component {
  movie_nationality = () => {
    // console.log("thisticket price",this.props)
  };

  render() {
    this.movie_nationality();
    let loadingticket = this.props.loadingticket;

    if (loadingticket === true) {
      return (
        <PrintProvider>
          <Print exclusive>
            <div>
              <a className="logo-ticket">
                <img src={cdc} alt="cdc" />
              </a>
            </div>
          </Print>
        </PrintProvider>
      );
    } else {
      let ticketData = this.props.ticketData;

      return (
        <div className="Heightnone">
          {ticketData.map(item =>
            <div className="ticket-wrapper">
              <header id="header">
                <div className="header-wrap">
                  <a className="logo-ticket">
                    <img src={cdc} alt="cdc" />
                  </a>
                  <div className="header-text pull-right">
                    <div className="abb-tax">Abbreviated Tax Invoice</div>
                    <div className="comp-name">{item["company_name"]}</div>

                    <p>{item["company_address"]}</p>
                  </div>
                </div>
              </header>
              <div className="extra-info">
                <div className="vat">
                  <span className="vat-no">VAT No.{item["company_vat"]}</span>
                  <span className="inv-no">Inv No. {item.invoice}</span>
                </div>
                <div className="inv-date">
                  Inv Date. {item["invoice_date_time"]}
                </div>
                <div className="screen-name">
                  screen 1
                </div>
              </div>

              <div className="seat clear">
                <div
                  className={classNames({
                    "type btype": item["category_name"] === hallCategory.high,
                    "type stype": item["category_name"] === hallCategory.low,
                    "type ctype": item["category_name"] === "Cabin"
                  })}
                >
                  {item["category_name"]}
                </div>
                <div className="seat-number">Seat No. {item.seat}</div>
              </div>

              <div className="price-content">
                <div className="qr-content">
                  <p className="movie-name ">{item["movie"]}</p>
                  <p>{item["show_date_time"]}</p>
                  <p className={item.net == 0 ? " visibility" : ""}>
                    Entrance Fee :{" "}
                    <span className="ticket-price">Rs.{item.ticket_price}</span>
                  </p>
                  <p className={item.luxury == 0 ? " visibility" : ""}>
                    Luxury(Inc. VAT): Rs.{item.luxury}{" "}
                  </p>
                  <p className={item["3DCharge"] == 0 ? " visibility" : ""}>
                    3D(Inc. VAT): Rs.{item["3DCharge"]}{" "}
                  </p>

                  <p>
                    Total Price :{" "}
                    <span className="ticket-price">Rs.{item.gross}/-</span>
                  </p>
                  <p>Payment Mode : {item["payment_mode"]}</p>
                </div>
                <div className="qr-thumb">
                  <span className="qrcoder">
                    <QRCode value={item.code} />,
                  </span>
                </div>
              </div>

              {/*                    
                       <table className="table">
                           <thead>
                               <tr>
                                   <th className={item.ticket_price== 0 ?" visibility" :"" }>
                                   
                                   {(item.movie_nationality == "nepali") ? "Price(Inc. VAT)" : "Price(Inc. VAT & FDF)"}</th>
                                  
                                   
                                   <th className={item.luxury== 0 ?" visibility" :"" }>Luxury (Inc. VAT)</th>
                                
                                   
                                   <th className={item["3DCharge"]== 0 ?" visibility" :"" }  >3D (Inc. VAT)</th> 

                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td className={item.net== 0 ?" visibility" :"" }>Rs.{item.ticket_price}</td>
                                   <td className={item.luxury== 0 ?" visibility" :"" }>Rs.{item.luxury} </td>
                                   <td className={item["3DCharge"]== 0 ?" visibility" :"" }>Rs.{item["3DCharge"]} </td>
                                 
                               </tr>
                           </tbody>
                       </table> */}

              <div className="barcode-content clear">
                <div className="row">
                  <span className="barcode">
                    <Barcode width="4" value={item.code} />,
                  </span>

                </div>
              </div>

              {/* <div className="site-footer">
                       Keep the ticket until the end of the show ! Please follow the internal rules of Theatre . Please check the Date and Time of the show.
                   </div> */}
              <div className="footer-btm">

                {/* <div>Enjoy your movie experience at Gopi Kishan Movies. </div> */}
              </div>
            </div>
          )}

        </div>
      );
    }
  }
}

export default Ticket;

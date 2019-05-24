import React, { Component } from "react";
import "./login.css";
import Button from "react-bootstrap-button-loader";
import { withRouter } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();

    this.props.onlogin(this.state);
    this.setState(
      {
        // email:"",
        // password:"",
      }
    );
  };
  render() {
    return (
      <div className="background">
        <div className="login-screen">
          <div className="login-wrapper">
            <form className="checkin-form">
              <div className="login-container">
                <div className="login-box">
                  <a href="index.html" className="login-logo">
                    <img src={require("./LCMlogo.png")} alt="cdc nepal" />

                  </a>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email/Username"
                      name="email"
                      value={this.state.email}
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          this.handleClick(e);
                        }
                      }}
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <div className="form-group text-right">
                    <Button
                      onClick={e => this.handleClick(e)}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          this.handleClick(e);
                        }
                      }}
                      type="button"
                      className="btn"
                    >
                      Log In
                    </Button>

                  </div>
                  <div className="error1 ">
                    <h4>{this.props.message}</h4>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default login;

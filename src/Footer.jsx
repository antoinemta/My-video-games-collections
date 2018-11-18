import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="row">
        <div className="col-12 d-flex justify-content-center py-4">
          <span className="text-white">
            Made by{" "}
            <a href="http://www.mramaluta.fr" className="text-secondary">
              <u>Antoine MALUTA</u>
            </a>
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;

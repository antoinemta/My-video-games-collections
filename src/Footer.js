import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="row">
        <div className="col-12 d-flex justify-content-center py-4">
          <span>cold and blanck</span>
        </div>
      </footer>
    );
  }
}

export default Footer;

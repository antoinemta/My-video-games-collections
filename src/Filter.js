import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";

class Filter extends Component {
  render() {
    return (
      <section className="row mx-0">
        <div className="col-12 d-flex sectionFilter text-white">
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
          <div className="col-xl-1  filterSelected">a</div>
        </div>
      </section>
    );
  }
}

export default Filter;

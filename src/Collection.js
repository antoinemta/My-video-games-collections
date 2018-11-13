import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import Filter from "./Filter";
import YouTube from "react-youtube";

class Collection extends Component {
  render() {
    return (
      <section className="col-12 homePage px-0">
        <div className="row mx-0">
          <div className="col-12">
            <div className="col-xl-4 optionCollection">
              {" "}
              <div class="form-group">
                <label for="sel1" className="text-white">
                  <h1>Select list :</h1>
                </label>
                <select class="form-control" id="sel1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>{" "}
              {/*<div className="col-12 divBtnDelete">
                <button className="px-4 mt-2 deletingButton">
                  Delete this collection
                </button>
              </div>*/}
            </div>
          </div>
        </div>
        <div className="row mx-0 pt-2">
          <div className="col-12 py-4 my-5 text-white titleCollection">a</div>
        </div>
        <div className="row mx-0 pb-5">
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame">
            <div className="relativeCard">
              <img
                src="https://s1.gaming-cdn.com/images/products/147/271x377/147.jpg"
                className="imgCard"
              />
              <span className="titleGame">ferfrefe</span>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame">
            <div className="relativeCard">
              <img
                src="https://s1.gaming-cdn.com/images/products/147/271x377/147.jpg"
                className="imgCard"
              />
              <span className="titleGame">ferfrefe</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Collection;

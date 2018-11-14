import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import Filter from "./Filter";
import YouTube from "react-youtube";

class Collection extends Component {
  constructor() {
    super();
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 pb-5",
      cards: []
    };
  }

  displayCard() {
    this.setState({
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 pb-5"
    });
  }

  displayLine() {
    this.setState({
      classCardGame: "notDisplay",
      classLineGame: "col-md-11 border-bottom listCardGame d-flex",
      classRow: "row mx-0 pt-5 mt-4 paddingBottom d-flex justify-content-center"
    });
  }

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
          <div className="col-12 py-4 mt-5 text-white titleCollection">a</div>
        </div>
        <section className="row mb-5 mx-0">
          <div className="col-12 layoutOrganisation">
            <div className="col-sm-6 col-xl-10 py-4 border-right">
              <span className="sectionTitle text-white d-flex justify-content-center">
                Games which may interest you
              </span>
            </div>
            <div className="col d-flex justify-content-center pt-4">
              <img
                src="card.png"
                className="btnList mr-4"
                onClick={() => this.displayCard()}
              />
              <img
                src="line.png"
                className="btnList"
                onClick={() => this.displayLine()}
              />
            </div>
          </div>
        </section>
        <div className={this.state.classRow}>
          <div className={this.state.classCardGame}>
            <div className="relativeCard">
              <img
                src="https://s1.gaming-cdn.com/images/products/147/271x377/147.jpg"
                className="imgCardCol"
              />
              <button className="btnDelete px-3 py-2">Delete</button>
              <span className="titleGame">ferfrefe</span>
            </div>
          </div>
          <div className={this.state.classLineGame}>
            <div className="col-2 d-none d-sm-none d-md-none d-lg-none d-xl-block hidden">
              <img
                src="https://s1.gaming-cdn.com/images/products/147/271x377/147.jpg"
                className="my-3 ml-5 imgLine"
              />
            </div>
            <div className="col-8 hidden">
              <div className="pt-3">
                <span className="titleLine">grgege</span>
                <span className="dateLine ml-3">grerehge</span>
              </div>
              <div>
                <img src="fr" className="star" />
              </div>
            </div>
            <div className="col ratingLine d-none d-sm-block hidden">
              <span className="text-white">
                <h3 className="mt-5 mr-4">"/100"</h3>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Collection;

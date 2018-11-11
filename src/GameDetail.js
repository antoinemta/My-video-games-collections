import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import Filter from "./Filter";

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4",
      cards: []
    };
  }

  render() {
    return (
      <div className="col-12 homePage px-0">
        <section className="row mx-0">
          <div className="col-xl-6 pt-5 d-flex justify-content-center">
            <div className="col-8 pt-5">
              <div className="titleDetail mt-5">
                {this.props.location.state.name}
              </div>
              <div className="subtitleDetail mt-3">Release Date :</div>
              <div className="contentDetail ml-4">
                {this.props.location.state.date}
              </div>
              <div className="subtitleDetail mt-3">Genres :</div>
              <div className="contentDetail ml-4">
                {this.props.location.state.genres[0]}
              </div>
              <div className="subtitleDetail mt-3">Summary :</div>
              <div className="contentDetail ml-4">
                {this.props.location.state.summary}
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center pt-5">
            <img
              src={this.props.location.state.url}
              className="mt-5 posterDetail"
            />
          </div>
        </section>
      </div>
    );
  }
}
export default GameDetail;

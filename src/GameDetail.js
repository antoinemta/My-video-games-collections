import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import Filter from "./Filter";
import YouTube from "react-youtube";

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
      <section className="col-12 homePage px-0">
        <div className="row mx-0">
          <div className="col-sm-6 pt-5 d-flex justify-content-center">
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
              <div className="col-12 pt-5 addingDivButton">
                <button className="addingButton">Add</button>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center pt-5">
            <img
              src={this.props.location.state.url}
              className="mt-5 posterDetail"
            />
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-12 pl-5 pt-5">
            <div className="mt-5 screenTitle">Screenshots :</div>
          </div>
          <div className="row mx-0 mt-3 galleryScreens">
            {this.props.location.state.screens &&
              this.props.location.state.screens.map(url => (
                <div className="divScreen">
                  <a href={url}>
                    <img src={url} className="screen" />
                  </a>
                </div>
              ))}
            {!this.props.location.state.screens && (
              <span className="text-white notScreens">
                <h5>Screenshots not available yet.</h5>
              </span>
            )}
          </div>
        </div>
        <div className="row pb-5 mx-0">
          <div className="col-12 pt-5 d-flex justify-content-center">
            <span className="text-white mt-5">
              <h4>
                <u>Trailer :</u>
              </h4>
            </span>
          </div>
          <div className="col-12 pt-2 pb-5 mb-5 d-flex justify-content-center">
            <div className="col-xl-6 mb-5 embed-responsive embed-responsive-16by9">
              <YouTube
                videoId={this.props.location.state.videoId}
                className="embed-responsive-item"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default GameDetail;

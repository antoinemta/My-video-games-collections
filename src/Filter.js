import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      genres: ["action", "adventure", "fps", "rpg", "fighting", "sport"],
      classGenres: [
        "filterSelected",
        "filterSelected",
        "filterSelected",
        "filterSelected",
        "filterSelected",
        "filterSelected"
      ]
    };
  }

  filter(event, n) {
    let classGenre = this.state.classGenres;
    if (
      this.state.classGenres[this.state.genres.indexOf(event.target.id)] ==
      "filterSelected"
    ) {
      classGenre[this.state.genres.indexOf(event.target.id)] =
        "filterNotSelected";
    } else {
      classGenre[this.state.genres.indexOf(event.target.id)] = "filterSelected";
    }

    this.setState({
      classGenres: classGenre
    });

    this.props.filtre(n);
  }

  render() {
    return (
      <section className="row mx-0">
        <div className="col-12 d-flex sectionFilter text-white">
          <div
            className={"col-xl-1 " + this.state.classGenres[0]}
            onClick={(event, n) => this.filter(event, 31)}
            id="action"
          >
            Action
          </div>
          <div
            className={"col-xl-1 " + this.state.classGenres[1]}
            onClick={(event, n) => this.filter(event, 31)}
            id="adventure"
          >
            Adventure
          </div>
          <div
            className={"col-xl-1 " + this.state.classGenres[2]}
            onClick={(event, n) => this.filter(event, 5)}
            id="fps"
          >
            FPS
          </div>
          <div
            className={"col-xl-1 " + this.state.classGenres[3]}
            onClick={(event, n) => this.filter(event, 12)}
            id="rpg"
          >
            RPG
          </div>
          <div
            className={"col-xl-1 " + this.state.classGenres[4]}
            onClick={(event, n) => this.filter(event, 4)}
            id="fighting"
          >
            Fighting
          </div>
          <div
            className={"col-xl-1 " + this.state.classGenres[5]}
            onClick={(event, n) => this.filter(event, 14)}
            id="sport"
          >
            Sport
          </div>
        </div>
      </section>
    );
  }
}

export default Filter;

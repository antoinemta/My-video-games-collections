import React, { Component } from "react";
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Filter from "./Filter";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4",
      cards: []
    };
  }

  componentDidMount() {
    try {
      if (this.props.location.state.input !== "") {
        fetch("http://localhost:8080/search/" + this.props.location.state.input)
          .then(results => results.json()) // conversion du résultat en JSON
          .then(data => {
            this.setState({
              cards: data
            });
          });
      }
    } catch {}
  }

  componentDidUpdate() {
    if (this.props.location.state.input !== "") {
      fetch("http://localhost:8080/search/" + this.props.location.state.input)
        .then(results => results.json()) // conversion du résultat en JSON
        .then(data => {
          this.setState({
            cards: data
          });
        });
    }
  }

  displayCard() {
    this.setState({
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4"
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
    try {
      let isset = this.props.location.state.input;
    } catch {
      return <Redirect to="/" from="/search" />;
    }

    return (
      <div className="col-12 homePage px-0 border-top">
        <Filter />
        <section className="row mx-0">
          <div className="col-12 layoutOrganisation">
            <div className="col-sm-6 col-xl-10 py-4 border-right">
              <span className="sectionTitle text-white d-flex justify-content-center">
                {this.props.location.state.input !== "" && (
                  <div>
                    {this.state.cards.length}
                    &nbsp;result(s) found for :&nbsp;{" "}
                    {this.props.location.state.input}
                  </div>
                )}
                {this.props.location.state.input === "" && (
                  <div>You must enter a valid title.</div>
                )}
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
        <section className={this.state.classRow}>
          {this.state.cards.map(cards => (
            <NavLink
              to={{
                pathname: "/game",
                state: {
                  name: cards.name,
                  url: cards.cover,
                  date: cards.date,
                  genres: cards.genres,
                  summary: cards.summary,
                  screens: cards.screenshots,
                  videoId: cards.video
                }
              }}
              className={this.state.classCardGame}
            >
              <div className="relativeCard">
                <img src={cards.cover} className="imgCard" />
                <span className="titleGame">{cards.name}</span>
              </div>
            </NavLink>
          ))}
          {this.state.cards.map(cards => (
            <NavLink
              to={{
                pathname: "/game",
                state: {
                  name: cards.name,
                  url: cards.cover,
                  date: cards.date,
                  genres: cards.genres,
                  summary: cards.summary,
                  screens: cards.screenshots,
                  videoId: cards.video,
                  stars: cards.stars
                }
              }}
              className={this.state.classLineGame}
            >
              <div className="col-2 d-none d-sm-none d-md-none d-lg-none d-xl-block hidden">
                <img src={cards.cover} className="my-3 ml-5 imgLine" />
              </div>
              <div className="col-8 hidden">
                <div className="pt-3">
                  <span className="titleLine">{cards.name}</span>
                  <span className="dateLine ml-3">({cards.date})</span>
                </div>
                <div>
                  {cards.stars.map(url => (
                    <img src={url} className="star" />
                  ))}
                </div>
              </div>
              <div className="col ratingLine d-none d-sm-block hidden">
                <span className="text-white">
                  {cards.rating !== "" && (
                    <h3 className="mt-5 mr-4">{cards.rating + "/100"}</h3>
                  )}
                </span>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
    );
  }
}
export default Search;

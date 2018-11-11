import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Filter from "./Filter";
import io from "socket.io-client";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4",
      cards: []
    };
  }

  socketTransition(socket) {
    for (let i = 0; i < socket.length; i++) {
      console.log(socket[i].cover.url);
    }

    this.setState({
      cards: socket
    });
  }

  componentDidMount() {
    fetch("http://localhost:8080/home")
      .then(results => results.json()) // conversion du résultat en JSON
      .then(data => {
        this.setState({
          cards: data
        });
      });
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
    return (
      <div className="col-12 homePage px-0">
        <section className="row mx-0">
          <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
            <div>
              <img src="index.jpeg" className="imgCarousel" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="index.jpeg" className="imgCarousel" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="index.jpeg" className="imgCarousel" />
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        </section>
        <Filter />
        <section className="row mx-0">
          <div className="col-12 layoutOrganisation">
            <div className="col-sm-6 col-xl-10 py-4 border-right">
              <span className="sectionTitle text-white">
                <u>Games which may interest you</u>
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
                  summary: cards.summary
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
                  summary: cards.summary
                }
              }}
              className={this.state.classLineGame}
            >
              <div className="col-2 d-none d-sm-none d-md-none d-lg-none d-xl-block hidden">
                <img src={cards.cover} className="my-3 ml-5 imgLine" />
              </div>
              <div className="col-8 hidden">
                <div>
                  <span className="titleLine">{cards.name}</span>
                  <span className="dateLine ml-3">({cards.date})</span>
                </div>
                <div>test</div>
              </div>
              <div className="col ratingLine d-none d-sm-block hidden">
                <span>{cards.rating}</span>
              </div>
            </NavLink>
          ))}
        </section>
      </div>
    );
  }
}
export default Homepage;

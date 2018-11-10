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
      classRelativeCard: "relativeCard",
      classImgCard: "imgCard",
      classTitleGame: "titleGame",
      listTitleGame: "notDisplay",
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
    const socket = io.connect("http://localhost:8080");
    socket.on("gamesHomePage", socket => this.socketTransition(socket));
  }

  displayCard() {
    this.setState({
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classRelativeCard: "relativeCard",
      classImgCard: "imgCard",
      classTitleGame: "titleGame",
      listTitleGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4"
    });
  }

  displayLine() {
    this.setState({
      classCardGame: "col-12 py-1 border-bottom listCardGame",
      classRelativeCard: "notDisplay",
      classImgCard: "notDisplay",
      classTitleGame: "notDisplay",
      listTitleGame: "ml-5 text-white titleWrap",
      classRow: "row px-5 mx-0 pt-5 mt-4 paddingBottom"
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
            <div className={this.state.classCardGame}>
              <div className={this.state.classRelativeCard}>
                <img src={cards.cover} className={this.state.classImgCard} />
                <span className={this.state.classTitleGame}>{cards.name}</span>
              </div>
              <span className={this.state.listTitleGame}>title</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}
export default Homepage;

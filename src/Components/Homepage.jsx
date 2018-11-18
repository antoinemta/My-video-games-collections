import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Filter from "./Filter";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 py-5 mt-4",
      games: [],
      cards: [],
      filtres: [],
      ratingNote: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/home")
      .then(results => results.json()) // conversion du résultat en JSON
      .then(data => {
        this.setState({
          cards: data,
          games: data
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

  filterUpdate(event) {
    let filtres = this.state.filtres;
    if (filtres.includes(event)) {
      filtres = filtres.filter(filtre => filtre !== event);
    } else {
      filtres.push(event);
    }
    let cardLoop = [];
    let cards = this.state.games;
    if (filtres.length > 0) {
      this.state.games.map(game => {
        if (game.genres) {
          let number = 0;
          for (let i = 0; i < game.genres.length; i++) {
            if (filtres.includes(game.genres[i])) {
              number++;
            }
          }
          if (number === filtres.length) {
            cardLoop.push(game);
          }
        }
        return null;
      });
      cards = cardLoop;
    }

    this.setState({
      filtres: filtres,
      cards: cards
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-flex justify-content-center subContainer">
          <div className="col-md-10 px-0">
            <div className="col-12 homePage px-0">
              <section className="row mx-0">
                <Carousel
                  showThumbs={false}
                  autoPlay={true}
                  infiniteLoop={true}
                >
                  <div>
                    <img
                      src="index.jpeg"
                      className="imgCarousel"
                      alt="slide1"
                    />
                  </div>
                  <div>
                    <img
                      src="supermario.jpg"
                      className="imgCarousel"
                      alt="slide2"
                    />
                  </div>
                  <div>
                    <img
                      src="residentevil.jpeg"
                      className="imgCarousel"
                      alt="slide3"
                    />
                  </div>
                  <div>
                    <img
                      src="finalfantasy.jpg"
                      className="imgCarousel"
                      alt="slide4"
                    />
                  </div>
                  <div>
                    <img src="gta5.jpg" className="imgCarousel" alt="slide5" />
                  </div>
                  <div>
                    <img src="halo.jpeg" className="imgCarousel" alt="slide6" />
                  </div>
                </Carousel>
              </section>
              <Filter filtre={event => this.filterUpdate(event)} />
              <section className="row mx-0">
                <div className="col-12  layoutOrganisation">
                  <div className="col-sm-6 col-xl-10 py-4 border-right layoutTitle">
                    <span className="sectionTitle text-white d-flex justify-content-center">
                      Games which may interest you
                    </span>
                  </div>
                  <div className="col d-flex justify-content-center pt-4">
                    <img
                      src="card.png"
                      className="btnList mr-4"
                      onClick={() => this.displayCard()}
                      alt="layout card"
                    />
                    <img
                      src="line.png"
                      className="btnList"
                      onClick={() => this.displayLine()}
                      alt="layout line"
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
                        videoId: cards.video,
                        id: cards.id,
                        rating: cards.rating,
                        stars: cards.stars
                      }
                    }}
                    className={this.state.classCardGame}
                    key={Math.random()}
                  >
                    <div className="relativeCard" key={Math.random()}>
                      <img
                        src={cards.cover}
                        className="imgCard"
                        alt="poster's card"
                        key={Math.random()}
                      />
                      <span className="titleGame" key={Math.random()}>
                        {cards.name}
                      </span>
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
                        id: cards.id,
                        rating: cards.rating,
                        stars: cards.stars
                      }
                    }}
                    className={this.state.classLineGame}
                    key={Math.random()}
                  >
                    <div
                      className="col-2 d-none d-sm-none d-md-none d-lg-none d-xl-block hidden"
                      key={Math.random()}
                    >
                      <img
                        src={cards.cover}
                        className="my-3 ml-5 imgLine"
                        alt="icon's card"
                        key={Math.random()}
                      />
                    </div>
                    <div className="col-8 hidden" key={Math.random()}>
                      <div className="pt-3" key={Math.random()}>
                        <span className="titleLine" key={Math.random()}>
                          {cards.name}
                        </span>
                        <span className="dateLine ml-3" key={Math.random()}>
                          ({cards.date})
                        </span>
                      </div>
                      <div key={Math.random()}>
                        {cards.stars.map(url => (
                          <img
                            src={url}
                            className="star"
                            alt="star"
                            key={Math.random()}
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      className="col ratingLine d-none d-sm-block hidden"
                      key={Math.random()}
                    >
                      <span className="text-white" key={Math.random()}>
                        {cards.rating !== "" && (
                          <h3 className="mt-5 mr-4" key={Math.random()}>
                            {cards.rating + "/100"}
                          </h3>
                        )}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Homepage;

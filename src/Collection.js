import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Filter from "./Filter";
import YouTube from "react-youtube";

class Collection extends Component {
  constructor() {
    super();
    this.state = {
      classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
      classLineGame: "notDisplay",
      classRow: "row mx-0 pb-5",
      collectionChoosen: "My favorite games",
      collection: ["My favorite games"],
      games: [],
      cards: [],
      modal: false
    };
    this.appearModal = this.appearModal.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("collections"))) {
      //Initiazlization of the localStorage for the first utilisation

      this.setState({
        collection: JSON.parse(localStorage.getItem("collections")),
        games: JSON.parse(localStorage.getItem("games")),
        cards: JSON.parse(localStorage.getItem("games")).filter(
          game => game.collection == this.state.collectionChoosen
        )
      });
    } else {
      localStorage.setItem(
        "collections",
        JSON.stringify(["My favorite games"])
      );
      localStorage.setItem("games", JSON.stringify([]));
    }
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

  changeCollection(event) {
    this.setState({
      collectionChoosen: event.target.value,
      cards: this.state.games.filter(
        game => game.collection == event.target.value
      )
    });
  }

  deleteCollection() {
    if (this.state.collectionChoosen !== "My favorite games") {
      const games = this.state.games.filter(
        game => game.collection !== this.state.collectionChoosen
      );
      const collections = this.state.collection.filter(
        collection => collection !== this.state.collectionChoosen
      );

      localStorage.setItem("games", JSON.stringify(games));
      localStorage.setItem("collections", JSON.stringify(collections));

      this.setState({
        games: games,
        collection: collections,
        modal: !this.state.modal,
        cards: games.filter(game => game.collection == "My favorite games"),
        collectionChoosen: "My favorite games"
      });
    }
  }

  gameDelete(id) {
    let games = [];
    this.state.games.map(game => {
      if (game.id !== id || game.collection !== this.state.collectionChoosen) {
        games.push({
          id: game.id,
          name: game.name,
          url: game.url,
          date: game.date,
          summary: game.summary,
          rating: game.rating,
          screens: game.screens,
          stars: game.stars,
          videoId: game.videoId,
          genres: game.genres,
          collection: game.collection
        });
      }
    });

    localStorage.setItem("games", JSON.stringify(games));
    this.setState({
      games: games,
      cards: games.filter(
        game => game.collection == this.state.collectionChoosen
      )
    });
  }

  appearModal() {
    this.setState({
      modal: !this.state.modal
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
                <select
                  class="form-control"
                  onChange={event => this.changeCollection(event)}
                  id="sel1"
                >
                  {this.state.collection.map(collection => (
                    <option>{collection}</option>
                  ))}
                </select>
              </div>{" "}
              {this.state.collectionChoosen !== "My favorite games" && (
                <div className="col-12 divBtnDelete">
                  <button
                    className="px-4 mt-2 deletingButton"
                    onClick={() => this.appearModal()}
                  >
                    Delete this collection
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row mx-0 pt-2">
          <div className="col-12 py-4 mt-5 text-white titleCollection">
            {this.state.collectionChoosen}
          </div>
        </div>
        <section className="row mb-5 mx-0">
          <div className="col-12 layoutOrganisation">
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
          {this.state.cards.map(game => (
            <div className={this.state.classCardGame}>
              <div className="relativeCard">
                <NavLink
                  to={{
                    pathname: "/game",
                    state: {
                      name: game.name,
                      url: game.url,
                      date: game.date,
                      genres: game.genres,
                      summary: game.summary,
                      screens: game.screens,
                      videoId: game.videoId,
                      stars: game.stars,
                      rating: game.rating,
                      id: game.id
                    }
                  }}
                  className="imgCardCol"
                >
                  <img src={game.url} className="imgCardPoster" />
                </NavLink>
                <button
                  className="btnDelete px-3 py-2"
                  onClick={event => this.gameDelete(game.id)}
                >
                  Delete
                </button>
                <span className="titleGame">{game.name}</span>
              </div>
            </div>
          ))}
          {this.state.cards.map(game => (
            <div className={this.state.classLineGame}>
              <NavLink
                to={{
                  pathname: "/game",
                  state: {
                    name: game.name,
                    url: game.url,
                    date: game.date,
                    genres: game.genres,
                    summary: game.summary,
                    screens: game.screens,
                    videoId: game.videoId,
                    stars: game.stars,
                    rating: game.rating,
                    id: game.id
                  }
                }}
                className="col-2 d-none d-sm-none d-md-none d-lg-none d-xl-block hidden"
              >
                <img src={game.url} className="my-3 ml-5 imgLine" />
              </NavLink>
              <div className="col-8 lineHidden">
                <NavLink
                  to={{
                    pathname: "/game",
                    state: {
                      name: game.name,
                      url: game.url,
                      date: game.date,
                      genres: game.genres,
                      summary: game.summary,
                      screens: game.screens,
                      videoId: game.videoId,
                      stars: game.stars,
                      rating: game.rating,
                      id: game.id
                    }
                  }}
                >
                  <div className="pt-3">
                    <span className="titleLine">{game.name}</span>
                    <span className="dateLine ml-3">{game.date}</span>
                  </div>
                  <div>
                    {game.stars.map(url => (
                      <img src={url} className="star" />
                    ))}
                  </div>
                </NavLink>
                <div className="pt-3 pl-5">
                  <button
                    className="btnDelete2 px-3 py-2"
                    onClick={event => this.gameDelete(game.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <NavLink
                to={{
                  pathname: "/game",
                  state: {
                    name: game.name,
                    url: game.url,
                    date: game.date,
                    genres: game.genres,
                    summary: game.summary,
                    screens: game.screens,
                    videoId: game.videoId,
                    stars: game.stars,
                    rating: game.rating,
                    id: game.id
                  }
                }}
                className="col ratingLine d-none d-sm-block hidden"
              >
                <span className="text-white">
                  {game.rating !== "" && (
                    <h3 className="mt-5 mr-4">{game.rating + "/100"}</h3>
                  )}
                </span>
              </NavLink>
            </div>
          ))}
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.appearModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.appearModal}>Delete Collection</ModalHeader>
          <ModalBody>
            Are you sure to want to delete this collection ?
          </ModalBody>
          <ModalFooter>
            <Button className="button1ModalDelete" onClick={this.appearModal}>
              Cancel
            </Button>
            <Button
              className="button2ModalDelete"
              onClick={() => this.deleteCollection()}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    );
  }
}
export default Collection;

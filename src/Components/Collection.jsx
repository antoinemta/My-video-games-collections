import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
        cards: JSON.parse(localStorage.getItem("games"))
          .filter(game => game.collection === this.state.collectionChoosen)
          .reverse()
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
      cards: this.state.games
        .filter(game => game.collection === event.target.value)
        .reverse()
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
        cards: games
          .filter(game => game.collection === "My favorite games")
          .reverse(),
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
      return null;
    });

    localStorage.setItem("games", JSON.stringify(games));
    this.setState({
      games: games,
      cards: games
        .filter(game => game.collection === this.state.collectionChoosen)
        .reverse()
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
              <div className="form-group">
                <label htmlFor="sel1" className="text-white">
                  <h1>Select a collection :</h1>
                </label>
                <select
                  className="form-control"
                  onChange={event => this.changeCollection(event)}
                  id="sel1"
                >
                  {this.state.collection.map(collection => (
                    <option key={collection}>{collection}</option>
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
                {String(this.state.cards.length) +
                  ' game(s) in "' +
                  this.state.collectionChoosen +
                  '"'}
              </span>
            </div>
            <div className="col d-flex justify-content-center pt-4">
              <img
                src="card.png"
                className="btnList mr-4"
                onClick={() => this.displayCard()}
                alt="icon card"
              />
              <img
                src="line.png"
                className="btnList"
                onClick={() => this.displayLine()}
                alt="line card"
              />
            </div>
          </div>
        </section>
        <div className={this.state.classRow}>
          {this.state.cards.map(game => (
            <div className={this.state.classCardGame} key={Math.random()}>
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
                  key={Math.random()}
                >
                  <img
                    src={game.url}
                    className="imgCardPoster"
                    alt="poster's game"
                    key={Math.random()}
                  />
                </NavLink>
                <button
                  className="btnDelete px-3 py-2"
                  onClick={event => this.gameDelete(game.id)}
                  key={Math.random()}
                >
                  Delete
                </button>
                <span className="titleGame" key={Math.random()}>
                  {game.name}
                </span>
              </div>
            </div>
          ))}
          {this.state.cards.map(game => (
            <div className={this.state.classLineGame} key={Math.random()}>
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
                key={Math.random()}
              >
                <img
                  src={game.url}
                  className="my-3 ml-5 imgLine"
                  alt="poster's game"
                  key={Math.random()}
                />
              </NavLink>
              <div className="col-8 lineHidden" key={Math.random()}>
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
                  key={Math.random()}
                >
                  <div className="pt-3" key={Math.random()}>
                    <span className="titleLine" key={Math.random()}>
                      {game.name}
                    </span>
                    <span className="dateLine ml-3" key={Math.random()}>
                      {game.date}
                    </span>
                  </div>
                  <div key={Math.random()}>
                    {game.stars.map(url => (
                      <img
                        src={url}
                        className="star"
                        alt="star"
                        key={Math.random()}
                      />
                    ))}
                  </div>
                </NavLink>
                <div className="pt-3 pl-5" key={Math.random()}>
                  <button
                    className="btnDelete2 px-3 py-2"
                    onClick={event => this.gameDelete(game.id)}
                    key={Math.random()}
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
                key={Math.random()}
              >
                <span className="text-white" key={Math.random()}>
                  {game.rating !== "" && (
                    <h3 className="mt-5 mr-4" key={Math.random()}>
                      {game.rating + "/100"}
                    </h3>
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
            <div className="divRandom">
              <img src="luigi.png" className="imgRandom my-3" alt="luigi" />
              <br />
              Are you sure to want to delete this collection ?
            </div>
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

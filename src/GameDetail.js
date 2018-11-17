import React, { Component } from "react";
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter,
  Switch
} from "react-router-dom";
import Filter from "./Filter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import YouTube from "react-youtube";

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classButtonAddMovie: "",
      classButtonAddCollection: "",
      collection: ["My favorite games"],
      collectionChoosen: "My favorite games",
      inputCollection: "",
      selectedOption: true,
      comment: "",

      modal: false
    };
    this.appearModal = this.appearModal.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("collections"))) {
      //Initiazlization of the localStorage for the first utilisation

      this.setState({
        collection: JSON.parse(localStorage.getItem("collections"))
      });
    } else {
      localStorage.setItem(
        "collections",
        JSON.stringify(["My favorite games"])
      );
      localStorage.setItem("games", JSON.stringify([]));
    }
  }

  createCollection(event) {
    //to save the input text value in the state
    this.setState({
      inputCollection: event.target.value
    });
  }

  addLocalStorage() {
    let games = JSON.parse(localStorage.getItem("games")); //Add Movies to the localStorage
    let comment;
    let className;

    if (
      games.filter(
        // this is a condition to selected the movies not repertoried yet in the localstorage about the collection selected
        id =>
          id.collection === this.state.collectionChoosen &&
          id.id === this.props.location.state.id
      ).length === 0
    ) {
      games.push({
        //we add a movies in the collection of the localstorage
        id: this.props.location.state.id,
        name: this.props.location.state.name,
        url: this.props.location.state.url,
        date: this.props.location.state.date,
        summary: this.props.location.state.summary,
        rating: this.props.location.state.rating,
        screens: this.props.location.state.screens,
        stars: this.props.location.state.stars,
        videoId: this.props.location.state.videoId,
        genres: this.props.location.state.genres,
        collection: this.state.collectionChoosen
      });
      /* The messages change in consequence */
      comment = "This movie has well been added in this collection !";
      className = "validateMessage";
    } else {
      comment = "This movie is already registred in this collection";
      className = "errorMessage";
    }
    localStorage.setItem("games", JSON.stringify(games)); // we actualise the localstorage with the news movies added
    this.setState({
      comment: comment, // and we actualise the DOM
      classButtonAddCollection: "messageNone",
      classButtonAddMovie: className
    });
  }

  addCollection() {
    let collections = JSON.parse(localStorage.getItem("collections"));
    let forbiddenCharacters1 = /[^ \tA-Za-z0-9_-]/; //the regex uses to filtre the prohibed collection names
    let forbiddenCharacters2 = /[A-Za-z0-9]/;
    let comment;
    let className;
    if (
      !forbiddenCharacters1.test(this.state.inputCollection) &&
      forbiddenCharacters2.test(this.state.inputCollection) &&
      this.state.inputCollection !== "---New collection---" &&
      this.state.inputCollection.length <= 30 &&
      this.state.inputCollection.length > 0 &&
      !collections.includes(this.state.inputCollection)
    ) {
      collections.push(this.state.inputCollection);
      localStorage.setItem("collections", JSON.stringify(collections));
      comment = "Your collection has been well added !";
      className = "validateMessage";
    } else {
      comment =
        "Name of collection not conform or collection already existing.";
      className = "errorMessage";
    }
    this.setState({
      collection: collections,
      comment: comment,
      classButtonAddCollection: className,
      classButtonAddMovie: "messageNone"
    });
  }

  changeCollection(event) {
    //to switch the collection selected in the input select.
    let selectedOption;
    let collectionChoosen;
    if (event.target.value !== "---New collection---") {
      collectionChoosen = event.target.value;
      selectedOption = true;
    } else {
      collectionChoosen = this.state.collectionChoosen;
      selectedOption = false;
    }

    this.setState({
      collectionChoosen: collectionChoosen,
      collection: JSON.parse(localStorage.getItem("collections")),
      selectedOption: selectedOption,
      classButtonAddCollection: "messageNone",
      classButtonAddMovie: "messageNone",
      comment: ""
    });
  }

  appearModal() {
    //this is to switch the modale, to close it and to open it
    this.setState({
      modal: !this.state.modal,
      comment: "",
      classComment: ""
    });
  }

  render() {
    try {
      let isset = this.props.location.state.name;
    } catch {
      return <Redirect to="/" from="/game" />;
    }

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
                <button
                  className="addingButton"
                  onClick={() => this.appearModal()}
                >
                  Add
                </button>
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
        <Modal
          isOpen={this.state.modal}
          toggle={this.appearModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.appearModal} className="modalHeaderAdd">
            Add your movie to a new collection or an existing collection.
          </ModalHeader>
          <ModalBody className="modalBodyAdd mx-5">
            <div>
              <img src="mario.png" className="imgRandom" />
            </div>
            <div>
              <label htmlFor="selectCollection">
                Choose an existing collection :
              </label>
              <br />
              <select
                onChange={event => this.changeCollection(event)}
                onClick={event => this.changeCollection(event)}
                className="w-100 my-2"
                id="selectCollection"
              >
                {this.state.collection.map(collection => (
                  <option key={collection}>{collection}</option>
                ))}

                <optgroup>
                  <option>---New collection---</option>
                </optgroup>
              </select>
              {this.state.selectedOption === true && (
                <Button
                  className="button1ModalCollection mb-3 mt-2"
                  onClick={() => this.addLocalStorage()}
                >
                  Add movie to this collection
                </Button>
              )}
              <br />
              <span className={this.state.classButtonAddMovie}>
                {this.state.comment}
              </span>

              <br />
              {this.state.selectedOption === false && (
                <div>
                  <label className="mt-3" for="inputCollection">
                    Create a new collection :
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-100 my-2"
                    id="inputCollection"
                    placeholder="Choose a name for your collection"
                    onChange={event => this.createCollection(event)}
                  />
                  <br />
                  <Button
                    className="button2ModalCollection mt-2 mb-3"
                    onClick={() => this.addCollection()}
                  >
                    Add collection
                  </Button>
                </div>
              )}
              <br />
              <span className={this.state.classButtonAddCollection}>
                {this.state.comment}
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="button3ModalCollection"
              onClick={this.appearModal}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    );
  }
}
export default GameDetail;

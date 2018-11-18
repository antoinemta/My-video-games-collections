import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Search extends Component {
  constructor(props) {
    super(props);
    try {
      let isset = this.props.location.state.input;
      this.state = {
        classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
        classLineGame: "notDisplay",
        classRow: "row mx-0 py-5 mt-4",
        cards: [],
        games: [],
        input: isset
      };
    } catch {
      this.state = {
        classCardGame: "col-xl-2 col-lg-3 col-md-4 col-sm-6 px-0 my-4 cardGame",
        classLineGame: "notDisplay",
        classRow: "row mx-0 py-5 mt-4",
        cards: [],
        games: [],
        input: ""
      };
    }
  }

  componentDidMount() {
    try {
      if (this.props.location.state.input !== "") {
        fetch("http://localhost:8080/search/" + this.props.location.state.input)
          .then(results => results.json()) // conversion du résultat en JSON
          .then(data => {
            this.setState({
              cards: data,
              input: this.props.location.state.input
            });
          });
      }
    } catch {}
  }

  componentDidUpdate() {
    if (this.props.location.state.input !== this.state.input) {
      fetch("http://localhost:8080/search/" + this.props.location.state.input)
        .then(results => results.json()) // conversion du résultat en JSON
        .then(data => {
          this.setState({
            cards: data,
            input: this.props.location.state.input
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
    if (this.state.input === "") {
      return <Redirect to="/" from="/search" />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row d-flex justify-content-center subContainer">
            <div className="col-md-10 px-0">
              <div className="col-12 homePage px-0">
                <section className="row mx-0">
                  <div className="col-12 layoutOrganisation">
                    <div className="col-sm-6 col-xl-10 py-4 border-right layoutTitle">
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
                        alt="card game"
                      />
                      <img
                        src="line.png"
                        className="btnList"
                        onClick={() => this.displayLine()}
                        alt="line game"
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
                          stars: cards.stars,
                          rating: cards.rating,
                          id: cards.id
                        }
                      }}
                      className={this.state.classCardGame}
                      key={Math.random()}
                    >
                      <div className="relativeCard" key={Math.random()}>
                        <img
                          src={cards.cover}
                          className="imgCard"
                          alt="poster's game"
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
                          key: cards.id,
                          name: cards.name,
                          url: cards.cover,
                          date: cards.date,
                          genres: cards.genres,
                          summary: cards.summary,
                          screens: cards.screenshots,
                          videoId: cards.video,
                          stars: cards.stars,
                          rating: cards.rating,
                          id: cards.id
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
                          alt="cover's card"
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
}
export default Search;

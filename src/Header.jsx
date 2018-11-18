import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  search(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <header className="row text-white">
        <div className="col-12 py-5 d-flex header">
          <NavLink to="/">
            <span className="title">MY VIDEO GAMES COLLECTION</span>
          </NavLink>
          <div className="col-lg-3 inputSearch">
            <div className="input-group">
              <input
                className="form-control border py-2"
                type="search"
                placeholder="Enter a title's game"
                onChange={event => this.search(event)}
              />
              <div className="input-group-append">
                <NavLink
                  to={{
                    pathname: "/search",
                    state: {
                      input: this.state.input
                    }
                  }}
                  className="btn btn-outline-secondary border-warning"
                  type="button"
                >
                  <i className="fa fa-search" />
                </NavLink>
              </div>
            </div>
          </div>
          <span className="mt-1 mr-5 commentHeader">
            Add your favorite games in your collection!
          </span>
          <NavLink
            to="/collection"
            className="px-3 py-1 collectionBtn bg-dark border border-warning rounded text-warning"
          >
            My collection
          </NavLink>
        </div>
        <div className="col-12 dialect py-4">
          <span className="spanAnimated">
            Search your favorite games and add them until 100 into your
            collection ! You can add until 10 collections, and you can delete
            them.
          </span>
        </div>
      </header>
    );
  }
}

export default Header;

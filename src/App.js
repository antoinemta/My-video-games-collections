import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import Homepage from "./Homepage";
import Header from "./Header";
import Footer from "./Footer";
import GameDetail from "./GameDetail";
import Collection from "./Collection";
import Search from "./Search";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="container-fluid">
            <Header />
            <div className="row d-flex justify-content-center subContainer">
              <div className="col-md-10 px-0">
                <Route exact path="/" component={Homepage} />
                <Route exact path="/game" component={GameDetail} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/search" component={Search} />
              </div>
            </div>

            <Footer />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

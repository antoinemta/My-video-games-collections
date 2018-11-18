import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import GameDetail from "./Components/GameDetail";
import Collection from "./Components/Collection";
import Search from ".//Components/Search";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Header />
          <div className="row d-flex justify-content-center subContainer">
            <div className="col-md-10 px-0">
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/game" component={GameDetail} />
                <Route exact path="/collection" component={Collection} />
                <Route exact path="/search" component={Search} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import Homepage from "./Homepage";
import Header from "./Header";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Homepage} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;

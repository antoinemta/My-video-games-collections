import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => (
  <div className="col-12 homePage px-0">
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
  </div>
);

export default Homepage;

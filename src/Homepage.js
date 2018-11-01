import React, { Component } from "react";
import { NavLink, Route, BrowserRouter, Switch } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Filter from "./Filter";

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
    <Filter />
    <div className="col-12 layoutOrganisation">
      <div className="col-sm-6 col-xl-10 py-4 border-right">
        <span className="sectionTitle text-white">
          <u>Games which may interest you</u>
        </span>
      </div>
      <div className="col d-flex justify-content-center pt-4">
        <img src="card.png" className="btnList mr-4" />
        <img src="line.png" className="btnList" />
      </div>
    </div>
    <div className="col-12">cards</div>
  </div>
);

export default Homepage;

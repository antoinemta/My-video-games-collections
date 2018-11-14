const express = require("express")();
const igdb = require("igdb-api-node").default;
//const client = igdb("90a99261aaa1cfdc5c234776abdc14fb");

const client = igdb("2763a56c0facbc3c1e8373bfb43f0bbd");

express.get("/home", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.status(200);
  client
    .games({
      filters: {
        "release_dates.date-gt": "2017-12-31",
        "release_dates.date-lt": "2019-01-01",
        "release_dates.platform-eq": 6
      },
      fields:
        "cover,name,summary,rating,genres,first_release_date,release_dates,screenshots,videos", // Return all fields
      limit: 48, // Limit to 5 results
      offset: 0 // Index offset for results
    })
    .then(response => {
      let games = [];
      response.body.map(data => {
        let poster = "moviePosterPlaceholder.png";

        if (data.cover) {
          poster = "http:" + data.cover.url;
        }

        let date = "unknown";

        if (data.release_dates) {
          if (
            data.release_dates.filter(
              content => content.date == data.first_release_date
            )[0]
          ) {
            date = data.release_dates.filter(
              content => content.date == data.first_release_date
            )[0].y;
          }
        }

        let screens = [];

        if (data.screenshots) {
          data.screenshots.map(screen => screens.push("http:" + screen.url));
        }

        let idTrailer = "";

        if (data.videos) {
          if (data.videos.filter(video => video.name == "Trailer")[0]) {
            idTrailer = data.videos.filter(video => video.name == "Trailer")[0]
              .video_id;
          }
        }

        let stars = [];
        let rating = "";
        if (data.rating) {
          rating = Math.ceil(data.rating);
          let note = Math.ceil(data.rating / 10);
          for (let i = 0; i < note; i++) {
            stars.push("star.png");
          }
        }

        games.push({
          name: data.name,
          summary: data.summary,
          rating: rating,
          cover: poster,
          genres: data.genres,
          date: date,
          screenshots: screens,
          video: idTrailer,
          stars: stars
        });
      });

      res.json(games);
    })
    .catch(error => {
      throw error;
    });

  setTimeout(function() {
    res.end();
  }, 6000);
});

express.get("/search/:input", function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.status(200);
  client
    .games({
      search: req.params.input,
      fields:
        "cover,name,summary,rating,genres,first_release_date,release_dates,screenshots,videos", // Return all fields
      limit: 50, // Limit to 5 results
      offset: 0 // Index offset for results
    })
    .then(response => {
      let games = [];
      response.body.map(data => {
        let poster = "moviePosterPlaceholder.png";

        if (data.cover) {
          poster = "http:" + data.cover.url;
        }

        let date = "unknown";

        if (data.release_dates) {
          if (
            data.release_dates.filter(
              content => content.date == data.first_release_date
            )[0]
          ) {
            date = data.release_dates.filter(
              content => content.date == data.first_release_date
            )[0].y;
          }
        }

        let screens = [];

        if (data.screenshots) {
          data.screenshots.map(screen => screens.push("http:" + screen.url));
        }

        let idTrailer = "";

        if (data.videos) {
          if (data.videos.filter(video => video.name == "Trailer")[0]) {
            idTrailer = data.videos.filter(video => video.name == "Trailer")[0]
              .video_id;
          }
        }

        let stars = [];
        let rating = "";
        if (data.rating) {
          rating = Math.ceil(data.rating);
          let note = Math.ceil(data.rating / 10);
          for (let i = 0; i < note; i++) {
            stars.push("star.png");
          }
        }

        games.push({
          name: data.name,
          summary: data.summary,
          rating: rating,
          cover: poster,
          genres: data.genres,
          date: date,
          screenshots: screens,
          video: idTrailer,
          stars: stars
        });
      });

      res.json(games);
    })
    .catch(error => {
      throw error;
    });

  setTimeout(function() {
    res.end();
  }, 6000);
});

express.listen(8080);

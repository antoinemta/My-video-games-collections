const express = require("express")();
const http = require("http").createServer(express);
const io = require("socket.io").listen(http);
const igdb = require("igdb-api-node").default;
const client = igdb("90a99261aaa1cfdc5c234776abdc14fb");

function gamesHomePage(socket) {
  client
    .games({
      /*filters: {
        "release_dates.date-gt": "1988-12-31",
        "release_dates.date-lt": "1990-01-01"
        "release_dates.platform-eq": 48
      }*/ search:
        "1984",
      fields:
        "cover,name,summary,rating,developers,publishers,genres,first_release_date,platforms,release_dates,screenshots,videos", // Return all fields
      limit: 50, // Limit to 5 results
      offset: 0 // Index offset for results
    })
    .then(response => {
      let games = [];
      response.body.map(a => {
        let poster = "moviePosterPlaceholder.png";

        if (a.cover) {
          poster = "http:" + a.cover.url;
        }

        let date = "unknown";

        if (a.release_dates) {
          if (a.release_dates.filter(b => b.date == a.first_release_date)[0]) {
            date = a.release_dates.filter(
              b => b.date == a.first_release_date
            )[0].y;
          }
        }

        let screens = [];

        if (a.screenshots) {
          a.screenshots.map(screen => screens.push("http:" + screen.url));
        }

        let idTrailer = undefined;

        if (a.videos) {
          if (a.videos.filter(video => video.name == "Trailer")[0]) {
            idTrailer = a.videos.filter(video => video.name == "Trailer")[0]
              .video_id;
          }
        }

        games.push({
          id: a.id,
          name: a.name,
          summary: a.summary,
          rating: a.rating,
          developers: a.developers,
          publishers: a.publishers,
          genres: a.genres,
          platforms: a.platforms,
          date: date,
          screenshots: screens,
          video: idTrailer
        });
      });
      console.log(games);
      //socket.emit("gamesHomePage", response.body);
    })
    .catch(error => {
      throw error;
    });
}

io.sockets.on("connection", function(socket) {
  gamesHomePage(socket);
});

http.listen(8080);

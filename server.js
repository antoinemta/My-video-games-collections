const express = require("express")();
const http = require("http").createServer(express);
const io = require("socket.io").listen(http);
const igdb = require("igdb-api-node").default;
const client = igdb("90a99261aaa1cfdc5c234776abdc14fb");

function gamesHomePage(socket) {
  client
    .games({
      filters: {
        "release_dates.date-gt": "2017-12-31",
        "release_dates.date-lt": "2019-01-01",
        "release_dates.platform-eq": 48
      },
      fields:
        "cover,name,summary,rating,developers,publishers,genres,first_release_date,platforms,release_dates,screenshots,videos", // Return all fields
      limit: 20, // Limit to 5 results
      offset: 0 // Index offset for results
    })
    .then(response => {
      let responses = [];
      let cover = "";
      for (let i = 0; i < response.body.length; i++) {
        let date = null;
        if (response.body[i].first_release_date) {
          date = response.body[i].release_dates.filter(
            data => data.date == response.body[i].first_release_date
          )[0].y;
        } else {
          if (response.body[i].release_dates) {
            date = response.body[i].release_dates[0].y;
          }
        }

        if (response.body[i].cover) {
          cover = response.body[i].cover.url;
        }

        responses.push({
          id: response.body[i].id,
          name: response.body[i].name,
          rating: response.body[i].rating,
          date: date,
          cover: "http:" + cover
        });
      }

      socket.emit("gamesHomePage", responses);
    })
    .catch(error => {
      throw error;
    });
}

io.sockets.on("connection", function(socket) {
  gamesHomePage(socket);
});

http.listen(8080);

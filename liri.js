require("dotenv").config();
var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var movieName = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
var Movie = function() {
axios.get(queryUrl).then(
      function (response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rated: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1]);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });

}
var Song = function (song) {
    spotify.search({ type: "track", query: (song ? song : "The Sign") }, function (err, body) {
        if (err) throw err;

        var data = body.tracks.items[0];
        // console.log(data)
        if (data) {
            var output = [
                console.log("Artist(s): " + data.artists[0].name),
                console.log("Song name: " + data.name),
                console.log("Preview: " + data.preview_url),
                console.log("Album: " + data.album.name)
            ].join("\n");

            console.log(output);
            fs.appendFile("log.txt", output + "\n", (err) => { if (err) throw err; });
        } else {
            console.log("Could not find a match for " + song + " on Spotify");
            fs.appendFile("log.txt", `Could not find a match for "${song}" on Spotify\n`, (err) => { if (err) throw err; });
        }
    })
};
var DoWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;

        var cmd = data.split(",")[0];
        var term = data.split(",")[1];

        executeCommand(cmd, term);
    });
};

var executeCommand = function (cmd, term) {
    switch (cmd) {
        case "spotify-this-song":
            Song(term);
            break;
        case "movie-this":
            Movie(term);
            break;
        case "do-what-it-says":
            DoWhatItSays();
            break;
    }
}
const cmd = process.argv[2];
const term = process.argv.slice(3).join(" ");

fs.appendFile("log.txt", process.argv.join(" "), (err) => { if (err) throw err; });

executeCommand(cmd, term);
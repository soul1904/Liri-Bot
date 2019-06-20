require("dotenv").config();
var spotifyKeyInfo = require("./keys.js");

var fs = require("fs");

var axios = require("axios");
var Spotify = require('node-spotify-api');
var movieName = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
    function (response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rated: " + response.data.imdbRating);
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });


function songInfo() {
    var songName = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            songName = songName + "+" + userInput[i];
        }
        else {
            songName += userInput[i];
        }
    }

    function showSongInfo(songName) {
        console.log("I'm showing song information for " + songName);

        var spotify = new Spotify(keys.spotifyKeys);

        // checking to see if NO song name entered
        var spotify = new Spotify({
            id: spotifyKeyInfo["spotify"].id,
            secret: spotifyKeyInfo["spotify"].secret
        });

        spotify
        .request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function (error, songResponse) {
            if (error) {
                return console.log(error);
            }
            console.log("Artist Name: " + songResponse.tracks.items[0].artists[0].name);
            console.log("Song Title: " + songResponse.tracks.items[0].name);
            console.log("Sample: " + songResponse.tracks.items[0].preview_url);
            console.log("Album: " + songResponse.tracks.items[0].album.name);
        });
    };
    function doWhatInfo() {

        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var output = data.split(",");
            for (var i = 0; i < output.length; i++) {
                console.log(output[i]);
            }
        });
    };

    var userInput = process.argv;
    var inputTopic = process.argv[3];

    switch (inputTopic) {

        case "spotify-this-song":
            songInfo(firstCmd);
            break;

        case "movie-this":
            movieInfo();
            break;

        case "do-what-it-says":
            doWhatInfo();
            break;
    }
}
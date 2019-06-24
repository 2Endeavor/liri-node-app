
require("dotenv").config();
var fs = require("fs");
var moment =require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios =require("axios");
var selection = process.argv[2];
var input = process.argv[3];

function concertThis(term){
  var queryURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
  axios.get(queryURL)
  .then(function (response){
   // console.log(response.data[0]);
    for (var i=0; i<response.data.length; i++){
      console.log("Name of Venue: " + response.data[i].venue.name);
      console.log("Date of Event: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
      console.log("Venue Location " + response.data[i].venue.city,response.data[i].venue.country);

      
      console.log(" ---------------------------------");
      
    }
   
  })

}
function movieThis(term){
  var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t="+ term;
  axios.get(queryURL)
  .then(function (response){
    console.log("Title: " + response.data.Title);
    console.log("Released: " + response.data.Released);
    console.log("Rated: " + response.data.Rated);
    console.log("Rotten Tomatos Score: "+ response.data.Ratings[1].Value);
    console.log("Produced in: "+ response.data.Country);
    console.log("Language: "+ response.data.Language);
    console.log("Movie Plot: "+ response.data.Plot);
    console.log("Actors: "+ response.data.Actors);
   
   
  })

} 


function spotifyThis(term){
  if (term === undefined){
    term ="The Sign"
  }
  var Spotify = require('node-spotify-api');
 
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
 console.log(term);
  spotify.search({ type: 'track', query: "'"+ term + "'" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }else{ 

      { 
        for (var i=0; i<data.tracks.items.length; i++){ 
          for(var j=0; j<data.tracks.items[i].artists.length; j++){
            
            console.log("Artist's Name: "+ data.tracks.items[i].artists[j].name);
            console.log("Name of the Song: "+ data.tracks.items[i].name);
            console.log("Name of Album: " + data.tracks.items[i].album.name);
            console.log("Spotify Preview Link: " + data.tracks.items[i].preview_url);
            console.log("-------------------------------------------")
          }
        }
      }
    }


  });

  
} 


// This function isn't finished
function doWhatItSays(term){
  //console.log()
    fs.readFile("random.txt", "utf8", function(error, data){
      if (error){
      return console.log(error);
    } 
    
 
    var whatIWantArr = data.split(",");
    var theFunctionIWant = whatIWantArr[0];
    var request = whatIWantArr[1];

   
    switch(theFunctionIWant){
      case "concert-this":
        concertThis(request);
        break;
      case "spotify-this-song":
        spotifyThis(request);
        break;  
      case "movie-this":
        movieThis(request);
        break;
      case "do-what-it-says":
        doWhatItSays(request);
        break;
    
      }
    
});
}

switch(selection){
  case "concert-this":
    concertThis(input);
    break;
  case "spotify-this-song":
    spotifyThis(input);
    break;  
  case "movie-this":
    movieThis(input);
    break;
  case "do-what-it-says":
    doWhatItSays(input);
    break;

  }
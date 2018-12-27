# City Quest API

This api serves up end points for both the react-native app and react administration web page for City Quest; a location based multiplayer treasure hunt style game featuring question and photo recognition challenges. The administration webpage also allows users to log in and create their own games.

## Key Funtionality
The API makes calls to a Firestore database which contains all the information on games, routes and challenges. The API also makes calls to the 3rd party google API to utilise their photo recognition and journey planning services.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Alternatively the hosted version is available at the bottom of the page.

### Prerequisites

You will need a google cloud vision API key and a firestore database. Once you have set up the firestore database, in the firebase console, go to settings and then service accounts. You can then copy the databaseURL from the snippet into the config file below. Just below the url snippet will be a generate new private key button, this will download a json file. Copy this into the projects main directory and rename as treasure-hunt.json. 

You will also need to install the prerequisites for running and testing the application by running the following on the command line.

```
$ npm install
```

Your config file will need to be in the following format:

```
const config =
    process.env.NODE_ENV === "test"
        ? "if using insert test database here"
        : "insert databaseURL here";

const cloudVisionAPIkey = "insertGoogleKeyHere";

module.exports = { config, cloudVisionAPIkey };

```

To do this create a file called config.js in the main directory and copy in the above code, inserting in your keys where neccessary.

Finally the database can be seeded by typing the following in the console:
```
node seed/seedDev
```

### Using the API

The following end points are served up by the API. Type the following urls into either a browser or postman to access the data.

```http
GET /api
# Serves an HTML page with documentation for all the available endpoints
```

```http
GET /api/trails
# Serves up all the trails
```

```http
GET /api/trails/:trail_id
# Serves up a single trail to view (for Admin)
# e.g: `/api/trails/manchester-city-trail`
```

```http
POST /api/trails/:trailId
# Serves up a trail for each player according to their index. This ensures players are not followign each other around hte same route
# The request must be sent in the format: {
    "playerName": "name",
    "index": 0
}
```

```http
POST /api/games
# Creates a new game
# The request must be sent in the format:
{
    "gameName": "newGame",
    "noOfPlayers": 4,
    "trailId": "manchester-city-trail"
}
```

```http
GET /api/games/:gamePin
# Serves up a single game
# e.g /api/games/7996
```

```http
DELETE /api/games/:gamePin
# Deletes a single game
# e.g /api/games/7996
```

```http
POST /api/games/:gamePin/players
# Adds a new player to a game 
# Request should be in the format:
{
    "playerName": "Name"
}
```

```http
PATCH /api/games/:gamePin/players?progress=true
# Increments the progress of the player by one. Requires a progress query of true

```

```http
PATCH /api/games/:gamePin/players?end=true
# Ends the game for a player and returns the 'totalTime' taken to complete the game. Requires an end query of true
```

```http
PATCH /api/games/:gamePin/:playersName
# Analyse an image uploaded by the player (using Google vision API)<br>
# Request should be in the format:
{
    "URL": "/url/for/the/image"
}
```

```http
GET /api/challenges/:challengeId
# Serves up the challenges for a single location   
# e.g. /api/challenges/chinaTown
```

```http
GET /api/players
# Serves up all the players in leader board
```

```http
POST /api/players/:gamePin
# Adds all the players from a game to the leaderboard once the game has finished
```

## Hosting

This API is hosted on Heroku on the following link.

https://city-quest-game.herokuapp.com/api

## Links

Front end app built using react native:
https://github.com/KWright16/FE-city-quest

Font end admin webpage built using react:
https://github.com/KWright16/FE-city-quest-admin


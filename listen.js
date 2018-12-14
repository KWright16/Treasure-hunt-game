const app = require("./app");
const socketio = require("socket.io");
const PORT = process.env.PORT ? process.env.PORT : 8080;

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

const websocket = socketio(server); //Initiate Socket

// module.exports = websocket;
websocket.on("channel1", data => {
  console.log("Greetings from RN app", data);
});

// websocket.emit('channel2', 'new channel');
// websocket.on('channel2', (obj) => {
//   console.log('Object from RN app', obj);

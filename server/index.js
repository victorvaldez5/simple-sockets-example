const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const io2 = require('socket.io')({
  path: 'wss://ws.blockchain.info/inv'
})

const PORT = process.env.PORT || 4001
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io2.send("op")
io.on('connection', (socket) => {
  console.log("New client connected, sending data")
  socket.emit('streaming', 'look at some data')
  socket.on('clientMessage', (data) => {
    io.emit('serverMessage', "This is a message from the server");
  });
})
const getApiAndEmit = async (socket) => {
  const res = await fetch.get('https://gnip-stream.twitter.com/stream/sample10/accounts/:account_name/publishers/twitter/:stream_label.json')
};

server.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
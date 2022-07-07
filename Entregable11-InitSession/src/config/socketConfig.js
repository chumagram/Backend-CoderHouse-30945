const express = require('express');
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});

module.exports = {io, connectedServer};
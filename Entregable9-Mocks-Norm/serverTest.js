// Importaciones
const express = require('express');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
// Constantes
const publicPath = path.resolve(__dirname, "./public");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
// Configuraciones
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// TEST
io.on('connection', (socket) => {
    console.log('TEST INICIADO');
    let arrFaker = require('./src/testFaker');
    socket.emit('productos', arrFaker);
});

app.get('/api/productos-test/', function (req, res) {
    res.render('pages/test');
});

// LEVANTAR EL SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));
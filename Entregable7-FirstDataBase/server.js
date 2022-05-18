const express = require('express');
const contenedor = require('./src/modules/container.js');
const mensajes = require('./src/modules/messageManager.js');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static', express.static(__dirname + '/public'));

/*******************  FIN DE LAS CONFIGURACIONES  *******************/

// PAGINA RAIZ
app.get('/', function (req, res) {
    res.render('pages/index');    
});

// CONEXION SOCKET
io.on('connection', (socket) => {
    console.log('¡Nuevo cliente conectado!');
    let productos = contenedor.getAll();
    socket.emit('mensajeria', mensajes.allMessages());
    socket.emit('productos', productos);

    // Manejo de nuevo producto
    socket.on('new-product', data => {
        contenedor.insert(data);
        io.sockets.emit('productos', productos);
    })
    // manejo de nuevo mensaje
    socket.on('new-message', data => {
        mensajes.addMessage(data);
        io.sockets.emit('mensajeria', mensajes.allMessages());
    })
});

// LEVANTAR EL SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log(`Error en el servidor: ${error}`));
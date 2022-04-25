const express = require('express');
const contenedor = require('./public/scripts/container.js');
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

/*******************  FIN DE LAS CONFIGURACIONES  *****************/

// PAGINA RAIZ
app.get('/', function (req, res) {
    res.render('pages/index');    
})

// CONEXION SOCKET
io.on('connection', (socket) => {
    console.log('¡Nuevo cliente conectado!');
    let array = contenedor.getAll();
    socket.emit('array', array);
    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})

// INGRESAR UN PRODUCTO
/* router.post('/',(req,res)=>{
    let agregar = req.body;
    console.log('Producto a agregar:\n',agregar);
    let newId = contenedor.save(agregar);
    res.redirect('back');
}) */

// MOSTRAR TODOS LOS PRODUCTOS
/* router.get('/',(req,res)=>{
    let array = contenedor.getAll();
    console.log(array.length);
    if (array.length == 0){
        res.render('pages/sindatos.ejs', {array: array});
    } else {
        console.log('Todos los productos disponibles:\n',array);
        res.render('pages/all', {array: array});
    }
}) */

// LEVANTAR EL SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log(`Error en el servidor: ${error}`));
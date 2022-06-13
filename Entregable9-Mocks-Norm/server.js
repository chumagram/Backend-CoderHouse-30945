// Importaciones
const { schema, normalize } = require('normalizr');
const express = require('express');
const path = require('path');
const contenedor = require('./public/modules/MyContainer/container.js');
const mensajes = require('./public/modules/MyMessages/messageManager.js');
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
// Esquemas de normalización
const authorSchema = new schema.Entity('authorSchema');
const messageSchema = new schema.Entity('messageSchema', {
    commenter: authorSchema
})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

/*******************  FIN DE LAS CONFIGURACIONES  *******************/

let flag = true;

// PAGINA RAIZ
app.get('/', function (req, res) {
    res.render('pages/index', {flag: flag});    
});

// VERIFICACIÓN DEL ID
function newId(){
    let allMsj = mensajes.allMessages();
    let idsMsj = [];
    allMsj.forEach(element => {
        idsMsj.push(element.id);
    });
    let newIdreturn = Math.max(...idsMsj) + 1;
    return newIdreturn;
}

// CONEXION SOCKET
io.on('connection', (socket) => {

    console.log('Cliente conectado');
    let productos = contenedor.getAll();
    let allMsj = mensajes.allMessages();
    let msjsNormalized = normalize(allMsj, [chat]);
    socket.emit('mensajeria', msjsNormalized);
    socket.emit('productos', productos);

    // Manejo de nuevo producto
    socket.on('new-product', data => {
        contenedor.save(data);
        io.sockets.emit('productos', productos);
    })

    // manejo de nuevo mensaje
    socket.on('new-message', data => {
        let allMsj = mensajes.allMessages();
        let auxMsj;
        flag = false;
        allMsj.forEach(element => {
            if (element.author.id == data.id){
                auxMsj = {
                    id: newId(),
                    author: {
                        id: data.id,
                        name: element.author.name,
                        lastName: element.author.lastName,
                        age: element.author.age,
                        alias: element.author.alias,
                        avatar: element.author.avatar
                    },
                    text: data.text
                };
                flag = true;
            };
        });
        
        let msjsNormalized;
        msjsNormalized = normalize(allMsj, [chat]);
        if (flag){
            mensajes.addMessage(auxMsj);
            allMsj = mensajes.allMessages();
            msjsNormalized = normalize(allMsj, [chat]);
            io.sockets.emit('mensajeria', msjsNormalized);
        } else {
            //! FALTA QUE MANDE UN ERROR
            msjsNormalized = normalize(allMsj, [chat]);
            io.sockets.emit('mensajeria', msjsNormalized);
        }
    })

    //manejo de nuevo usuario
    socket.on('new-user', data => {
        console.log(data);
        let allMsj = mensajes.allMessages();
        flag = false;
        allMsj.forEach(element => {
            if (element.author.id == data.author.id) flag = true;
        });
        if (flag){
            //! FALTA QUE MANDE UN ERROR
            io.sockets.emit('mensajeria', normalize(allMsj, [chat]));
        } else {
            data.id = newId();
            mensajes.addMessage(data);
            allMsj = mensajes.allMessages();
            io.sockets.emit('mensajeria', normalize(allMsj, [chat]));
        }
    })
});

// LEVANTAR EL SERVIDOR
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));
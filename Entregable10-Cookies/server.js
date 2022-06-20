// Importaciones
const { schema, normalize } = require('normalizr')
const express = require('express')
const path = require('path')

const usersMongo = require('./src/mongo/daos/UsuariosDaoMongo')
const messageMongo = require('./src/mongo/daos/MensajesDaoMongo')
const productMongo = require('./src/mongo/daos/ProductosDaoMongo')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

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
const authorSchema = new schema.Entity('authorSchema')
const messageSchema = new schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

/*******************  FIN DE LAS CONFIGURACIONES  *******************/

// Página raíz
app.get('/', function (req, res) {
    res.render('pages/index');
});

// Conexión socket
io.on('connection', async (socket) => {

    console.log('Cliente conectado');
    let allProducts = await productMongo.readAllProducts();
    let allMessages = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMessages, [chat]);
    socket.emit('mensajeria', msjsNormalized);
    socket.emit('productos', allProducts);

    // Manejo de nuevo producto
    socket.on('new-product', async data => {
        await productMongo.createProduct(data);
        let allProd = await productMongo.readAllProducts();
        io.sockets.emit('productos', allProd);
    })

    // Manejo de nuevo mensaje
    socket.on('new-message', async data => {
        let email = data.email;
        let text = data.text;
        await messageMongo.addMessage(text, email);
        let allMsj = await messageMongo.readAllMessage();
        let msjsNormalized = normalize(allMsj, [chat]);
        io.sockets.emit('mensajeria', msjsNormalized);
    })

    // Manejo de inicio de sesion
    socket.on('init-session', async data => {
        let user = await usersMongo.readUser(data)
        if(user.error){
            io.sockets.emit('res-session', user);
        } else {
            await usersMongo.updateUser(user.id, {session: true});
            io.sockets.emit('res-session', user);
        }
    })

    // Manejo de cierre de sesión
    socket.on('close-session', async data =>{
        await usersMongo.updateUser(data, {session: false});
    }) 

    // Manejo de nuevo usuario
    socket.on('new-user', async data => {
        let newUser = await usersMongo.addUser(data);
        if (newUser.warning || newUser.error){
            io.sockets.emit('mensajeria', newUser);
        } else {
            io.sockets.emit('mensajeria', data.alias);
        }
    })

    // Manejo de verificación de sesión
    socket.on('session-status', async data =>{
        console.log(data);
        let user = await usersMongo.readUser(data);
        io.sockets.emit('res-session-status', user.session);
    }) 
});

// Levantar el servidor
const connectedServer = httpServer.listen(PORT, () => {
    console.log("Server HTTP con WEBSOCKETS escuchando en el puerto " + httpServer.address().port);
});
connectedServer.on('error', error => console.log (`Error en el servidor: ${error}`));
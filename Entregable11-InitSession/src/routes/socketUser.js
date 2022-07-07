//* Importaciones de las Daos necesarias 
const usersMongo = require('../mongo/daos/UsuariosDaoMongo')
const messageMongo = require('../mongo/daos/MensajesDaoMongo')
const productMongo = require('../mongo/daos/ProductosDaoMongo')
//* Importaciones para socket
const { Server: HttpServer } = require('http') 
const { Server: IOServer } = require('socket.io') 
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async (socket) => {

    console.log('Cliente conectado');

    let allProducts = await productMongo.readAllProducts();
    socket.emit('productos', allProducts);

    let allMessages = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMessages, [chat]);
    socket.emit('mensajeria', msjsNormalized);

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

    // Manejo de verificación de sesión
    socket.on('session-status', async data =>{
        let user = await usersMongo.readUser(data);
        io.sockets.emit('res-session-status', user.session);
    }) 
});

module.exports = io;
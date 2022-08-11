const { schema, normalize } = require('normalizr')

const usersMongo = require('../mongo/daos/UsuariosDaoMongo')
const messageMongo = require('../mongo/daos/MensajesDaoMongo')
const productMongo = require('../mongo/daos/ProductosDaoMongo')

// Normalization schemas
const authorSchema = new schema.Entity('authorSchema')
const messageSchema = new schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

async function initMain(socket){
    // para productos
    let allProducts = await productMongo.readAllProducts();
    socket.emit('productos', allProducts);
    // para mensajes
    let allMessages = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMessages, [chat]);
    socket.emit('mensajeria', msjsNormalized);
}

async function newProduct(io, data){
    await productMongo.createProduct(data);
    let allProd = await productMongo.readAllProducts();
    io.sockets.emit('productos', allProd);
}

async function newMessage(io, data){
    let email = data.email;
    let text = data.text;
    await messageMongo.addMessage(text, email);
    
    let allMsj = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMsj, [chat]);
    
    io.sockets.emit('mensajeria', msjsNormalized);
}

async function verifSession(io, data){
    let user = await usersMongo.readUser(data);
    io.sockets.emit('res-session-status', user.session);
}

module.exports = {
    initMain,
    newProduct,
    newMessage,
    verifSession
}
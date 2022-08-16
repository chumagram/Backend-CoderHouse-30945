const { schema, normalize } = require('normalizr')

const messagesRepo = require('../persistence/repository/mensajesRepo')
const usersRepo = require('../persistence/repository/usuariosRepo')
const productsRepo = require('../persistence/repository/productosRepo')

// Normalization schemas
const authorSchema = new schema.Entity('authorSchema')
const messageSchema = new schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

async function initMain(socket){
    // para mensajes
    const msgDTO = await messagesRepo.getAllMsg()
    let msjsNormalized = normalize(msgDTO, [chat]);
    socket.emit('mensajeria', msjsNormalized);
    // para productos
    const allProducts = await productsRepo.getAllProd();
    socket.emit('productos', allProducts);
}

async function newProduct(io, data){
    await productsRepo.createProduct(data);
    let allProd = await productsRepo.getAllProd();
    io.sockets.emit('productos', allProd);
}

async function newMessage(io, data){
    let email = data.email;
    let text = data.text;
    await messagesRepo.addMsg(text, email);
    
    const msgDTO = await messagesRepo.getAllMsg()
    let msjsNormalized = normalize(msgDTO, [chat]);
    
    io.sockets.emit('mensajeria', msjsNormalized);
}

async function verifSession(io, data){
    let user = await usersRepo.readUser(data);
    io.sockets.emit('res-session-status', user.session);
}

module.exports = {
    initMain,
    newProduct,
    newMessage,
    verifSession
}
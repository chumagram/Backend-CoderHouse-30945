const { schema, normalize } = require('normalizr')
const usersMongo = require('../mongo/daos/UsuariosDaoMongo')
const messageMongo = require('../mongo/daos/MensajesDaoMongo')
const productMongo = require('../mongo/daos/ProductosDaoMongo')

// NORMALIZATION SCHEMAS
const authorSchema = new schema.Entity('authorSchema')
const messageSchema = new schema.Entity('messageSchema',{commenter: authorSchema})
const chat = new schema.Entity('chats', {
    comments: [messageSchema],
    author: authorSchema
})

async function socketUser (socket, io) {

    let allProducts = await productMongo.readAllProducts();
    socket.emit('productos', allProducts);

    let allMessages = await messageMongo.readAllMessage();
    let msjsNormalized = normalize(allMessages, [chat]);
    socket.emit('mensajeria', msjsNormalized);

    // nuevo producto
    socket.on('new-product', async data => {
        await productMongo.createProduct(data);
        let allProd = await productMongo.readAllProducts();
        io.sockets.emit('productos', allProd);
    })

    // nuevo mensaje
    socket.on('new-message', async data => {
        let email = data.email;
        let text = data.text;
        await messageMongo.addMessage(text, email);
        
        let allMsj = await messageMongo.readAllMessage();
        let msjsNormalized = normalize(allMsj, [chat]);
        io.sockets.emit('mensajeria', msjsNormalized);
    })

    // verificación de sesión
    socket.on('session-status', async data =>{
        let user = await usersMongo.readUser(data);
        io.sockets.emit('res-session-status', user.session);
    }) 
}

module.exports = {socketUser};
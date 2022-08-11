const socketServices = require('../services/socket')

async function socketUser (socket, io) {

    // al inicializar main
    socketServices.initMain(socket);

    // nuevo producto
    socket.on('new-product', async data => {
        socketServices.newProduct(io, data)
    })

    // nuevo mensaje
    socket.on('new-message', async data => {
        socketServices.newMessage(io, data)
    })

    // verificación de sesión
    socket.on('session-status', async data =>{
        socketServices.verifSession(io, data)
    })
}

module.exports = socketUser;
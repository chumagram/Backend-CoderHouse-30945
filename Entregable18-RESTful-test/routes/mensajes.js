const {Router} = require('express')
const mensajesRoute = Router()

const ControladorMensajes = require('../controller/mensajes.js')

class RouterMensajes {

    constructor(){
        this.controladorMensajes = new ControladorMensajes()
    }

    start(){
        mensajesRoute.get('/:id?', this.controladorMensajes.obtenerMensaje)
        mensajesRoute.post('/', this.controladorMensajes.guardarMensaje)
        mensajesRoute.put('/:id', this.controladorMensajes.actualizarMensaje)
        mensajesRoute.delete('/:id', this.controladorMensajes.borrarMensaje)

        return mensajesRoute
    }
}

module.exports = RouterMensajes
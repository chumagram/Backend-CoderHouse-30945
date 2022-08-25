const {Router} = require('express')
const productosRoute = Router()

const ControladorProductos = require('../controller/productos.js')

class RouterNoticias {

    constructor(){
        this.controladorProductos = new ControladorProductos()
    }

    start(){
        productosRoute.get('/:id?', this.controladorProductos.obtenerProducto)
        productosRoute.post('/', this.controladorProductos.guardarProducto)
        productosRoute.put('/:id', this.controladorProductos.actualizarProducto)
        productosRoute.delete('/:id?', this.controladorProductos.borrarProductos)

        return productosRoute
    }
}

module.exports = RouterNoticias
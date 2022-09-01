const ApiProductos = require ('../api/productos.js')

class ControladorProducto {

    constructor(){
        this.apiProductos = new ApiProductos()
    }

    obtenerProducto = async (idPasado) => {
        try {
            let id = idPasado
            let Productos = await this.apiProductos.obtenerProductos(id)
            return Productos
        } catch (error) {   
            console.log('error obtenerProductos', error)
        }
    }

    guardarProducto = async (productoPasado) => {
        try {
            let Producto = productoPasado.datos
            let ProductoGuardado = await this.apiProductos.guardarProducto(Producto)
            return ProductoGuardado
        } catch (error) {   
            console.log('error guardarProducto', error)
        }
    }

    actualizarProducto = async (idPasado, productoPasado) => {
        try {
            let Producto = idPasado
            let id = productoPasado
            let ProductoActualizado = await this.apiProductos.actualizarProducto(id,Producto)
            return ProductoActualizado
        } catch (error) {   
            console.log('error actualizarProductos', error)
        }
    }

    borrarProductos = async (idPasado) => {
        try {
            let id = idPasado
            let ProductoBorrado = await this.apiProductos.borrarProductos(id)
            return ProductoBorrado
        } catch (error) {   
            console.log('error borrarProductos', error)
        }
    }
}

module.exports = ControladorProducto
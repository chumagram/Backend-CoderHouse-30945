const ApiProductos = require ('../api/productos.js')

class ControladorProducto {

    constructor(){
        this.apiProductos = new ApiProductos()
    }

    obtenerProducto = async (idPasado) => {
        try {
            let id = idPasado.id
            let Productos = await this.apiProductos.obtenerProductos(id)
            return Productos[0]
        } catch (error) {   
            console.log('error obtenerProducto', error)
        }
    }

    guardarProducto = async (productoPasado) => {
        try {
            let Producto = {
                title: productoPasado.datos.title,
                price: productoPasado.datos.price,
                thumbnail: productoPasado.datos.thumbnail
            }
            let ProductoGuardado = await this.apiProductos.guardarProducto(Producto)
            return ProductoGuardado
        } catch (error) {   
            console.log('error guardarProducto', error)
        }
    }

    actualizarProducto = async (entrada) => {
        try {
            let Producto = {
                title: entrada.datos.title,
                price: entrada.datos.price,
                thumbnail: entrada.datos.thumbnail
            }
            let id = entrada.id
            let ProductoActualizado = await this.apiProductos.actualizarProducto(id,Producto)
            return ProductoActualizado
        } catch (error) {   
            console.log('error actualizarProductos', error)
        }
    }

    borrarProductos = async (idPasado) => {
        try {
            let id = idPasado.id
            let ProductoBorrado = await this.apiProductos.borrarProductos(id)
            return ProductoBorrado
        } catch (error) {   
            console.log('error borrarProductos', error)
        }
    }
}

module.exports = ControladorProducto
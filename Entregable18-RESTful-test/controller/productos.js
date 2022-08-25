const ApiProductos = require ('../api/productos.js')

class ControladorProducto {

    constructor(){
        this.apiProductos = new ApiProductos()
    }

    obtenerProducto = async (req,res) => {
        try {
            let id = req.params.id
            let Productos = await this.apiProductos.obtenerProductos(id)
            res.send(Productos)
        } catch (error) {   
            console.log('error obtenerProductos', error)
        }
    }

    guardarProducto = async (req,res) => {
        try {
            let Producto = req.body
            let ProductoGuardada = await this.apiProductos.guardarProducto(Producto)

            res.json(ProductoGuardada)
        } catch (error) {   
            console.log('error guardarProducto', error)
        }
    }

    actualizarProducto = async (req,res) => {
        try {
            let Producto = req.body
            let id = req.params.id
            let ProductoActualizado = await this.apiProductos.actualizarProducto(id,Producto)
            res.json(ProductoActualizado)
        } catch (error) {   
            console.log('error actualizarProductos', error)
        }
    }

    borrarProductos = async (req,res) => {
        try {
            let id = req.params.id
            let ProductoBorrado = await this.apiProductos.borrarProductos(id)
            res.json(ProductoBorrado)
        } catch (error) {   
            console.log('error borrarProductos', error)
        }
    }
}

module.exports = ControladorProducto
const config = require ('../config/envPath')
const ProductosFactoryDAO = require ('../model/DAOs/productosFactory')
const Productos = require ('../model/models/productos')

class ApiProductos {

    constructor(){
        this.productosDAO = ProductosFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }

    async obtenerProductos(id) {
        return await this.productosDAO.obtenerProductos(id)
    }

    async guardarProducto(producto){
        ApiProductos.asegurarProductoValido(producto, true)
        return await this.productosDAO.guardarProducto(producto)
    }

    async actualizarProducto(id, producto){
        ApiProductos.asegurarProductoValido(producto, true)
        return await this.productosDAO.actualizarProducto(id, producto)
    }

    async borrarProductos(id) {
        return await this.productosDAO.borrarProductos(id)
    }

    static asegurarProductoValido(producto, requerido){
        try {
            Productos.validar(producto, requerido)
        } catch (error) {
            throw new Error('el producto posee un formato invalido o faltan datos: '+ error.details[0].message)
        }
    }
}

module.exports = ApiProductos
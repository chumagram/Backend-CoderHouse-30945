const fs = require('fs');
const ProductosBaseDAO = require ('./productos')

class ProductosFileDao extends ProductosBaseDAO {

    constructor(nombreArchivo){
        super()
        this.nombreArchivo = nombreArchivo
    }

    async leer(archivo){
        return JSON.parse(await fs.promises.readFile(archivo,'utf-8'))
    }

    async guardar(archivo, productos){
        await fs.promises.writeFile(archivo, JSON.stringify(productos, null, '\t'))
    }

    obtenerProductos = async _id => {
        try {
            if (_id) {
                let productos = await this.leer(this.nombreArchivo)
                let index = productos.findIndex(producto => producto._id == _id)
                
                return index >= 0? [productos[index]] : []
            } else {
                let productos = await this.leer(this.nombreArchivo)
                return productos
            }
        } catch (error) {
            console.log('error en obtenerProductos:', error)
            let productos = []

            // guardo archivo
            await this.guardar (this.nombreArchivo, productos)
            return productos
        }
    }

    guardarProducto = async producto => {
        try {
            // leo archivo
            let producto = await this.leer(this.nombreArchivo)

            let _id = this.getNext_Id(productos)
            let fyh = new Date().toLocaleString()
            let productoGuardada = productoDTO (producto, _id, fyh)
            producto.push(productoGuardada)

            // guardo archivo
            await this.guardar(this.nombreArchivo, productos)

            return productoGuardada
        } catch (error) {
            console.log('error en guardarProducto:', error)
            let producto = {}
            
            return producto
        }
    }

    actualizarProducto = async (_id, producto) => {
        try {
            // leo archivo
            let productos = await this.leer(this.nombreArchivo)
            
            let fyh = new Date().toLocaleString()
            let productoNew = productoDTO(producto, _id, fyh)

            let indice = this.getIndex(_id, productos)
            let productoActual = producto[indice] || {}

            let productoActualizada = {...productoActual, ...productoNew}

            indice >= 0?
                productos.splice(indice, 1, productoActualizada) :
                productos.push(productoActualizada)

            // guardo archivo
            await this.guardar(this.nombreArchivo, productos)

            return productoActualizada
        } catch (error) {
            console.log('error en actualizarProducto:', error)
            let producto = {}

            return producto
        }
    }

    borrarProducto = async _id => {
        try {
            // leo archivo
            let productos = await this.leer(this.nombreArchivo)

            let indice = this.getIndex(_id, productos)
            let productoBorrado = productos.splice(indice, 1)[0]

            // guardo archivo
            await this.guardar(this.nombreArchivo, productos)

            return productoBorrado
        } catch (error) {
            console.log('error en borrarProducto:', error)
            let producto = {}

            return producto
        }
    }
}

module.exports = ProductosFileDao
const ProductosBaseDAO = require('./productos')

class ProductosMemFileDAO extends ProductosBaseDAO {
    constructor(){
        super()
        this.productos = []
    }

    obtenerProductos = async _id => {
        try {
            if (_id) {
                let index = this.productos.findIndex(producto => producto._id == _id)
                return index >= 0? [this.productos[index]] : []
            } else {
                return this.productos
            }
        } catch (error) {
            console.log('error en obtenerProductos', error)
            return []
        }
    }

    guardarProducto = async producto => {
        try {
            let productoGuardado = producto;
            productoGuardado._id = this.getNext_Id(this.productos);
            productoGuardado.fyh = new Date().toLocaleString();
            this.productos.push(productoGuardado)
            return productoGuardado
        } catch (error) {
            console.log('error en guardarProducto:', error)
            let producto = {}
            return producto
        }
    }

    actualizarProducto = async (_id, producto) => {
        try {
            let productoNew = producto
            productoNew.fyh = new Date().toLocaleString()
            productoNew._id = _id

            let indice = this.getIndex(_id, this.productos)
            let productoActual = this.productos[indice] || {}

            let productoActualizado = {...productoActual, ...productoNew}

            indice >= 0?
                this.productos.splice(indice, 1, productoActualizado) : 
                this.productos.push(productoActualizado)

            return productoActualizado

        } catch (error) {
            console.log('error en actualizarProducto:', error)
            let producto = {}

            return producto
        }
    }

    borrarProductos = async _id => {
        try {
            if (_id) {
                let indice = this.getIndex(_id, this.productos)
                let productoBorrado = this.productos.splice(indice, 1)[0]
                return productoBorrado
            } else {
                let productosBorrados = this.productos
                this.productos = []
                return productosBorrados
            }
        } catch (error) {
            console.log('error en borrarProducto:', error)
            let producto = {}

            return producto
        }
    }
}

module.exports = ProductosMemFileDAO
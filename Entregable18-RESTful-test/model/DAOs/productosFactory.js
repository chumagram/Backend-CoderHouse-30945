const ProductosMemDAO = require('./productosMem')
const ProductosFileDAO = require('./productosFile')
const ProductosDBMongo = require('./productosMongo')

class ProductosFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'MEM': return new ProductosMemDAO()
            case 'FILE': return new ProductosFileDAO(process.cwd()+'/productos.json')
            case 'MONGO': return new ProductosDBMongo('mibase','productos')
            default: return new ProductosMemDAO()
        }
    }
}

module.exports = ProductosFactoryDAO
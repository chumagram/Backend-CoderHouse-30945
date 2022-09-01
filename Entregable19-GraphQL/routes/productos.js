const {Router} = require('express')
const { graphqlHTTP } = require ('express-graphql');
const { buildSchema } = require ('graphql');
const productosRoute = Router()

const ControladorProductos = require('../controller/productos.js')

class RouterProductos {

    constructor(){
        this.controladorProductos = new ControladorProductos()
    }

    start(){

        const schema = buildSchema(`
            type Producto {
                _id: ID!
                title: String
                price: Int
                thumbnail: String
            },
            input ProductoInput {
                title: String
                price: Int
                thumbnail: String
            },
            type Query {
                obtenerProducto(id: Int!): Producto
            },
            type Mutation {
                guardarProducto(datos: ProductoInput): Producto
                actualizarProducto(id: ID!, datos: ProductoInput): Producto
                borrarProductos(id: ID!): Producto
            },
        `);

        let root = {
            obtenerProducto: this.controladorProductos.obtenerProducto,
            guardarProducto: this.controladorProductos.guardarProducto,
            actualizarProducto: this.controladorProductos.actualizarProducto,
            borrarProductos: this.controladorProductos.borrarProductos
        };

        productosRoute.use('/', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true
        }));

        return productosRoute
    }
}

module.exports = RouterProductos
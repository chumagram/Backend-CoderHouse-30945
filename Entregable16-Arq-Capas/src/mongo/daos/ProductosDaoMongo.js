const ContenedorMongo = require('../container/ContenedorMongoDb.js');
const Model = require('../models/productoModel.js');
const URL = process.env.MONGODB_URI;
const myLogs = require('../../utils/logsGenerator');

class ProductosMongo extends ContenedorMongo {
    constructor(model,url){
        super(model,url);
        /* this.model == model;
        this.url == url; */
    }

    // CREAR UN NUEVO PRODUCTO SI ES QUE YA NO EXISTE, SINO ACTUALIZA EL STOCK
    async createProduct(productToAdd){
        try {
            await this.createMongo(productToAdd);
            return { hecho: `Producto creado con éxito`};
        } catch (error) {
            myLogs.showError(error);
            return { error: `Falla al agregar el Producto` }
        }
    }

    // LEER TODOS LOS PRODUCTOS ALMACENADOS
    async readAllProducts(){
        try {
            let readed = await this.readAllMongo();
            return readed;
        } catch (error) {
            myLogs.showError(error);
            return { error: `Falló la lectura de la lista de productos: ${error}` }
        }
    }
}

let productMongo = new ProductosMongo(Model,URL);

let productoAux = {
    title: 'Biblia',
    price: 1600,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/funeral-filloutline/64/bible-church-book-cultures-christianity-christian-religion-education-512.png'
}

//Conectarse a la base de datos
productMongo.connectToDB();

// MODULO QUE CREA UN PRODUCTO
//productMongo.createProduct(productoAux).then((res) => console.log(res));

// MODULO QUE LEE TODOS LOS PRODUCTOS
//productMongo.readAllProducts().then((res) => console.log(res));

module.exports = productMongo;
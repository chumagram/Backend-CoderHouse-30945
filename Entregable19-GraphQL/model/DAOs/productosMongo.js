const ProductosBaseDAO = require('./productos')
const mongoose = require('mongoose');

class ProductosMongo extends ProductosBaseDAO {
    constructor(model,url){
        super();
        (async()=>{
            console.log('Conectando a la base de datos...')
            this.url = url;
            await mongoose.connect(this.url,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Base de datos conectada')
        })();
    }

    guardarProducto = async object => {
        let retorno = this.checkId().then(async (id) => {
            try {
                this.lastID = id + 1;
                object.ourId = this.lastID;
                let added = await this.model.insertMany(object);
                return added;
            } catch (error) {
                return error;
            }
        });
        return retorno;
    }

    obtenerProductos = async prop => {
        try {
            if (prop){
                let document = await this.model.find(prop);
                return document;
            } else {
                let document = await this.model.find({});
                return document;
            }
        } catch (error) {
            return {error: `obtenerProductos error: ${error}`};
        }
    }

    actualizarProducto = async (idFind, change) => {
        if (typeof idFind == 'string'){
            try {
                let updated = await this.model.updateOne({id: idFind},{$set: change});
                return updated;
            } catch (error) {
                return error;
            }
        }
    }

    borrarProductos = async (idFind) => {
        try {
            if (idFind) {
                if (typeof idFind == 'number') {
                    deleted = await this.model.deleteOne().where({ourId:{$eq: idFind}});
                    return deleted;
                }
            } else {
                await this.model.deleteMany({});
                return true;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductosMongo;
const ProductosBaseDAO = require('./productos')
const mongoose = require('mongoose');

class MensajesMongo extends ProductosBaseDAO {

    async addMessage(text,email){
        let doc = await usersMongo.readUser(email);
        const date = new Date();
        let auxMesagge = {
            author: {
                id: doc.id,
                name: doc.name,
                age: doc.age,
                alias: doc.alias,
                avatar: doc.avatar
            },
            text: text,
            timeStamp: date.toLocaleDateString() + "-" + date.toLocaleTimeString()
        }

        try {
            await this.createMongo(auxMesagge);
            return {hecho: `Mensaje de ${email} añadido con éxito`};
        } catch (error) {
            myLogs.showError (error);
            return {error: `Falló el añadir mensaje de ${email}`};
        }
    }

    async readAllMessage(){
        try {
            let readed = await this.readAllMongo();
            let clearMongo = [];
            readed.forEach(element => {
                let auxMesagge = {
                    id: element.id,
                    author: {
                        id: element.author.id,
                        name: element.author.name,
                        age: element.author.age,
                        alias: element.author.alias,
                        avatar: element.author.avatar
                    },
                    text: element.text,
                    timeStamp: element.timeStamp
                }
                clearMongo.push(auxMesagge);
            })
            return clearMongo
        } catch (error) {
            myLogs.showError (error);
            return { error: `Falló la lectura de la lista de mensajes: ${error}` }
        }
    }

    constructor(model,url){
        super();
        this.model = model;
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

module.exports = MensajesMongo;
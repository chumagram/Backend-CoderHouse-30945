const ContenedorMongo = require('../container/ContenedorMongoDb.js');
const Model = require('../models/mensajeModel.js');
const usersMongo = require('./UsuariosDaoMongo.js')
const URL = process.env.MONGODB_SCHOOLSTORE;
const myLogs = require('../../utils/logsGenerator');

class ProductosMongo extends ContenedorMongo {
    constructor(model,url){
        super(model,url);
    }

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
}

let messageMongo = new ProductosMongo(Model,URL);

//Conectarse a la base de datos
messageMongo.connectToDB();

// MODULO QUE CREA UN MENSAJE
//messageMongo.addMessage('hola','stannisbaratheon@gmail.com').then((res) => console.log(res));

// MODULO QUE LEE TODOS LOS MENSAJES
//messageMongo.readAllMessage().then((res) => console.log(res));

module.exports = messageMongo;
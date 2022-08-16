const ContenedorMongo = require('../container/ContenedorMongoDb.js');
const Model = require('../models/usuariosModel.js');
const URL = process.env.MONGODB_URI;

class UsuariosMongo extends ContenedorMongo {
    constructor(model,url){
        super(model,url);
    }

    // CREAR UN NUEVO USUARIO
    async addUser(userToAdd){
        try {
            let doc = await this.readMongo({id: userToAdd.id});
            if (doc.length == 0) {
                let created = await this.createMongo(userToAdd);
                return { hecho: `Usuario con ID ${created[0].id} creado con éxito`};
            } else {
                return { found: `el email ${userToAdd.id} ya existe`};
            }
        } catch (error) {
            return { error: `Falla al agregar el usuario ${userToAdd.id}` }
        }
    }

    // LEER UN USUARIO SEGUN SU MAIL
    async readUser(email){
        try {
            let readed = await this.readMongo({id: email});
            if (readed.length == 0){
                return {notFound: `No se encontró el usuario con email ${email}`}
            } else {
                let foundUser = {
                    id: readed[0].id,
                    password: readed[0].password,
                    name: readed[0].name,
                    age: readed[0].age,
                    alias: readed[0].alias,
                    avatar: readed[0].avatar,
                    session: readed[0].session
                }
                return foundUser;
            }
        } catch (error) {
            return {error: `Falla al leer el Usuario ${email} -> ${error}`};
        }
    }

    async updateUser(email,changes){
        try {
            await this.updateMongo(email,changes);
            return {hecho: `Usuario actualizado con éxito`}
        } catch (error) {
            return {error: error}
        }
    }
}

let usersMongo = new UsuariosMongo(Model,URL);

//Conectarse a la base de datos
usersMongo.connectToDB();

module.exports = usersMongo;
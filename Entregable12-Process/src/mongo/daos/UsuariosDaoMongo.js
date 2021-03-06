const ContenedorMongo = require('../container/ContenedorMongoDb.js');
const Model = require('../models/usuariosModel.js');
const URL = process.env.MONGODB_SCHOOLSTORE;

class UsuariosMongo extends ContenedorMongo {
    constructor(model,url){
        super(model,url);
        /* this.model == model;
        this.url == url; */
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

let usuarioAux1 = {
    email: "robstark@gmail.com",
    name: "Rob",
    lastName: "Stark",
    age: "24",
    alias: "Rob",
    avatar: "/images/escudoStark.webp"
}
let usuarioAux2 = {
    email: "stannisbaratheon@gmail.com",
    name: "Stannis",
    lastName: "Bartheon",
    age: "43",
    alias: "Stannis",
    avatar: "/images/escudoBaratheon.webp"
}
let usuarioAux3 = {
    email: "eurongreyjoy@gmail.com",
    name: "Euron",
    lastName: "Greyjoy",
    age: "39",
    alias: "Euron",
    avatar: "/images/escudoGreyjoy.webp"
}

//Conectarse a la base de datos
usersMongo.connectToDB();

// MODULO QUE CREA UN USUARIO
//usersMongo.addUser(usuarioAux3).then((res) => console.log(res));

// MODULO QUE LEE UN USUARIO POR MAIL
//usersMongo.readUser('eurongreyjoy@gmail.com').then((res) => console.log(res));

// MODULO QUE LEE TODOS LOS USUARIOS

// MODULO QUE ACTUALIZA UN USUARIO SEGUN MAIL

// MODULO QUE ELIMINA UN USUARIO SEGÚN SU MAIL

// MODULO QUE ELIMINA TODOS LOS USUARIOS

module.exports = usersMongo;
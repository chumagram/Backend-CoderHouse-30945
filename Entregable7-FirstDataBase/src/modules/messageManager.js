const { options } = require('../options/sqLite3.js');

class Historial {
    constructor(){
        this.opt = options;
        this.tableName = tableName;
    }

    addMessage(object){
        const insertContainer = (knex) => {
            knex(this.tableName).insert(object)
            .then((result) => {
                console.log("Objeto insertado correctamente",result);
            }).catch((err) => {
                console.log('ERROR:',err);
            }).finally(() => {
                knex.destroy()
            });
        }
        
        insertContainer(this.knexCall());
    }

    async allMessages(){
        let retorno;
        const getAllFrom = (knex) => {
            return new Promise((resolve, reject) => {
                knex(this.tableName).select("email", "message")
                .then((result) => {
                    console.log(`TABLA ${this.tableName}: ${result}`);
                    resolve(result)
                }).catch((err) => {
                    console.log('Ocurrio un error:',err);
                    reject(err);
                }).finally(() =>{
                    knex.destroy();
                });
            })
        }
        retorno = await getAllFrom(this.knexCall())
        .then( (result) => {
            return result;
        });
        return retorno;
    }

    deleteMessages(){
        const deleteProducts = (knex) => {
            knex(this.tableName).del()
            .then((result) => {
                let ready = `se borraron todos los elementos (${result})`;
                console.log(ready);
                return {Hecho: ready}
            }).catch((err) => {
                console.log(err);
                return {Error: err.message}
            }).finally(() => {
                knex.destroy()
            });
        }
        
        deleteProducts(this.knexCall());
    }
}

let mensajes = new Historial('mensajes');

const newMensaje = {
    email: "entregable7@gmail.com",
    message: "¡Bienvenido al chat del Entregable 7!"
};

//mensajes.addMessage(newMensaje);
//mensajes.deleteMessages();
//console.log(mensajes.allMessages());

module.exports = mensajes;
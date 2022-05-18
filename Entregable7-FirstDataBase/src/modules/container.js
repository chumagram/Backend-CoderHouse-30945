const { options } = require('../options/mariaDB.js');

class Contenedor {

    constructor(options, tableName){
        this.opt = options;
        this.tableName = tableName; 
    }

/* ----- Metodo que llama a KNEX con las opciones ----- */
    knexCall(){
        const knexMysql = require('knex')(this.opt);
        return knexMysql
    }

/* ----- Metodo que inserta un nuevo objeto a la tabla ----- */
    insert(object){
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

/* ----- Metodo que devuelve un objeto segun su id ----- */
    async getById(idObject){
        let devolver;
        const getProduct = (knex) => {
            return new Promise((resolve, reject) => {
                knex(this.tableName).where({id:idObject}).select("id", "title",  "price", "stock")
                .then( (result) => {
                    console.log(`El producto de id ${idObject} es: ${result}`);
                    resolve (result);
                }).catch((err) => {
                    console.log('Ocurrio un error:',err);
                    reject (err) ;
                }).finally(() =>{
                    knex.destroy();
                });
            });
        }

        devolver =  await getProduct(this.knexCall())
        .then((result) => {
            return result;
        });
        return devolver;
    }

/* ----- Metodo que devuelve todos los productos ----- */
    async getAll() {
        let retorno;
        const getAllFrom = (knex) => {
            return new Promise((resolve, reject) => {
                knex(this.tableName).select("id", "title", "thumbnail", "price")
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

/* ----- Metodo que elimina un producto según ID ----- */
    deleteById(id){
        const deleteProducts = (knex) => {
            knex(this.tableName).del().where('id', '=', id)
            .then((result) => {
                if (result == 0){
                    return {Error: `No se encotró el elento con ID${id}`};
                } else{
                    let ready = `se borró el elemento (${id})`;
                    console.log(ready);
                    return {Hecho: ready}
                }
            }).catch((err) => {
                console.log(err);
                return {Error: err.message}
            }).finally(() => {
                knex.destroy()
            });
        }
        deleteProducts(this.knexCall());
    }

/* ----- Metodo que elimina todos los productos de una tabla ----- */
    deleteAll(){
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

/* ----- Metodo que elimina todos los productos de una tabla ----- */
    updateById(idObject, objectToUpdate){
        const updateProducts = (knex) => {
            knex(this.tableName).where({id:idObject}).update(objectToUpdate)
            .then((result) => {
                console.log('Objeto Actualizado: ', objectToUpdate);
                console.log('ID del objeto: ', idObject);
            }).catch((err) => {
                console.log('Error: ', err);
            }).finally(() =>{
                knex.destroy();
            });
        }
        updateProducts(this.knexCall());
    }
}

// Creacion de la clase container
let container = new Contenedor(options, "libreria");

let prueba = {
    title: "Biblia",
    price: "1200",
    thumbnail: "https://cdn1.iconfinder.com/data/icons/funeral-filloutline/64/bible-church-book-cultures-christianity-christian-religion-education-512.png"
}

//Uso del método "insert" (FUNCIONA)
container.insert(prueba);

// Uso del método getById (NO FUNCIONA)
//console.log(container.getById(1));

// Uso del método "getAll" (NO FUNCIONA)
//console.log(container.getAll());

// Uso del método deleteById (FUNCIONA)
//container.deleteById(7);

// Uso del método deleteAll (FUNCIONA)
//container.deleteAll();

// Uso del método updateById
//container.updateById(1,prueba2)

module.exports = container;
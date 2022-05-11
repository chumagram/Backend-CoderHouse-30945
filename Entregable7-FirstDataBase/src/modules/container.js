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
    async getById(id) {
        try {
            const contenido = await this.knexCall().from(this.tableName)
            .select('*').where('id', '=', id);

            console.log({contenido});

            if (contenido.length === 0) {
                return null;
            } else {
                return contenido[0];
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

/* ----- Metodo que devuelve todos los productos ----- */
    async getAll() {
        try{
            const contenido = await knex().from(this.tableName).select('*');
            if (contenido.length === 0) {
                return null;
            } else {
                return contenido;
            }
        } catch (error) {
            console.error('Error:', error);
        }
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

    updateById(numero, objeto){
        const updateProducts = (knex) => {
            knex('productos').where({id: numero}).update({name: 'Lavarropa'})
            .then((result) => {
                console.log(`se borraron todos los elementos(${result})`);
                return {Hecho:`se borraron todos los elementos(${result})`}
            }).catch((err) => {
                console.log(err);
                return {Error: err.message}
            });
        }
        
        updateProducts(knexMysql);
    }
}

// Creacion de la clase container
let container = new Contenedor(options, "contenedor");

let prueba = {
        name: "Sable laser",
        price:120,
        stock: 109,
        code: 123456987234,
        description:"Tremendo sable laser re fachero, original que lo uso darth vader para exterminar jedis en la orden 66.",
        thumbnail: "https://as.com/meristation/imagenes/2021/05/05/betech/1620209195_059699_1620209343_sumario_grande.jpg"
}

// Uso del método "insert" (FUNCIONA)
//container.insert(prueba);

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
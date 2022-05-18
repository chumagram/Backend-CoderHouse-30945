const { knexMysql } = require('./options/mariaDB.js');
const { knexSqLite } = require('./options/sqLite3');

const createProductsTable = async knexOptions => {
    const knex = require('knex')(knexOptions);
    await knex.schema.createTable('libreria', table => {
        table.increments('id').primary();
        table.string('title');
        table.integer('price');
        table.string('thumbnail');
    })
    .then(() => console.log("table created"))
    .catch((err) => {
        console.log('ERROR AL CREAR LA TABLA:',err);
        throw err;
    })
    .finally(() => knex.destroy());
}

const createMessagesTable = async knexOptions => {
    const knex = require('knex')(knexOptions)
    await knex.schema.createTable('mensajes', table => {
        table.increments('id').primary();
        table.string('email');
        table.string('message');
    })
    .then((result) => {
        console.log("table created")
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => knex.destroy());
}

createProductsTable(knexMysql);
createMessagesTable(knexSqLite);
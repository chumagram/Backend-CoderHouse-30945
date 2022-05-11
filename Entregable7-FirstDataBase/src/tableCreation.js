const { knexMysql } = require('./options/mariaDB.js');
const { knexSqLite } = require('./options/sqlLite3');

const createProductsTable = async knex => {
    await knex.schema.createProductsTable("contenedor", table => {
        table.increments('id').primary();
        table.string('name');
        table.integer('price');
        table.integer('stock');
        table.integer('code');
        table.string('description');
        table.string('thumbnail');
    })
        .then(() => console.log("table created"))
        .catch((err) => {
            console.log(err);
            throw err;
        })
        .finally(() => knex.destroy());
}

const createMessagesTable = async knex => {
    await knex.schema.createMessagesTable("mensajes", table => {
        table.increments('id').primary();
        table.string('email');
        table.string('message');
    })
        .then(() => console.log("table created"))
        .catch((err) => {
            console.log(err);
            throw err;
        })
        .finally(() => knex.destroy());
}

createProductsTable(knexMysql);
createMessagesTable(knexSqLite);
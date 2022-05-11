const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: '../data/contenedor.sqlite'
    },
    useNullAsDefault: true
})

module.exports = { knexSqLite };
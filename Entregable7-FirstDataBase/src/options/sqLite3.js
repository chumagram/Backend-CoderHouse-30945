const path = require('path');

const knexSqLite = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../data/contenedor.sqlite')
    },
    useNullAsDefault: true
}

module.exports = { knexSqLite };
const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1', //esto es el localhost
        user: 'root',
        password: '',
        database: 'contenedor'
    },
    pool: {min: 0, max: 10}
}

module.exports = { options };
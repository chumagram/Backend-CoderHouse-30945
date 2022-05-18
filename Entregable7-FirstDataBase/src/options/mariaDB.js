const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'contenedor'
    },
    pool: {min: 0, max: 13}
}

module.exports = { options };
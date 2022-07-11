const yargs = require('yargs/yargs')(process.argv.slice(2))

function getPort() {
    let port = yargs.argv._[0]
    if (port){
        return port
    } else return 8080
}

module.exports = {getPort}
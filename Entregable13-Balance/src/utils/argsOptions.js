const yargsPort = require('yargs/yargs')(process.argv.slice(2))
const yargsServerMode = require('yargs/yargs')(process.argv.slice(3))

function getPort() {
    let port = yargsPort.argv._[0]
    if (port){
        if (typeof port === 'number'){
            return port
        } else {
            console.log(`El parámetro "${port}" debe ser un número`)
            process.exit(1)
        }
    } else return 8080
}

function serverMode() {
    let mode = yargsServerMode.argv._[0]
    if (mode){
        if(mode == 'FORK'|| mode == 'CLUSTER'){
            return mode
        } else {
            console.log(`Parámetro "${mode}" incorrecto. Iniciando en modo FORK...`);
            return 'FORK'
        }
    } else {
        console.log('Iniciando en modo predeterminado (FORK)...');
        return 'FORK'
    } 
}

module.exports = {
    getPort,
    serverMode
}
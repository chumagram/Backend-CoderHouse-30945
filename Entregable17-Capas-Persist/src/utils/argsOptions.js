const argv = require('yargs/yargs')(process.argv.slice(2)).argv
const myLogs = require('./logsGenerator')

function getPort() {
    try {
        let port = argv.port
        if (typeof port === 'number'){
            return port
        } else {
            console.log(`El parámetro "${port}" debe ser un número`)
            process.exit(1)
        }
    } catch (error) {
        return 8080
    }
}

function serverMode() {
    let mode = argv.mode
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

function pickDb(){
    
    let db = argv.db
    if (db){
        if(db == 'MongoDB' || 'Files' || 'Firebase'){
            return db
        } else {
            myLogs.showError('Bash error: en el parámetro DB')
            process.exit(1)
        }
    } else {
        return 'MongoDB'
    }
}

module.exports = {
    getPort,
    serverMode,
    pickDb,
}
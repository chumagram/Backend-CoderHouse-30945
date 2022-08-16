const {pickDb} = require('../../utils/argsOptions')
const myLogs = require('../../utils/logsGenerator')
const db = pickDb()

let messagesDao // llamamos a la base de datos seleccionada
if (db == 'MongoDB') messagesDao = require('../mongo/daos/MensajesDaoMongo');
if (db == 'Firebase') myLogs.showError('Firebase aún no está implementado');
if (db == 'Files') myLogs.showError('Files aún no está implementado');

async function addMsg(text, mail){
    const dto = await messagesDao.addMessage(text, mail)
    return dto
}

async function getAllMsg(){
    const dto = await messagesDao.readAllMessage();
    return dto
}

module.exports = {
    addMsg,
    getAllMsg
}
const {pickDb} = require('../../utils/argsOptions')
const myLogs = require('../../utils/logsGenerator')
const db = pickDb()

let usersDao // llamamos a la base de datos seleccionada
if (db == 'MongoDB') usersDao = require('../mongo/daos/UsuariosDaoMongo');
if (db == 'Firebase') myLogs.showError('Firebase aún no está implementado');
if (db == 'Files') myLogs.showError('Files aún no está implementado');

async function addUser(userToAdd){
    const dto = await usersDao.addUser(userToAdd)
    return dto
}

async function readUser(email){
    const dto = await usersDao.readUser(email);
    return dto
}

async function updateUser(email,changes){
    const dto = await usersDao.updateUser(email,changes);
    return dto
}

module.exports = {
    addUser,
    readUser,
    updateUser
}
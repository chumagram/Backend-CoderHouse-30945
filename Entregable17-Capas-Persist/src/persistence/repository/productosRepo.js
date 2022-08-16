const {pickDb} = require('../../utils/argsOptions')
const myLogs = require('../../utils/logsGenerator')
const db = pickDb()

let productosDao // llamamos a la base de datos seleccionada
if (db == 'MongoDB') productosDao = require('../mongo/daos/ProductosDaoMongo');
if (db == 'Firebase') myLogs.showError('Firebase aún no está implementado');
if (db == 'Files') myLogs.showError('Files aún no está implementado');

async function addProd(text, mail){
    const dto = await productosDao.createProduct(text, mail)
    return dto
}

async function getAllProd(){
    const dto = await productosDao.readAllProducts();
    return dto
}

module.exports = {
    addProd,
    getAllProd
}
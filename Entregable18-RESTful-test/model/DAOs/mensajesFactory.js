const MensajesMemDAO = require('./mensajesMem')
const MensajesFileDAO = require('./mensajesFile')
const MensajesDBMongo = require('./mensajesMongo')

class MensajesFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case 'MEM': return new MensajesMemDAO()
            case 'FILE': return new MensajesFileDAO(process.cwd()+'/mensajes.json')
            case 'MONGO': return new MensajesDBMongo('mibase','mensajes')
            default: return new MensajesMemDAO()
        }
    }
}

module.exports = MensajesFactoryDAO
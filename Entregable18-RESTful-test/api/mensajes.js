const config = require ('../config/envPath')
const MensajesFactoryDAO = require ('../model/DAOs/mensajesFactory')
const Mensajes = require ('../model/models/mensajes')

class ApiMensajes {

    constructor(){
        this.mensajesDAO = MensajesFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }

    async obtenerMensajes(id) {return await this.mensajesDAO.obtenerMensajes(id)}

    async guardarNoticia(noticia){
        ApiMensajes.asegurarNoticiaValida(noticia, true)
        return await this.mensajesDAO.guardarNoticia(noticia)
    }

    async actualizarNoticia(id, noticia){
        ApiMensajes.asegurarNoticiaValida(noticia, true)
        return await this.mensajesDAO.actualizarNoticia(id, noticia)
    }

    async borrarMensajes(id) {return await this.mensajesDAO.borrarNoticia(id)}

    static asegurarNoticiaValida(noticia, requerido){
        try {
            Mensajes.validar(noticia, requerido)
        } catch (error) {
            throw new Error('la noticia posee un formato json invalido o faltan datos: '+ error.details[0].message)
        }
    }
}

module.exports = ApiMensajes
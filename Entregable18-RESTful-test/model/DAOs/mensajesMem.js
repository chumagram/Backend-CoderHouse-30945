const MensajesBaseDAO = require('./mensajes')

class MensajesMemFileDAO extends MensajesBaseDAO {
    constructor(){
        super()
        this.mensajes = []
    }

    obtenerMensajes = async _id => {
        try {
            if (_id) {
                let index = this.mensajes.findIndex(mensaje => mensaje._id == _id)
                return index >= 0? [this.mensajes[index]] : []
            } else {
                return this.mensajes
            }
        } catch (error) {
            console.log('error en obtenerMensajes', error)
            return []
        }
    }

    guardarMensaje = async mensaje => {
        try {
            let _id = this.getNext_Id(this.mensajes)
            let fyh = new Date().toLocaleString()
            let mensajeGuardada = mensajeDTO(mensaje, _id, fyh)
            this.mensajes.push(mensajeGuardada)
            return mensajeGuardada
        } catch (error) {
            console.log('error en guardarMensaje:', error)
            let mensaje = {}
            return mensaje
        }
    }

    actualizarMensajeguardarMensaje = async (_id, mensaje) => {
        try {
            let fyh = new Date().toLocaleString()
            let mensajeNew = mensajeDTO(mensaje, _id , fyh)

            let indice = this.getIndex(_id, this.mensajes)
            let mensajeActual = this.mensajes[indice] || {}

            let mensajeActualizada = {...mensajeActual, ...mensajeNew}

            indice >=0?
                this.mensajes.splice(indice, 1, mensajeActualizada) : 
                this.mensajes.push(mensajeActualizada)
            
            return mensajeActualizada
        } catch (error) {
            console.log('error en actualizarMensajeguardarMensaje:', error)
            let mensaje = {}

            return mensaje
        }
    }

    borrarMensajeguardarMensaje = async _id => {
        try {
            let indice = this.getIndex(_id, this.mensajes)
            let mensajeBorrada = this.mensajes.splice(indice, 1)[0]

            return mensajeBorrada
        } catch (error) {
            console.log('error en borrarMensajeguardarMensaje:', error)
            let mensaje = {}

            return mensaje
        }
    }
}

module.exports = MensajesMemFileDAO
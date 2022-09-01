const ApiMensajes = require ('../Api/mensajes.js')

class ControladorMensajes {

    constructor(){
        this.apiMensajes = new ApiMensajes()
    }

    obtenerMensaje = async (req,res) => {
        try {
            let id = req.params.id
            let Mensajes = await this.apiMensajes.obtenerMensajes(id)
        } catch (error) {   
            console.log('error obtenerMensajes', error)
        }
    }

    guardarMensaje = async (req,res) => {
        try {
            let Mensaje = req.body
            let MensajeGuardada = await this.apiMensajes.guardarMensaje(Mensaje)

            res.json(MensajeGuardada)
        } catch (error) {   
            console.log('error guardarMensajes', error)
        }
    }

    actualizarMensaje = async (req,res) => {
        try {
            let Mensaje = req.body
            let id = req.params.id
            let MensajeActualizada = await this.apiMensajes.actualizarMensaje(id,Mensaje)
            res.json(MensajeActualizada)
        } catch (error) {   
            console.log('error actualizarMensajes', error)
        }
    }

    borrarMensaje = async (req,res) => {
        try {
            let id = req.params.id
            let MensajeBorrado = await this.apiMensajes.borrarMensaje(id)
            res.json(MensajeBorrado)
        } catch (error) {   
            console.log('error borrarMensajes', error)
        }
    }
}

module.exports = ControladorMensajes
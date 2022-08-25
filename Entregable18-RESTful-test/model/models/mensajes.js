const Joi = require('joi');

class Mensajes {
    constructor(author, text, timeStamp){
        this.author = author;
        this.text = text;
        this.timeStamp = timeStamp
    }

    equals(otroMensajes){
        if (!(otroMensajes instanceof Mensajes)) {
            return false
        }
        if (this.author != otroMensajes.author){
            return false
        }
        if (this.text != otroMensajes.text){
            return false
        }
        if (this.timeStamp != otroMensajes.timeStamp){
            return false
        }
        return true
    }

    static validar(mensaje, requerido){
        const MensajeSchema = Joi.object({
            author: requerido? Joi.string().required() : Joi.string(),
            text: requerido? Joi.string().required() : Joi.string(),
            timeStamp: requerido? Joi.string().required() : Joi.string()
        })

        const {error} = MensajeSchema.validate(mensaje)
        if (error){
            throw error
        }
    }
}

module.exports = Mensajes
const Joi = require('joi');

class Productos {
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail
    }

    equals(otroProductos){
        if (!(otroProductos instanceof Productos)) {
            return false
        }
        if (this.title != otroProductos.title){
            return false
        }
        if (this.price != otroProductos.price){
            return false
        }
        if (this.thumbnail != otroProductos.thumbnail){
            return false
        }
        return true
    }

    static validar(producto, requerido){

        const ProductoSchema = Joi.object({
            title: requerido? Joi.string().required() : Joi.string(),
            price: requerido? Joi.number().required() : Joi.number(),
            thumbnail: requerido? Joi.string().required() : Joi.string()
        })

        const {error} = ProductoSchema.validate(producto)
        if (error){
            throw error
        }
    }
}

module.exports = Productos
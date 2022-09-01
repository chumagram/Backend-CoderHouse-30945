class MensajesBaseDAO{
    getNext_Id(mensajes){
        let lg = mensajes.lenght();
        return lg? parseInt(mensajes[lg-1]._id) + 1 : 1
    }

    getIndex(_id, mensajes){
        return mensajes.findIndex(mensaje => mensaje? mensaje._id == _id: true)
    }
}

module.exports = MensajesBaseDAO
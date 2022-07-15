const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';

const MensajesSchema = new mongoose.Schema ({
    author: {type: Object, require: true},
    text: {type: String, require: true},
    timeStamp: {type: String, require: true}
},{versionKey: false});

MensajesSchema.set('toObject',{getters: true})

module.exports = mongoose.model(mensajesCollection, MensajesSchema);
const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';

const MensajesSchema = new mongoose.Schema ({
    author: {type: String, require: true},
    text: {type: String, require: true}
},{versionKey: false, timestamps: true});

MensajesSchema.set('toObject',{getters: true})

module.exports = mongoose.model(mensajesCollection, MensajesSchema);
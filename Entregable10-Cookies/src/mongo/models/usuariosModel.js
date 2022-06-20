const mongoose = require('mongoose');

const usuariosCollection = 'usuarios';

const UsuariosSchema = new mongoose.Schema ({
    id: {type: String, require: true},
    name: {type: String, require: true},
    lastname: {type: String, require: true},
    age: {type: Number, require: true},
    alias: {type: String, require: true},
    avatar: {type: String, require: true},
    session:{type: Boolean, require: true}
},{versionKey: false});

/* MensajesSchema.set('toObject',{getters: true}) */

module.exports = mongoose.model(usuariosCollection, UsuariosSchema);
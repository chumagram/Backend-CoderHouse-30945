const mongoose = require('mongoose');

const containerCollection = 'container';

const ContainerSchema = new mongoose.Schema ({
    ourId: {type: Number, require: true}
},{versionKey: false, timestamps: true});

module.exports = mongoose.model(containerCollection, ContainerSchema);
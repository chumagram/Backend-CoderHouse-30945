const mongoose = require('mongoose');

const productosCollection = 'productos';

const productoSchema = new mongoose.Schema ({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
},{versionKey: false, timestamps: true});

module.exports = mongoose.model(productosCollection, productoSchema);
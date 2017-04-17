const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    image: String,
    title: String,
    author: String,
    pages: Number,
    price: Number,
    year: Number,
    description: String,
    sellerInfo: {name:String, address:String},
    buyersInfo: {}
}, { minimize: false });

const ModelClass = mongoose.model('book', bookSchema);

module.exports = ModelClass;

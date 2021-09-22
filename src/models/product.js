const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    value: Number,
    status: Boolean
});

module.exports = mongoose.model('products', productSchema);

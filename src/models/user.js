const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    }, 
    password: String
})

module.exports = mongoose.model('users', User)
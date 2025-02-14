const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type :String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', user)

module.exports = User
const mongoose = require('mongoose');

const useridschema = new mongoose.Schema({
    fname: {
        type: String, required: true
    },
    lname: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    token: {
        type: String, require: false
    }
})

const userModel = mongoose.model('users', useridschema);


module.exports = userModel
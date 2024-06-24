const mongoose = require('mongoose');
const { array } = require('../middleweres/uploads');

const blogschema = new mongoose.Schema({
    blog: String,
    poster : String,
    description: String
});

module.exports = mongoose.model('blogs' , blogschema);



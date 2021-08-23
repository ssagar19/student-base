const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    fname: String,
    branch: String,
    marks: Number,
    school: String,
    place: String
});

module.exports = mongoose.model('Post', productSchema);
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bookSchemaa = new mongoose.Schema
({
    name:"string",
    author:{type: ObjectId, ref:"myauthor"},
    publisher:{type: ObjectId, ref:"MyPublisher"},
    price:"number",
    ratings:"number",
})

module.exports = mongoose.model('mybook', bookSchemaa)
 
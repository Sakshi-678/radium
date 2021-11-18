const mongoose = require('mongoose')

const bookSchema3 = new mongoose.Schema
    ({
        name: "string",
        author_id: "number",
        price: "number",
        ratings: "number"
    },
        { timestamps: true })

module.exports = mongoose.model('authorbook', bookSchema3)







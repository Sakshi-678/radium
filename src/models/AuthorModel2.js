const mongoose = require('mongoose')

const bookSchemaa = new mongoose.Schema

 ({ author_name:"string",
        age:"Number",
        address:"string"
        })

   module.exports = mongoose.model('myauthor', bookSchemaa)
 
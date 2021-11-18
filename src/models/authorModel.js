const mongoose=require('mongoose')

const authorSchema= new mongoose.Schema
    ({author_id:"number",
      author_name:"string",
      age:"number",
      address:"string"},
      {timestamps: true})

      module.exports = mongoose.model( 'author',authorSchema)
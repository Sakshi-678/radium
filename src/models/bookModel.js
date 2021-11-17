const mongoose=require('mongoose')

const bookSchema= new mongoose.Schema
    ({bookName: String, 
    authorName: String,
    tags : [String],
    year: Number,
    
    ispublished:{
        type:Boolean,
        stockavailable:true,
    },
    price:{
        indianprice:String,
        europeanprice:String,
    },
    
    category: String,
    totalpages: Number,

}, {timestamps: true})

module.exports = mongoose.model( 'book',bookSchema)
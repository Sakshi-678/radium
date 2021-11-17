const bookModel= require("../models/bookModel.js")
const mongoose = require("mongoose")

const newbookData= async function (req, res){
   var data = req.body
   let savedData= await bookModel.create(data)
   res.send({msg: data})
}

const getbookData= async function (req, res){
  letallBooks= await bookModel.find()
  res.send({msg: allbooks})
}
//new assignment
const createBook= async function (req, res){
  var book = req.body
  let savedData= await bookModel.create(book)
  res.send({msg: book})

}

const getbooklist= async function (req, res){
  let allbook= await bookModel.find().select({bookName:1, authorName:1})
  res.send({msg: allbook})
}


const getBooksInYear= async function (req, res){
  var data = req.body
  let allbook= await bookModel.find({year:req.body.year})
  res.send({msg: allbook})

}
const getParticularBooks= async function(req, res){
  var data = req.body
  let savedData= await bookModel.find({data})
  res.send({msg: savedData})
}


const getXINRBooks= async function (req, res){
  let allbook= await bookModel.find({'prices.indianPrice' :
     {$in:['100INR','200INR','500INR'] } } )
	res.send({msg: allbook})	
}


const getRandomBooks= async function (req, res){
    let allbook= await bookModel.find({$or:[{'stockAvailable':'true'},{'totalPages': 
      {$gt: '500'}}]})
    res.send({msg: allbook})
}

module.exports.newbookData= newbookData
module.exports.getbookData= getbookData

module.exports.createBook= createBook
module.exports.getbooklist= getbooklist
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks

//letallBooks= await bookModel.find().count()
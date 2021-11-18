const bookModel1 = require("../models/bookmodel1.js")
const authorModel = require("../models/authorModel.js");



const createBook = async function (req, res) {
    const book = req.body
    let allbook = await bookModel1.create(book);
    console.log(allbook);
    res.send({ msg: allbook })
}

const createauthor = async function (req, res) {
    const book = req.body
    let savedData = await authorModel.create(book)
    res.send({ msg: savedData })
}

const authorfind= async function (req, res){
   let data= await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1})
   let id = data[0].author_id
   let books = await bookModel1.find({author_id:id}).select({name:1})
   res.send({msg:books})
   
}

const updateprice= async function (req, res){
    let savedData = await bookModel1.findOneAndUpdate({"name":"Two States"},{$set:{price:100}});
    let updatePrice = savedData.price
    let id = savedData.author_id
    console.log(id)
    let author= await authorModel.find({author_id:id}).select({author_name:1,_id:0})
    console.log(author)
    res.send({msg:author, updatePrice})
 }

 
 const bookfind = async function(req,res){
    let allBooks=await authorModel.find({ "prices" : {$gte:50,$lte:100 } } ).select({author_id:1});
    let len=allBooks.length;
    console.log(len);
    let arr=[];
    for(let i=0;i<len;i++) 
    {
        let id=allBooks[i].author_id;
        let books=await authorModel.find({author_id:id}).select({ author_name:1});
        arr.push(books);
    }
    res.send({msg:arr});
}

module.exports.createBook = createBook
module.exports.createauthor = createauthor
module.exports.authorfind = authorfind
module.exports.updateprice = updateprice
module.exports.bookfind = bookfind
const BookModel2 = require("../models/Bookmodel2.js")
const AuthorModel2 = require("../models/AuthorModel2.js")
const publishermodel = require("../models/publishermodel.js")

const createbook2 = async function (req, res) {
    let data = req.body
    let authorId = req.body.author
    let authorFromRequest = await AuthorModel2.findById(authorId)
    console.log(authorFromRequest)
    let pubId = req.body.publisher
    let pubRequest = await publishermodel.findById(pubId)
    console.log(pubRequest)
    if(authorFromRequest && pubRequest) {
        let bookCreated = await BookModel2.create(data)
        res.send({data: bookCreated})
    }else {
        res.send('The author Id provided is not valid.')
    }
    
};

const createauthor2 = async function (req, res) {
    let data = req.body;
    let savedData = await AuthorModel2.create(data)
    res.send({ msg: savedData });
}


const getallbook= async function (req, res){
let getallbook= await BookModel2.find().populate('author',{author_name:1,age:1});//find()//populate('publisher')
res.send({msg: getallbook})
}

const getbook= async function (req, res){
    let getallbook= await BookModel2.find().populate('author publisher');//find()//populate('publisher')
    res.send({msg: getallbook})
    }

    const publisher= async function (req, res){
    let data = req.body;
    let savedData = await publishermodel.create(data)
    res.send({ msg: savedData });
 }


 
//  const basicroute= async function (req,res){
//      console.log()
//      res.send()
//  }



module.exports.createbook2= createbook2
module.exports.createauthor2= createauthor2
module.exports.getallbook= getallbook
module.exports.publisher= publisher
module.exports.getbook= getbook
//module.exports.basicroute= basicroute
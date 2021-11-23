// const BookModel2 = require("../models/Bookmodel2.js")
// const AuthorModel2 = require("../models/AuthorModel2.js")
// const publishermodel = require("../models/publishermodel.js")
const productmodel = require("../models/productmodel.js")
const ordermodel = require("../models/ordermodel.js")
const USER2model = require("../models/USER2model.js")
//const USER2model = require("../models/USER2model")


// const createbook2 = async function (req, res) {
//     let data = req.body
//     let authorId = req.body.author
//     let authorFromRequest = await AuthorModel2.findById(authorId)
//     console.log(authorFromRequest)
//     let pubId = req.body.publisher
//     let pubRequest = await publishermodel.findById(pubId)
//     console.log(pubRequest)
//     if(authorFromRequest && pubRequest) {
//         let bookCreated = await BookModel2.create(data)
//         res.send({data: bookCreated})
//     }else {
//         res.send('The author Id provided is not valid.')
//     }
    
// };

// const createauthor2 = async function (req, res) {
//     let data = req.body;
//     let savedData = await AuthorModel2.create(data)
//     res.send({ msg: savedData });
// }


// const getallbook= async function (req, res){
// let getallbook= await BookModel2.find().populate('author',{author_name:1,age:1});//find()//populate('publisher')
// res.send({msg: getallbook})
// }

// const getbook= async function (req, res){
//     let getallbook= await BookModel2.find().populate('author publisher');//find()//populate('publisher')
//     res.send({msg: getallbook})
//     }

//     const publisher= async function (req, res){
//     let data = req.body;
//     let savedData = await publishermodel.create(data)
//     res.send({ msg: savedData });
//  }




const createOrder = async function (req, res) {
    // user validation
    let userId = req.body.userId
    let productId = req.body.productId
    //let appHeaderType = req.headers['isfreeapp']
    let appTypeFree = req.isFreeAppUser//This attribute was set in the appMiddleware
    let orderAmount
    let orderDate = Date()
    // if(appHeaderType === 'false') {
    //     appTypeFree = false
    // } else {
    //     appTypeFree = true
    // }

    let user = await USER2model.findById(userId)
    if(!user) {
        return res.send({message: "User doesn't exist. Please provide a valid userId"})
    }

    //product validation
    let product  = await productmodel.findById(productId)
    if(!product) {
        return res.send({message: "Product doesn't exist. Please provide a valid productId"})
    }

    //user balance validation
    if(!appTypeFree && user.balance < product.price) {
        return res.send({message: "User doesn't have enough balance to purchase the product"})
    }

    if(appTypeFree) {
        orderAmount = 0
    } else {
        //paid app
        orderAmount = product.price
    }

    let orderDetails = {
        userId: userId,
        productId: productId,
        amount: orderAmount,
        isFreeAppUser: appTypeFree, 
        date: orderDate
    }

    let orderCreated = await ordermodel.create(orderDetails)
    
   if(!appTypeFree) {
       await USER2model.findOneAndUpdate({_id: userId}, {balance: user.balance - product.price})
   }

   res.send({data: orderCreated})

}


const createproduct = async function (req, res) {
    let productDetails = req.body
    let productCreated = await productmodel.create(productDetails)
    res.send({ data: productCreated})
}

const createUser = async function (req, res) {
    let userDetails = req.body
    // let appType = req.headers['isfreeapp']
    // let userType
    // if(appType === 'false') {
    //     userType = false
    // } else {
    //     userType = true
    // }
    
    userDetails.freeAppUser = req.isFreeAppUser//this attribute was set in req in the appMiddleware
    let userCreated = await USER2model.create(userDetails)
    res.send({data: userCreated})
}


//For JWT session
const login = async function (req, res) {
    userName = req.body.name
    userPassword = req.body.password

    let user = await USER2model.findOne({name: userName, password: userPassword, isDeleted: false})
    if(user) {
        const generatedToken = jwt.sign({userId: user._id}, "radium")
        res.send({status: true, data: user._id, token: generatedToken})
    } else {
        res.send({status: false, message: 'Invalid credentials'})
    }
}

//For JWT session
const getDetails = async function (req, res) {
    let token = req.headers['x-auth-token']
    if(!token) {
        return res.send({status: false, message: 'No authentication token present'})
    } else {
        let decodedToken = jwt.verify(token, 'titanium')
        if(decodedToken) {
            let userDetails = await USER2model.findOne({_id: req.params.userId, isDeleted: false})
            if(userDetails) {
                res.send({status: true, data: userDetails})
            } else {
                res.send({status: false, message: 'User not found'})
            }

        } else {
            res.send({status: false, message: 'Token not valid'})
        }
    }
}


//  module.exports.createbook2= createbook2
// module.exports.createauthor2= createauthor2
// module.exports.getallbook= getallbook
// module.exports.publisher= publisher
// module.exports.getbook= getbook



module.exports.createproduct= createproduct
module.exports.createOrder= createOrder

module.exports.createUser = createUser
module.exports.getDetails = getDetails
module.exports.login = login
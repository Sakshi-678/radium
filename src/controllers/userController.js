const userModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')

    const createUser = async function (req, res) {
        var data = req.body
        let savedData = await userModel.create(data)
        res.send({ msg: savedData })
    }
    

    const login = async function (req, res) {
        userName = req.body.name
        userPassword = req.body.password
    
        let user = await userModel.findOne({ name: userName, password: userPassword, isDeleted: false })
        if (user) {
            const generatedToken = jwt.sign({ userId: user._id }, "Radium")
            res.send({ status: true, data: user._id, token: generatedToken })
        } else {
            res.send({ status: false, message: 'Invalid credentials' })
        }
    }



const getDetails = async function (req, res) {
    let token = req.headers['x-auth-token']
    if (!token) {
        return res.send({ status: false, message: 'No authentication token present' })
    } else {
        let decodedToken = jwt.verify(token, 'Radium')
        if (decodedToken) {
            let userDetails = await userModel.findOne({ _id: req.params.userId, isDeleted: false })
            if (userDetails) {
                res.send({ status: true, data: userDetails })
            } else {
                res.send({ status: false, message: 'User not found' })
            }

        } else {
            res.send({ status: false, message: 'Token not valid' })
        }
    }
}

const updateUser = async function (req, res) {
    // let userId = req.params.userId
    // let emailId = req.body.emailId
    // console.log(emailId)
    let token = req.headers['x-auth-token']
    if (!token) {
        return res.send({ status: false, message: 'No authentication token present' })
    } else {
        let decodedToken = jwt.verify(token, 'Radium')
        if (decodedToken) {
            let userDetails = await userModel.findOneAndUpdate({ _id: req.params.userId }, { email: "sakshi678@gmail.com" })//{ new: true })
            if (userDetails) {
                res.send({ status: true, message: userDetails })
            } else {
                res.send({ status: false, msg: "Incorrect credentials " })

            }
        }
    }
}


module.exports.createUser = createUser
module.exports.login = login
module.exports.getDetails = getDetails
module.exports.updateUser = updateUser

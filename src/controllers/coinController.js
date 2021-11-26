const cryptoModel = require("../models/cryptoModel.js")
const axios = require("axios")

const getcoins = async function (req, res){

  try{ 

       let options = {
          header: {
              Authorization: "Bearer eebd9812-8e32-4f9a-9f1f-4462949c9f9b"
          },
        method : "get", 
        url : "http://api.coincap.io/v2/assets",
         
      }
      let response= await axios(options)
      let list= response.data.data
      for (i in list) {
          let cryptoData = {
              symbol:list[i].symbol,
              name:list[i].name,
              marketCapUsd:list[i].marketCapUsd,
              priceUsd:list[i].priceUsd,
          } 
          await cryptoModel.create(cryptoData)
      }
      list.sort(function (a,b){return (a.changePercent24Hr) - (b.changePercent24Hr)})
              
      res.status(200).send( {msg: "Success", data: list} )

  }
  catch(err) {
      console.log(err.message)
      res.status(500).send( { msg: "Something went wrong" } )
  }
}
module.exports.getcoins= getcoins
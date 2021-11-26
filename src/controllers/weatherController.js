const userModel = require("../models/userModel.js")
const axios = require("axios")



const LondonTemp = async function (req, res){
    try{ 
        let options = {
          method : "get",
          url : `http://api.openweathermap.org/data/2.5/weather?q=London&appid=dbb5362b7e9422f09a6cbb9768402ca5`,
          
        };
        let response= await axios(options)
        
        res.status(200).send( {msg: "Success", "data":response.data.main.temp} );

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
};


const citiesTemp = async function (req, res){

    try{ 
    
        let cities  =  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = [];
        let length = cities.length
        for(let i=0; i<length; i++){
            let obj = {city: cities[i]}
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=dbb5362b7e9422f09a6cbb9768402ca5`)
            console.log(resp.data.main.temp)
            obj.temp= resp.data.main.temp

            cityObjArray.push(obj);
        }
        let sorted = cityObjArray.sort(  function(a, b) { return a.temp - b.temp } )
        console.log(sorted)
        res.status(200).send( {status: true, data: sorted} )

    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}

module.exports.LondonTemp = LondonTemp;
module.exports.citiesTemp = citiesTemp;
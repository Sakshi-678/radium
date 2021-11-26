const express = require('express');
const router = express.Router();
//const weatherController = require('../controllers/weatherController.js')
const coinController = require('../controllers/coinController.js')

router.get('/test-me', function (req, res) {
        res.send('My first ever api')
    });


//router.post('/createUser',userController.createUser)
//For JWT session
 //router.get('/getDetails/:userId',userController.getDetails)
//For JWT session

//router.post('/login',userController.login)
//router.put('/updateUser/:userId',userController.updateUser)


//todayys weather assignment

// router.get('/LondonTemp',weatherController.LondonTemp );
// router.get('/citiesTemp',weatherController.citiesTemp );


 router.get('/getcoins',coinController.getcoins);

module.exports = router;


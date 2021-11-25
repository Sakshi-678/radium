const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')




router.get('/test-me', function (req, res) {
        res.send('My first ever api')
    });


router.post('/createUser',userController.createUser)
//For JWT session
 router.get('/getDetails/:userId',userController.getDetails)
//For JWT session
router.post('/login',userController.login)
router.put('/updateUser/:userId',userController.updateUser)


//router.get('/getweather',userController.getweather)



module.exports = router;


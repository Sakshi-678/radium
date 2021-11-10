const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) 
{
    res.send('My first ever api!')
});
router.get('/movies', function (req, res){
    res.send(["Rockstar", "DDLJ", "race"])
});
router.get('/movies/:movieIndex',function (req, res){
let movies = ["Rockstar", "DDLJ", "race"]
let index = req.params.movieIndex
let movieAtIndex = movies[index]
res.send(movieAtIndex)
});

module.exports = router;

router.get('/movies/:moviesIndex',function(req,res){
    let movies = ["Rockstar", "DDLJ", "race"]
    let value = req.params.movieIndex
    if(value >= movies.length){
    }else{
        res.send(movies[value])
    }
    
    });

    router.get('/films',function(req,res){
        let moviesobjects = [{"Id":1, "name":"The shining"},{"Id":2, "name":"Incendies"},{"Id":3, "name":"Rand de basanti"},{"Id":4, "name":"Finding demo"}]
           res.send(moviesobjects)
        });



        router.get('/films/:filmsId', function(req,res) {
            let films = [{"Id":1, "name":"The shining"},{"Id":2, "name":"Incendies"},{"Id":3, "name":"Rand de basanti"},{"Id":4, "name":"Finding demo"}]
            let value = req.params.filmsId
            if(value >= films.length){
            res.send("no movies exists")
        }else{
          res.send(films[value])
        }
        })

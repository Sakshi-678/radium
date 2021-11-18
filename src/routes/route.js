//const { application } = require('express');
const express = require('express');
const router = express.Router();
const bookModel = require("../models/bookModel")
const bookController = require("../controllers/bookController")
const authorController = require("../controllers/authorController")
const Controllers = require("../controllers/Controllers")


router.get('/test-me', function (req, res) {
    res.send('My first ever api')
});

router.post('/newbookData', bookController.newbookData );
router.get('/getbookData', bookController.getbookData );

// router.post('/createBook',bookController.createBook);
router.get('/booklist',bookController.getbooklist);
router.post('/getBooksInYear',bookController.getBooksInYear);
router.post('/getParticularBooks',bookController.getParticularBooks);
router.get('/getXINRBooks',bookController.getXINRBooks);
router.get('/getRandomBooks',bookController.getRandomBooks);

//router.post('/createBook',authorController.createBook);
//router.post('/createauthor',authorController.createauthor);
router.get('/authorfind',authorController.authorfind);
router.post('/updateprice',authorController.updateprice);
router.post('/bookfind',authorController.bookfind);

router.post('/createbook2',Controllers.createbook2);
router.post('/createauthor2',Controllers.createauthor2);
router.get('/getallbook',Controllers.getallbook);
router.post('/publisher',Controllers.publisher);
router.get('/getbook',Controllers.getbook);
module.exports = router;







router.get('/movies', function (req, res) {
    res.send(["Rockstar", "DDLJ", "race"])
});




router.get('/movies/:movieIndex', function (req, res) {
    let movies = ["Rockstar", "DDLJ", "race"]
    let index = req.params.movieIndex
    let movieAtIndex = movies[index]
    res.send(movieAtIndex)
});

module.exports = router;

router.get('/movies/:moviesIndex', function (req, res) {
    let movies = ["Rockstar", "DDLJ", "race"]
    let value = req.params.movieIndex
    if (value >= movies.length) {
    } else {
        res.send(movies[value])
    }

});

router.get('/films', function (req, res) {
    let moviesobjects = [{ "Id": 1, "name": "The shining" }, { "Id": 2, "name": "Incendies" }, { "Id": 3, "name": "Rand de basanti" }, { "Id": 4, "name": "Finding demo" }]
    res.send(moviesobjects)
});



router.get('/films/:filmsId', function (req, res) {
    let films = [{ "Id": 1, "name": "The shining" }, { "Id": 2, "name": "Incendies" }, { "Id": 3, "name": "Rand de basanti" }, { "Id": 4, "name": "Finding demo" }]
    let value = req.params.filmsId
    if (value >= films.length) {
        res.send("no movies exists")
    } else {
        res.send(films[value])
    }
})


//problem-1
//const express=require("express")
//const routers=express.Router();
// PROBLEM--1 Write a GET api to fetch specific movies (path -> /specific-movies) 
//with the help of query params - rating and genre


router.get('/specific-movies', function (req, res) {
    let moviesArr = [{ "id": 1, "name": 'The Shining', "rating": 8, "director": "Stanley kubrik", "genre": "horror" },
    { "id": 2, "name": 'Rockstar', "rating": 10, "director": "Imtiaz ali", "genre": "emotional" },
    { "id": 3, "name": 'Golmaal', "rating": 6, "director": "Rohit shetty", "genre": "comedy" },
    { "id": 4, "name": 'Housefull', "rating": 5, "director": "Sajid khan", "genre": "funny" },
    { "id": 5, "name": 'Baagi-3', "rating": 8, "director": "Ahmed khan", "genre": "action" },
    { "id": 6, "name": 'Batman', "rating": 9, "director": "Joachim Horsley", "genre": "action" }]

    const a = req.query.rating
    const b = req.query.genre
    const movies = moviesArr.filter(movie => movie.rating == a && movie.genre == b)
    res.send({ "movies": movies })
});

//problem-2
//Write a POST api to add a movie to the movies collection (path -> /specific-movies ).
//You have to make sure you provide all the details of the movie in the request at Postman 
//(movie details must have an id, name, rating, director and genre) as well as that you return the updated array in the response


router.post('/specific-movies', function (req, res) {
    let moviesArr = [{ "id": 1, "name": 'The Shining', "rating": 8, "director": "Stanley kubrik", "genre": "horror" },
    { "id": 2, "name": 'Rockstar', "rating": 10, "director": "Imtiaz ali", "genre": "emotional" },
    { "id": 3, "name": 'Golmaal', "rating": 6, "director": "Rohit shetty", "genre": "comedy" },
    { "id": 4, "name": 'Housefull', "rating": 5, "director": "Sajid khan", "genre": "funny" },
    { "id": 5, "name": 'Baagi-3', "rating": 8, "director": "Ahmed khan", "genre": "action" },
    { "id": 6, "name": 'Batman', "rating": 9, "director": "Joachim Horsley", "genre": "action" }]


    const updateArray = req.body
    moviesArr.push(updateArray)
    console.log(updateArray)
    res.send(moviesArr)
});

module.exports = router;


//problem-3
//Write a GET api (path -> /best-movie) that returns only one movie that has
// the highest rating in the collection. In case there are multiple movies with
// the highest rating value, return any one out of those.


let movies = [{ "id": 1, "name": 'The Shining', "rating": 8, "director": "Stanley kubrik", "genre": "horror" },
{ "id": 2, "name": 'Rockstar', "rating": 10, "director": "Imtiaz ali", "genre": "emotional" },
{ "id": 3, "name": 'Golmaal', "rating": 6, "director": "Rohit shetty", "genre": "comedy" },
{ "id": 4, "name": 'Housefull', "rating": 5, "director": "Sajid khan", "genre": "funny" },
{ "id": 5, "name": 'Baagi-3', "rating": 8, "director": "Ahmed khan", "genre": "action" },
{ "id": 6, "name": 'Batman', "rating": 9, "director": "Joachim Horsley", "genre": "action" }]

router.get("/best-movie", function (req, res) {
    let highestRating = 0;
    let highestRatingIndex = 0;

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].rating > highestRating) {
            highestRating = movies[i].rating;
            highestRatingIndex = i;
        }
    }
    res.send("The highest rated movie is: " + movies[highestRatingIndex].name);
});



//Problem-4
//If the rating has value greater than 10, return a message in the response 
//informing that the maximum value a rating can have is 10. If the director value 
//is not present in the request you have to return a message in the response informing the
//director value must be present. In case both the problems exist for example the data 
//looks like below (invalid rating and no director value present), you have to return the error for the director value


router.post('/specific-movies', function (req, res) {
    let movies = [{ "id": 1, "name": 'The Shining', "rating": 8, "director": "Stanley kubrik", "genre": "horror" },
    { "id": 2, "name": 'Rockstar', "rating": 10, "director": "Imtiaz ali", "genre": "emotional" },
    { "id": 3, "name": 'Golmaal', "rating": 6, "director": "Rohit shetty", "genre": "comedy" },
    { "id": 4, "name": 'Housefull', "rating": 5, "director": "Sajid khan", "genre": "funny" },
    { "id": 5, "name": 'Baagi-3', "rating": 8, "director": "Ahmed khan", "genre": "action" },
    { "id": 6, "name": 'Batman', "rating": 9, "director": "Joachim Horsley", "genre": "action" }]

    let i = req.body
    let value = 'director'
    if (!(i.hasOwnProperty('director'))) {
        res.send("director must be present")

    } else if (i.rating > 10) {
        res.send({ msg: "invalid rating" })
    } else {
        arr.push(i)
        res.send(arr)
    }
});



//PLAYers

router.post("/players", function (req, res) {
    let newPlayers= req.body
    let players = [{
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": ["swimming"]},

    { "name": "Virat kohli",
        "dob": "2/4/1996",
        "gender": "male",
        "city": "delhi",
        "sports": ["cricket"]},


    {"name": "kapil",
        "dob": "6/8/1994",
        "gender": "male",
        "city": "gurgaon",
        "sports": ["cricket"]}]
    

    for (let i = 0; i < players.length; i++) {
        if (players[i].name == newPlayers) {
            res.send("This player was already added!")
        }
    }
    
});



//bookingId

//  router.post("/bookingId", function (req, res) {
//      let bookingId = [{
//           "bookingNumber": 1,
//          "sportId": "56",
//           "centerId": "6789",
//           "type": "private",
//           "slot": "16286598000000",
//           "bookedOn": "31/08/2021",
//          "bookedFor": "01/09/2021"},

//        { "bookingNumber": 2,
//           "sportId": "58",
//           "centerId": "6989",
//          "type": "private",
//           "slot": "16285598000000",
//           "bookedOn": "30/08/2021",
//         "bookedFor": "02/09/2021" },

//       { "bookingNumber": 3,
//           "sportId": "51",
//          "centerId": "6999",
//          "type": "private",
//           "slot": "16287598000000",
//           "bookedOn": "21/08/2021",
//          "bookedFor": "05/09/2021" }]

var express = require("express")
var exphbs = require("express-handlebars")
var fs = require("fs")
var foodData = require("./food-objects.json")
var allResults = require("./allResults.json") // store people's food matches
var likes = []
var port = process.env.PORT || 3001

var app = express()

// HELPER FUNCTIONS https://wolfgang-ziegler.com/blog/a-scripts-section-for-your-handlebars-layout-template
var hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      section: function(name, options) { 
        if (!this._sections) this._sections = {}
          this._sections[name] = options.fn(this) 
          return null
        }
    }    
})
app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static("public/"))
app.use(express.json()) // generate and register a middleware function with our server

app.get("/", function (req, res, next) {
    res.status(200).render('instructions')
    likes.length = 0 // when visiting home page, likes reset
})

app.post("/cardsGo", function (req, res, next) {

    res.redirect("/cards/0")
})

app.get("/results", function (req, res, next) {

    // derfault foodMatch is N/A
    var foodMatch = {
        img_url: "https://amahighlights.com/wp-content/uploads/gordon-ramsay.jpg",
        name: "Nothing!",
        health_score: "N/A",
        cuisine: "N/A",
        prev_name: getPrevName()
    }

    if (likes.length == 0) {
        storeMatch(foodMatch)
        res.status(200).render('results', foodMatch)
        return;
    } 

    //1. for loop to iterate through the food data array
    let healthScoreArr = []
    let likedCuisineArr = []
    for (let i = 0; i < likes.length; ++i) {
        console.log(foodData[likes[i]]);
        //parse through to read health score and add it to an array
        healthScoreArr.push(foodData[likes[i]].health_score)
        //read most liked cuisine and add it to a different array
        likedCuisineArr.push(foodData[likes[i]].cuisine)
    }   
    //for loop to go through the healthscore arr and add to a sum
    let sum = 0; 
    for (let i = 0; i < healthScoreArr.length; ++i) {
        console.log(healthScoreArr[i]) 
        sum += healthScoreArr[i]
    }
    //divide by the number of likes after the loop
    let average_health_score = sum / likes.length
    //average health score = sum
    console.log("  --Average Health Score: ", average_health_score)
    //2. 5 count variables and add to it depending on the cuisine type
    console.log("  --LikedCuisineArr: ", likedCuisineArr)
    let countA = 0, countM = 0, countI = 0, countG = 0, countC = 0
    for (let i = 0; i < likedCuisineArr.length; ++i) {
        if (likedCuisineArr[i] == 'American') {
            countA++
        }
        else if (likedCuisineArr[i] == 'Mexican') {
            countM++
        }
        else if (likedCuisineArr[i] == 'Italian') {
            countI++
        }
        else if (likedCuisineArr[i] == 'German') {
            countG++
        }
        else if (likedCuisineArr[i] == 'Chinese') {
            countC++
        }
    }
    let favoriteCuisine;
    if (countA >= countM && countA >= countI && countA >= countG && countA >= countC) {
        favoriteCuisine = 'American'
        console.log("  --Most Liked Cuisine is American")
    }
    else if (countM >= countA && countM >= countI && countM >= countG && countM >= countC) {
        favoriteCuisine = 'Mexican'
        console.log("  --Most Liked Cuisine is Mexican")
    }
    else if (countI >= countM && countI >= countA && countI >= countG && countI >= countC) {
        favoriteCuisine = 'Italian'
        console.log("  --Most Liked Cuisine is Italian")
    }
    else if (countG >= countM && countG >= countI && countG >= countA && countG >= countC) {
        favoriteCuisine = 'German'
        console.log("  --Most Liked Cuisine is German")
    }
    else if (countC >= countM && countC >= countI && countC >= countG && countC >= countA) {
        favoriteCuisine = 'Chinese'
        console.log("  --Most Liked Cuisine is Chinese")
    }
    //3. whichever count variable is the most liked cuisine and closest to the average health score will get placed in foodData[0]
    if (favoriteCuisine == 'American') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'American' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine,
                    prev_name: getPrevName()
                }
                storeMatch(foodMatch)
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }
    else if (favoriteCuisine == 'Mexican') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'Mexican' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine,
                    prev_name: getPrevName()
                }
                storeMatch(foodMatch)
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }
    else if (favoriteCuisine == 'Italian') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'Italian' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine,
                    prev_name: getPrevName()
                }
                storeMatch(foodMatch)
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }
    else if (favoriteCuisine == 'German') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'German' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine,
                    prev_name: getPrevName()
                }
                storeMatch(foodMatch)
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }
    else if (favoriteCuisine == 'Chinese') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'Chinese' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine,
                    prev_name: getPrevName()
                }
                storeMatch(foodMatch)
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }
})

app.post("/post/liked", function(req, res, next) {
    
    likes.push(req.body.cardIndex)
    res.status(200).send("Added card index to the array")

    console.log(" -- POST: [" + likes + "]")

})

app.get("/cards/:card", function(req, res, next){

    var cardIdx = req.params.card
    console.log("  -- GET: /cards/" + cardIdx)
    
    if (cardIdx >= 0 && cardIdx < 15) { // max index is 14

        var singleCard = []
        singleCard[0] = foodData[req.params.card]
      
        res.status(200).render('foodPage', {
    
            foodCards: singleCard// only render single card
            
        })

    } else { // otherwise 404

        next()

    }
})

app.get("*", function (req, res, next) {
    console.log("  -- 404!")
    res.status(404).render('404')
})

app.listen(port, function(err) {
    if (err)
        throw err
    console.log("-- Server listening on port", port)
})


// helper function
function storeMatch (foodMatch) {

    // write likes to allResults, possibly implement scoreboard/recent likes
    fs.readFile("./allResults.json", function (err, data) {

        allResults = JSON.parse(data)
        allResults.push(foodMatch)
        setTimeout(function () {
            fs.writeFile("./allResults.json", JSON.stringify(allResults, null, 2), function (err) {})},
            300) // 300 ms delay, otherwise this all happens too fast and writes to the file twice essentially

    })

} 

function getPrevName () {

    var file = fs.readFileSync("./allResults.json")
    var json = JSON.parse(file)
    var lastElement = json[json.length - 1]
    return lastElement.name
}
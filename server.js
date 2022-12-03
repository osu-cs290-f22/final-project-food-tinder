var express = require("express")
var exphbs = require("express-handlebars")
var foodData = require("./food-objects.json")
var likes = [] // this could be a json file, but right now we have no need to store likes permanently
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
    console.log("Going to cards")
})

app.post("/cardsGo", function (req, res, next) {
    res.redirect("/cards/0")
})

app.get("/results", function (req, res, next) {
    if (likes.length == 0) {
        //Works but can replace with special case N/A object
       let foodMatch = {
            img_url: "https://amahighlights.com/wp-content/uploads/gordon-ramsay.jpg",
            name: "Your Best Food Match is Nothing!",
            health_score: "N/A",
            cuisine: "N/A"
        }
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
    let foodMatch;
    if (favoriteCuisine == 'American') {
        for (let i = 0; i < likes.length; ++i) {
            if (foodData[likes[i]].cuisine == 'American' && foodData[likes[i]].health_score >= average_health_score) {
                foodMatch = {
                    img_url: foodData[likes[i]].img_url,
                    name: "Your Best Food Match: " + foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine
                }
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
                    name: "Your Best Food Match: " + foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine
                }
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
                    name: "Your Best Food Match: " + foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine
                }
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
                    name: "Your Best Food Match: " + foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine
                }
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
                    name: "Your Best Food Match: " + foodData[likes[i]].name,
                    health_score: Number.parseFloat(average_health_score).toFixed(2),
                    cuisine: favoriteCuisine
                }
                res.status(200).render('results', foodMatch)
                return;
            }
        }
    }

    /*

    Here (or in another function), a procedure to generate results needs to be written. Based
    on the indices stored in the likes[] array, the following needs to be calculated:

    1. Average health score
    2. Most liked cuisine
    3. Best match food overall

    Luke, it's up to you how you calculate the best food overall. The resulting object needs 
    to be rendered in place of foodData[0] below. 

    Note that /results is rendered in both of the cases:
    
    1. The user clicks through all 15 food cards
    2. The Get Results button is clicked at any time

    Since the user can get results at any time, you may need a default object or something to 
    do in case the likes array is empty. 
    
    Let me know if you have questions!

    - Ellie

    */ 
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
    
            foodCards: singleCard,// only render single card
            
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

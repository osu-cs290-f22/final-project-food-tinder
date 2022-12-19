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
    foodData = shuffle(foodData)
    fs.writeFile(
        './food-objects.json',
        JSON.stringify(foodData, null, 2),
        function (err) {}
    )
})

app.get("/results", function (req, res, next) {

    // default foodMatch is N/A
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

    //iterate through the food data array
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
    console.log("  --LikedCuisineArr: ", likedCuisineArr)

    //find max cuisine type
    var maxCuisine = mode(likedCuisineArr).toLowerCase()
    var foodMatchIdx // will store best match (as idx of foodData)
    var minDiff = 10 // will store food elem that deviates the least from the avg healthscore

    // find idx of best food match based on health score
    for (let i = 0; i < likes.length; ++i) {

        var foodElem = foodData[likes[i]] // current food elem

        if (foodElem.cuisine.toLowerCase() == maxCuisine) {

            // calc difference from avg health score
            var temp = Math.abs(foodElem.health_score - average_health_score)

            // replace current min if the difference calculated is less
            if (temp <= minDiff) {

                minDiff = temp
                foodMatchIdx = likes[i]

            }
        }
    }

    console.log(minDiff, foodMatchIdx)

    // store results page context
    foodMatch = {
        img_url: foodData[foodMatchIdx].img_url,
        name: foodData[foodMatchIdx].name,
        health_score: Number.parseFloat(average_health_score).toFixed(2),
        cuisine: foodData[foodMatchIdx].cuisine,
        prev_name: getPrevName()
    }

    // store match in separate json file
    storeMatch(foodMatch)
    res.status(200).render('results', foodMatch)

})

app.post("/post/liked", function(req, res, next) {
    
    likes.push(req.body.cardIndex)
    res.status(200).send("Added card index to the array")

    console.log(" -- POST: [" + likes + "]")

})

app.post('/post/add', function (req, res, next) {

    if (req.body && 
        req.body.img_url && 
        req.body.name && 
        req.body.health_score && 
        req.body.cuisine) 
    {
        var exists = false

        for (var i = 0; i < foodData.length; i++) {
            if (foodData[i].name.toLowerCase() == req.body.name.toLowerCase()) {
                exists = true
            }
        }

        if (exists) {     
            res.status(409).send("Food obj already exists!!")
        
        } else {
            var foodObj = {
                img_url: req.body.img_url,
                name: req.body.name,
                health_score: req.body.health_score,
                cuisine: req.body.cuisine
            }

            foodData.push(foodObj)

            fs.writeFile(
                './food-objects.json',
                JSON.stringify(foodData, null, 2),
                function (err) {
                    if (err) {
                        res.status(500).send("Error writing food to DB")
                    } else {
                        res.status(200).send("Food successfully added!!")
                    }
                }
            )
        }

    } else {
        res.status(400).send("Request didn't have a body!")
    }
})

app.get("/cards/:card", function(req, res, next){

    console.log(foodData.length)
    var cardIdx = req.params.card
    console.log("  -- GET: /cards/" + cardIdx)
    
    if (cardIdx >= 0 && cardIdx < foodData.length) { 

        var singleCard = []
        singleCard[0] = foodData[cardIdx]
      
        res.status(200).render('foodPage', {
    
            foodCards: singleCard// only render single card
            
        })

    } else if (cardIdx == foodData.length) {

        res.redirect("/results")
    
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
    if (json.length > 0) {
        var lastElement = json[json.length - 1]
        return lastElement.name
    }
    return null
}

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

// finds elem with max occurence in an array 
// (in this case: Max cuisine type in foodData)
// note: if tie, max elem that appears first is returned
function mode(array) {

    if (array.length == 1)
        return array[0];

    // use hash to store elem and frequency as key-val pairs
    var modeMap = {};
    var maxElem = array[0].toLowerCase(), maxCount = 1;

    // iterate thru arr elems
    for (var i = 0; i < array.length; i++) {

        // current elem
        var elem = array[i].toLowerCase();

        // if elem is not in map, add elem as key and assign 1 as initial val
        if (modeMap[elem] == null)
            modeMap[elem] = 1;
        
        // increment current elem if in map
        else
            modeMap[elem]++; 

        // if current elem has a greater max count than prev, assign new elem and max count
        if (modeMap[elem] > maxCount) {
            maxElem = elem;
            maxCount = modeMap[elem];
        }
    }

    return maxElem;
}
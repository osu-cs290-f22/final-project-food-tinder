const { response } = require("express")
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

    res.redirect("/cards/0")
})

app.get("/results", function (req, res, next) {
    let likes;
    fetch('./likes.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
    likes = response.json();
    

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

    res.status(200).render('results', foodData[0]) 
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
    
            foodCards: singleCard // only render single card
    
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

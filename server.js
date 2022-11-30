// back end JS

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

// **TO DO: when user clicks on match button on client, server renders results page with context, and sends user to that page
app.get("/results", function (req, res, next) {
    res.status(200).render('results', foodData[0]) // replace w/ final context
})

app.post("/cards/liked", function(req, res, next) {

    console.log(req.body)
    likes.push(req.body.cardIndex)
    res.status(200).send("Added card index to the array")

})

app.get("/cards/:card", function(req, res, next){

    console.log(foodData[req.params.card])
    var singleCard = []
    singleCard[0] = foodData[req.params.card]
    res.status(200).render('foodPage', {

        foodCards: singleCard // only render single card

    })
    console.log("rendered!")
    return

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

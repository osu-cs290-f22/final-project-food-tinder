// back end JS

var express = require("express")
var app = express()
var fs = require("fs")
var exphbs = require("express-handlebars")
var foodData = require("./food-objects.json")
var port = process.env.PORT || 3001

var app = express()
// app.engine("handlebars", exphbs.engine({
//     defaultLayout: "main"
// }))
// app.set("view engine", "handlebars")

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

app.get("/", function (req, res, next) {
    res.status(200).render('foodPage', {
        foodCards: foodData
    })
})

// **TO DO: when user clicks on match button on client, server renders results page with context, and sends user to that page
app.get("/results", function (req, res, next) {
    res.status(200).render('results', foodData[0]) // replace w/ final context
})


// when the page is loaded for the first time, clean out and/or create the likes file
fs.writeFileSync("likes.json", "")

app.use(express.static("public/"))
app.use(express.json()) // generate and register a middleware function with our server

app.get("/", function (req, res, next) {
    res.status(200).sendFile(__dirname + "/public/index.html")
})

app.post("/cards/liked", function(req, res, next) {

    fs.appendFileSync("likes.json", req.body.cardIndex)
    console.log("wrote to the file!")

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

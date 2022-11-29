// back end JS

var express = require("express")
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
    res.status(200).render('results')
})

app.use(express.static("public/"))

app.get("*", function (req, res, next) {
    console.log("  -- 404!")
    res.status(404).render('404')
})

app.listen(port, function(err) {
    if (err)
        throw err
    console.log("-- Server listening on port", port)
})
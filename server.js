// back end JS

var express = require("express")
var app = express()
var fs = require("fs")

var port = process.env.PORT
if (!port) 
    port = 3001


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
    res.status(404).sendFile(__dirname + "/public/404.html")
})

app.listen(port)

var foodObjects = require('./food_objects.json')

function nextCard (idx) {

    res.status(200).render('foodCard', {

        'foodData': foodObjects[idx]

    })

}

module.exports = nextCard
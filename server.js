// back end JS

var express = require("express")
var app = express()

var port = process.env.PORT
if (!port) 
    port = 3001

app.use(express.static("public/"))

app.get("/", function (req, res, next) {
    res.status(200).sendFile(__dirname + "/public/index.html")
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
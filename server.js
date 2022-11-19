// back end JS

var express = require("express")
var app = express()

var port = process.env.PORT
if (!port) 
    port = 3000

app.use(express.static("public/"))
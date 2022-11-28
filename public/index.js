var fs = require('fs')
var serverside = require('../server') // nextCard function
var currCardIdx = 0
var foodObjs = require('food_objects.json')

// when the page is loaded for the first time, clean out and/or create the likes file
fs.writeFileSync("likes.json", "")

var likeButton = document.getElementById("like-button")
likeButton.addEventListener("click", likeClickHandler)

var dislikeButton = document.getElementById("dislike-button")
dislikeButton.addEventListener("click", dislikeClickHandler)

var resultsButton = document.getElementById("results-button")
resultsButton.addEventListener("click", function () {

    // on click, navigate to results page
    window.location.href = "/results";
    // this will trigger a get request to this URL (?)
    // which will be handled in serverside

})

function likeClickHandler() {

    // write to JSON file to say that this was a liked food
    fs.appendFileSync("likes.json", currCardIdx)

    // call serverside function to do a render of the next card and hide the others
    serverside.nextCard(currCardIdx)
    currCardIdx++

}

function dislikeClickHandler() {

    // call serverside function to do a render of the next card
    serverside.nextCard(currCardIdx)
    currCardIdx++

}


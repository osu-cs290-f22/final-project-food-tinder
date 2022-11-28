// ok this is just plain javascript so I can't use require, etc.
// really need to separate this and serverside but I'm going to do that later

// maybe this navigates to different pages (/0, /1, /2)
// and serverside calls functions based on those navigations

// var fs = require('fs')
// var serverside = require('../server') // nextCard function
// var currCardIdx = 0
// var foodObjs = require('../food_objects.json')

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
    //fs.appendFileSync("likes.json", currCardIdx)
    console.log("like clicked")
    console.log("added idx to file")

    // call serverside function to do a render of the next card and hide the others
    //serverside.nextCard(currCardIdx)
    currCardIdx++

}

function dislikeClickHandler() {

    // call serverside function to do a render of the next card
    //serverside.nextCard(currCardIdx)
    console.log("dislike clicked")
    currCardIdx++

}


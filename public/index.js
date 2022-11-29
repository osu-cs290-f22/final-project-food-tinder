var likeButton = document.getElementById("like-button")
likeButton.addEventListener("click", likeClickHandler)

var dislikeButton = document.getElementById("dislike-button")
dislikeButton.addEventListener("click", dislikeClickHandler)

var resultsButton = document.getElementById("results-button")
resultsButton.addEventListener("click", resultsHandler)

var currCardIdx = 0

function likeClickHandler() {

    // write to JSON file to say that this was a liked food
    //fs.appendFileSync("likes.json", currCardIdx)
    console.log("like clicked")
    console.log("added idx to file")

    // post request to server with likes idx
    // render next card with get request (or post?)
    var reqBody = {

        "cardIndex": currCardIdx

    }

    var request = new XMLHttpRequest()
    request.open("POST", "/cards/liked", true)
    request.send(reqBody)

    currCardIdx++

}

function dislikeClickHandler() {

    // render next card with get request (or post?)
    console.log("dislike clicked")
    currCardIdx++

}

function resultsHandler() {

    // navigate to results page?
    window.location.href = "./results"

}


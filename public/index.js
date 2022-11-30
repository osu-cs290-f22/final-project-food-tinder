var currCardIdx = 0

var likeButton = document.getElementById("like-button")
likeButton.addEventListener("click", likeClickHandler())

var dislikeButton = document.getElementById("dislike-button")
dislikeButton.addEventListener("click", function () {

    var url = window.location.href
    var lastSlashIdx = url.lastIndexOf("/")
    var cardIdx = parseInt(url.substring(lastSlashIdx + 1))
    if (cardIdx < 14) {

        window.location.href = cardIdx + 1

    } else {

        window.location.href = "/results"

    }

})

var resultsButton = document.getElementById("results-button")
resultsButton.addEventListener("click", resultsHandler)

function likeClickHandler() {

    var url = window.location.href
    var lastSlashIdx = url.lastIndexOf("/")
    var cardIdx = url.substring(lastSlashIdx + 1)

    var reqBody = {

        "cardIndex": cardIdx

    }

    var request = new XMLHttpRequest()
    request.open("POST", "/cards/liked", true)
    // probably have to create a document
    //request.send(JSON.stringify(reqBody))

    // var promise = new Promise(function(resolve, reject) {

    //     resolve(++currCardIdx)

    // })
    // promise.then(function(idx) {

    //     currCardIdx = idx
    //     console.log(currCardIdx)

    // })

}

function resultsHandler() {

    // navigate to results page
    window.location.href = "./results"

}

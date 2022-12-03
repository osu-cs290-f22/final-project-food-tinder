var likeButton = document.getElementById("like-button")
likeButton.addEventListener("click", likeClickHandler)

var dislikeButton = document.getElementById("dislike-button")
dislikeButton.addEventListener("click", function () {

    // pull current card index from the URL (solution courtesy of Jace)
    var url = window.location.href
    var lastSlashIdx = url.lastIndexOf("/")
    var cardIdx = parseInt(url.substring(lastSlashIdx + 1))

    // if the index is greater than the number of cards, auto naviagate to results
    if (cardIdx < 14) {

        window.location.href = cardIdx + 1

    } else {

        //window.location.href = "/results"
        fetch("/results").then(function(res) {

            if (res.status !== 200) {

                //window.location.href = cardIdx
                alert("Not enough data to calculate results!")

            }
            else {
                window.location.href = "/results"
            }

        })

    }

})

var resultsButton = document.getElementById("results-button")
resultsButton.addEventListener("click", function () {

    // navigate to results page on click of results button
    fetch("/results").then(function(res) {

        if (res.status !== 200) {

            alert("Not enough data to calculate results!")

        } else {

            window.location.href = "/results"

        }

    })
    
})

function likeClickHandler() {

    // again, pull current card index from the URL
    var url = window.location.href
    var lastSlashIdx = url.lastIndexOf("/")
    var cardIdx = parseInt(url.substring(lastSlashIdx + 1))

    // put that index in a JSON object
    var reqBody = {

        cardIndex: cardIdx

    }

    // send a POST request containing that index to the server
    fetch("/post/liked", {
        method: "POST",
        body: JSON.stringify(reqBody), 
        headers: {
            "Content-Type": "application/json"
        }
    
    })

    // again, navigate to results if the end is reached
    if (cardIdx < 14) {

        window.location.href = cardIdx + 1

    } else {

        fetch("/results").then(function(res) {

            if (res.status !== 200) {

                alert("Not enough data to calculate results!")
                
            } else {

                window.location.href = "/results"

            }

        })

    }

}
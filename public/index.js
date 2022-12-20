function likeClickHandler() {

    // pull current card index from the URL
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

    window.location.href = cardIdx + 1

    // // again, navigate to results if the end is reached
    // if (cardIdx < 14) {

    //     window.location.href = cardIdx + 1

    // } else {

    //     fetch("/results").then(function(res) {

    //         if (res.status !== 200) {

    //             alert("Could not calculate results!")
                
    //         } else {

    //             window.location.href = "/results"

    //         }

    //     })

    // }

}

function dislikeClickHandler() {

    // pull current card index from the URL (solution courtesy of Jace)
    var url = window.location.href
    var lastSlashIdx = url.lastIndexOf("/")
    var cardIdx = parseInt(url.substring(lastSlashIdx + 1))

    // put that index in a JSON object
    var reqBody = {

        cardIndex: cardIdx

    }

    // send a POST request containing that index to the server
    fetch("/post/disliked", {
        method: "POST",
        body: JSON.stringify(reqBody), 
        headers: {
            "Content-Type": "application/json"
        }

    })

    window.location.href = cardIdx + 1

    // // if the index is greater than the number of cards, auto naviagate to results
    // if (cardIdx < 14) {

    //     window.location.href = cardIdx + 1

    // } else {

    //     //window.location.href = "/results"
    //     fetch("/results").then(function(res) {

    //         if (res.status !== 200) {

    //             //window.location.href = cardIdx
    //             alert("Could not calculate results!")

    //         }
    //         else {
    //             window.location.href = "/results"
    //         }

    //     })

    // }
}


function handleModalAccept() {

    var name = document.getElementById('food-name-input').value.trim()
    var url = document.getElementById('food-photo-input').value.trim()
    var score = parseInt(document.getElementById('food-health-input').value.trim())
    var type = document.getElementById('food-cuisine-input').value.trim()

    if (!name || !url || !score || !type) {
        alert("You must fill in all of the fields!")

    } else if (score && score > 10 || score < 1) {
        alert("Health Score value is invalid! Please re-enter.")

    } else {

        var foodHtmlContext = {
            img_url: url,
            name: name,
            health_score: score,
            cuisine: type
        }
        
        fetch("/post/add", {
            method: "POST",
            body: JSON.stringify(foodHtmlContext), 
            headers: {
                "Content-Type": "application/json"
            }

        }).then(function(res) {
            if (res.status == 409) {
                alert("A food with that name already exists! Please enter a new food item.")
            }

        }).catch(function (err) {
            alert("An error occurred communicating with the server: " + err)
        })

        hideAddItemModal()
    }
}

function showAddItemModal() {

    var addItemModal = document.getElementById('add-item-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');
  
    addItemModal.classList.add('show');
    modalBackdrop.classList.remove('hidden');
  
  }
  
function clearAddItemModalInputs() {

    var addItemInputElements = [
        document.getElementById('food-name-input'),
        document.getElementById('food-photo-input'),
        document.getElementById('food-health-input'),
        document.getElementById('food-cuisine-input')
    ];

    addItemInputElements.forEach(function (inputElem) {
        inputElem.value = '';
    });

}

function hideAddItemModal() {

    var addItemModal = document.getElementById('add-item-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    addItemModal.classList.remove('show');
    modalBackdrop.classList.add('hidden');

    clearAddItemModalInputs();

}

window.addEventListener('DOMContentLoaded', function () {
  
    var startButton = document.getElementById("modal-start-button")
    if (startButton) {
        startButton.addEventListener("click", function () {
            window.location.href = "/cards/0"
        })
    }

    var likeButton = document.getElementById("like-button")
    if (likeButton) {
        likeButton.addEventListener("click", likeClickHandler)
    }  

    var dislikeButton = document.getElementById("dislike-button")
    if (dislikeButton) {
        dislikeButton.addEventListener("click", dislikeClickHandler)
    }

    var resultsButton = document.getElementById("results-button")
    if (resultsButton) {
        resultsButton.addEventListener("click", function () {

            // navigate to results page on click of results button
            fetch("/results").then(function(res) {

                if (res.status !== 200) {

                    alert("Could not calculate results!")

                } else {

                    window.location.href = "/results"

                }

            })
            
        })
    }

    var addFoodButton = document.getElementById('add-button');
    if (addFoodButton) {
        addFoodButton.addEventListener('click', showAddItemModal);
    }
  
    var modalAcceptButton = document.getElementById('modal-accept');
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', handleModalAccept);
    }
  
    var modalHideButtons = document.getElementsByClassName('modal-hide-button');
    for (var i = 0; i < modalHideButtons.length; i++) {
      modalHideButtons[i].addEventListener('click', hideAddItemModal);
    }
  
});
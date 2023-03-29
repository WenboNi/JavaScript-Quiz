var highscoreArray = JSON.parse(localStorage.getItem("highscores")) || []
const displayscore = document.getElementById("displayScore")
function displayHighscore(){
    for (let i=0; i<highscoreArray.length; i++){
        var scoreDiv = document.createElement("div")
        scoreDiv.textContent = (i+1) + ". " + highscoreArray[i].initial + " " + highscoreArray[i].score
        displayscore.appendChild(scoreDiv)
    }
}
displayHighscore()
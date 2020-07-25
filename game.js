// start a game and calls a StartAGame method
//sets gameRunning to true
$(document).on("keydown", function (e) {

  if (!gameRunning && (e.key === "A" || e.key === "a") && !gameStarted) {
    $(".score").text("Score : " +scoreTracker);
    $(".status").text("AI turn");
    gameStarted=true;
    gameRunning = true;
    console.log(e.key);
    startAGame();
    gameover = false;

  }
});

var scoreTracker = 0;
var mouseclickCounter = 0;
$(".btn").mousedown(function () {
  if (mouseclickCounter < listOfColors.length && !gameover && !gameRunning) {

    var clickedId = $(this).attr("id");

    console.log(clickedId);
    if (clickedId == listOfColors[mouseclickCounter]) {
      playColor(clickedId);
      playerColors.push($(this).attr("id"));
      console.log(playerColors);
      console.log(mouseclickCounter + " " + (listOfColors.length - 1));
      if (mouseclickCounter >= (listOfColors.length - 1)) {
        gameRunning = true;

        console.log("game is running" + gameRunning);
        setTimeout(() => {
          startAGame();
        }, 500);
      }
      scoreTracker++;
      $(".score").text("Score : " +scoreTracker);
      mouseclickCounter++;
    } else {
      gameStarted=false;
      gameover = true;
      gameRunning = false;
      playersTurn = false;
      listOfColors = [];
      playerColors = [];
      $(".status").text("Game Over, Click A to restart");
      new Audio("sounds/wrong.mp3").play();
      scoreTracker = 0;
      

    }
  }
});

var gameStarted = false;
var gameOver = true;
var gameRunning = false;
var playersTurn = false;
var playerColors = [];
var listOfColors = [];



// add all colors and sounds to a list of objects Sounds
var sounds = [
  new Sounds("green", "sounds/green.mp3"),
  new Sounds("red", "sounds/red.mp3"),
  new Sounds("yellow", "sounds/yellow.mp3"),
  new Sounds("blue", "sounds/blue.mp3")
]

function Sounds(color, sound) {
  this.color = color;
  this.sound = sound;
}
// -- Calling this function returns a random color 


//Once it started add a random color to the listOfColors
//and plays the whole list from start with 500 ms intervals
var counter = 0;
function startAGame() {
  if (gameRunning) {
    $(".status").text("AI's Turn");
    saveNewColor();
    var interval = setInterval(() => {
      playColor(listOfColors[counter]);
      console.log(listOfColors[counter]);
      counter++;
      if (counter >= listOfColors.length) {
        clearInterval(interval);
        counter = 0;
        gameRunning = false;
        mouseclickCounter = 0;
        playerColors = [];
        $(".status").text("Player's turn");
      
      }
    }, 500);
  }
}


// get random color and return it
function saveNewColor() {
  var colors = ["green", "red", "yellow", "blue"];
  listOfColors.push(colors[Math.floor(Math.random() * 4)]);

}



//input single color string and play its sound and blink the element
function playColor(color) {

  for (var i = 0; i < 4; i++) {
    if (sounds[i].color == color) {

      new Audio(sounds[i].sound).play();
      $("." + color).fadeOut(100).fadeIn(100);
    }
  }
};











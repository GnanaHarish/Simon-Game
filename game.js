// console.log($("h1"));

var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

//play sound when the button is pressed
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animate the button when it it clicked
function animatePress(currentColour){
  var buttonAnimate = $("#"+currentColour);
  buttonAnimate.addClass("pressed");
  setTimeout(function(){
    buttonAnimate.removeClass("pressed");
  }, 100);
}


//randomly selecting the button and making up the game
function nextSequence(){
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNum];
  gamePattern.push(randomChoosenColour);
  var arrLastElement = gamePattern.at(-1);
  var choosenButton = $("#"+arrLastElement);
  level += 1;

  choosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/"+arrLastElement+".mp3");
    // console.log("sounds/"+gamePattern.at(-1)+".mp3");
    // audio.play();
  playSound(arrLastElement);

  return choosenButton;
  // return randomNum;
}
// console.log(nextSequence())


//deals with what happens when the button is clicked

  $(".btn").click(function(){
    var userChoosenColour = this.id;
    // console.log(userChoosenColour);
    userClickedPattern.push(userChoosenColour);
    // console.log(userClickedPattern);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });




$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel){
  // console.log(userClickedPattern);
  // console.log(currentLevel);
  // console.log(gamePattern);

  if( userClickedPattern[currentLevel]  == gamePattern[currentLevel] ){
      // console.log("Sucess");
      if( userClickedPattern.length  == gamePattern.length ){
        setTimeout(function () {
          nextSequence();
        }, 10);
      }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 20);
    $("#level-title").text("Game Over !, Please Press Any Button To Restart");
    restart();
  }
}

function restart(){
  level = 0;
  started = false;
  gamePattern = [];
}

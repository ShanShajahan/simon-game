
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).click(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChoosenColour);
   $("#" + randomChoosenColour).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChoosenColour);

  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);

  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("GAME OVER");
      //startOver();
      $("<p> Refresh page to play again</p>").insertAfter("#level-title");
      $("p").addClass("paragraph");    }
  }

/*  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }*/

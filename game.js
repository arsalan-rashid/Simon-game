var buttonColours =["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];

  var started = false;
  var level = 0;

  $(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);
//console.log(userClickedPattern);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){

if (!started){

$("#level-title").text("level: "+level);
nextSequence();
started = true;

}

});



function nextSequence() {
userClickedPattern=[];
level++;
$("#level-title").text("level: "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

var audio = new Audio("sounds/"+randomChosenColour+".mp3");
audio.play();
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
  },100);
}


function checkAnswer (currentLevel){
if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  console.log("Sucess");

  if (userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function () {

      nextSequence();
    },1000);
  }


}
else
{
  console.log ("Wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {

    $("body").removeClass("game-over");
  },200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
}
}

function startOver(){
level =0;
gamePattern=[];
started = false;

}

//  $("button").click(function(){
//  console.log("hint pressed");
//
//
//  for (var i = 0; i <= gamePattern.length; ++i) {
//    setDelay(i);
//  }
//
//  function setDelay(i) {
//    setTimeout(function(){
//      $("#"+gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//           console.log(gamePattern[i]);
//      var audio = new Audio("sounds/"+gamePattern[i]+".mp3");
//      audio.play();
//    }, 1000);
//  }
//
//
//
// });

var gamePattern = [];

var userClickedPattern = [];

// an array to storage the 4 color names from index 0 to 3
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

    //---------------------------------------------------//
    // WE DONT USE KEYPRESS, FOCUS ON MOUSE CLICK
// Determined whether or not there is a keyboard press
// $(document).keypress(function() {
//     //Check whether or not the game started
//     if(!started){
//         //Use HTML to increase the level.
//         $("#level-title").text("Level "+level);
//         nextSequence();
//         started = true;
//     }
// });
    //---------------------------------------------------//

$(".start-button").click(function(){
        if(!started){
        //Use HTML to increase the level.
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        // $(".level-description").text("Begin!");
    }
});

//Use jQuery to detect any buttons clicked. Included a handler function while it happens
$(".btn").click(function(){
    //Create userChosenColour to storage the id of the button when clicked
    var userChosenColour = $(this).attr("id");

    //add the id with colours of the button and storage them in an array.
    userClickedPattern.push(userChosenColour);
    //playsound
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Call checkAnswer function to check the result, and -1 to check previous.
    checkAnswer(userClickedPattern.length -1 );
});


// Create a checkAnswer function.
function checkAnswer(currentLevel){

    // create 2 variables to save current level color.
    var latestColor = gamePattern[currentLevel];
    var latestUserPick = userClickedPattern[currentLevel];

    //Compare 2 colors, 1 from the game, 1 from user input
    // If 2 colors matched, it is correct. If not, print out wrong
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
                },1000);
        }
    } else {
        //If the use pick the wrong color
        //sound effect
        playSound("wrong"); 
        // $(".level-description").text("Lose!");
        //change title of the game
        $("#level-title").text("Game Over, Press Start to Restart");
        //add color theme
        $("body").addClass("game-over");
        //remove color theme after 200ms
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        console.log("Wrong");
        startOver();
    }
}

function nextSequence(){

    //---------------------------------------------------//
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //---------------------------------------------------//

    //generate random value index number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);

    // chose a color upon the random index from buttonColours
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    //Effect poppin color when clicked
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //play sound
    playSound(randomChosenColour);
    // animatePress(randomChosenColour);

}

// Create a function with 1 parameter which play sound matched with the color of the button.
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    //This jquery .addClass will add CSS effect into a JS code action.
    $("#"+currentColour).addClass("pressed");

    // set a function to remove CSS out by using .removeClass-
    //- with function setqTimeout (function, delay time);
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


    //create a function to start the game all over.
    function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
    }
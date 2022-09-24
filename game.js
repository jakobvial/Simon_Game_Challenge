//region Variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let sequenceStarted = false;
let level = 0;
let gameInProgress = false;
//endregion

//region Events
$(function () {
    $(document).on("keydown", function (evt) {
        if (!gameInProgress && evt.key === "a") {
            gameInProgress = true;
            nextSequence();
        }
    });
});


$("." + "btn").on("click", function () {
    if (!sequenceStarted) {
        return;
    }

    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    makeSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer();
});
//endregion

//region Helper functions
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    makeSound(randomChosenColour);
    animateHint(randomChosenColour);

    $("h1").text("Level " + (level + 1));
    level++;

    sequenceStarted = true;
}

function animateHint(colourClicked) {
    $("#" + colourClicked).fadeOut(100).fadeIn(100);
}

function animatePress(colourClicked) {
    $("#" + colourClicked).addClass("pressed");
    setTimeout(function () {
        $("#" + colourClicked).removeClass("pressed");
    }, 100);
}

function makeSound(colourClicked) {
    switch (colourClicked) {
        case "red":
            let soundRed = new Audio("sounds/red.mp3");
            soundRed.play();
            break;
        case "blue":
            let soundBlue = new Audio("sounds/blue.mp3");
            soundBlue.play();
            break;
        case "green":
            let soundGreen = new Audio("sounds/green.mp3");
            soundGreen.play();
            break;
        case "yellow":
            let soundYellow = new Audio("sounds/yellow.mp3");
            soundYellow.play();
            break;
        default:
            console.log(colourClicked);
    }
}

//Check that the pressed button is correct
function checkAnswer() {
    let indexLatestClick = userClickedPattern.length - 1;
    if (userClickedPattern[indexLatestClick].localeCompare(gamePattern[indexLatestClick]) !== 0) {
        console.log("Wrong");
        failed();
        return;
    }
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
        resetForNewSequence();
    }
}

function resetForNewSequence() {
    sequenceStarted = false;
    userClickedPattern = [];
    setTimeout(function () {
        nextSequence();
    }, 1000);
}

function failed() {
    sequenceStarted = false;

    $("h1").text("Game Over, Press Key \"A\" to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    let gameLost = new Audio("sounds/wrong.mp3");
    gameLost.play();

    reset();
}

function reset() {
    gameInProgress = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

//endregion
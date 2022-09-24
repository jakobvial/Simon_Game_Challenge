//region Variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
//endregion

//region Events
let gameStarted = false;
$(function () {
    $(document).on("keydown", function (evt) {
        if (!gameStarted && evt.key === "a") {
            gameStarted = true;
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

    let answer = checkAnswer();

    if (!answer) {
        $("h1").text("You lost!");
    }
});
//endregion

//region Helper functions
let sequenceStarted = false;
let level = 0;

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
        return false;
    }
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
        resetForNewSequence();
    }
    return true;
}

/*If the complete user sequence is correct:
* - Disable the user's ability to click buttons
* - Update the game pattern
* - Enable the user's ability to click buttons, having reset the user clicked pattern*/
function resetForNewSequence() {
    userClickedPattern = [];
    sequenceStarted = false;
    setTimeout(function () {
        nextSequence();
    }, 1000);
}

//endregion
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    makeSound(randomChosenColour);
    animateHint(randomChosenColour);

}

$(document).ready(function () {
    $(document).one("keydown", function () {
        nextSequence();
    });
});

$("." + "btn").on("click", function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
});

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
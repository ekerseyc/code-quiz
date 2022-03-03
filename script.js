//HTML Items
var beginEl = document.querySelector('#start');
var beginBtn = document.querySelector('#begin');
var quizEl = document.querySelector('#quiz');
var finishEl = document.querySelector('#finish');
var nameInput = document.querySelector('#name');
var question = document.querySelector('#question');
var answersDiv = document.querySelector('#answers');
var rightOrWrong = document.querySelector('#right-or-wrong');
var resultDiv = document.querySelector("#result");
var viewScores = document.querySelector("#view-scores");
var highScoreContainer = document.querySelector(".high-scores-container");

// question variables
var questionIndex = 0;

// timer variables
var secondsLeft = 60;
var secondsTimer = document.querySelector('#timer');
var timerInterval = null;

//score local storage variables
var localStorage = window.localStorage;
var highScores = [];
if (localStorage.getItem('highScores') !== null) {
    highScores = JSON.parse(localStorage.getItem('highScores'));
}

// quiz questions
var quizQuestions = [
    {
        question: "What is the capital of North Dakota?",
        choices: [
            "Raleigh",
            "Richmond",
            "Bismark",
            "Fargo",
        ],
        correct: "Bismark"
    },
    {
        question: "What mountain range covers most of West Virginia?",
        choices: [
            "Rockies",
            "Eastern Alps",
            "Blue Ridge",
            "Appalachian",
        ],
        correct: "Appalachian"
    },
    {
        question: "Which of the following states does NOT border Ohio?",
        choices: [
            "Indiana",
            "Illinois",
            "Kentucky",
            "Pennsylvania",
        ],
        correct: "Illinois"
    },
    {
        question: "Which Hawaiian island is Honolulu on?",
        choices: [
            "Oahu",
            "Lanai",
            "Hawaii",
            "Maui",
        ],
        correct: "Oahu"
    },
    {
        question: "Which body of water borders the state of Minnesota?",
        choices: [
            "Mississippi River",
            "Lake Michigan",
            "Lake Erie",
            "Lake Superior",
        ],
        correct: "Lake Superior"
    },
]

// start screen
function startScreen() {
    beginEl.style.display = "block";
    quizEl.style.display = "none";
    finishEl.style.display = "none";
    resultDiv.style.display = "none";
    highScoreContainer.style.display = "none";
    secondsTimer.style.display = "none";
}

// load the quiz screen
function quizScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "block";
    finishEl.style.display = "none";
    resultDiv.style.display = "none";
    secondsTimer.style.display = "block";
    secondsTimer.textContent = secondsLeft; // sets countdown to 60 sec
    setTime(); //starts the timer

    loadQuestion(); //loads the questions

}
function loadQuestion() {
    question.textContent = quizQuestions[questionIndex].question;
    answersDiv.innerHTML = ''; // removes all the old answer choices

    var questionChoices = quizQuestions[questionIndex].choices
    for (var i = 0; i < questionChoices.length; i++) {
        var item = questionChoices[i];
        var answerBtn = document.createElement('button');
        answerBtn.textContent = item;
        answerBtn.classList.add('btn', 'btn-success', 'mr-3');
        answerBtn.addEventListener('click', function () { // when you click on an answer, we need to check if it's right
            checkAnswer(this.textContent);
        });
        answersDiv.appendChild(answerBtn); //add buttons to screen
    }
}

function checkAnswer(choice) {
    //check if they got the right answer
    var correctAnswer = quizQuestions[questionIndex].correct
    if (choice !== correctAnswer) {
        // tell them it's wrong
        rightOrWrong.textContent = 'WRONG!';
        // subtract 15 sec from timer
        secondsLeft = Math.max(secondsLeft - 15, 0);        
    }
    else {
        // correct answer!
        rightOrWrong.textContent = 'CORRECT!';
    }
    resultDiv.style.display = "block";

    setTimeout(function () {
        resultDiv.style.display = "none";
        //if last question, loads the finish screen
        if (questionIndex === quizQuestions.length - 1) {
            endScreen();
        } else {
            // otherwise it loads the next question
            questionIndex++;
            loadQuestion();
        }
    }, 1000);
}

//load the end screen
function endScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "none";
    finishEl.style.display = "block";
    resultDiv.style.display = "none";
    secondsTimer.style.display = "none";

    clearInterval(timerInterval); //stops the timer
    var submitButton = document.querySelector('#submit-high-score');
    submitButton.addEventListener('click', function () {
        var initials = document.querySelector('#initials').value; //gets the player's name AFTER clicking the button
        submitHighScore(initials, secondsLeft); //submits the player's high score
    })
}

function init() {
    startScreen();
}


function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--; // secondsLeft = secondsLeft -1;
        secondsTimer.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            //when timer hits 0, end screen shows
            endScreen();
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }

    }, 1000);
}

function submitHighScore(initials, userScore) {
    // creates an object containing the player's name and high score
    var highScore = {
        playerName: initials,
        score: userScore
    };

    highScores.push(highScore); //adds the player's score to the list of scores
    if (highScores.length > 1) { // if there's more than 1 score, it will sort the scores from highest to lowest
        highScores.sort(function (playerOne, playerTwo) {
            return playerTwo.score - playerOne.score;
        })
    }
    localStorage.setItem('highScores', JSON.stringify(highScores)); // updates the local storage with the new list of high scores
    document.querySelector("#initials").value = ''; // clears the input field
    viewHighScores();
}

function viewHighScores() {
    if (highScoreContainer.style.display !== "none") {
        return; //if the container is visible do nothing
    }
    // hides the other pages
    quizEl.style.display = "none";
    document.querySelector('#start').style.display = "none";
    finishEl.style.display = "none";

    //pre-emptively clears the list
    var highScoreList = document.querySelector('#high-score-list');
    highScoreList.innerHTML = '';

    for (var i = 0; i < highScores.length; i++) {
        // adds high scores one at a time
        var scoreElem = document.createElement("li");
        var playerScore = highScores[i];
        scoreElem.textContent = playerScore.playerName + " " + playerScore.score;
        highScoreList.appendChild(scoreElem);
    }
    highScoreContainer.style.display = "block"; //displays the high scores after they're added
}

//loads the start screen again
function goBack() {
    startScreen()
}

//removes the high scores from local storage and empties the array they were in
function clearHighScores() {
    localStorage.removeItem('highScores');
    highScores = [];

    //clear the high scores in HTML
    var highScoreList = document.querySelector('#high-score-list');
    highScoreList.innerHTML = '';
}

beginBtn.addEventListener('click', quizScreen);
viewScores.addEventListener('click', viewHighScores);

init();
var beginEl = document.querySelector('#begin');
var beginBtn = document.querySelector('#begin');
var quizEl = document.querySelector('#quiz');
var finishEl = document.querySelector('#finish');
var nameInput = document.querySelector('#name');
var question = document.querySelector('#question');
var answersDiv = document.querySelector('#answers');
var questionIndex = 0;
var rightOrWrong = document.querySelector('#right-or-wrong');
var resultDiv = document.querySelector("#result");

// timer variables
var secondsLeft = 60;
var secondsTimer = document.querySelector('#timer');

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
        question: "hich Hawaiian island is Honolulu on?",
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
}
// rename gameScreen

function gameScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "block";
    finishEl.style.display = "none";
    resultDiv.style.display = "none";
    secondsTimer.textContent = secondsLeft;
    setTime();

    // question 1 load
    question.textContent = quizQuestions[questionIndex].question;

    for (var i = 0; i < quizQuestions[questionIndex].choices.length; i++) {
        var item = quizQuestions[questionIndex].choices[i];
        var answerBtn = document.createElement('button');
        answerBtn.textContent = item;
        answerBtn.addEventListener('click', function() {
            checkAnswer(this.textContent);
        });
        answerBtn.id = "choice-" + i;
        answersDiv.appendChild(answerBtn); //add button to screen
    }

}

function checkAnswer(choice) {
    //check if they got the right answer
    if (choice !== quizQuestions[questionIndex].correct) {
        // tell them it's wrong
        rightOrWrong.textContent = 'WRONG!';
    }
    else {
        // correct answer!
        rightOrWrong.textContent = 'CORRECT!';
    }
    resultDiv.style.display = "block";
    // subtract 15 sec from timer
    // secondsTimer = secondsTimer - 15;
}

function endScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "none";
    finishEl.style.display = "block";
    resultDiv.style.display = "none";
}

function init() {
    startScreen();
}


function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--; // secondsLeft = secondsLeft -1;
        secondsTimer.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }

    }, 1000);
}

beginBtn.addEventListener('click', gameScreen);
// quizEl.addEventListener('click', endScreen);

init();

// WHEN I click the start button

// THEN a timer starts and I am presented with a question

// WHEN I answer a question

// THEN I am presented with another question

// WHEN I answer a question incorrectly

// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0

// THEN the game is over

// WHEN the game is over

// THEN I can save my initials and my score
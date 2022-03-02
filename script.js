var beginEl = document.querySelector('#begin');
var startBtn = document.querySelector('#begin');
var quizEl = document.querySelector('#quiz');
var finishEl = document.querySelector('#finish');
var nameInput = document.querySelector('#name');

var question = {
    possible: [
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
    ],
    correct: 2
}

function startScreen() {
    beginEl.style.display = "block";
    quizEl.style.display = "none";
    finishEl.style.display = "none";
}

function gameScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "block";
    finishEl.style.display = "none";

    for (var i = 0; i < question.possible.length; i++) {
        var item = question.possible[i];
        var answerBtn = document.createElement('button');
        answerBtn.textContent = i + 1 + "." + item;
        quizEl.appendChild(answerBtn);
    }
}

function endScreen() {
    beginEl.style.display = "none";
    quizEl.style.display = "none";
    finishEl.style.display = "block";
}

function init() {
    startScreen();
}

beginBtn.addEventListener('click', gameScreen);
quizEl.addEventListener('click', endScreen);

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
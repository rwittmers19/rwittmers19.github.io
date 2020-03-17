function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Your results</h1>";
    if(quiz.score >= 5){
        gameOverHTML += "<h2 id='score'>You got " + quiz.score + " answers correct<br>Congrats on being a well-versed nerd!</h2>";
    }
    else {
        gameOverHTML += "<h2 id='score'>You got " + quiz.score + " out of 6 answers correct</h2>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Is HTML a programming language?", ["NO", "Definitely no","Yeah, that's a no from me dawg", "Bruh, no."], ["NO", "Yeah, that's a no from me dawg"]),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "ARPANET"], "CSS"),
    new Question("Do pinapples go on pizza?", ["Everything goes on pizza", "Yes","Of course", "Nah fam"], "Everything goes on pizza"),
    new Question("How much wood could a woodchuck chuck if a woodchuck could chuck would?", ["At least 12", "47", "a lot", "68 (next number not GFA)"], "At least 12"),
    new Question("Who is the tallest in the CS department?", ["Walker Orr", "Brent Wilson", "Robin Baker", "Brian Snider"], "Brian Snider"),
    new Question("What is the file extension for a JavaScript File?", [".java", ".coffee", ".js", ".javascript"], ".js"),
    new Question("How many Windows do you get with Windows 98", ["100", "98", "1 (unfortunately)", "68"], "1 (unfortunately)"),
    new Question("What's the best way to fix a broken computer?", ["Lol just toss it in some rice", "Soak it in Coca-Cola for 24 hours",
     "Alt+F4", "Spend time researching the best ways to fix whatever issue is occurring."], "Lol just toss it in some rice"),
     new Question("What's the best major?", ["CS", "Business", "Comm", "Transatlantic Bean Connoisseur"], "Transatlantic Bean Connoisseur"),

];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
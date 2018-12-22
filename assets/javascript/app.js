$(document).ready(function () {
    console.log("ready!");

    // VARIABLES
    // ==========================================================================

    var triviaGame = {
        questions: [
            {q: "What is 1+2?", al: ["1", "2", "3", "4"], ca: 2},
            {q: "What is 2+2?", al: ["1", "2", "3", "4"], ca: 3},
            {q: "What is 3-2?", al: ["1", "2", "3", "4"], ca: 0},
            {q: "What is 1+1?", al: ["1", "2", "3", "4"], ca: 1},
        ],
        messages: {
            correct: "Yes, that's correct!",
            incorrect: "No, that's incorrect!",
            endTime: "Sorry, you are out of time!",
            finished: "Let's see how you did!"
        },
        gifArray: [],
        currentQuestion: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        unanswered: 0,
        seconds: 0,
        time: 0
    }
    console.log(triviaGame);

    // FUNCTIONS
    // ==============================================================================

    function newGame(){
        $("#final-message").empty();
        $("#correct-answer").empty();
        $("#incorrect-answer").empty();
        $("#unanswered").empty();
        triviaGame.currentQuestion = 0;
        triviaGame.correctAnswer = 0;
        triviaGame.incorrectAnswer = 0;
        triviaGame.unanswered = 0;
        newQuestion();
    }

    function newQuestion(){
        $("#answer-message").empty();
        $("#right-answer").empty();
        $("#gif").empty();
        answered = true;

        $("#current-question").html("<h3>Question # " + (triviaGame.currentQuestion + 1) + " / " + triviaGame.questions.length + "</h3>");
        $(".trivia-question").html("<h2>" + triviaGame.questions[triviaGame.currentQuestion].q + "<h2>");
        for(var i = 0; i < 4; i ++){
            var choices = $("<button>");
            choices.text(triviaGame.questions[triviaGame.currentQuestion].al[i]);
            choices.attr({'data-index': i});
            choices.addClass("this-choice");
            $(".trivia-answers").append(choices);
        }
        countdown();
        $(".this-choice").on("click", function(){
            userSelect = $(this).data("index");
            clearInterval(time);
            answerPage();
        });
    }

    function countdown(){
        seconds = 20;
        $("#time-left").html("<h3>Time Remaining: " + seconds + "</h3>");
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown(){
        seconds--;
        $("#time-left").html("<h3>Time Remaining: " + seconds + "</h3>");
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage(){
        $("#current-question").empty();
        $(".this-choice").css("display", "none");
        $(".trivia-question").empty();

        var rightAnswerText = triviaGame.questions[triviaGame.currentQuestion].al[triviaGame.questions[triviaGame.currentQuestion].ca]
        var rightAnswerIndex = triviaGame.questions[triviaGame.currentQuestion].ca;
        $("#gif").html("<img src='assets/images/" + triviaGame.gifArray[triviaGame.currentQuestion] + ".gif' width='400px'>");

        if((userSelect == rightAnswerIndex) && (answered == true)){
            triviaGame.correctAnswer++;
            $("#answer-message").html(triviaGame.messages.correct);
        }
        else if((userSelect != rightAnswerIndex) && (answered == true)){
            triviaGame.incorrectAnswer++;
            $("#answer-message").html(triviaGame.messages.incorrect);
            $("#right-answer").html("The correct answer was: " + rightAnswerText);
        }
        else{
            triviaGame.unanswered++;
            $("#answer-message").html(triviaGame.messages.endTime);
            $("#right-answer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }

        if(triviaGame.currentQuestion == (triviaGame.questions.length-1)){
            setTimeout(scoreboard, 5000)
        }
        else{
            triviaGame.currentQuestion++;
            setTimeout(newQuestion, 5000);
        }
    }

    function scoreboard(){
        $("#time-left").empty();
        $("#answer-message").empty();
        $("#right-answer").empty();
        $("#gif").empty();

        $("#final-message").html(triviaGame.messages.finished);
        $("#correct-answers").html("Correct Answers: " + triviaGame.correctAnswer);
        $("#incorrect-answers").html("Incorrect Answers: " + triviaGame.incorrectAnswer);
        $("#unanswered").html("Unanswered: " + triviaGame.unanswered);
        $("#play-again-btn").show();

    }

    // MAIN PROCESS
    // ==============================================================================

    $("#start-btn").on("click", function () {
        $(this).css("display", "none");
        newGame();
    })

    $("#play-again-btn").on("click", function() {
        $(this).css("display", "none");
        newGame();
    })

});
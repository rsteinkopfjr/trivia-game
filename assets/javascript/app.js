$(document).ready(function () {
    console.log("ready!");

    // VARIABLES
    // ==========================================================================

    var triviaGame = {
        questions: [
            {q: "From the movie Bambi, what type of animal is the character 'Flower'?", al: ["Rabbit", "Deer", "Skunk", "Hummingbird"], ca: 2},
            {q: "What movie is the song 'Baby Mine' from?", al: ["Cinderella", "Tarzan", "Mulan", "Dumbo"], ca: 3},
            {q: "Who is the villian in Aladdin?", al: ["Jafar", "Gaston", "Scar", "Ursula"], ca: 0},
            {q: '"Hey look, is that Smith? That’s him alright, the old sea dog." Is the first line to which movie?', al: ["Robin Hood", "Pocahontas", "Sleeping Beauty", "The Little Mermaid"], ca: 1},
            {q: 'What is the setting of "Lilo and Stitch"?', al: ["Florida", "Hawaii", "California", "Thailand"], ca: 1},
            {q: "What is Sleeping Beauty's real name?", al: ["Megara", "Esmeralda", "Marian", "Aurora"], ca: 3},
            {q: 'Which object is significant in the movie Dumbo?', al: ["Feather", "Balloon", "Pixie Dust", "Ball"], ca: 0},
            {q: 'Which of the following is a Disney villian?', al: ["Prince Phillip", "Flynn Rider", "Prince John", "Prince Eric"], ca: 2},
            {q: "In the movie Aladdin, what is the name of Princess Jasmine's pet?", al: ["Rajah", "Dinah", "Nana", "Meeko"], ca: 0},
            {q: 'Which Disney movie has no human characters?', al: ["The Little Mermaid", "Robin Hood", "The Jungle Book", "Pinocchio"], ca: 1},
            {q: 'In "The Rescuers", what is the name of one of the mice?', al: ["Terk", "Dale", "Gus Gus", "Bernard"], ca: 3},
            {q: '"Puppy befriends but later hunts a wild vulpine." Describes which movie?', al: ["101 Dalmations", "The Princess and the Frog", "The Fox and the Hound", "The Rescuers"], ca: 2},
            {q: 'Which Disney Princess spent her whole life in a tower?', al: ["Tiana", "Snow White", "Rapunzel", "Merida"], ca: 2},
            {q: '"An epic of miniature proportions" was the tagline for which Disney movie?', al: ["A Bug's Life", "The Sword and the Stone", "Chicken Little", "Monster's Inc."], ca: 0},
            {q: '"Oh, I just love happy endings! Yes, I do too. Oh, Blue? Pink! Blue!" is final line to which movie?', al: ["Pocahontas", "Cinderella", "Alice in Wonderland", "Sleeping Beauty"], ca: 3},
        ],
        messages: {
            correct: "Yes, that's correct!",
            incorrect: "No, that's incorrect!",
            endTime: "Sorry, you are out of time!",
            finished: "Let's see how you did!"
        },
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
        $("#correct-answers").empty();
        $("#incorrect-answers").empty();
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
            choices.addClass("this-choice btn btn-light btn-lg");
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
            setTimeout(scoreboard, 3000)
        }
        else{
            triviaGame.currentQuestion++;
            setTimeout(newQuestion, 3000);
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
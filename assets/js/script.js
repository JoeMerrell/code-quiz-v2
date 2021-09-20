// Quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// DOM variables
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");


// Start game
function startQuiz() {
    // hide start
    titleScreen.setAttribute("class", "hide");
  
    // show questions
    quizScreen.setAttribute("class", "show");
  
    // start timer
    timerId = setInterval(tick, 1000);
  
    // show starting time
    timeEl.textContent = time;
  
    getQuestion();
  }

  // seconds countdown
  function tick() {
    // update time
    time--;
    timeEl.textContent = time;
  
    // if time ends
    if (time <= 0) {
      quizEnd();
    }
  }

  function getQuestion() {
    // get current question object 
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title (question)
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear old choices
    choicesEl.innerHTML = "";
  
    // loop choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to choices
      choiceNode.onclick = questionClick;
  
      // display choices
      choicesEl.appendChild(choiceNode);
    });
  }

// click answer -- generates new question or ends quiz if final question, deducts 15 seconds for wrong answer

  function questionClick() {
    // check if incorrect choice
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      // display revised time on page
      timeEl.textContent = time;
  
      feedbackEl.textContent = "Incorrect!";
    } else {
      feedbackEl.textContent = "Correct!";
    }
  
    // flash correct/incorrect feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // move to next question
    currentQuestionIndex++;
  
    console.log(currentQuestionIndex);
    console.log(questions.length);
    // check if we've run out of questions
    if (currentQuestionIndex === 7) {
      quizEnd();
      
    } else {
      getQuestion();
      console.log("getQuestion section");
    }
  }


// end the quiz function
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
    console.log("quiz end section");
  
    // show end screen
    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    quizScreen.setAttribute("class", "hide");
  }

// function for saving high score
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(localStorage.getItem(highscores)) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      localStorage.setItem(highscores, JSON.stringify(highscores));
  
      // redirect to next page
      location.href = "hi-score.html";
    }
  }

  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // user submits initials
  submitBtn.onclick = saveHighscore;
  
  // user starts quiz
  startBtn.onclick = startQuiz;
  






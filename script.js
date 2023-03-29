const quizQuestions = [
    {
      question: "Javascript is an ________ language?",
      choices: ["Object-Oriented", "Object-Based", "Procedural", "A database language"],
      correctAnswer: "Object-Oriented"
    },
    {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["const", "let", "var", "int"],
      correctAnswer: "var"
    },
    {
      question: "Which of the folloiwng methods can be used to display data in some form using Javascript?",
      choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      question: "How can a datatype be declared to be a constant type?",
      choices: ["var", "let", "const", "constant"],
      correctAnswer: "const"
    },
    {
      question: "What keyword is used to check whether a given property is valid or not?",
      choices: ["in", "is in", "exists", "lies"],
      correctAnswer: "in"
    },
    {
      question: "What is the use of the <noscript> tag in Javascript",
      choices: ["The contents are displayed by non-JS-based browsers", "Clears all cookie and cache", "Dis-selects are previously targetted script tags", "None of the above"],
      correctAnswer: "The contents are displayed by non-JS-based browsers"
    },
    {
      question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
      choices: ["Boolean", "Undefined", "Object", "Integer"],
      correctAnswer: "The contents are displayed by non-JS-based browsers"
    }
  ];
  
  // Define the time limit for the quiz in seconds
  const timeLimit = 75;
  
  // Define variables to store the state of the quiz
  let currentQuestionIndex = 0;
  let timeRemaining = timeLimit;
  let score = 0;
  
  // Define variables to reference DOM elements
  const startButton = document.getElementById("start-button");
  const quizContainer = document.querySelector(".quiz-container");
  const questionElement = document.getElementById("question");
  const choicesContainer = document.getElementById("choices-container");
  const answerStatusElement = document.getElementById("answer-status");
  const timeRemainingElement = document.getElementById("time-remaining");
  const gameOverContainer = document.querySelector(".game-over-container");
  const finalScoreElement = document.getElementById("final-score");
  const initialsForm = document.getElementById("initials-form");
  const initialsInput = document.getElementById("initials");
  
  // Define function to start the quiz
  function startQuiz() {
    startButton.classList.add("hide");
    quizContainer.classList.remove("hide");
    timeRemainingElement.textContent = timeRemaining;
    startTimer();
    showQuestion();
  }
  
  // Define function to start the timer
  function startTimer() {
    const timer = setInterval(function() {
      timeRemaining--;
      timeRemainingElement.textContent = timeRemaining;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  // Define function to show the current question
  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = "Question " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;
    choicesContainer.innerHTML = "";
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = currentQuestion.choices[i];
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice");
      button.addEventListener("click", function() {
        if (choice === currentQuestion.correctAnswer) {
          answerStatusElement.textContent = "Correct!";
          score++;
        } else {
          answerStatusElement.textContent = "Incorrect.";
          timeRemaining -= 10;
          if (timeRemaining < 0) {
            timeRemaining = 0;
          }
        }
        currentQuestionIndex++;
        if (currentQuestionIndex >= quizQuestions.length) {
          endQuiz();
        } else {
          showQuestion();
        }
      });
      choicesContainer.appendChild(button);
    }
  }
  
  // Define function to end the quiz
  function endQuiz() {
    quizContainer.classList.add("hide")
    gameOverContainer.classList.remove("hide")
    finalScoreElement.textContent = "Your final score is " + score + " out of 7";
  }

  var highscoreArray = JSON.parse(localStorage.getItem("highscores")) || []
  initialsForm.addEventListener("submit", function(event){
    event.preventDefault();
    var initialValue = initialsInput.value;
    var highscore = {
        initial: initialValue,
        score: score
    }
    highscoreArray.push(highscore)
    localStorage.setItem("highscores", JSON.stringify(highscoreArray))
    
window.location.href = "highscore.html"
  })
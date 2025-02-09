function renderQuestion(questionData, answerCallback) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  const questionElement = document.createElement("div");
  questionElement.classList.add("question");

  const questionTitle = document.createElement("h3");
  questionTitle.innerHTML = `${questionData.question}`;
  questionElement.appendChild(questionTitle);

  const answersContainer = document.createElement("div");
  answersContainer.classList.add("answers");

  let answers = questionData.incorrect_answers.concat(
    questionData.correct_answer
  );
  shuffleArray(answers);

  answers.forEach((answer) => {
    const answerElement = document.createElement("button");
    answerElement.classList.add("answer-option");
    answerElement.textContent = answer;
    answerElement.addEventListener("click", () =>
      answerCallback(answer, questionData.correct_answer)
    );
    answersContainer.appendChild(answerElement);
  });

  questionElement.appendChild(answersContainer);
  quizContainer.appendChild(questionElement);
}

function highlightAnswer(selectedAnswer, correctAnswer) {
  const answerButtons = document.querySelectorAll(".answer-option");

  answerButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    } else if (button.textContent === selectedAnswer)
      button.style.backgroundColor = "red";
  });
}

function disableAnswers() {
  document
    .querySelectorAll(".answer-option")
    .forEach((button) => (button.disabled = true));
}

function showFinalResult(score, totalQuestions) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  const resultElement = document.createElement("div");
  resultElement.classList.add("result");

  const scoreText = document.createElement("h2");
  scoreText.textContent = `Your score: ${score}/${totalQuestions}`;
  scoreText.classList.add("score-text");
  resultElement.appendChild(scoreText);

  const feedbackMessage = document.createElement("p");
  feedbackMessage.textContent = getFeedbackMessage(score, totalQuestions);
  resultElement.appendChild(feedbackMessage);

  const restartButton = document.createElement("button");
  restartButton.textContent = "Play again";
  restartButton.classList.add("restart-btn");
  restartButton.addEventListener("click", () => location.reload());
  resultElement.appendChild(restartButton);

  quizContainer.appendChild(resultElement);
}

function getFeedbackMessage(score) {
  switch (true) {
    case score === 5:
      return "You got all answers correct! Were you cheating?";
    case (score = 4):
      return "So close... I bet that one wrong answer irritates you now, doesn't it?";
    case (score = 3):
      return "Right in the middle - just enough to not be impressive, but also not embarrassing. Congrats, I guess.";
    case (score = 2):
      return "Well... at least you tried. Next time try blindly guessing, the results are probably gonna be better.";
    case (score = 1):
      return "Not really good at quizes huh?";
    default:
      return "Maybe read a book or two before your next quiz attempt?";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { renderQuestion, highlightAnswer, disableAnswers, showFinalResult };

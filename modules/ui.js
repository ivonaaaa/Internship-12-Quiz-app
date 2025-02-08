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
    } else if (button.textContent === selectedAnswer) {
      button.style.backgroundColor = "red";
    }
  });
}

function disableAnswers() {
  document
    .querySelectorAll(".answer-option")
    .forEach((button) => (button.disabled = true));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { renderQuestion, highlightAnswer, disableAnswers };

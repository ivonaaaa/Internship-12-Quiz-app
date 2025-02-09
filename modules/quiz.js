import {
  renderQuestion,
  highlightAnswer,
  disableAnswers,
  showFinalResult,
} from "./ui.js";
import { startTimer, stopTimer } from "./timer.js";

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(fetchedQuestions) {
  questions = fetchedQuestions;
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFinalResult(score, questions.length);
    return;
  }

  stopTimer();
  const questionData = questions[currentQuestionIndex];
  renderQuestion(questionData, handleAnswerSelection);
  startTimer(() => handleTimeout(questionData.correct_answer));
}

function handleAnswerSelection(selectedAnswer, correctAnswer) {
  stopTimer();

  setTimeout(() => {
    if (confirm("Are you sure about your answer?")) {
      disableAnswers();
      highlightAnswer(selectedAnswer, correctAnswer);
      if (selectedAnswer === correctAnswer) score++;

      setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
      }, 2000);
    } else {
      startTimer(() => handleTimeout(correctAnswer));
    }
  }, 2000);
}

function handleTimeout(correctAnswer) {
  alert("Time is up! Answer considered as incorrect.");
  disableAnswers();
  highlightAnswer("", correctAnswer);

  setTimeout(() => {
    currentQuestionIndex++;
    displayQuestion();
  }, 2000);
}

export { startQuiz };

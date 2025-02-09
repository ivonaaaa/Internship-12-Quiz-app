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
let selectedCategory = "";
let selectedDifficulty = "";

function startQuiz(fetchedQuestions, category, difficulty) {
  questions = fetchedQuestions;
  currentQuestionIndex = 0;
  score = 0;
  selectedCategory = category;
  selectedDifficulty = difficulty;

  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFinalResult(score, questions.length);
    saveQuizResult(score, selectedCategory, selectedDifficulty);
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

function saveQuizResult(score, category, difficulty) {
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  const result = {
    score,
    category,
    difficulty,
    date: new Date().toLocaleString(),
  };

  quizHistory.push(result);
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

export { startQuiz };

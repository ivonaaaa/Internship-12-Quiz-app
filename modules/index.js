import { fetchQuestions } from "./api.js";
import { startQuiz } from "./quiz.js";

document
  .getElementById("quiz-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;
    const type = document.getElementById("type").value;

    try {
      const questions = await fetchQuestions(category, difficulty, type);
      document.getElementById("quiz-form").style.display = "none";
      document.getElementById("start-quiz-btn").style.display = "block";

      document
        .getElementById("start-quiz-btn")
        .addEventListener("click", () => {
          document.getElementById("start-quiz-btn").style.display = "none";
          startQuiz(questions);
        });
    } catch (error) {
      alert("An error occurred while fetching questions. Please try again.");
    }
  });

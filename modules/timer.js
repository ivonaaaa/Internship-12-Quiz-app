let timer;
let timeLeft;
const TIMER_DURATION = 20;

export function startTimer(onTimeout) {
  stopTimer();
  timeLeft = TIMER_DURATION;
  updateTimerDisplay(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      stopTimer();
      onTimeout();
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(timer);
}

export function resetTimerDisplay() {
  updateTimerDisplay(TIMER_DURATION);
}

function updateTimerDisplay(seconds) {
  const quizContainer = document.getElementById("quiz-container");

  let timerElement = document.getElementById("timer-display");
  if (!timerElement) {
    timerElement = document.createElement("div");
    timerElement.id = "timer-display";
    quizContainer.prepend(timerElement);
  }

  timerElement.textContent = `Time left: ${seconds}s`;
}

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");


let timeLeft = 1500; // 25 minutes in seconds
let interval;

let isRunning = false;


startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerDisplay.innerHTML = formattedTime;
}

function startTimer() {
  if (!isRunning) { 
  interval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft == 0) {
      clearInterval(interval);
      alert("Time's up!");
      timeLeft = 1500; // Reset to 25 minutes
    }
  }, 1000);
  isRunning = true; // Set the flag to true
  }
}

function stopTimer() {
  clearInterval(interval);
  isRunning = false; // Set the flag to false
}

function resetTimer() {
  clearInterval(interval);
  timeLeft = 1500; // Reset to 25 minutes
  isRunning = false; // Set the flag to false
  updateDisplay();
}

//bugfix: the interval will not doubled when the start button is clicked multiple times


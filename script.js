const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

let timeLeft =  1500; // 25 minutes in seconds
let interval; //to store the interval ID
let isRunning = false; // Flag to check if the timer is running
let state = "focus"; // Flag to check if the timer is in focus or break mode

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// / Function to update the timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerDisplay.innerHTML = formattedTime;
}

// Function to start the timer
function startTimer() {
  if (!isRunning) {
    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft == 0) {
        handleTimeout(); // Call the function when time is up
      }
    }, 1000);
    isRunning = true; // Set the flag to true
  }
}

// function to call when time is up
function handleTimeout() {
  clearInterval(interval);
  playAlarmSound();
  popup();
  timeLeft = 1500; // Reset to 25 minutes
  updateDisplay();
  isRunning = false;
}

document.getElementById("closePopup").onclick = function () {
  var popUp = document.getElementById("popup");
  popUp.style.display = "none";
  stopAlarmSound(); // Stop the alarm sound when the popup is closed
};

function playAlarmSound() {
  var audio = document.getElementById("alarmSound");
  audio.play();
}

function stopAlarmSound() {
  var audio = document.getElementById("alarmSound");
  audio.pause();
  audio.currentTime = 0; // Reset the audio to the beginning
}

// Function to stop the timer
function stopTimer() {
  clearInterval(interval);
  isRunning = false; // Set the flag to false
}

// Function to reset the timer
function resetTimer() {
  clearInterval(interval);
  timeLeft = 1500; // Reset to 25 minutes
  isRunning = false; // Set the flag to false
  updateDisplay();
}

function popup() {
  var popUp = document.getElementById("popup");
  popUp.style.display = "block";
}

function restTImer() {
  timeLeft = 300;
  updateDisplay(); // Update the display after time is up
  isRunning = false; // Set the flag to false
}

//bugfix: the interval will not doubled when the start button is clicked multiple times
//added alarm sound when the time finished
//added a popup when the time is finished
//close popup when the close button is clicked

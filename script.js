const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");

let timeLeft = 1500; // 25 minutes in seconds
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
  //tell state
  if (state === "focus") {
    timeLeft = 1500; // Reset to 25 minutes
  } else if (state === "break") {
    timeLeft = 300; // Reset to 5 minutes
  } else if (state === "longBreak") {
    timeLeft = 900; // Reset to 15 minutes
  }
  // Update the display after time is up
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
  if (state === "focus") {
    timeLeft = 1500; // Reset to 25 minutes
  } else if (state === "break") {
    timeLeft = 300; // Reset to 5 minutes
  } else if (state === "longBreak") {
    timeLeft = 900; // Reset to 15 minutes
  }
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

//added a state buttinon to switch between focus and break mode
const workBtn = document.getElementById("work");
const breakBtn = document.getElementById("break");
const longBreakBtn = document.getElementById("longBreak");

// Function to switch to work mode
function workMode() {
  state = "focus";
  timeLeft = 1500; // Reset to 25 minutes
  updateDisplay(); // Update the display after switching modes
  clearInterval(interval); // Clear the interval when switching modes
  isRunning = false; // Set the flag to false
}

// Function to switch to break mode
function breakMode() {
  state = "break";
  timeLeft = 300; // Reset to 5 minutes
  updateDisplay(); // Update the display after switching modes
  clearInterval(interval); // Clear the interval when switching modes
  isRunning = false; // Set the flag to false
}

//function to switch to long break mode
function longBreakMode() {
  state = "longBreak";
  timeLeft = 900; // Reset to 15 minutes
  updateDisplay(); // Update the display after switching modes
  clearInterval(interval); // Clear the interval when switching modes
  isRunning = false; // Set the flag to false
}

workBtn.addEventListener("click", workMode);
breakBtn.addEventListener("click", breakMode);
longBreakBtn.addEventListener("click", longBreakMode);

//added a sidebar for menu
const hamburger = document.getElementById("hamBurger");
const sidebar = document.getElementById("sideBar");

hamburger.addEventListener("click", function () {
  sidebar.classList.toggle("active");
  hamburger.classList.toggle("active");
  hamburger.classList.toggle('is-active');
  if (sidebar.classList.contains("active")) {
    sidebar.style.right = "0px";
  } else {
    sidebar.style.right = "-500px";
  }
});

// scroll nav



//bugfix: the interval will not doubled when the start button is clicked multiple times
//added alarm sound when the time finished
//added a popup when the time is finished
//close popup when the close button is clicked
//bug found: the timer start automatically when change the mode to break or long break mode
// added a sidebar for menu
// added a scroll animation from nav to section

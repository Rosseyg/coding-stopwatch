

let stopwatch = {
  startTime: 0,
  elapsedTime: 0,
  timerId: null,
  minutes: 0,
  seconds: 0,
  startButton: document.createElement('button'),
  stopButton: document.createElement('button'),
  resetButton: document.createElement('button'),
  displayElement: document.createElement('p'),
  
  start() {
    if (!this.timerId) {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.minutes = Math.floor(this.elapsedTime / (60 * 1000));
        this.seconds = Math.floor((this.elapsedTime % (60 * 1000)) / 1000);
        this.displayElement.textContent = `${this.minutes}:${this.seconds.toString().padStart(2, '0')}`;
      }, 1000);
    }
  },
  
  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  },
  
  reset() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.elapsedTime = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.displayElement.textContent = '0:00';
  },
};

stopwatch.startButton.textContent = 'Start';
stopwatch.stopButton.textContent = 'Stop';
stopwatch.resetButton.textContent = 'Reset';

stopwatch.startButton.addEventListener('click', () => stopwatch.start());
stopwatch.stopButton.addEventListener('click', () => stopwatch.stop());
stopwatch.resetButton.addEventListener('click', () => stopwatch.reset());
// // Select the div element you want to target
// let targetDiv = document.querySelector('#targetDiv');

// // Append the stopwatch.startButton to the target div
// targetDiv.appendChild(stopwatch.startButton);

document.body.appendChild(stopwatch.startButton);
document.body.appendChild(stopwatch.stopButton);
document.body.appendChild(stopwatch.resetButton);
document.body.appendChild(stopwatch.displayElement);

  
let timer;
let hours;
let minutes;
let totalTime;
let startTime;
let elapsedTime = 0;
let isPaused = false;

function startTimer() {
  if (!isPaused) {
    startTime = Date.now();
  } else {
    startTime = Date.now() - elapsedTime;
    isPaused = false;
  }
  timer = setInterval(displayTime, 10);
}

function pauseTimer() {
  clearInterval(timer);
  elapsedTime = Date.now() - startTime;
  isPaused = true;
}

function displayTime() {
  let currentTime = new Date();
  let elapsedMilliseconds = currentTime - startTime;
  let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  let elapsedMinutes = Math.floor(elapsedSeconds / 60);
  elapsedSeconds = elapsedSeconds % 60;
  let elapsedMillisecondsTwoDigit = elapsedMilliseconds.toString().slice(-3, -1).padStart(2, "0");

  document.getElementById("timer").innerHTML = elapsedMinutes + "m " + elapsedSeconds + "s " + elapsedMillisecondsTwoDigit + "ms";

  if (elapsedTime + elapsedMilliseconds >= totalTime) {
    clearInterval(timer);
    alert("Time is up!");
  }
}

function setTimer() {
  hours = parseInt(prompt("Enter the number of hours:"));
  minutes = parseInt(prompt("Enter the number of minutes:"));
  totalTime = (hours * 60 + minutes) * 1000 * 0.2;
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  isPaused = false;
  document.getElementById("timer").innerHTML = "0m 0s 00ms";
}


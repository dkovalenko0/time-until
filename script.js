const body = document.querySelector("body");
const title = document.querySelector(".title");
const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minsEl = document.querySelector("#mins");
const secondsEl = document.querySelector("#seconds");
const holidays = document.querySelectorAll(".holidays > button");

let timer;

function countdown(dateEnd) {
  let days, hours, minutes, seconds;

  const timeUntil = new Date(dateEnd);

  if (isNaN(timeUntil)) {
    return;
  }

  timer = setInterval(calculate, 1000);

  function calculate() {
    const currentDate = new Date();

    let totalSeconds = (timeUntil - currentDate) / 1000;

    if (totalSeconds >= 0) {
      days = Math.floor(totalSeconds / 3600 / 24);
      hours = Math.floor(totalSeconds / 3600) % 24;
      minutes = Math.floor(totalSeconds / 60) % 60;
      seconds = Math.floor(totalSeconds) % 60;

      daysEl.innerHTML = days;
      hoursEl.innerHTML = formatTime(hours);
      minsEl.innerHTML = formatTime(minutes);
      secondsEl.innerHTML = formatTime(seconds);
    } else {
      return;
    }
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function setBackground(bgImg) {
  body.style.backgroundImage =
    `url('./images/${bgImg}.jpg')` || `url('./images/${bgImg}.png')`;
}

holidays.forEach(function (item) {
  item.addEventListener("click", function () {
    clearInterval(timer);
    title.innerHTML = `Time until ${this.innerHTML}`;
    countdown(this.getAttribute("data-date"));
    setBackground(this.value);
  });
});

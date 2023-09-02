function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedTime = `${hours == 0 ? "0" : hours < 10 ? "0" : ""}${
    hours % 12
  }:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds} ${ampm}`;
  document.getElementById("clock").textContent = formattedTime;

  const alarmsList = document.getElementById("alarms");
  const alarmItems = alarmsList.getElementsByClassName("alarm-item");
  for (const alarmItem of alarmItems) {
    const alarmText = alarmItem.querySelector(".bi-alarm-text").textContent;
    if (alarmText === formattedTime) {
      alert("Wakey wakey! It's time to work out son..");
    }
  }
}

function addAlarmToList(alarmTime) {
  const alarmsList = document.getElementById("alarms");
  const alarmItem = document.createElement("li");
  alarmItem.className = "alarm-item";

  const alarmIcon = document.createElement("i");
  alarmIcon.className = "bi bi-alarm";
  alarmItem.appendChild(alarmIcon);

  const alarmText = document.createElement("span");
  alarmText.textContent = alarmTime;
  alarmText.className = "bi-alarm-text";
  alarmItem.appendChild(alarmText);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    alarmsList.removeChild(alarmItem);
  });

  alarmItem.appendChild(deleteButton);
  alarmsList.appendChild(alarmItem);
}

function setAlarm() {
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;
  const ampm = document.getElementById("ampm").value;

  if (
    hour < 1 ||
    hour > 12 ||
    hour === "" ||
    minute < 0 ||
    minute === "" ||
    minute > 59 ||
    second < 0 ||
    second > 59 ||
    second === ""
  ) {
    alert("Invalid time entered. Please enter valid time values.");
    return; // Do not proceed to add the alarm
  }

  const alarmTime = `${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}:${second < 10 ? "0" : ""}${second} ${ampm}`;

  addAlarmToList(alarmTime);
}

document.getElementById("setAlarm").addEventListener("click", setAlarm);

setInterval(updateClock, 1000);

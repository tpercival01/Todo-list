const today = new Date();
const month = today.toLocaleString("default", { month: "long" });

function handleCalendar(operation) {
  let container = document.getElementById("calendar-div");

  if (operation === "left") {
    container.innerHTML = " ";

    const calendarDiv = document.createElement("div");
    calendarDiv.className = "calendar";
    container.appendChild(calendarDiv);

    createDays(calendarDiv);
    createMonth(calendarDiv, -1);
  } else if (operation === "right") {
    const calendarDiv = document.createElement("div");
    calendarDiv.className = "calendar";
    container.appendChild(calendarDiv);

    createDays(calendarDiv);
    createMonth(calendarDiv, 1);
  } else if (operation === "start") {
    const calendarDiv = document.createElement("div");
    calendarDiv.className = "calendar";
    container.appendChild(calendarDiv);

    createDays(calendarDiv);
    createMonth(calendarDiv, 0);
  }
}

function handleMonthChange(event) {
  if (event.target.className === "month-left") {
    handleCalendar("left");
  }
}

function createMonth(calendarDiv, num) {
  let monthDiv = document.createElement("div");
  monthDiv.className = "calendar-month";

  let monthLeft = document.createElement("div");
  monthLeft.innerHTML = "<";
  monthLeft.className = "month-left";
  monthDiv.appendChild(monthLeft);
  monthLeft.addEventListener("click", (e) => {
    handleMonthChange(e);
  });

  let monthText = document.createElement("div");
  if (num === 0) {
    monthText.innerHTML = month;
  } else if (num < 0) {
    let last = new Date();
    last.setDate(1);
    last.setMonth(last.getMonth() - 1);
    monthText.innerHTML = last.toLocaleString("default", { month: "long" });
  } else {
    let next = new Date();
    next.setDate(1);
    next.setMonth(next.getMonth() + 1);
    monthText.innerHTML = next.toLocaleString("default", { month: "long" });
  }
  monthText.innerHTML = month;
  monthText.className = "month-text";
  monthDiv.appendChild(monthText);

  let monthRight = document.createElement("div");
  monthRight.innerHTML = ">";
  monthRight.className = "month-right";
  monthDiv.appendChild(monthRight);

  calendarDiv.appendChild(monthDiv);
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function createDays(calendarDiv) {
  let monthLength = daysInMonth(today.getMonth() + 1, 2023);
  const calendarDays = document.createElement("div");
  calendarDays.className = "calendar-days";

  for (let i = 1; i < 32; i++) {
    let div = document.createElement("div");
    div.className = "col ";
    div.classList += i;
    div.id = i;

    if (i <= monthLength) {
      div.innerHTML = i;
    } else {
      div.innerHTML = " ";
    }

    calendarDays.appendChild(div);
  }
  calendarDiv.appendChild(calendarDays);
}

export { handleCalendar };

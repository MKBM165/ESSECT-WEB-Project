const tabs = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
tabscontainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest("button");
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabscontent.forEach((t) => t.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//SECTION CALENDAR
const calendarEl = document.getElementById("calendar");
const eventFormEl = document.getElementById("eventForm");
const addEventBtn = document.getElementById("addEventBtn");
const saveEventBtn = document.getElementById("saveEventBtn");
const eventDateEl = document.getElementById("eventDate");
const eventTitleEl = document.getElementById("eventTitle");
const calendarTitle = document.querySelector(".calendar-title");
const currentMonth = new Date();
let currentYear = currentMonth.getFullYear();
let currentMonthIndex = currentMonth.getMonth();
calendarTitle.textContent = `Calendrier des événements De ${currentMonth.toLocaleString(
  "default",
  { month: "long" }
)}`;

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonthIndex, 1);
  const lastDay = new Date(currentYear, currentMonthIndex + 1, 0);

  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay();

  calendarEl.innerHTML = "";

  // Add day names (Sun, Mon, Tue, ...)
  const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  daysOfWeek.forEach((day) => {
    const header = document.createElement("div");
    header.classList.add("calendar-day");
    header.innerText = day;
    calendarEl.appendChild(header);
  });

  // Create empty cells for the days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day");
    calendarEl.appendChild(emptyDay);
  }

  // Create cells for each day of the month
  for (let i = 1; i <= totalDays; i++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("calendar-day");
    dayEl.innerHTML = `<span class="date">${i}</span>`;
    dayEl.addEventListener("click", () => openEventForm(i));

    const event = localStorage.getItem(
      `event-${currentYear}-${currentMonthIndex + 1}-${i
        .toString()
        .padStart(2, "0")}`
    );
    if (event) {
      const eventLabel = document.createElement("div");
      eventLabel.classList.add("event-label");
      eventLabel.innerText = event;
      dayEl.appendChild(eventLabel);
    }

    calendarEl.appendChild(dayEl);
  }
}

function openEventForm(day) {
  eventFormEl.style.display = "block";
  eventDateEl.value = `${currentYear}-${(currentMonthIndex + 1)
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  saveEventBtn.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

saveEventBtn.addEventListener("click", () => {
  const eventDate = eventDateEl.value;
  const eventTitle = eventTitleEl.value;

  if (eventDate && eventTitle) {
    const eventKey = `event-${eventDate}`;
    localStorage.setItem(eventKey, eventTitle);
    renderCalendar();
    calendarTitle.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    eventFormEl.style.display = "none";
  }
});

addEventBtn.addEventListener("click", () => {
  eventFormEl.style.display =
    eventFormEl.style.display === "block" ? "none" : "block";
});
renderCalendar();
// chat

function chat() {
  let msg = document.getElementById("msg");
  const container = document.querySelector(".text-box");
  const newMessage = document.createElement("p");
  newMessage.classList.add("text-content", "text-hidden");
  newMessage.innerHTML = `You: ${msg.value} `;
  container.appendChild(newMessage);
  setTimeout(() => {
    newMessage.classList.remove("text-hidden");
  }, 25);
  msg.value = "";
}
// Example Usage:
const send = document.querySelector(".btn-chat");
send.addEventListener("click", function (e) {
  e.preventDefault();
  chat();
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    chat();
  }
});
//Sticky nav
const header = document.querySelector(".header");
const obsOptions = {
  root: null,
  threshold: 0.2,
};
const stickyNav = function (entrys) {
  const [entry] = entrys;
  console.log(entry.isIntersecting);
  entry.isIntersecting
    ? header.classList.remove("sticky")
    : header.classList.add("sticky");
};

const hero = document.querySelector(".section-hero");
const heroObserver = new IntersectionObserver(stickyNav, obsOptions);
heroObserver.observe(hero);

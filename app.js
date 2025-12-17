// =========================
// Helpers (UNCHANGED LOGIC)
// =========================

function formatDateKey(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}-${m}`;
}

function getMonthFile(date) {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}.json`;
}

// =========================
// DOM ELEMENTS
// =========================

const verseText = document.querySelector(".verse");
const dateTitle = document.getElementById("current-date");
const textLink = document.getElementById("text-link");
const videoLink = document.getElementById("video-link");
const datePicker = document.getElementById("datePicker");

const grid = document.getElementById("calendar-grid");
const monthLabel = document.getElementById("calendar-month");

let visibleMonth = new Date();
let selectedDate = null;

// =========================
// UI UPDATE (JSON DRIVEN)
// =========================

function updateUI(entry, date) {
  dateTitle.textContent = entry.fecha; // FROM JSON ONLY
  verseText.textContent = entry.versiculo;

  textLink.href = entry.linkTexto;
  videoLink.href = entry.linkVideo;

  datePicker.value = date.toISOString().split("T")[0];
}

function highlightSelectedDay() {
  document.querySelectorAll(".day").forEach((el) => {
    el.classList.remove("selected");
  });

  if (!selectedDate) return;

  const day = selectedDate.getDate();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  document.querySelectorAll(".day").forEach((el) => {
    if (Number(el.textContent) === day) {
      el.classList.add("selected");
    }
  });
}

// =========================
// JSON LOADER
// =========================

function isEmptyEntry(entry) {
  if (!entry) return true;

  return (
    !entry.versiculo?.trim() ||
    !entry.linkTexto?.trim() ||
    !entry.linkVideo?.trim()
  );
}

async function loadDaily(date) {
  const key = formatDateKey(date);
  const file = getMonthFile(date);
  selectedDate = date;
  highlightSelectedDay();

  try {
    const res = await fetch(`./data/${file}`);
    const data = await res.json();

    if (data[key] && !isEmptyEntry(data[key])) {
      updateUI(data[key], date);
    } else {
      dateTitle.textContent = "Selecciona una fecha";
      verseText.textContent = "No hay datos para esta fecha.";

      textLink.removeAttribute("href");
      videoLink.removeAttribute("href");
    }
  } catch (err) {
    console.error(err);
    verseText.textContent = "Error al cargar los datos.";
  }
}

// =========================
// CALENDAR RENDER (UI ONLY)
// =========================

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function renderCalendar(date) {
  grid.innerHTML = "";
  monthLabel.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;

  const startDay =
    (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  for (let i = 0; i < startDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = d;

    cell.onclick = () => {
      const selected = new Date(date.getFullYear(), date.getMonth(), d);
      loadDaily(selected);
    };

    grid.appendChild(cell);
  }

  highlightSelectedDay();
}

// =========================
// CONTROLS
// =========================

document.getElementById("prevMonth").onclick = () => {
  visibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() - 1,
    1
  );
  renderCalendar(visibleMonth);
};

document.getElementById("nextMonth").onclick = () => {
  visibleMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1
  );
  renderCalendar(visibleMonth);
};

datePicker.onchange = () => {
  const [y, m, d] = datePicker.value.split("-");
  const selected = new Date(+y, +m - 1, +d);
  visibleMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
  renderCalendar(visibleMonth);
  loadDaily(selected);
};

// =========================
// INITIAL LOAD
// =========================

const today = new Date();
renderCalendar(today);
loadDaily(today);

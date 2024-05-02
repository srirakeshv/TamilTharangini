// thirukural api
let first = document.querySelector("#firstline");
let second = document.querySelector("#secondline");
let meaning = document.querySelector("#explanation");
let currentKuralNumber = 0;
let lastUpdateTimestamp = 0;

// Set the initial update time to 12:00 AM (midnight)
const initialUpdateTime = new Date("2024-05-01T00:00:00");
const initialUpdateTimestamp = initialUpdateTime.getTime();

function fetchAndUpdateThirukural(kuralNumber) {
  fetch(`thirukkural.json`)
    .then((res) => {
      return res.json();
    })
    .then((msg) => {
      // console.log(msg);
      // console.log(kuralNumber);
      let selectedKural = msg.kural[kuralNumber - 1];
      // console.log(selectedKural);
      let line1 = selectedKural.Line1;
      let line2 = selectedKural.Line2;
      let explain = selectedKural.mk;
      first.innerHTML = '"' + line1;
      second.innerHTML = line2 + '"';
      meaning.innerHTML = explain;
    })
    .catch((error) => {
      console.error("Error fetching Thirukural:", error);
    });
}

function updateThirukuralOncePerDay() {
  const now = Date.now();
  const daysSinceInitialUpdate =
    Math.floor((now - initialUpdateTimestamp) / (24 * 60 * 60 * 1000)) + 1;
  currentKuralNumber = daysSinceInitialUpdate % 1330 || 1330; // If remainder is 0, set to 1330
  fetchAndUpdateThirukural(currentKuralNumber);
  lastUpdateTimestamp = now;
}

// Calculate time until the first update
const timeUntilFirstUpdate = initialUpdateTimestamp - Date.now();
if (timeUntilFirstUpdate > 0) {
  setTimeout(() => {
    updateThirukuralOncePerDay();
    setInterval(updateThirukuralOncePerDay, 24 * 60 * 60 * 1000); // Set interval for subsequent updates
  }, timeUntilFirstUpdate);
} else {
  // If initial update time has passed for today, trigger the update immediately
  updateThirukuralOncePerDay();
  setInterval(updateThirukuralOncePerDay, 24 * 60 * 60 * 1000); // Set interval for subsequent updates
}

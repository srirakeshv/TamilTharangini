// thirukural api
let first = document.querySelector("#firstline");
let second = document.querySelector("#secondline");
let meaning = document.querySelector("#explanation");
let currentKuralNumber = 1;
let lastUpdateTimestamp = 0;

function fetchAndUpdateThirukural(kuralNumber) {
  fetch(`thirukkural.json`)
    .then((res) => {
      return res.json();
    })
    .then((msg) => {
      console.log(msg);
      let selectedKural = msg.kural[kuralNumber - 1];
      console.log(selectedKural);
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
  const oneDayInMillis = 24 * 60 * 60 * 1000; // One day in milliseconds

  if (now - lastUpdateTimestamp >= oneDayInMillis) {
    fetchAndUpdateThirukural(currentKuralNumber);
    currentKuralNumber = (currentKuralNumber % 1330) + 1;
    lastUpdateTimestamp = now;
  }
}

// Fetch and update immediately when the page loads
updateThirukuralOncePerDay();

// Check and update every minute
setInterval(updateThirukuralOncePerDay, 60 * 1000);

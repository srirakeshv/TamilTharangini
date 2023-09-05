// thirukural api
let first = document.querySelector('#firstline');
let second = document.querySelector('#secondline');
let meaning=document.querySelector('#explanation')
let currentKuralNumber = 1;
let lastUpdateTimestamp = 0;

function fetchAndUpdateThirukural(kuralNumber) {
    fetch(`https://api-thirukkural.vercel.app/api?num=${kuralNumber}`)
    .then(res => res.json())
    .then(msg => {
        let line1 = msg.line1;
        let line2 = msg.line2;
        let explain=msg.tam_exp;
        first.innerHTML = '"' + line1;
        second.innerHTML = line2 + '"';
        meaning.innerHTML=explain
    })
    .catch(error => {
        console.error('Error fetching Thirukural:', error);
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
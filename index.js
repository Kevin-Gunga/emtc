// const model = document.getElementById('models');

const models = [
    "Online",
    "Long distance",
    "Part-time(Weekends)",
    "Full-time",
];

let index = 0;

function changeMessage() {
    index = (index + 1) % models.length;
    document.getElementById("models").textContent = models[index];
}

// Change model every 3 seconds
setInterval(changeMessage, 3000);
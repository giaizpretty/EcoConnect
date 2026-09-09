// 🌱 ECOBOT

const ecoBotButton = document.getElementById("ecoBotButton");
const ecoBotWindow = document.getElementById("ecoBotWindow");
const ecoBotClose = document.getElementById("ecoBotClose");
const ecoBotSend = document.getElementById("ecoBotSend");
const ecoBotInput = document.getElementById("ecoBotInput");
const ecoBotMessages = document.getElementById("ecoBotMessages");


// 🌍 ECOBOT KNOWLEDGE

const ecoAnswers = {
    "recycling":
        "♻️ Recycling means collecting and processing used materials so they can be turned into new products.",

    "climate change":
        "🌍 Climate change is the long-term change in Earth's temperatures and weather patterns, largely caused by human activities.",

    "water":
        "💧 You can save water by turning off taps, fixing leaks and avoiding unnecessary waste.",

    "sustainability":
        "🌱 Sustainability means using resources responsibly so future generations can meet their needs too.",

    "pollution":
        "🌍 Pollution happens when harmful substances enter the environment and damage living things.",

    "renewable energy":
        "☀️ Renewable energy comes from naturally replenished sources like sunlight, wind and water.",

    "biodiversity":
        "🐝 Biodiversity is the variety of living things on Earth.",

    "deforestation":
        "🌳 Deforestation is the large-scale removal of forests and can harm wildlife and ecosystems."
};


// 🤖 GET ANSWER

function getEcoAnswer(message) {

    const text = message.toLowerCase();

    if (text.includes("recycl")) return ecoAnswers["recycling"];
    if (text.includes("climate")) return ecoAnswers["climate change"];
    if (text.includes("water")) return ecoAnswers["water"];
    if (text.includes("sustain")) return ecoAnswers["sustainability"];
    if (text.includes("pollution")) return ecoAnswers["pollution"];
    if (text.includes("renewable") || text.includes("solar") || text.includes("wind"))
        return ecoAnswers["renewable energy"];
    if (text.includes("biodiversity") || text.includes("species"))
        return ecoAnswers["biodiversity"];
    if (text.includes("deforestation") || text.includes("forest"))
        return ecoAnswers["deforestation"];

    return "Hmm 🤔🌱 I'm still learning about that! Try asking me about recycling, climate change, water, sustainability or pollution.";
}


// 💬 SEND MESSAGE

function sendEcoMessage(messageFromButton = null) {

    const message = messageFromButton || ecoBotInput.value.trim();

    if (!message) return;

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    ecoBotMessages.appendChild(userMessage);

    ecoBotInput.value = "";

    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = "Thinking... 🌱";
    ecoBotMessages.appendChild(botMessage);

    ecoBotMessages.scrollTop = ecoBotMessages.scrollHeight;

    let dots = 0;

const typing = setInterval(() => {

    dots++;

    if (dots > 3) {
        dots = 1;
    }

    botMessage.textContent =
        "Thinking" + ".".repeat(dots) + " 🌱";

}, 350);

setTimeout(() => {

    clearInterval(typing);

    botMessage.textContent =
        getEcoAnswer(message);

    ecoBotMessages.scrollTop =
        ecoBotMessages.scrollHeight;

}, 1500);

}

// 🐾 OPEN ECOBOT

ecoBotButton.addEventListener("click", () => {
    ecoBotWindow.style.display = "flex";
});


// ❌ CLOSE ECOBOT

ecoBotClose.addEventListener("click", () => {
    ecoBotWindow.style.display = "none";
});


// ➤ SEND BUTTON

ecoBotSend.addEventListener("click", () => {
    sendEcoMessage();
});


// ⌨️ ENTER KEY

ecoBotInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendEcoMessage();
    }
});


// ✨ QUICK QUESTIONS

document.querySelectorAll(".eco-question").forEach((button) => {

    button.addEventListener("click", () => {

        sendEcoMessage(button.dataset.question);

    });

});
// 🌱 OPEN ECOBOT AUTOMATICALLY
window.addEventListener("load", () => {
    setTimeout(() => {
        ecoBotWindow.style.display = "flex";
    }, 1000);
});
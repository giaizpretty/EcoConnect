// ==========================================
// 🌱 ECOCONNECT DAILY CHALLENGES
// ==========================================

// Get today's date
const today = new Date().toDateString();

// Check which day the saved challenges belong to
const savedDate = localStorage.getItem("challengeDate");

// If it's a new day, reset the completed challenges
if (savedDate !== today) {

    localStorage.removeItem("completedChallenges");

    localStorage.setItem(
        "challengeDate",
        today
    );
}


// ==========================================
// 🏆 ECO POINTS
// ==========================================

let ecoPoints =
    Number(localStorage.getItem("ecoPoints")) || 0;

let completedChallenges =
    JSON.parse(
        localStorage.getItem("completedChallenges")
    ) || [];


// ==========================================
// 📊 UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const pointsDisplay =
        document.getElementById("ecoPointsDisplay");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");


    if (pointsDisplay) {
        pointsDisplay.textContent = ecoPoints;
    }


    const progress =
        Math.min((ecoPoints / 500) * 100, 100);


    if (progressFill) {
        progressFill.style.width =
            progress + "%";
    }


    if (progressText) {

        let level = "🌱 Green Explorer";

        if (progress >= 100) {
            level = "🏆 Eco Champion";
        } else if (progress >= 70) {
            level = "🌳 Planet Protector";
        } else if (progress >= 40) {
            level = "♻️ Eco Hero";
        }

        progressText.textContent =
            `${level} (${Math.round(progress)}% Complete)`;
    }

}


// ==========================================
// 🌳 COMPLETE CHALLENGE
// ==========================================

function completeChallenge(button, points) {

    const card =
        button.closest(".challenge-card");

    const challengeName =
        card.querySelector("h3").textContent;


    // Don't allow the same challenge twice today

    if (card.classList.contains("completed")) {
        return;
    }


    // Add points

    ecoPoints += points;


    localStorage.setItem(
        "ecoPoints",
        ecoPoints
    );


    // Remember today's completed challenge

    completedChallenges.push(
        challengeName
    );


    localStorage.setItem(
        "completedChallenges",
        JSON.stringify(
            completedChallenges
        )
    );


    // Change appearance

    card.classList.add("completed");

    button.textContent =
        "✓ Completed!";


    updateDashboard();


    alert(
        `🎉 Challenge Complete!\n\n` +
        `${challengeName}\n\n` +
        `+${points} Eco Points 🌱💚`
    );
}


// ==========================================
// ♻️ RECYCLING GUIDE
// ==========================================

const recyclingGuide = {

    "plastic bottle":
        "♻️ Plastic bottles can often be recycled. Empty, rinse and place them in the correct recycling collection.",

    "bottle":
        "♻️ Empty and rinse the bottle before placing it in the appropriate recycling collection.",

    "paper":
        "📄 Clean and dry paper can usually be recycled.",

    "cardboard":
        "📦 Flatten clean cardboard boxes before recycling them.",

    "glass":
        "🍾 Glass containers can often be recycled. Check your local recycling rules.",

    "can":
        "🥫 Aluminium and steel cans are commonly recyclable. Empty and rinse them first.",

    "plastic bag":
        "🛍️ Plastic bags are not accepted in many household recycling bins. Check for a suitable collection point.",

    "battery":
        "🔋 Batteries should not go into ordinary household bins. Take them to an appropriate collection point.",

    "food":
        "🍎 Food waste can often be composted where composting facilities are available."
};


function searchRecycle() {

    const input =
        document.getElementById("searchItem");

    const result =
        document.getElementById("recyclingResult");


    const item =
        input.value.trim().toLowerCase();


    if (!item) {

        result.innerHTML =
            "🔎 Please enter an item to search.";

        return;
    }


    let answer =
        "🤔 I don't have information about that item yet. Try plastic bottle, paper, cardboard, glass, can or battery.";


    for (const key in recyclingGuide) {

        if (item.includes(key)) {

            answer =
                recyclingGuide[key];

            break;
        }
    }


    result.innerHTML =
        answer;
}


// ==========================================
// 🔢 ANIMATED STATS
// ==========================================

function animateCounters() {

    const counters =
        document.querySelectorAll(".counter");


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 100;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    Math.floor(current)
                    .toLocaleString();

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();
            }
        }


        updateCounter();

    });

}


// ==========================================
// 🚀 PAGE LOAD
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDashboard();

        animateCounters();


        // Restore today's completed challenges

        const cards =
            document.querySelectorAll(
                ".challenge-card"
            );


        cards.forEach(card => {

            const challengeName =
                card.querySelector(
                    "h3"
                ).textContent;


            if (
                completedChallenges.includes(
                    challengeName
                )
            ) {

                card.classList.add(
                    "completed"
                );


                const button =
                    card.querySelector(
                        "button"
                    );


                button.textContent =
                    "✓ Completed!";
            }

        });

    }
);

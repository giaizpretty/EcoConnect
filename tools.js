// 🌍 ECOCONNECT TOOLS


// ===============================
// 🌱 ECO CHALLENGES
// ===============================

function startChallenge(challenge) {

    alert(
        "🌱 Eco Challenge Started!\n\n" +
        challenge +
        "\n\n" +
        "You've got this! Every small action makes a difference. 💚🌍"
    );

}


// ===============================
// 🌍 CARBON FOOTPRINT CALCULATOR
// ===============================

function calculateCarbon() {

    // Get values from the form
    const carKm =
        Number(document.getElementById("carKm").value) || 0;

    const electricity =
        Number(document.getElementById("electricity").value) || 0;

    const meals =
        Number(document.getElementById("meals").value) || 0;


    // Simple educational estimates
    const carEmissions = carKm * 0.21;

    const electricityEmissions =
        electricity * 0.45;

    const foodEmissions =
        meals * 1.5;


    // Calculate total
    const total =
        carEmissions +
        electricityEmissions +
        foodEmissions;


    // Find result box
    const result =
        document.getElementById("carbonResult");


    // Display result
    result.innerHTML = `
        🌱 Your estimated weekly carbon footprint is
        <strong>${total.toFixed(1)} kg CO₂e</strong>.

        <br><br>

        Keep making small changes to reduce your impact! 🌍💚
    `;


    // Scroll to result
    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
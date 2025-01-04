async function fetchPlayerData() {
    const primaryUrl = "http://localhost:8080/players";
    const fallbackUrl = "https://kspica.github.io/TIN/projekt/moonLanderGame/data/fakePlayers.json";

    try {
        const response = await fetchWithTimeout(primaryUrl, 2000);
        if (!response.ok) throw new Error("Primary API failed");
        const players = await response.json();
        displayPlayerData(players);
    } catch (error) {
        console.warn("Primary API failed, trying fallback API", error);
        try {
            const fallbackResponse = await fetch(fallbackUrl);
            if (!fallbackResponse.ok) throw new Error("Fallback API failed");
            const fallbackplayers = await fallbackResponse.json();
            displayPlayerData(fallbackplayers);
        } catch (fallbackError) {
            console.error("Both APIs failed", fallbackError);
            document.getElementById("api-data").innerHTML = "Failed to load player data from both sources.";
        }
    }
}

async function sendPlayerData(playerName, playerScore) {
    try {
        const response = await fetch("http://localhost:8080/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify({ playerName, playerScore })
        });
    const result = await response.json();
        console.log("Player data sent successfully:", result);
    } catch (error) {
        console.error("Error sending player data:", error);
    }
}

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

function displayPlayerData(players) {
    let displayText = "<h3>Best Scores:</h3><ul>";
    let i = 1;
    players.forEach(player => {
        displayText += `<li><strong>${i}. ${player.playerName}:</strong> ${player.playerScore}</li>`;
        i++;
    });
    displayText += "</ul>";

    console.log(displayText);
    document.getElementById("api-data").innerHTML = displayText;
}
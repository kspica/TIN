    async function fetchUserData() {
        try {
            const response = await fetch("http://localhost:8080/users");
            const users = await response.json();

            let displayText = "<h3>Best Scores:</h3><ul>";
            let i = 1;
            users.forEach(user => {
                displayText += `<li><strong>${i}. ${user.playerName}:</strong> ${user.playerScore}</li>`;
                i++;
            });
            displayText += "</ul>";

            console.log(displayText);
            document.getElementById("api-data").innerHTML = displayText;
        } catch (error) {
            document.getElementById("api-data").innerHTML = "Failed to load user data.";
            console.error("Error fetching user data:", error);
        }
    }

    async function sendPlayerData(playerName, playerScore) {
        try {
            const response = await fetch("http://localhost:8080/users", {
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
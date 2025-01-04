    let playerName = prompt("Please enter your name:", "Player");
    if (!playerName) {
        playerName = "Player";
    }

    fetchUserData();

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const GRAVITY = 0.05;
    const THRUST = -0.1;
    const ROTATION_SPEED = 0.05;
    const FUEL_CONSUMPTION = 1;

    let fuel = 100;
    let speed = 0;
    let height = canvas.height - 100;
    let x = Math.random() * canvas.width; // Random horizontal position
    let y = 100;
    let angle = 0;
    let vx = 0;
    let vy = 1; // Ensure no upward motion initially
    let isThrusting = false;
    let isRotatingLeft = false;
    let isRotatingRight = false;
    let startTime = Date.now();
    let stopGame = false;

    const terrainPoints = generateTerrain();
    terrainPoints.forEach((point) => {
        console.log("X: " + point.x + " Y: " + point.y);
    });
    console.log(canvas.width, canvas.height);
    console.log("X points range from : " + canvas.width / 2 - 50 + " to: " + canvas.width / 2 + 50);
    const xPointsRangeForPlatform = terrainPoints.filter(point =>
        point.x >= canvas.width / 2 - 50 && point.x <= canvas.width / 2 + 100
        );
    const maxYCoordinateForPlatform = xPointsRangeForPlatform.reduce((min, point) => point.y > min.y ? point : min, xPointsRangeForPlatform[0]);

    console.log("X points: ");
    xPointsRangeForPlatform.forEach((point) => {
        console.log("X: " + point.x +" Y: "+ point.y);
    });
    console.log("Max Y coordinate: " + maxYCoordinateForPlatform.y);
    const landingPlatform = {
        x: canvas.width / 2 - 50,
        y: maxYCoordinateForPlatform.y - 50,
        width: 100,
        height: 10
    };

    console.log("Landing platform x: " + landingPlatform.x + " Landing platform y: " + landingPlatform.y);


    function generateTerrain() {
        const points = [];
        let currentX = 0;
        let currentY = canvas.height - 150;
        while (currentX <= canvas.width) {
            points.push({x: currentX, y: currentY});
            currentX += 50;
            currentY += Math.random() * 100 - 50;
            if (currentY > canvas.height - 50) currentY = canvas.height - 50;
            if (currentY < canvas.height - 200) currentY = canvas.height - 200;
        }
        return points;
    }

    const updateHUD = () => {
        document.getElementById('fuel').innerText = Math.max(0, Math.floor(fuel));
        document.getElementById('speed').innerText = Math.sqrt(vx * vx + vy * vy).toFixed(2);
        document.getElementById('height').innerText = Math.max(0, Math.floor(height - y));
    };

    const drawLander = () => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Draw rocket body
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(-10, -15);
        ctx.lineTo(10, -15);
        ctx.lineTo(0, 15);
        ctx.closePath();
        ctx.fill();

        // Draw flame if thrusting
        if (isThrusting && fuel > 0) {
            ctx.fillStyle = 'orange';
            ctx.beginPath();
            ctx.moveTo(-5, 15);
            ctx.lineTo(5, 15);
            ctx.lineTo(0, 25);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    };

    const drawTerrain = () => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(terrainPoints[0].x, terrainPoints[0].y);
        console.log("Punkt start: " + terrainPoints[0].x +  " : " + terrainPoints[0].y);
        for (let i = 1; i < terrainPoints.length; i++) {
            console.log("Punkt do: " + terrainPoints[i].x +  " : " + terrainPoints[i].y);
            ctx.lineTo(terrainPoints[i].x, terrainPoints[i].y);
        }
        ctx.stroke();

        // Draw landing platform
        ctx.fillStyle = 'green';
        console.log("Platform xy width height: " + landingPlatform.x, landingPlatform.y, landingPlatform.width, landingPlatform.height);
        ctx.fillRect(landingPlatform.x, landingPlatform.y, landingPlatform.width, landingPlatform.height);
    };


    const checkLanding = () => {
        const elapsedTime = (Date.now() - startTime) / 1000;

        if (
            x > landingPlatform.x &&
            x < landingPlatform.x + landingPlatform.width &&
            y >= landingPlatform.y - 15
        ) {
            if (Math.sqrt(vx * vx + vy * vy) < 3) {
                const score = Math.floor(fuel) + 10000 - Math.floor(elapsedTime) * 500;
                alert(`You landed successfully ${playerName}! Your score: ${score} points.`);
                sendPlayerData(playerName, score);
                if (confirm("Play again?")) {
                    fetchUserData();
                    resetGame();
                } else {
                    stopGame = true;
                    return;
                }
            } else {
                alert('Crash! Too fast to land.');
                if (confirm("Play again?")) {
                    resetGame();
                } else {
                    stopGame = true;
                    return;
                }
            }
        } else {
            for (let i = 0; i < terrainPoints.length - 1; i++) {
                const p1 = terrainPoints[i];
                const p2 = terrainPoints[i + 1];

                if (x >= p1.x && x <= p2.x) {
                    const terrainY = p1.y + ((p2.y - p1.y) / (p2.x - p1.x)) * (x - p1.x);
                    if (y >= terrainY) {
                        alert('Crash! You hit the terrain.');
                        if (confirm("Play again?")) {
                            resetGame();
                        } else {
                            stopGame = true;
                            return;
                        }
                        return;
                    }
                }
            }
        }
    };

    const update = () => {
        if (isThrusting && fuel > 0) {
            const thrustX = Math.sin(angle) * THRUST;
            const thrustY = Math.cos(angle) * THRUST;
            vx -= thrustX;
            vy += thrustY;
            fuel -= FUEL_CONSUMPTION * 0.1;
        }

        if (isRotatingLeft) {
            angle -= ROTATION_SPEED;
        }
        if (isRotatingRight) {
            angle += ROTATION_SPEED;
        }

        vy += GRAVITY;
        x += vx;
        y += vy;

        if (x < 0) x = canvas.width;
        if (x > canvas.width) x = 0;

        checkLanding();
        updateHUD();

        // console.log(`X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, VX: ${vx.toFixed(2)}, VY: ${vy.toFixed(2)}, Fuel: ${fuel.toFixed(2)}, Angle: ${(angle * (180 / Math.PI)).toFixed(2)}°`);
    };


    const resetGame = () => {
        fuel = 100;
        speed = 0;
        height = canvas.height - 100;
        x = Math.random() * canvas.width; // Randomize horizontal position on reset
        y = 100;
        angle = 0;
        vx = 0;
        vy = 1; // Ensure no upward motion initially
        startTime = Date.now();
    };

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTerrain();
        drawLander();
    };

    const endGame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white"
        ctx.font = "80px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Thanks for playing!", canvas.width / 2, canvas.height / 2);
    }

    const gameLoop = () => {
        if (stopGame) {
            endGame();
        } else {
            update();
            render();
            requestAnimationFrame(gameLoop);
        }
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') isThrusting = true;
        if (e.key === 'ArrowLeft') isRotatingLeft = true;
        if (e.key === 'ArrowRight') isRotatingRight = true;
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp') isThrusting = false;
        if (e.key === 'ArrowLeft') isRotatingLeft = false;
        if (e.key === 'ArrowRight') isRotatingRight = false;
    });

    gameLoop();
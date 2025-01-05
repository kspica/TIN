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
    let x = Math.random() * canvas.width;
    let y = 100;
    let angle = 0;
    let vx = 0;
    let vy = 1;
    let isThrusting = false;
    let isRotatingLeft = false;
    let isRotatingRight = false;
    let startTime = Date.now();
    let stopGame = false;
    let transformedVertices = [];

    const terrainPoints = generateTerrain();

    const xPointsRangeForPlatform = terrainPoints.filter(point =>
        point.x >= canvas.width / 2 - 50 && point.x <= canvas.width / 2 + 100
    );
    const maxYCoordinateForPlatform = xPointsRangeForPlatform.reduce((min, point) => point.y > min.y ? point : min, xPointsRangeForPlatform[0]);

    const landingPlatform = {
        x: canvas.width / 2 - 50,
        y: maxYCoordinateForPlatform.y - 50,
        width: 100,
        height: 10
    };


    let playerName = prompt("Please enter your name:", "Player");
    if (!playerName) {
        playerName = "Player";
    }

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

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(-10, -15);
        ctx.lineTo(10, -15);
        ctx.lineTo(0, 15);
        ctx.closePath();
        ctx.fill();

        transformedVertices = getTransformedVertices(x, y, angle);

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

    function getTransformedVertices(x, y, angle) {
        const vertices = [
            {px: -10, py: -15, label: "Left Top"}, // Lewy górny wierzchołek
            {px: 10, py: -15, label: "Right Top"},  // Prawy górny wierzchołek
            {px: 0, py: 15, label: "Bottom - Engine"}     // Dolny środek - miejsce napędu rakiety
        ];

        return vertices.map(vertex => {
            return {
                x: x + (vertex.px * Math.cos(angle) - vertex.py * Math.sin(angle)),
                y: y + (vertex.px * Math.sin(angle) + vertex.py * Math.cos(angle)),
                label: vertex.label
            };
        });
    }

    const drawTerrain = () => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(terrainPoints[0].x, terrainPoints[0].y);

        for (let i = 1; i < terrainPoints.length; i++) {
            ctx.lineTo(terrainPoints[i].x, terrainPoints[i].y);
        }
        ctx.stroke();

        ctx.fillStyle = 'green';
        ctx.fillRect(landingPlatform.x, landingPlatform.y, landingPlatform.width, landingPlatform.height);
    };


    function checkLanderPosition(transformedVertices) {
        let isLandingPositionValid = false;
        let leftTop = transformedVertices[0];
        let rightTop = transformedVertices[1];
        let bottom = transformedVertices[2];
        if (typeof leftTop !== "undefined" && typeof rightTop !== "undefined" && typeof bottom !== "undefined") {
            if (bottom.y - leftTop.y < 15 || bottom.y - rightTop.y < 15) {
                isLandingPositionValid = true;
            }
        }

        return isLandingPositionValid;
    }

    const checkLanding = () => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        if (
            x > landingPlatform.x &&
            x < landingPlatform.x + landingPlatform.width &&
            y >= landingPlatform.y - 15
        ) {
            if (Math.sqrt(vx * vx + vy * vy) < 3) {
                if (checkLanderPosition(transformedVertices)) {
                    alert('Crash!Wrong landing position!');
                } else {
                    const score = Math.floor(fuel) + 10000 - Math.floor(elapsedTime) * 500;
                    alert(`You landed successfully ${playerName}! Your score: ${score} points.`);
                    sendPlayerData(playerName, score);
                }

                if (confirm("Play again?")) {
                    fetchPlayerData();
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
    };


    const resetGame = () => {
        fuel = 100;
        speed = 0;
        height = canvas.height - 100;
        mathRand = Math.random();
        x = mathRand * canvas.width;
        y = 100;
        angle = 0;
        vx = 0;
        vy = 1;
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

    fetchPlayerData();
    gameLoop();
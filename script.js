const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let car = {
    x: 100,
    y: 0,
    width: 50,
    height: 30,
    vY: 0,
    rot: 0,
    speed: 0
};

let ground = [];
let viewOffset = 0;

// Generate smooth hills using sine waves
for (let i = 0; i < 2000; i++) {
    ground.push(canvas.height - (Math.sin(i * 0.02) * 50 + Math.cos(i * 0.05) * 30 + 100));
}

function update() {
    // Gravity and Ground collision
    let currentX = Math.floor(car.x + viewOffset);
    let groundY = ground[currentX];

    if (car.y < groundY - car.height) {
        car.vY += 0.5; // Gravity
    } else {
        car.vY = 0;
        car.y = groundY - car.height;
    }

    car.y += car.vY;
    viewOffset += car.speed;

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ground
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, ground[i + Math.floor(viewOffset)]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fillStyle = "#4d2926"; // Dirt color
    ctx.fill();

    // Draw Car (Simple Box for now)
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, car.width, car.height);
    ctx.restore();
}

// Controls
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") car.speed = 5;
    if (e.key === "ArrowLeft") car.speed = -2;
});

window.addEventListener('keyup', () => car.speed = 0);

update();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Game Variables
let car = {
    x: 150,
    y: 0,
    w: 50,
    h: 25,
    vY: 0,
    angle: 0,
    speed: 0
};

let ground = [];
let offset = 0;

// Generate smooth terrain (hills)
for (let i = 0; i < 5000; i++) {
    ground[i] = 300 - Math.sin(i * 0.02) * 50 - Math.cos(i * 0.05) * 20;
}

function update() {
    // Determine ground position under the car
    let groundX = Math.floor(car.x + offset);
    let targetY = ground[groundX] - car.h;

    // Gravity and Physics
    if (car.y < targetY) {
        car.vY += 0.8; // Gravity pulling down
    } else {
        car.vY = 0;
        car.y = targetY; // Stay on ground
        
        // Calculate car angle based on hill slope
        let nextGroundY = ground[groundX + 5];
        car.angle = Math.atan2(nextGroundY - ground[groundX], 5);
    }

    car.y += car.vY;
    offset += car.speed;

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sky
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Ground
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, ground[i + Math.floor(offset)]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fillStyle = "#4d2926"; // Dark Brown Ground
    ctx.fill();

    // Draw Car with Rotation
    ctx.save();
    ctx.translate(car.x, car.y + car.h);
    ctx.rotate(car.angle);
    
    // Car Body
    ctx.fillStyle = "#e74c3c"; // Red Car
    ctx.fillRect(-car.w/2, -car.h, car.w, car.h);
    
    // Wheels (Static for now)
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(-15, 0, 8, 0, Math.PI * 2);
    ctx.arc(15, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Input Handling
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") car.speed = 4;
    if (e.key === "ArrowLeft") car.speed = -2;
});

window.addEventListener('keyup', () => car.speed = 0);

update();

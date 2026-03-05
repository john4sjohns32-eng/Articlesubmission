const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let car = {
    x: 150,
    y: 0,
    w: 70,
    h: 30,
    vY: 0,
    angle: 0,
    speed: 0,
    wheelRotation: 0
};

let ground = [];
let offset = 0;

// Generate smooth terrain
for (let i = 0; i < 5000; i++) {
    ground[i] = 320 - Math.sin(i * 0.02) * 60 - Math.cos(i * 0.05) * 30;
}

function update() {
    let groundX = Math.floor(car.x + offset);
    let targetY = ground[groundX] - 25; // Adjusted for wheel height

    if (car.y < targetY) {
        car.vY += 0.5;
    } else {
        car.vY = 0;
        car.y = targetY;
        let slope = (ground[groundX + 5] - ground[groundX]) / 5;
        car.angle = Math.atan(slope);
    }

    car.y += car.vY;
    offset += car.speed;
    car.wheelRotation += car.speed * 0.1; // Rotate wheels based on speed

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sky & Sun
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.beginPath(); ctx.arc(700, 50, 30, 0, Math.PI*2); ctx.fill();

    // Draw Ground
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, ground[i + Math.floor(offset)]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fillStyle = "#4d2926";
    ctx.fill();

    // Draw Car
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);

    // Car Body Design
    ctx.fillStyle = "#e74c3c"; // Red Body
    ctx.beginPath();
    ctx.roundRect(-car.w/2, -car.h, car.w, car.h, 5);
    ctx.fill();
    
    // Car Top (Cabin)
    ctx.fillStyle = "#c0392b";
    ctx.beginPath();
    ctx.moveTo(-15, -car.h);
    ctx.lineTo(0, -car.h - 15);
    ctx.lineTo(25, -car.h - 15);
    ctx.lineTo(35, -car.h);
    ctx.fill();

    // Draw Wheels (With Spoke Animation)
    drawWheel(-25, 5);
    drawWheel(25, 5);

    ctx.restore();
}

function drawWheel(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(car.wheelRotation);
    
    // Tire
    ctx.fillStyle = "#333";
    ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI*2); ctx.fill();
    
    // Rim
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 0); ctx.lineTo(10, 0);
    ctx.moveTo(0, -10); ctx.lineTo(0, 10);
    ctx.stroke();
    
    ctx.restore();
}

window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") car.speed = 4;
    if (e.key === "ArrowLeft") car.speed = -2;
});
window.addEventListener('keyup', () => car.speed = 0);

update();

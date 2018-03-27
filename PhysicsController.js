function initializeObjects() {
    for(let i = 0; i < objectCount; i++) {
        let xPos = 100 + Math.floor(Math.random() * 300);
        let yPos = 100 + Math.floor(Math.random() * 300);
        let xVel = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 1000);
        let yVel = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 1000);
        let radius = 10 + Math.floor(Math.random() * 40);
        model.addObject(radius, xPos, yPos, xVel, yVel);
    }
}

function start() {
    initializeObjects();
    requestId = window.requestAnimationFrame(animate);
}

function pause() {
    if(requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}

function animate() {
    model.update();
    view.draw();
    requestId = window.requestAnimationFrame(animate);
}

function reset() {
    if(requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
    view.clear();
    model = new PhysicsModel(500, 500);
    view = new PhysicsView(model, canvas);
    initializeObjects();
}

var canvas = document.getElementById("myCanvas");
var model = new PhysicsModel(500, 500);
var view = new PhysicsView(model, canvas);
var objectCount = 20;

var gravitySlider = document.getElementById("slider-gravity");
var gravityDisplay = document.getElementById("gravity");

var requestId;

gravitySlider.valueAsNumber = model.gravity;
gravityDisplay.textContent = model.gravity;
gravitySlider.addEventListener("input", (e) => {
    model.gravity = e.target.valueAsNumber;
    gravityDisplay.textContent = model.gravity;
});

document.getElementById("btn-start").addEventListener("click", start)
document.getElementById("btn-pause").addEventListener("click", pause)
document.getElementById("btn-reset").addEventListener("click", reset)


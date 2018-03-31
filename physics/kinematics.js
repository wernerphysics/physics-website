var canvas = document.getElementById("main-canvas");

physicsParams = {
    worldGravity: 10,
    relativeGravity: 0,
    simulationRate: 0.02,
    bounceFactor: 0.9,
    edgeCollision: true,
    objectCollision: false,
    width: canvas.width,
    height: canvas.height
};

var model = new PhysicsModel(physicsParams);
var view = new PhysicsView(model, canvas);
var controller = new PhysicsController(model, view);
var initialObjectCount = 10;

controller.bindButton("btn-start", controller.animate)
controller.bindButton("btn-pause", controller.pause)
controller.bindButton("btn-reset", controller.reset)
controller.bindButton("btn-reset", initialize)

controller.bindSlider("slider-gravity", "gravity", "worldGravity");
controller.bindSlider("slider-simrate", "simrate", "simulationRate");
controller.bindSlider("slider-bounce", "bounce", "bounceFactor");

initialize();

function initialize() {
    model.clearObjects();
    for(let i = 0; i < initialObjectCount; i++) {
        generateRandomObject();
    }
    view.draw();
}

function generateRandomObject(objectCount) {
    function randomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    let maxPos = 200;
    let maxVel = 500;
    let xPos = randomSign() * Math.floor(Math.random() * maxPos);
    let yPos = randomSign() * Math.floor(Math.random() * maxPos);
    let xVel = randomSign() * Math.floor(Math.random() * maxVel);
    let yVel = randomSign() * Math.floor(Math.random() * maxVel);
    let mass = 10 + Math.floor(Math.random() * 1000);
    model.addObject(mass, xPos, yPos, xVel, yVel);
}


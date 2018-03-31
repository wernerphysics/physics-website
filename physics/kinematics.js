physicsParams = {
    worldGravity: 10,
    relativeGravity: 0,
    simulationRate: 0.02,
    bounceFactor: 0.9,
    edgeCollision: true,
    objectCollision: false,
};

var canvas = document.getElementById("main-canvas");
var model = new PhysicsModel(physicsParams, canvas);
var view = new PhysicsView(model, canvas);
var controller = new PhysicsController(model, view, canvas);
var initialObjectCount = 10;

controller.bindButton("btn-start", controller.animate)
controller.bindButton("btn-pause", controller.pause)
controller.bindButton("btn-reset", controller.reset)
controller.bindButton("btn-reset", generateRandomObjects)

controller.bindSlider("slider-gravity", "gravity", "worldGravity");
controller.bindSlider("slider-simrate", "simrate", "simulationRate");
controller.bindSlider("slider-bounce", "bounce", "bounceFactor");

controller.bindClick();

generateRandomObjects();

function generateRandomObjects() {
    model.clearObjects();
    for(let i = 0; i < initialObjectCount; i++) {
        randomObject();
    }
    view.draw();
}

function randomObject() {
    let posRange = 400;
    let velRange = 1000;
    let xPos = -200 + Math.floor(Math.random() * posRange);
    let yPos = -200 + Math.floor(Math.random() * posRange);
    let xVel = -500 + Math.floor(Math.random() * velRange);
    let yVel = -500 + Math.floor(Math.random() * velRange);
    let mass = 10 + Math.floor(Math.random() * 1000);
    model.addObject(mass, xPos, yPos, xVel, yVel);
}


var canvas = document.getElementById("main-canvas");

physicsParams = {
    worldGravity: 0,
    relativeGravity: 10,
    simulationRate: 0.02,
    bounceFactor: 0.9,
    edgeCollision: false,
    objectCollision: true,
    width: canvas.width,
    height: canvas.height
};

var model = new PhysicsModel(physicsParams);
var view = new PhysicsView(model, canvas);
var controller = new PhysicsController(model, view);

controller.bindButton("btn-start", controller.animate)
controller.bindButton("btn-pause", controller.pause)
controller.bindButton("btn-reset", controller.reset)
controller.bindButton("btn-reset", initialize)

controller.bindSlider("slider-rel-gravity", "rel-gravity", "relativeGravity");
controller.bindSlider("slider-simrate", "simrate", "simulationRate");
controller.bindSlider("slider-bounce", "bounce", "bounceFactor");

initialize();

function initialize() {
    model.clearObjects();
    model.addObject(4000, 0, 0, 0, 0);
    model.addObject(40, 0, 100, 150, 0);
    model.addObject(40, 0, -100, -150, 0);
    model.addObject(40, 200, 0, 0, 100);
    model.addObject(40, -200, 0, 0, -100);
    view.draw();
}


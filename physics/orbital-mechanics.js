physicsParams = {
    worldGravity: 0,
    relativeGravity: 10,
    simulationRate: 0.02,
    bounceFactor: 0.9,
    edgeCollision: false,
    objectCollision: true,
};

var canvas = document.getElementById("main-canvas");
var model = new PhysicsModel(physicsParams, canvas);
var view = new PhysicsView(model, canvas);
var controller = new PhysicsController(model, view, canvas);

controller.bindButton("btn-start", controller.animate)
controller.bindButton("btn-pause", controller.pause)
controller.bindButton("btn-reset", controller.reset)
controller.bindButton("btn-reset", initializeOrbits)

controller.bindSlider("slider-rel-gravity", "rel-gravity", "relativeGravity");
controller.bindSlider("slider-simrate", "simrate", "simulationRate");
controller.bindSlider("slider-bounce", "bounce", "bounceFactor");

controller.bindClick();

initializeOrbits();

function initializeOrbits() {
    model.clearObjects();
    model.addObject(4000, 0, 0, 0, 0);
    model.addObject(40, 0, 100, 150, 0);
    model.addObject(40, 0, -100, -150, 0);
    model.addObject(40, 200, 0, 0, 100);
    model.addObject(40, -200, 0, 0, -100);
    view.draw();
}


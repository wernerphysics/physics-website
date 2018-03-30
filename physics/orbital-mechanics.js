var canvas = document.getElementById("myCanvas");
var model = new PhysicsModel(canvas.width, canvas.height);
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


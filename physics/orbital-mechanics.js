let canvas = document.getElementById("myCanvas");
let model = new PhysicsModel(canvas.width, canvas.height);
let view = new PhysicsView(model, canvas);
let controller = new PhysicsController(model, view);

controller.bindButton("btn-start", "animate")
controller.bindButton("btn-pause", "pause")
controller.bindButton("btn-reset", "reset")

controller.bindSlider("slider-world-gravity", "world-gravity", "worldGravity");
controller.bindSlider("slider-rel-gravity", "rel-gravity", "relativeGravity");
controller.bindSlider("slider-simrate", "simrate", "simulationRate");
controller.bindSlider("slider-bounce", "bounce", "bounceFactor");

model.addObject(4000, 0, 0, 0, 0);
model.addObject(40, 0, 100, 150, 0);
model.addObject(40, 0, -100, -150, 0);
model.addObject(40, 200, 0, 0, 100);
model.addObject(40, -200, 0, 0, -100);


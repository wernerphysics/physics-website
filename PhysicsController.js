var canvas = document.getElementById("myCanvas");
var model = new PhysicsModel(canvas.width, canvas.height);
var view = new PhysicsView(model, canvas);
var objectCount = 20;
var requestId = undefined;

bindSlider("slider-gravity", "gravity", model, "gravity");
bindSlider("slider-simrate", "simrate", model, "simulationRate");
bindSlider("slider-bounce", "bounce", model, "bounceFactor");
bindSlider("slider-object-count", "object-count", window, "objectCount");

document.getElementById("btn-start").addEventListener("click", start);
document.getElementById("btn-pause").addEventListener("click", pause);
document.getElementById("btn-resume").addEventListener("click", animate);
document.getElementById("btn-reset").addEventListener("click", reset);

function start() {
    model.clearObjects();
    model.generateRandomObjects(objectCount);
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
}

function bindSlider(sliderId, labelId, object, field) {
    var slider = document.getElementById(sliderId);
    var label = document.getElementById(labelId);

    slider.valueAsNumber = object[field];
    label.textContent = object[field];

    slider.addEventListener("input", (e) => {
        object[field] = e.target.valueAsNumber;
        label.textContent = object[field];
    });
}


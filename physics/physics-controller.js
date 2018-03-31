class PhysicsController {
    constructor(model, view, canvas) {
        this.model = model;
        this.view = view;
        this.canvas = canvas;
        this.requestId = undefined;

        this.animate = this.animate.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
        this.mouseDownListener = this.mouseDownListener.bind(this);
        this.mouseUpListener = this.mouseUpListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);
    }

    animate() {
        this.model.update();
        this.view.draw();
        this.requestId = window.requestAnimationFrame(this.animate);
    }

    pause() {
        if(this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    reset() {
        this.view.clear();
        if(this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    bindButton(buttonId, functionId) {
        document.getElementById(buttonId).addEventListener("click", functionId);
    }

    bindSlider(sliderId, labelId, param) {
        let slider = document.getElementById(sliderId);
        let label = document.getElementById(labelId);

        slider.valueAsNumber = this.model[param];
        label.textContent = this.model[param];

        slider.addEventListener("input", (e) => {
            this.model[param] = e.target.valueAsNumber;
            label.textContent = this.model[param];
        });
    }

    bindClick() {
        this.canvas.addEventListener("mousedown", this.mouseDownListener);
    }

    mouseDownListener(event) {
        this.pause();
        this.canvas.addEventListener("mouseup", this.mouseUpListener);
        this.canvas.addEventListener("mouseleave", this.mouseUpListener);
        this.canvas.addEventListener("mousemove", this.mouseMoveListener);
        this.canvas.addEventListener("touchmove", this.mouseMoveListener);

        this.canvasX = event.offsetX;
        this.canvasY = event.offsetY;
        this.objectX = this.canvasX - 250;
        this.objectY = 250 - this.canvasY;
    }

    mouseUpListener(event) {
        this.canvas.removeEventListener("mousemove", this.mouseMoveListener);
        this.canvas.removeEventListener("touchmove", this.mouseMoveListener);
        this.canvas.removeEventListener("mouseleave", this.mouseUpListener);

        let xVel = 5 * (event.offsetX - this.canvasX);
        let yVel = 5 * (this.canvasY - event.offsetY);
        this.model.addObject(100, this.objectX, this.objectY, xVel, yVel);
        this.animate();
    }

    mouseMoveListener(event) {
        this.view.draw()
        this.view.drawArrow(this.canvasX, this.canvasY, event.offsetX, event.offsetY);
    }
}


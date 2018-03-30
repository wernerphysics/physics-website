class PhysicsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.requestId = undefined;
        this.animate = this.animate.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
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
}


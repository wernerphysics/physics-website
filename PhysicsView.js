class PhysicsView {
    constructor(model, canvas) {
        this.model = model;
        this.context = canvas.getContext("2d");
        this.xSize = model.xEdge;
        this.ySize = model.yEdge;
    }

    clear() {
        this.context.clearRect(0, 0, this.xSize, this.ySize);
    }

    draw() {
        this.clear();
        model.physicsObjects.forEach((item) => {
            this.context.beginPath();
            this.context.arc(item.xPos, item.yPos, item.radius, 0, 2*Math.PI, false);
            this.context.closePath();
            this.context.fillStyle = 'rgba(185, 211, 238, 0.5)';
            this.context.fill();
        });
    }
}


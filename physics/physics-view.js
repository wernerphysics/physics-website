class PhysicsView {
    constructor(model, canvas) {
        this.model = model;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        this.model.physicsObjects.forEach((item) => {
            let canvasX = this.model.xEdge + item.xPos;
            let canvasY = this.model.yEdge - item.yPos;
            this.context.beginPath();
            this.context.arc(canvasX, canvasY, item.radius, 0, 2*Math.PI, false);
            this.context.closePath();
            this.context.fillStyle = 'rgba(185, 211, 238, 0.5)';
            this.context.fill();
        });
    }

    drawCircle(canvasX, canvasY) {
        this.context.beginPath();
        this.context.arc(canvasX, canvasY, 10, 0, 2*Math.PI, false);
        this.context.closePath();
        this.context.fillStyle = "blue";
        this.context.fill();
    }

    drawArrow(startX, startY, endX, endY) {
        this.context.lineWidth = 3;
        this.context.strokeStyle = "blue";

        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.closePath();
        this.context.stroke();
    }
}


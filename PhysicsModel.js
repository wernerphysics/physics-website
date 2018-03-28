class PhysicsModel {
    constructor(xEdge, yEdge) {
        this.gravity = 10;
        this.simulationRate = .005;
        this.bounceFactor = 0.9;
        this.xEdge = xEdge;
        this.yEdge = yEdge;
        this.physicsObjects = [];
    }

    addObject(radius, xPos, yPos, xVel, yVel) {
        this.physicsObjects.push(new PhysicsObject(radius, xPos, yPos, xVel, yVel));
    }

    clearObjects() {
        this.physicsObjects = [];
    }

    generateRandomObjects(objectCount) {
        for(let i = 0; i < objectCount; i++) {
            let xPos = 100 + Math.floor(Math.random() * 300);
            let yPos = 100 + Math.floor(Math.random() * 300);
            let xVel = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 1000);
            let yVel = (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 1000);
            let radius = 10 + Math.floor(Math.random() * 40);
            model.addObject(radius, xPos, yPos, xVel, yVel);
        }
    }

    update() {
        this.physicsObjects.forEach((item) => {
            item.update(this);
        });
    }
}

class PhysicsObject {
    constructor(radius, xPos, yPos, xVel, yVel) {
        this.radius = radius;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    update(model) {
        this.yVel += model.gravity;
        this.xPos += model.simulationRate * this.xVel;
        this.yPos += model.simulationRate * this.yVel;
        this.applyWallCollision(model);
    }

    applyWallCollision(model) {
        if(this.xPos <= this.radius || this.xPos >= (model.xEdge - this.radius)) {
            this.xVel *= -1 * model.bounceFactor;
        } if(this.yPos <= this.radius || this.yPos >= (model.yEdge - this.radius)) {
            this.yVel *= -1 * model.bounceFactor;
        }
    }
}


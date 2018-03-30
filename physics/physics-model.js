class PhysicsModel {
    constructor(width, height) {
        this.worldGravity = 0;
        this.relativeGravity = 10;
        this.simulationRate = .02;
        this.bounceFactor = 0.9;
        this.xEdge = width / 2;
        this.yEdge = height / 2;
        this.physicsObjects = [];
    }

    addObject(mass, xPos, yPos, xVel, yVel) {
        let p = new PhysicsObject(this, mass, xPos, yPos, xVel, yVel);
        this.physicsObjects.push(p);
    }

    generateRandomObjects(objectCount) {
        let maxPos = 200;
        let maxVel = 100;
        for(let i = 0; i < objectCount; i++) {
            let xPos = 100 + Math.floor(Math.random() * maxPos);
            let yPos = 100 + Math.floor(Math.random() * maxPos);
            let xSign = (Math.random() < 0.5 ? -1 : 1)
            let ySign = (Math.random() < 0.5 ? -1 : 1)
            let xVel = xSign * Math.floor(Math.random() * maxVel);
            let yVel = ySign * Math.floor(Math.random() * maxVel);
            let mass = 10 + Math.floor(Math.random() * 40);
            model.addObject(mass, xPos, yPos, xVel, yVel);
        }
    }

    update() {
        this.physicsObjects.forEach((item) => {
            item.update(this);
        });
    }
}

class PhysicsObject {
    constructor(model, mass, xPos, yPos, xVel, yVel) {
        this.model = model;
        this.mass = mass;
        this.radius = Math.sqrt(mass);
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    update() {
        this.applyWorldGravity();
        this.applyRelativeGravity();
        this.applyWallCollision();
        this.xPos += this.model.simulationRate * this.xVel;
        this.yPos += this.model.simulationRate * this.yVel;
    }

    applyForce(magnitude, heading) {
        let acceleration = magnitude / this.mass;
        this.xVel += acceleration * Math.cos(heading);
        this.yVel += acceleration * Math.sin(heading);
    }

    applyWorldGravity() {
        this.yVel -= this.model.worldGravity;
    }

    applyRelativeGravity() {
       this.model.physicsObjects.forEach((other) => {
           if(this != other) {
               let xDistance = other.xPos - this.xPos;
               let yDistance = other.yPos - this.yPos;
               let distanceSquare = Math.pow(xDistance, 2) + Math.pow(yDistance, 2);
               let magnitude = this.model.relativeGravity * (this.mass * other.mass) / distanceSquare;
               let heading = Math.atan2(yDistance, xDistance);
               this.applyForce(magnitude, heading);
           }
       });
    }

    applyWallCollision() {
        if(this.xPos <= (this.radius - this.model.xEdge)
           || this.xPos >= (this.model.xEdge - this.radius)) {
            this.xVel *= -1 * this.model.bounceFactor;
        } if(this.yPos <= (this.radius - this.model.yEdge)
             || this.yPos >= (this.model.yEdge - this.radius)) {
            this.yVel *= -1 * this.model.bounceFactor;
        }
    }
}


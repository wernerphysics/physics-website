class PhysicsModel {
    constructor(params) {
        this.worldGravity = params.worldGravity;
        this.relativeGravity = params.relativeGravity;
        this.simulationRate = params.simulationRate;
        this.bounceFactor = params.bounceFactor;
        this.edgeCollision = params.edgeCollision;
        this.objectCollision = params.objectCollision;
        this.xEdge = params.width / 2;
        this.yEdge = params.height / 2;
        this.physicsObjects = [];
    }

    addObject(mass, xPos, yPos, xVel, yVel) {
        let p = new PhysicsObject(this, mass, xPos, yPos, xVel, yVel);
        this.physicsObjects.push(p);
    }

    clearObjects() {
        this.physicsObjects = [];
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


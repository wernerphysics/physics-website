class PhysicsModel {
    constructor(params, canvas) {
        this.worldGravity = params.worldGravity;
        this.relativeGravity = params.relativeGravity;
        this.simulationRate = params.simulationRate;
        this.bounceFactor = params.bounceFactor;
        this.edgeCollision = params.edgeCollision;
        this.objectCollision = params.objectCollision;
        this.xEdge = canvas.width / 2;
        this.yEdge = canvas.height / 2;
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
        if(this.model.worldGravity > 0) {
            this.applyWorldGravity();
        } if(this.model.relativeGravity > 0) {
            this.applyRelativeGravity();
        } if(this.model.edgeCollision) {
            this.applyEdgeCollision();
        } if(this.model.objectCollision) {
            this.applyObjectCollision();
        }
        this.xPos += this.model.simulationRate * this.xVel;
        this.yPos += this.model.simulationRate * this.yVel;
    }

    momentum() {
        let velocity = Math.pow(Math.pow(this.xVel, 2)
                              + Math.pow(this.yVel, 2), 0.5);
        return this.mass * velocity;
    }

    distance(other) {
        return Math.sqrt(this.distanceSquare(other));
    }

    distanceSquare(other) {
        let xDistance = other.xPos - this.xPos;
        let yDistance = other.yPos - this.yPos;
        return Math.pow(xDistance, 2) + Math.pow(yDistance, 2);
    }

    relativeVelocity(other) {
        let xVel = other.xVel - this.xVel;
        let yVel = other.yVel - this.yVel;
        return Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2))
    }

    heading(other) {
        let xDistance = other.xPos - this.xPos;
        let yDistance = other.yPos - this.yPos;
        return Math.atan2(yDistance, xDistance);
    }
   
    applyDeltaV(magnitude, heading) {
        let deltaV = Math.abs(magnitude);
        this.xVel += deltaV * Math.cos(heading);
        this.yVel += deltaV * Math.sin(heading);
    }

    applyWorldGravity() {
        this.yVel -= this.model.worldGravity;
    }

    applyRelativeGravity() {
       this.model.physicsObjects.forEach((other) => {
           if(this != other) {
               let magnitude = this.model.relativeGravity
                             * (this.mass * other.mass)
                             / this.distanceSquare(other);
               this.applyDeltaV(magnitude / this.mass, this.heading(other));
           }
       });
    }

    applyEdgeCollision() {
        let bounce = this.model.bounceFactor
        // Left edge
        if(this.xPos <= this.radius - this.model.xEdge && this.xVel < 0) {
            this.applyDeltaV(2 * bounce * this.xVel, 0);
        } // Right edge
        else if(this.xPos >= this.model.xEdge - this.radius && this.xVel > 0) {
            this.applyDeltaV(2 * bounce * this.xVel, Math.PI);
        } // Bottom edge
        else if(this.yPos <= this.radius - this.model.yEdge && this.yVel < 0) {
            this.applyDeltaV(2 * bounce * this.yVel, Math.PI/2);
        } // Top Edge
        else if(this.yPos >= this.model.yEdge - this.radius && this.yVel > 0) {
            this.applyDeltaV(2 * bounce * this.yVel, -Math.PI/2);
        }
    }

    applyObjectCollision() {
        this.model.physicsObjects.forEach((other) => {
            if(this != other) {
                if(this.distance(other) < this.radius + other.radius) {
                    let impulse = 2 * other.mass * this.relativeVelocity(other)
                                * this.model.bounceFactor / (this.mass + other.mass);
                    this.applyDeltaV(impulse, other.heading(this));
                }
            }
        });
    }
}


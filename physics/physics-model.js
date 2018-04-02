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
   
    applyImpulse(magnitude, heading) {
        let deltaV = Math.abs(magnitude) / this.mass;
        this.xVel += deltaV * Math.cos(heading);
        this.yVel += deltaV * Math.sin(heading);
    }

    displace(distance, heading) {
        this.xPos += distance * Math.cos(heading);
        this.yPos += distance * Math.sin(heading);
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
               this.applyImpulse(magnitude, this.heading(other));
           }
       });
    }

    applyEdgeCollision() {
        let bounce = this.model.bounceFactor
        // Left edge
        if(this.xPos < this.radius - this.model.xEdge) {
            this.xPos = this.radius - this.model.xEdge;
            this.xVel *= -bounce;
        } // Right edge
        else if(this.xPos > this.model.xEdge - this.radius) {
            this.xPos = this.model.xEdge - this.radius;
            this.xVel *= -bounce;
        } // Bottom edge
        else if(this.yPos < this.radius - this.model.yEdge) {
            this.yPos = this.radius - this.model.yEdge;
            this.yVel *= -bounce;
        } // Top Edge
        else if(this.yPos > this.model.yEdge - this.radius) {
            this.yPos = this.model.yEdge - this.radius;
            this.yVel *= -bounce;
        }
    }

    applyObjectCollision() {
        this.model.physicsObjects.forEach((other) => {
            if(this != other) {
                let distance = this.distance(other);
                if(distance < this.radius + other.radius) {
                    let shift = this.radius + other.radius - distance;
                    this.displace(shift, other.heading(this));
                    let deltaV = 2 * other.mass * this.relativeVelocity(other)
                                * Math.pow(this.model.bounceFactor, 2)
                                / (this.mass + other.mass);
                    this.applyImpulse(this.mass * deltaV, other.heading(this));
                    other.applyImpulse(this.mass * deltaV, this.heading(other));
                }
            }
        });
    }
}


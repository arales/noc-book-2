// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(640, 240); // creating canvas of size 640 x 240
  walker = new Walker(); // creating an instance/object of class Walker
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2; 
    this.tx = 0;
    this.ty = 10000;
    this.tr = 20000
    this.tg = 30000;
    this.tb = 40000;
  }

  step() {
    let xStep = map(noise(this.tx), 0, 1, -1, 1);
    let yStep = map(noise(this.ty), 0, 1, -1, 1);

    // Adjust xStep to keep the movement within bounds
    if (this.x + xStep > width) {
      xStep = width - this.x; // Move to the edge
    }
    if (this.x + xStep < 0) {
      xStep = -this.x; // Move to the edge
    }

    // Adjust yStep to keep the movement within bounds
    if (this.y + yStep > height) {
      yStep = height - this.y; // Move to the edge
    }
    if (this.y + yStep < 0) {
      yStep = -this.y; // Move to the edge
    }

    this.x += xStep
    this.y += yStep

    //{!2} Move forward through “time.”
    this.tx += 0.01;
    this.ty += 0.01;
    this.tr += 0.01;
    this.tg += 0.01;
    this.tb += 0.01;    
  }

  show() {
    strokeWeight(0.2);
    fill(255);
    let rNoise = map(noise(this.tr), 0, 1, 0, 255)
    let gNoise = map(noise(this.tg), 0, 1, 0, 255)
    let bNoise = map(noise(this.tb), 0, 1, 0, 255)
    // fill(rNoise, gNoise, bNoise);
    stroke(rNoise, gNoise, bNoise);
    circle(this.x, this.y, 40);
  }
}

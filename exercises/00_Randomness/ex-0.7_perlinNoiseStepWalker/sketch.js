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
    // this.oldx = this.x;
    // this.oldy = this.y;    
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    let xStep = map(noise(this.tx), 0, 1, -20, 20);
    let yStep = map(noise(this.ty), 0, 1, -5, 5);

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
  }

  show() {
    strokeWeight(2);
    fill(240);
    stroke(0);
    circle(this.x, this.y, 44);
    // this.oldx = this.x;
    // this.oldy = this.y;
  }
}

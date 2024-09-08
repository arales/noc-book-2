/* Exercise 0.5:
A Gaussian random walk is defined as one in which the step size 
(how far the object moves in a given direction) is generated with a normal 
distribution. Implement this variation of the Walker class.
*/

let walker;

function setup() {
  createCanvas(640, 240);

  walker = new Walker();
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
  }

  show() {
    point(this.x, this.y);
    fill(0, 50)
    circle(this.x, this.y, 5) 
  }

  step() {
    let xStep = randomGaussian(0, 15);
    let yStep = randomGaussian(0, 15);
  
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
  
    // Apply the steps
    this.x += xStep;
    this.y += yStep;
  }
}

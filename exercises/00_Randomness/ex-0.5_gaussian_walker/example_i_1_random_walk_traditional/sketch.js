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
    fill(0, 10)
    circle(this.x, this.y, 10) 
  }

  step() {
    const choice = random(1);
    let stepSize = randomGaussian(10, 15)
    
    // @TODO update so steps cannot go out side of canvas
    if (choice < 0.25) {
      this.x += stepSize
      this.y += stepSize
      
    } else if (choice < 0.5) {
      this.x += stepSize
      this.y -= stepSize

    } else if (choice < 0.75 ) {
      this.x -= stepSize
      this.x += stepSize
    } else {
      this.x -= stepSize
      this.y -= stepSize
    }
  }
}

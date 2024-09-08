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
    let xStep = randomGaussian(0, 15)
    let yStep = randomGaussian(0, 15)

    if (this.x + xStep > width)
      this.x -= xStep
    if (this.x - xStep < 0)
      this.x += xStep
    if (this.y + yStep > height)
      this.y -= height
    if (this.y - yStep < 0)
      this.y += yStep   
    
    // @TODO update so steps cannot go out side of canvas
    // Check if step will be outside of the canvas window
    if (this.x + xStep < width && this.y + yStep < height && this.x - xStep > 0 && this.y - yStep > 0) {
        this.x += xStep
        this.y += yStep

        console.log(`innna bounds - X: ${this.x}, Y: ${this.y}, xStep: ${xStep}, yStep: ${yStep}`)

    } else { // recurse until step is within window 
      console.log(`outta bounds - X: ${this.x}, Y: ${this.y}, xStep: ${xStep}, yStep: ${yStep}`)
    }
  }
}

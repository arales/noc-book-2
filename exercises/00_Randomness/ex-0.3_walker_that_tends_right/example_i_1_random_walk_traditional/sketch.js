// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


let walker;
let prevMouseX, prevMouseY

function setup() {
  createCanvas(640, 240);
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  walker = new Walker();
  background(255);
}

function draw() {
  console.log('prevMouseX == ' + prevMouseX + ' | ' + 'prevMouseY == ' + prevMouseY )
  // Calculate the direction vector
  // let direction = getMouseDirection(prevMouseX, prevMouseY, mouseX, mouseY);

  
  // Update prevMouseX and prevMouseY after drawing
  prevMouseX = mouseX;
  prevMouseY = mouseY;  

  walker.step();
  walker.show();

  console.log('mouseX == ' + mouseX + ' | ' + 'mouseY == ' + mouseY + '\n\n')
  
}

function radiansToDegrees(radians) {
  return radians * (180/Math.PI)
}

// Function to calculate the direction vector
function getMouseDirection(x1, y1, x2, y2) {
  let deltaX = x2 - x1;
  let deltaY = y2 - y1;

  console.log(`deltaX: ${deltaX} = ${x1} - ${x2}`);
  console.log(`deltaY: ${deltaY} = ${y1} - ${y2}`);
  
  // Calculate the magnitude of the vector
  let magnitude = sqrt(deltaX * deltaX + deltaY * deltaY);
  
  // normalized direction vector
  let direction_vector = { x: deltaX / magnitude, y: deltaY / magnitude };

  // calculate the angle in radians
  let angle = atan2(deltaY, deltaX) 

  if (magnitude !== 0) {
    return {
      "direction_vector" : direction_vector,
      "angle_radians" : angle,
      "angle_degrees" : radiansToDegrees(angle)
    };
  } else {
    return null;
  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(10);
    point(this.x, this.y);
  }

  step() {
    const choice = random(1);
    let stepSize = 1
    
    if (choice < 0.75) {
      let direction = getMouseDirection(this.x, this.y, mouseX, mouseY);
      console.log('Direction - Rads: ' + direction?.angle_radians.toFixed(2) + ', Degrees: ' + direction?.angle_degrees.toFixed() + ', D_Vector: ' + JSON.stringify(direction?.direction_vector) )        
      this.x += direction?.direction_vector.x * stepSize
      this.y += direction?.direction_vector.y * stepSize
      
    } else if (choice < 0.85) {
      this.x--;
    } else if (choice < 0.90 ) {
      this.y++;
    } else {
      this.y--;
    }
  }
}

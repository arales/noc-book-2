// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com



function setup() {
  createCanvas(640, 240); // creating canvas of size 640 x 240
  pixelDensity(1)

  loadPixels()

  let xoff = 0.0
  for (let x = 0; x < width; x++) {
    let yoff = 0.0 

    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      // A perlin noise brightness
      let bright = map(noise(xoff, yoff), 0, 1, 0, 255)
      // Set the red, green, and blue values.
      pixels[index] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      // Set the alpha value to 255 (no transparency).
      pixels[index + 3] = 255;

      yoff += 0.01  // increment yoff for a smoother noise value
    }
    xoff += 0.01 // incrementing for a smoother noise value
  }
  updatePixels()  

}

function draw() {

}

/* Helper Functions */

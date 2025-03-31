// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com



function setup() {
  createCanvas(640, 240); // creating canvas of size 640 x 240
  /* 
  * Observed issue with the canvas duplicating and squising visuals. 
  * Modifying pixelDensity to 1 like this resolved issue for me. 
  * Seems to have something to do with Retina display pixel dimensions for mac?
  */
  pixelDensity(1)
}

function draw() {
  loadPixels()

  let xoff = 0.0
  for (let x = 0; x < width; x++) {
    let yoff = 0.0 

    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      // A perlin noise brightness
      let octaves = 15
      let falloff = 0.6
      noiseDetail(octaves, falloff) // adjusts character of noise produced by noise() - params: noiseDetail(octaves, falloff)
      let bright = map(noise(xoff, yoff), 0, 1, 0, 255)
      // Set the red, green, and blue values.
      let rShift = 10000; let gShift = 20000; let bShift = 30000; // Color shifts along the noise space to allow for different color values in noise calculations.
      // set xoff and yoff proportional to the color shift
      let r = map(noise(xoff + rShift, yoff + rShift), 0, 1, 0, 255)
      let g = map(noise(xoff + gShift, yoff + gShift), 0, 1, 0, 255)
      let b = map(noise(xoff + bShift, yoff + bShift), 0, 1, 0, 255)      
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      // Set the alpha value to 255 (no transparency).
      pixels[index + 3] = 255;
      // console.log(`Pixels: [${pixels[0]}, ${pixels[1]}, ${pixels[2]}, ${pixels[3]}]\n`)

      yoff += 0.01  // increment yoff for a smoother noise value
    }
    xoff += 0.01 // incrementing for a smoother noise value
  }
  updatePixels()  
}

/* Helper Functions */

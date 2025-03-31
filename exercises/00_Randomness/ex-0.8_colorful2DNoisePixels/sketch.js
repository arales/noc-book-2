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
  createControls(260)
}

function draw() {
  //map slider values to variables
  noiseDetail(octavesSlider.value(), falloffSlider.value());
  const xoffValue = xoffSlider.value();
  const yoffValue = yoffSlider.value();

  loadPixels()

  let xoff = 0.0
  for (let x = 0; x < width; x++) {
    let yoff = 0.0 

    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      // A perlin noise brightness
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

      yoff += yoffValue  // increment yoff for a smoother noise value
    }
    xoff += xoffValue // incrementing for a smoother noise value
  }
  updatePixels()  
}

/* Helper Functions */
function createControls(ypos) {
  let xpos = 0;
  
  cpTitle = createP("Perlin Noise");
  cpTitle.position(xpos, ypos-30);
  cpTitle.style("font-size", "14pt");
  cpTitle.style("font-weight", "bold");
  xpos += 120;
  
  xpos =0;
  octavesTitle = createP("Octaves");
  octavesTitle.position(xpos, ypos);
  xpos += 60;

  octavesSlider = createSlider(1, 10, 4, 1);
  octavesSlider.position(xpos, ypos);
  octavesSlider.size(80);
  xpos += 100;
  
  falloffTitle = createP("Falloff");
  falloffTitle.position(xpos, ypos);
  xpos += 50;

  falloffSlider = createSlider(0, 1, 0.5, 0);
  falloffSlider.position(xpos, ypos);
  falloffSlider.size(80);
  xpos += 100;
  
  xoffTitle = createP("xoff");
  xoffTitle.position(xpos, ypos);
  xpos += 30;

  xoffSlider = createSlider(0.01, 0.1, 0.01, 0.01);
  xoffSlider.position(xpos, ypos);
  xoffSlider.size(80);
  xpos += 100;
  
  yoffTitle = createP("yoff");
  yoffTitle.position(xpos, ypos);
  xpos += 30;

  yoffSlider = createSlider(0.01,0.1,0.01, 0.01);
  yoffSlider.position(xpos, ypos);
  yoffSlider.size(80);
  xpos += 100;


}
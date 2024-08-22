/* Exercise 0.4
  Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central position, but some dots splatter out toward the edges. Can you use a normal distribution of random numbers to generate the positions of the dots? Can you also use a normal distribution of random numbers to generate a color palette? Try creating a slider to adjust the standard deviation.

*/

let mainCanvas;
let paletteCanvas;
let slider;
// let palette = [];

function setup() {
  // Create the main canvas (at the back)
  mainCanvas = createCanvas(300, 300);
  mainCanvas.class('main-canvas');  // Assign the CSS class

  // Create the palette canvas (at the front)
  paletteCanvas = createGraphics(windowWidth, windowHeight / 6);
  paletteCanvas.class('palette-canvas');  // Assign the CSS class
  let palette = generateColorPalette(255)
  drawPalette(palette)
  paletteCanvas.position(4, 400)

  // Create slider to adjust standard deviation
  slider = createSlider(0, 255);
  slider.position(4, 310);
  slider.size(windowWidth/2);
}

function draw() {
  // use slider to adjust standard deviation for splatter
  let sd = slider.value()

  // Circle's coordinates using a normal distrubution
  let x = randomGaussian(width/2, sd);
  let y = randomGaussian(height/2, sd);

  // console.log(`x: ${x}, y: ${y}`)

  // // draw circle
  noStroke()
  fill(generateRandomColor(128, sd), 30)
  circle(x, y, 100) 

  // drawPalette(palette)
}

/* Helper Functions */
function generateRandomColor(deviation) {
  // create a random number between 0 - 255 to use as the mean color for the normal distrubution
  let meanColor = floor( random(0, 255) )

  // create random color channels using normal distrubution
  let r = generateColor(meanColor, deviation)
  let g = generateColor(meanColor, deviation)
  let b = generateColor(meanColor, deviation)
  return color(r,g,b)
}

function generateColorPalette(deviation) {
  let palette = []

  // create palatte of colors
  for (let i = 0; i < 5; i++) {
    let color = generateRandomColor(deviation)
    palette.push(color)
  }

  return palette
}

function drawPalette(palette) {
  // Show palatte
  let rectWidth = width / (palette.length)
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i])
    noStroke()
    rect(i * rectWidth, 280, rectWidth, height / 6);
  }
}

function generateColor(mean, deviation) {
  // create a normal distribution for color value centered around mean for each
  let value = randomGaussian(mean, deviation)
  return floor( max(0, min(255, value)) )
}



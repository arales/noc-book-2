/* Exercise 0.4
  Consider a simulation of paint splatter drawn as a collection of colored dots. Most of the paint clusters around a central position, but some dots splatter out toward the edges. Can you use a normal distribution of random numbers to generate the positions of the dots? Can you also use a normal distribution of random numbers to generate a color palette? Try creating a slider to adjust the standard deviation.

*/

let mainCanvas;
let paletteCanvas;
let slider;
let circle_slider;

function setup() {
  // Create the main canvas (at the back)
  mainCanvas = createCanvas(500, 500);
  mainCanvas.class('main-canvas');  // Assign the CSS class

  // Create the palette canvas (at the front)
  paletteCanvas = createGraphics(windowWidth, windowHeight / 6);
  paletteCanvas.class('palette-canvas');  // Assign the CSS class
  let palette = generateColorPalette(255)
  drawPalette(palette) // @TODO Figure out how to draw palette outside of main canvas
  paletteCanvas.position(0, mainCanvas.height)

  // Create slider to adjust standard deviation
  slider = createSlider(0, 255);
  slider.position(0, mainCanvas.height + 10);
  slider.size(mainCanvas.width);

  // Create slider to adjust circle size
  circle_slider = createSlider(0, 100)
  circle_slider.position(0, slider.y + 20)
  circle_slider.size(slider.width)
}

function draw() {
  // use slider to adjust standard deviation for splatter
  let sd = slider.value()

  // use slider to adjust circle size
  let circle_size = circle_slider.value()

  // Circle's coordinates using a normal distrubution
  let x = randomGaussian(width/2, sd);
  let y = randomGaussian(height/2, sd);

  // console.log(`x: ${x}, y: ${y}`)

  // // draw circle
  noStroke()
  fill(generateRandomColor(128, sd), 30)
  circle(x, y, circle_size) 

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
    rect(i * rectWidth, mainCanvas.height - (height / 10), rectWidth, height / 10);
  }
}

function generateColor(mean, deviation) {
  // create a normal distribution for color value centered around mean for each
  let value = randomGaussian(mean, deviation)
  return floor( max(0, min(255, value)) )
}



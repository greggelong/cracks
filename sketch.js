let particles = [];
let lasttouch= 0;
let cnv;
let clrs;
let bg;
let drawing = []

function preload() {
  bg = loadImage("concre.png");
}

function setup() {
  cnv = createCanvas(800, 800);
  let cx = floor((windowWidth - cnv.width) / 2);
  let cy = floor((windowHeight - cnv.height) / 2);
  cnv.position(cx, cy);
  background(127);

  // Initialize particles with a single particle at the center of the canvas

  let fpointx = random(width / 4, width - width / 4);
  let fpointy = random(height / 4, height - height / 4);
  // should make this an object too lazy at the moment
  for (let i = 0; i < 4; i++) {
    particles.push(createVector(fpointx, fpointy));
    drawing.push(true)
  }

  clrs = [
    color(23, 42, 58), // Dark Blue-Green
    color(40, 30, 30), // Dark Maroon
    color(25, 28, 28), // Dark Gray
    color(25, 28, 28), // Dark Gray
  ];
  bg.resize(900, 0);
  image(bg, -50, -50);
}

function draw() {
  // Draw the goal
  fill(255, 0, 0);
  noStroke();

  // Move the particles
  moveParticles();
}

function moveParticles() {
  let ang;

  for (let i = 0; i < particles.length; i++) {
    // Generate a random step
    //let step = p5.Vector.random2D().mult(2); // Adjust the step size as needed

    //if (prticle.index ===)
    if (i === 0) {
      ang = random(-5, 5);
    } else if (i === 1) {
      ang = random(180, 175);
    } else if (i === 2) {
      ang = random(60, 65);
    } else if (i === 3) {
      ang = random(265, 270);
    }
    let step = p5.Vector.fromAngle(ang).mult(4); // Adjust the step size as needed

    // Move the particle if drawing 
    if (drawing[i]){
    particles[i].add(step);
    }

    // Check if the particle is within the canvas boundaries
    if (particles[i].x < 0) drawing[i] = false //particles[i].x = 0;
    if (particles[i].x > width) drawing[i] = false; //particles[i].x = width;
    if (particles[i].y < 0) drawing[i] = false; //particles[i].y = 0;
    if (particles[i].y > height) drawing[i] = false; // particles[i].y = height;

    // Draw the particle
    fill(0);
    noStroke();
    let sz = random(7, 15);

    ellipse(particles[i].x, particles[i].y, sz, sz);
  }
}

function redoo() {
    // kill the old arrays 
    particles = [];
    drawing =[];
    //
    let fpointx = random(width / 5, width - width / 5);
    let fpointy = random(height / 5, height - height / 5);

    for (let i = 0; i < 4; i++) {
      particles.push(createVector(fpointx, fpointy));
      drawing.push(true)
    }
    image(bg, -50, -50);

}


function touchStarted() {
    // for Ios
    // calculate time since last touch
    const currenttime = millis();
    const timesincelasttouch = currenttime - lasttouch;
  
    
    if (timesincelasttouch > 500) {
       redoo();
      // update
      lasttouch = currenttime;
    }
  }
  
  function mousePressed() {
    touchStarted();
  }

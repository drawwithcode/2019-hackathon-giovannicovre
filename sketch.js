var sigla;
var buttonPlay;
var buttonReplay;

var amplitude;

var counter;

function preload() {
  //SOUND
  sigla = loadSound("./assets/sounds/TG1_sigla.mp3");
  //IMG
  logo = loadImage("./assets/img/TG1_logo.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  counter = 0;

  fft = new p5.FFT(0.6, 1024);
  fft.setInput(sigla);

  // Volume
  amplitude = new p5.Amplitude();

  // Button Play
  buttonPlay = createImg("./assets/icons/play.png");
  buttonPlay.position(windowWidth / 2 - 12, windowHeight / 2);
  buttonPlay.mousePressed(playreplay);

  // Button Replay
  buttonReplay = createImg("./assets/icons/replay.svg");
  buttonReplay.position(windowWidth - 48, windowHeight - 48);
  buttonReplay.mousePressed(playreplay);

  buttonReplay.style("visibility", "hidden"); // Button Replay Hidden
}

function draw() {
  background(254, 254, 254);

  fft.analyze();

  // Bassi Medi Alti
  var bass = fft.getEnergy("bass");
  var mid = fft.getEnergy("mid");
  var treble = fft.getEnergy("treble");

  // Bassi Medi Alti - Rimappati
  var mapBass = map(bass, 0, 255, windowWidth / 6, windowWidth / 3);
  var mapMid = map(mid, 0, 255, windowWidth / 3, windowWidth / 2);
  var mapTreble = map(treble, 0, 255, windowWidth / 2, windowWidth / 1.5);

  strokeWeight(3);
  stroke(color("white"));

  // Rombi
  push();
  translate(windowWidth / 2, windowHeight / 2);
  rotate(45);

  fill("rgba(0,50,105,0.99)");
  rect(-mapBass / 2, -mapBass / 2, mapBass, mapBass);

  fill("rgba(0,50,105,0.66)");
  rect(-mapMid / 2, -mapMid / 2, mapMid, mapMid);

  fill("rgba(0,50,105,0.33)");
  rect(-mapTreble / 2, -mapTreble / 2, mapTreble, mapTreble);

  pop();

  var level = amplitude.getLevel();
  var levelMap = map(level, 0, 1, 1, 4);

  // Intro
  if (sigla.isPlaying() == false && counter < 1) {
    fill(0, 50, 105);
    rect(0, 0, windowWidth, windowHeight);
    image(logo, windowWidth / 2 - logo.width / 2, windowHeight / 2 - logo.height - 12);
  } else {
    // Logo
    image(logo, windowWidth / 2 - logo.width * levelMap / 2, windowHeight / 2 - logo.height * levelMap / 2, logo.width * levelMap, logo.height * levelMap);
    noStroke();
    // Text
    fill("black");
    textAlign(LEFT);
    textSize(16);
    textStyle(BOLD);
    text("REPLAY", windowWidth - 115, windowHeight - 30);
  }
}

function playreplay() {
  if (sigla.isPlaying() == true) {
    sigla.stop();
    sigla.play();
  } else {
    sigla.play();
    buttonPlay.style("visibility", "hidden")
    buttonReplay.style("visibility", "visible");
    counter++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonPlay.position((windowWidth - buttonPlay.width) / 2, windowHeight / 2);
  buttonReplay.position(windowWidth - 48, windowHeight - 48);
}

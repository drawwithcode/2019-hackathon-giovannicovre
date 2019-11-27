var sigla;
var buttonPlay;
var buttonReplay;

var counter;

function preload() {
  sigla = loadSound("./assets/sounds/TG1_sigla.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  counter = 0;

  fft = new p5.FFT(0.6, 1024);
  fft.setInput(sigla);

  // Button Play
  buttonPlay = createImg("./assets/icons/play.png");
  buttonPlay.position(windowWidth/2 - 12, windowHeight/2 - 12);
  buttonPlay.mousePressed(playreplay);

  // Button Replay
  buttonReplay = createImg("./assets/icons/replay.svg");
  buttonReplay.position(windowWidth - 48, windowHeight - 48);
  buttonReplay.mousePressed(playreplay);

  buttonReplay.style("visibility", "hidden"); // Button Replay Hidden
}

function draw() {
  background("white");

  var dOne;
  var dTwo;
  var dThree;

  fft.analyze();

  //BASSI MEDI ALTI
  var bass = fft.getEnergy("bass");
  var mid = fft.getEnergy("mid");
  var treble = fft.getEnergy("treble");

  //BASSI MEDI ALTI - RIMAPPATI
  var mapBass = map(bass, 0, 255, 50, 250);
  var mapMid = map(mid, 0, 255, 250, 450);
  var mapTreble = map(treble, 0, 255, 450, 650);

  strokeWeight(2);
  noFill();

  push();
  translate(windowWidth/2, windowHeight/2);
  rotate(45);

  stroke(color(bass, bass, bass));
  rect(-mapBass/2, -mapBass/2, mapBass, mapBass);

  stroke(color(mid, mid, mid));
  rect(-mapMid/2, -mapMid/2, mapMid, mapMid);

  stroke(color(treble, treble, treble));
  rect(-mapTreble/2, -mapTreble/2, mapTreble, mapTreble);
  pop();

  if(sigla.isPlaying() == false && counter < 1)
  {
    fill(0,50,105);
    rect(0,0,windowWidth,windowHeight);
  }
}

function playreplay() {
  if (sigla.isPlaying() == true) {
    sigla.stop();
    sigla.play();
    //buttonReplay.style("visibility", "hidden");
    //buttonPlay.style("visibility", "visible");

  } else {
    sigla.play();
    buttonPlay.style("visibility", "hidden")
    buttonReplay.style("visibility", "visible");
    counter++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonPlay.position((windowWidth - buttonPlay.width) / 2, (windowHeight - buttonPlay.height) / 2);
  buttonReplay.position(windowWidth - 48, windowHeight - 48);
}

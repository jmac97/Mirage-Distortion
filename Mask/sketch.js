let allPoints = [27, 32, 19, 20, 21, 22, 18, 17, 16, 15, 23, 24, 25, 26, 30, 29, 67, 70, 31, 33, 62, 34, 36, 37, 38, 40, 44, 60, 50, 57,];

let webcam = null;    // webcam object
let tracker = null;   // clmtrackr object
let features = null;  // list of facial features

let bugs = [];

var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // start webcam input
  webcam = createCapture(VIDEO);
  webcam.size(width, height);

  // connect face tracking to webcam
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(webcam.elt);  
  
}


function draw() {
  // mirror the webcam input (which will be more
  // natural-feeling) and display it
  imageMode(CORNER);
  push();
  translate(width, 0);
  scale(-1.0, 1.0);
  image(webcam, 0, 0, width,height);
  pop();

  features = tracker.getCurrentPosition();
  
  if(features.length > 0) {
    for(var j = 0; j <= 0; j++) {
      letsMakeBugs();
      count++;
    }
    
    for(var i = 0; i < bugs.length; i++){
      if(bugs[i].age <= 0){
        var index = bugs[i].type;
        bugs.splice(i, 1);
      }
      
      if (features[57][1] - features[60][1] >= 10){
      bugs[i].update();
      }
      bugs[i].wiggle();
    }
  }
}

function letsMakeBugs() {
  for(var i = 0; i < allPoints.length; i++){
    bugs.push(new Bug(features[allPoints[i]][0], features[allPoints[i]][1], i));
  }
}


class Bug {
  constructor(x_, y_, i) {
    this.type = i;
    this.y = y_;
    this.speed = map(mouseX, 0, width, 1, 10);
    this.age = 5;
    this.size = map(mouseY, 0, height, 15, 100);

      if(this.size > 0 && this.size < height) {
      if (x_ < width/2) {
        this.c = get(x_+2*(width/2-x_), y_, this.size, this.size);
        this.x = x_+2*(width/2-x_);
      } else if (x_ > width/2) {
        this.c = get(x_-2*(x_-width/2), y_, this.size, this.size);
        this.x = x_-2*(x_-width/2);
      } else {
        this.c = get(x_, y_, this.size, this.size);
        this.x=x_;
      }
    }
  }
  
  update() {
    this.age = 2;
  }
  
  wiggle() {    
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed); 
    
    image(this.c, this.x, this.y);
    this.age--;
    }
  
}
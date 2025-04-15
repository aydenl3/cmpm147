// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

/* exported setup, draw */
let seed = 0;

const gradientColor = "#c9dad9";
const skyColor = "#659ec0";

const deepWaterColor = "#000911";
const deepColor = "#000911"

const mountainColor = "#3f769a";
const mountainWaterColor = "#3b6f91";

const hillColor = "#2e526d";
const hillWaterColor = "#26435a";

const iceColor = "#98b2c6";


function setup() {
  let container = document.getElementById("canvas-container");
  let cnv = createCanvas(600, 400);
  cnv.parent(container); 
  let buttoncontainer = document.getElementById("reimagine-box");
  let but = createButton("reimagine").mousePressed(() => seed++);
  but.parent(container);
}


function draw() {
  randomSeed(seed);
  clear()
  noStroke();
  let darkercolor = color(skyColor);
  let lightercolor = color(gradientColor);
  

  gradient(height/2,0,darkercolor,lightercolor);
  darkercolor = color(mountainColor);
  gradient(height,height/2,lightercolor,darkercolor);

  
  
  


  fill(mountainColor);
  let mountainPointList = [];
  drawMountain(mountainPointList,false,8,-0.0005,1,30,45);
  noStroke();
  fill(mountainWaterColor);
  drawMountain(mountainPointList,true,8,-0.0005,1,30,45);
  
  noStroke();
  fill(hillColor);
  let hillPointList = [];
  drawMountain(hillPointList,false,14,0.0006,1,-50,180);
  noStroke();
  fill(hillWaterColor);
  drawMountain(hillPointList,true,14,0.0006,1,-50,180);
  
  noStroke();
  fill(deepColor);
  let slopePointList = [];
  drawMountain(slopePointList,false,25,0.0010,1,-90,25);
  noStroke();
  fill(deepWaterColor);
  drawMountain(slopePointList,true,25,0.0010,1,-90,25);
  
  fill(iceColor)
  drawIce()
  
  
  
  //console.log(random())
  function drawMountain(vertexlist,mirror,variability,dippiness,dippy,shift,steps){
    if(mirror == false){
      beginShape();
      let mountainheight = height/2 - ((height/5));
      vertex(0,mountainheight);
      for (let i = 0; i < steps + 1; i++) {
        let x = (width * i) / steps;
        let peakvariability = ((random() * random() *random()  * height/1.1) / variability);
        let dippage = (-(dippiness*(x - width/2) * (x - width/2)))*dippy
        let y = mountainheight - peakvariability + dippage -shift;
        if (y > height/2){
          y = height/2;
        }
        vertexlist.push(x);
        vertexlist.push(peakvariability);
        vertex(x, y);
      }
      vertex(width, mountainheight);
      vertex(width, height / 2);
      vertex(0, height / 2);
      endShape(CLOSE);
    }
    else if (mirror == true){
      beginShape();
      let mountainheight = height/2 - ((height/5) * -1);
      vertex(0,mountainheight);
      for (let i = 0; i < steps + 1; i++) {
        let x = vertexlist[i*2];
        let peakvariability = vertexlist[(i*2)+ 1]
        let dippage = (-(dippiness*(x - width/2) * (x - width/2)))*dippy
        let y = mountainheight + peakvariability -dippage + shift;
        if (y < height/2){
          y = height/2;
        }
        vertex(x, y);
      }
      vertex(width, mountainheight);
      vertex(width, (height / 2));
      vertex(0, (height / 2));
      endShape(CLOSE);
    }

  }
  
  
  function drawIce(){
    const ice = 50*random();
    for (let i = 0; i < ice; i++) {
      let z = random();
      let x = (width * ((random()  + (millis()/100000) / z)%1));
      let s = width / 50 / z/2;
      let y = height / 2 + height / 20 / z;
      if(collides(x,y,s)){
        //x % 1;
      }
      else{
        quad(x, y , x+  5*s, y, x + 2 * s , y+ s,x -4*s,y+s)
      }


    }
    //beginShape();
    
  }
  
  function collides(x,y,s){
    if (((mouseX + 50 > x -3*s) && (mouseX -20 < x*2 + s)) && ((mouseY - 20 < y + s)&&(mouseY + 20 > y))){
      return true
    }
  }
  
  function gradient(vertical,startpt,c1,c2){
    for(let y=startpt; y<vertical; y++){
      let n = map(y,startpt,vertical,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
  }
  
 
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}
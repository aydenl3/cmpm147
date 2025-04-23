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


/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "./js/tileset.png"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}





// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container

  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();


}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}
function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}
/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  let room1 = generateRoom(grid,numRows,numCols);
  let room2 = generateRoom(grid,numRows,numCols);
  let room3 = generateRoom(grid,numRows,numCols);
  let room4 = generateRoom(grid,numRows,numCols);
  let room5 = generateRoom(grid,numRows,numCols);
  generateHallway(grid,room1,numRows,numCols);
  generateHallway(grid,room2,numRows,numCols);
  generateHallway(grid,room3,numRows,numCols);
  generateHallway(grid,room4,numRows,numCols);
  
  return grid;
}

function generateRoom(grid,numRows,numCols){
  
  let corner1Row = getRndInteger(1,numRows-4);
  let corner1Col = getRndInteger(1,numCols-4);
  let corner2Row = getRndInteger(corner1Row+1,numRows-2);
  let corner2Col = getRndInteger(corner1Col+1,numCols-2);
  console.log(corner1Row,corner2Row,corner1Col,corner2Col)
  for (let i = corner1Row;i<=corner2Row;i++){
    for(let j = corner1Col;j <= corner2Col;j++){
      grid[i][j] = "."
      if(j > 1000){
        console.log("broken j")
        break
      }
    }
    if(i > 1000){
      console.log("broken i")
      break
    }
  }
  let log = [corner1Row,corner1Col,corner2Row,corner2Col]
  return (log);
}

function generateHallway(grid,room,numRows,numCols){
  let wall = getRndInteger(1,2);
  if (wall == 1){
    let headX = getRndInteger(room[1],room[3]);
    let headY = room[0] - 1
    grid[headY][headX] = "~"
    headY--;
    while (headY >= 0 && grid[headY][headX] != "."){
      grid[headY][headX] = ".";
      headY--;
      
    }
  }
  if (wall == 2){
    let headX = room[1]-1;
    let headY = getRndInteger(room[0],room[2]);
    grid[headY][headX] = "~";
    headX--;
    while (headX >= 0 && grid[headY][headX] != '.'){
      grid[headY][headX] = ".";
      headX--;
    }
  }
  if (wall == 3){
    let headX = getRndInteger(room[1],room[3]);
    console.log("headx")
    console.log(headX)
    let headY = room[2]+1;
    console.log(headY)
    while (headY <= numRows-1 && grid[headY][headX] != '.'){
      grid[headY][headX] = ".";
      headY++;
    }
  }
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function drawGrid(grid) {
  background(195);
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
          let flicker = getRndInteger(1,50000);
          if(flicker <= 5){
            placeTile(i,j,10,50)
          }
        else{
          placeTile(i, j, floor(random(20,25)),21);
        }

      }
      if (grid[i][j] == "~") {
        //drawContext(grid,i,j,"~",25,25,)
        if(checkinRoom(grid,".",i,j)){
          placeTile(grid,i,j,1,1);
        }
        else{
          placeTile(i,j,6,25);
        }

      }
      if (grid[i][j] == '.'){
          drawContext(grid,i,j,".",21,21,"~")

      }
    }
  }
  
  //console.log(gridCheck(grid,3,3,"."));
  //console.log(gridCode(grid,15,15,"."))
}

function gridCheck(grid, i, j, target,additional) {
  if ((i >= 0 && i<= grid.length) && (j >= 0 && j<= grid[0].length)){
    if(grid[i][j] == target || grid[i][j] == additional){
      return true
    }
    
  }
  return false
}

function gridCode(grid, i, j, target,additional) {
  let northBit = 0;
  let westBit = 0;
  let eastBit = 0;
  let southBit = 0;
  if( gridCheck(grid,i-1,j,target,additional)){
    northBit = 1;
  }
  if (gridCheck(grid,i,j-1,target,additional)){
    westBit = 1;
  }
  if (gridCheck(grid,i,j+1,target,additional)){
    eastBit = 1;
  }
  if (gridCheck(grid,i+1,j,target,additional)){
    southBit = 1;
  }
  let bitCode = (northBit * 1) + (westBit * 2) + (eastBit * 4) + (southBit * 8);
  return bitCode
}

function drawContext(grid, i, j, target, ti, tj,additional) {
  let code = gridCode(grid,i,j,target,additional);
  const [tiOffset, tjOffset] = lookup[code];
  return placeTile(i, j, ti + tiOffset, tj + tjOffset);

  
}

function checkinRoom(grid,target,i,j){
  let codeval = gridCode(grid,i,j,target)
  if (codeval != 6 && codeval != 9){
    return true
  }
  else{
    return false
  }
}

const lookup = [
  [0,0],
  [-21,0],
  [-21,0],
  [6,2],
  [-21,0],
  [4,2],
  [-21,0],
  [5,2],
  [-21,0],
  [-21,0],
  [6,0],
  [6,1],
  [4,0],
  [4,1],
  [5,0],
  [-21,0]
];


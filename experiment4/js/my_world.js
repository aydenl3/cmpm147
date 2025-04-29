"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
let dirtybowl
let cleanbowl
let dirtybowlorange
let sponge
let censoredbowl
let extradirtybowl

function p3_preload() {
  dirtybowl = loadImage("./img/dirtbowl2.png");
  cleanbowl = loadImage("./img/cleanbowl1.png");
  dirtybowlorange = loadImage("./img/dirtbowlorange.png");
  sponge = loadImage("./img/sponge.png");
  censoredbowl = loadImage("./img/moldbowlcensored.png");
  extradirtybowl = loadImage("./img/extradirtybowl.png");
}

function p3_setup() {
  imageMode(CENTER);
  dirtybowl.resize(100, 0);
  cleanbowl.resize(100, 0);
  dirtybowlorange.resize(100, 0);
  censoredbowl.resize(100, 0);
  sponge.resize(100, 0);
  extradirtybowl.resize(100,0);
}


let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  let bowl = false;
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    fill(255, 204,102,);
  }
  else if (XXH.h32("tile:" + [i, j], worldSeed) % 19 == 0){
    fill(255, 221,153);
    bowl = true;
  }
  else {
    fill(255, 221,153);
  }

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;

  if(bowl == true){
    let num = XXH.h32("tile:" + [i, j], worldSeed) % 20
    let numbowls = 1;
    if(num <= 10){
      numbowls = 1;
    }
    else if (num <= 15){
      numbowls = 2;
    }
    else if (num <=19){
      numbowls = 3;
    }
    else{
      numbowls = 4;
    }
    
    
    if (n == 0){
       for (let i = numbowls;i>0;i--){ 
        let tilt = XXH.h32("tile:" + [i, j], worldSeed) % 5
        if (tilt % 2 == 0){
          tilt *= -1;
        }
        let color = XXH.h32("tile:" + [i, j], worldSeed) % 1000
        let bowl = dirtybowl;
        
        if(color < 400){
          bowl = extradirtybowl
        }
        if(color < 200){
          bowl = dirtybowlorange
        }
        if(color <5){
          bowl = censoredbowl;
        }
        image(bowl,tilt,-10*i+10);
      }

    } 
    else if (n > 0){
      for (let i = numbowls;i>0;i--){
      image(cleanbowl,0,-10*i+10);
      }
    }

  }
  pop();
}

function p3_drawSelectedTile(i, j) {

  image(sponge,0,0)
}

function p3_drawAfter() {}

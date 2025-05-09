/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
  return [
    {
      name: "Sunset 1", 
      assetUrl: "img/sunset_over_tree.jpg"
    },
    {
      name: "Sunset 2", 
      assetUrl: "img/sunset_beam.jpg"
    },
    {
      name: "Sunset 3",
      assetUrl: "img/sunset_covered.jpg"
    },
    {
      name: "Sunset 4",
      assetUrl: "img/dramatic_sunset.webp"
    },
    {name: "Sunset 5",
     assetUrl: "img/double_sunset.jpg"
    },
    {name: "Full White",
    assetUrl: "img/full_white.jpg"},
    {
    name: "Full Black",
    assetUrl: "img/full_black.jpg"
    }
  ];
}
function initDesign(inspiration) {
  resizeCanvas(inspiration.image.width / 2, inspiration.image.height / 2);
    // add the original image to #original
    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${width}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);

  let design = {
    bg: 128,
    fg: []
  }
  
  for(let i = 0; i < 200; i++) {
    design.fg.push({
      x1: random(width),
      y1: random(height),
      x2: random(width),
      y2: random(height),
      x3: random(width),
      y3: random(height),
      h: random(20,100),
      fill: random(255)})
  }
  return design;
}

function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  for(let tri of design.fg) {
    fill(tri.fill, 128);
    circle(tri.x2,tri.y2,tri.h)
    square(tri.x1,tri.y1,tri.h)
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  for(let tri of design.fg) {
    tri.fill = mut(tri.fill, 0, 600, rate);
    tri.x1 = mut(tri.x1, 0, width, rate);
    tri.y1 = mut(tri.y1, 0, height, rate);
    tri.x2 = mut(tri.x2, 0, width, rate);
    tri.y2 = mut(tri.y2, 0, height, rate);
    tri.x3 = mut(tri.x3, 0, width, rate);
    tri.y3 = mut(tri.y3, 0, height, rate);
    
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 100), min, max);
}

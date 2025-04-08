// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    adventurer: ["person","law-abiding citizen","traveler","valued customer","adventurer","little goblin","hero"],
    wares: ["item", "weapon", "thing", "loot", "treasure", "thingy","knick-knack"],
    adjective: ["incredible", "amazing", "not-so-bad","probably useful", "wonderful", "interesting", "powerful", "extra discounted", "bargain day", "shiny"],
    weapontype: ["Axe", "Longsword", "Bow", "Cloak", "Shield", "Club", "Crossbow", "Spear", "Boots", "Ring", "Cabbage", "Idol","Knife","Dagger","Darts","Throwing Stars","Rope","Spell","Flower"],
    weaponname: ["of Mythos","of Power","the Destroyer","of Legend","","$weapontype","$weaponname $weaponname","the Mighty","of Cunning","of Might","of Doom","of Wonder"],
    number: [1,2,3,4,5,6,7,8,9,],
    dicenumber: [2,4,6,8,10,12],
    damagetype:["slashing","piercing","bludgeoning","fire","vegetable","force","thunder","cold","poison","lightning","holy","necrotic"],
    property:["is light","is heavy","must be loaded","has finesse","has reach","can be thrown","is angry","is truly epic","is two-handed"]
  };
  
  const template = `Greetings $adventurer!
  
  Come, take a look at my $adjective $wares!
  
  $weapontype $weaponname.
  
  $number D$dicenumber $damagetype damage.
  can attack up to $number 0 ft. away.
  This weapon $property.
  
  
  
  `;
  
  const slotPattern = /\$(\w+)/;
  
  const itemlist = [];
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      let choice_picked = options[Math.floor(Math.random() * options.length)]
      itemlist.push(choice_picked);
      return choice_picked;
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    itemlist.length = 0;
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
    console.log(itemlist);
    let cost = 1;
    for(let i = 0; i <itemlist.length;i++){
      let item = itemlist[i];
      if (typeof(item) == "number"){
        cost *= item
      }
    }
    console.log(cost);
    document.getElementById("costDisplay").innerText = `Cost: ${cost} gold`;
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
}

// let's get this party started - uncomment me
main();
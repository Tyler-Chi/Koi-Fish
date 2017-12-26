
import Fish  from './fish.js';
import Food from './food.js';
import LilyPad from './lilypad.js';

var heightPercentage = 1;

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * heightPercentage;

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * heightPercentage;
})
var c = canvas.getContext('2d');


var mouse = {
  x: undefined,
  y: undefined
}

var fishes = [];
var foods = [];
var pads = [];

createFishes(1,foods,c)
createPads(10,c)


var fishCountSliderEl = document.getElementsByClassName('slider')[0];
var currentFishCountEl = document.getElementById('currentFishes');
currentFishCountEl.innerHTML = fishCountSliderEl.value;
var fishCount = parseInt(fishCountSliderEl.value)

fishCountSliderEl.oninput = function(){
  fishCount = parseInt(this.value);
  createFishes(fishCount,foods,c)
  currentFishCountEl.innerHTML = this.value;
}

var lilypadCountSliderEl = document.getElementsByClassName('slider')[1];
var currentPadCountEl = document.getElementById('currentLilypads');
currentPadCountEl.innerHTML = lilypadCountSliderEl.value;
var padCount = parseInt(lilypadCountSliderEl.value);

lilypadCountSliderEl.oninput = function(){
  padCount = parseInt(this.value);
  createPads(padCount,c);
  currentPadCountEl.innerHTML = this.value;
}




canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})



window.addEventListener('click', function(e){

  if (mouse.y > 0.1 * innerHeight){

    console.log('y',mouse.y);
    console.log('innerHeight',window.innerHeight);

    foods.push(new Food(mouse.x,mouse.y,5,c))
  }

})

window.addEventListener("keypress",function(event){
  console.log(event);
  if (event.code === "KeyF"){

    for (var b = 0 ; b < 5 ; b ++ ){

      let foodX = (0.1 + Math.random() * 0.8 ) * innerWidth;
      let foodY = (0.1 + Math.random() * 0.8 ) * innerHeight;
      foods.push(new Food(foodX,foodY,5,c))

    }


  }
})

function createFishes(fishCount,foods,c){

  let dx = 0.8 ;
  let dy = 0.8 ;
  let radius = 18;

  if (fishCount > fishes.length){
    for (var f = fishes.length ; f < fishCount ; f++){
      fishes.push(new Fish(dx, dy, radius, f , c, foods))
    }
  } else {
    let difference = fishes.length - fishCount;
    fishes = fishes.slice(difference);
  }
}


function createPads(padCount,c){

  if (padCount > pads.length) {
    for (var p = pads.length ; p < padCount; p++){
      pads.push(new LilyPad(c))
    }
  } else {
    let difference = pads.length - padCount;
    pads = pads.slice(difference);
  }

}

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);

  for (var j = 0 ; j < foods.length ; j++){
    foods[j].do();
  }

  for (var i = 0 ; i < fishes.length ; i++){
    fishes[i].do();
  }

  for (var k = 0 ; k < pads.length ; k++){
    pads[k].do();
  }

}

//will always try to be animating

animate();

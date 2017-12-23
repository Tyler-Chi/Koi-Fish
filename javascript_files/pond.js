
import Fish  from './fish.js';
import Food from './food.js';
import LilyPad from './lilypad.js';


var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var fishes = [];
var foods = [];


createFishes(30,foods,c)


var fishCountSliderEl = document.getElementsByClassName('slider')[0];
var currentFishCountEl = document.getElementById('currentFishes');

currentFishCountEl.innerHTML = fishCountSliderEl.value;
var fishCount = parseInt(fishCountSliderEl.value)

fishCountSliderEl.oninput = function(){
  fishCount = parseInt(this.value);
  console.log('fishCount',fishCount);
  // Pond(fishCount,10);
  currentFishCountEl.innerHTML = this.value;
}




window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

var mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

//handle the food logic


window.addEventListener('click', function(e){
  console.log(mouse);
  foods.push(new Food(mouse.x,mouse.y,5,c))
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

  for (var i = 0 ; i < fishCount; i++){

    let dx = 1.3 ;
    let dy = 1.3 ;
    let radius = 18;

    fishes.push(new Fish(dx,dy,radius ,i,c,foods))
    console.log('fishes',fishes);
  }
}




let pads = [];
for (var p = 0 ; p < 15 ; p++){


  pads.push(new LilyPad(c));
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


  c.font = "25px Comic Sans MS";
  c.fillStyle = "black";
  c.fillText("Welcome to Bit Koi!", canvas.width/2.5 , 30)

  c.font = "15px Comic Sans MS";
  c.fillStyle = "black";
  c.fillText("(click to place food, F to spread food randomly)", canvas.width/2.7  , 65)


}

animate();

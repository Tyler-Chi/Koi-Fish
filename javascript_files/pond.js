
import Fish  from './fish.js';
import Food from './food.js';
import LilyPad from './lilypad.js';

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

//handle the food logic
let foods = [];

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


let fishes = [];
let radius;
let x;
let y;
let xCoor;
let yCoor;
let dx;
let dy;

for (var i = 0 ; i < 50; i++){

  x = (0.2 + 0.5 * Math.random()) * innerWidth
  y = (0.2 + 0.5 * Math.random()) * innerHeight

  dx = 1.3 ;
  dy = 1.3 ;

  radius = 18;

  fishes.push(new Fish(x,y,dx,dy,radius ,i,c,foods))
}

let pads = [];
for (var p = 0 ; p < 15 ; p++){

  x = (0.1 + 0.9 * Math.random()) * innerWidth
  y = (0.1 + 0.9 * Math.random()) * innerHeight

  pads.push(new LilyPad(x,y,c));
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
  c.fillText("Welcome to Bit Koi!", innerWidth/3  , 40)

  c.font = "15px Comic Sans MS";
  c.fillStyle = "black";
  c.fillText("(click to place food, F to spread food randomly)", innerWidth/3  , 65)


}

animate();

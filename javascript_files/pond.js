
import Fish  from './fish.js';
import Food from './food.js';

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


let fishes = [];
let radius;
let x;
let y;
let xCoor;
let yCoor;
let dx;
let dy;

for (var i = 0 ; i < 5; i++){

  x = (0.2 + 0.5 * Math.random()) * innerWidth
  y = (0.2 + 0.5 * Math.random()) * innerHeight

  dx = 1.5;
  dy = 1.5;

  radius = 18;

  fishes.push(new Fish(x,y,dx,dy,radius ,i,c,foods))
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




}

animate();

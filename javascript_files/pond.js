
import  Fish  from './fish.js';

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

window.addEventListener('click', function(e){
  console.log(mouse);
})


let fishes = [];
let radius;
let x;
let y;
let xCoor;
let yCoor;
let dx;
let dy;

for (var i = 0 ; i < 5 ; i++){

  x = (0.2 + 0.5*Math.random()) * innerWidth
  y = (0.2 + 0.5*Math.random()) * innerHeight

  dx = 1.5;
  dy = 1.5;

  radius = 18;

  fishes.push(new Fish(x,y,dx,dy,radius ,i,c))
}

let fish = new Fish(100,100,1,1,20,1,c);

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);

  for (var i = 0 ; i < fishes.length ; i++){
    fishes[i].do();
  }

}

animate();

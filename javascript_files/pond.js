
import  Fish  from './fish.js';

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


let fishes = [];
let radius;
let x;
let y;
let xCoor;
let yCoor;
let dx;
let dy;

for (var i = 0 ; i < 5 ; i++){
  x = Math.random() * innerWidth;
  y = Math.random() * innerHeight;
  dx = 1.5;
  dy = 1.5;
  radius = 18;
  fishes.push(new Fish(x,y,dx,dy,radius,i,c))
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

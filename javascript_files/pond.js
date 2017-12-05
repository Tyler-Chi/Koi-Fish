
import { Fish } from './fish.js';

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


let fish = new Fish(100,100,1,1,20,1,c);

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);

  fish.do();
  // fish2.do();
  // fish3.do();
  // fish4.do();

}

animate();

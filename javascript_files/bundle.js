/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fish_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__food_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lilypad_js__ = __webpack_require__(3);





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
  foods.push(new __WEBPACK_IMPORTED_MODULE_1__food_js__["a" /* default */](mouse.x,mouse.y,5,c))
})

window.addEventListener("keypress",function(event){
  console.log(event);
  if (event.code === "KeyF"){

    for (var b = 0 ; b < 5 ; b ++ ){

      let foodX = (0.1 + Math.random() * 0.8 ) * innerWidth;
      let foodY = (0.1 + Math.random() * 0.8 ) * innerHeight;
      foods.push(new __WEBPACK_IMPORTED_MODULE_1__food_js__["a" /* default */](foodX,foodY,5,c))

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

  dx = 1.5 ;
  dy = 1.5 ;

  radius = 18;

  fishes.push(new __WEBPACK_IMPORTED_MODULE_0__fish_js__["a" /* default */](x,y,dx,dy,radius ,i,c,foods))
}

let pads = [];
for (var p = 0 ; p < 10 ; p++){

  x = (0.1 + 0.9 * Math.random()) * innerWidth
  y = (0.1 + 0.9 * Math.random()) * innerHeight

  pads.push(new __WEBPACK_IMPORTED_MODULE_2__lilypad_js__["a" /* default */](x,y,c));
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

animate();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function Fish(x,y,dx,dy,radius,id,c,foodarr){

  let colors = ['#d7dde5','#ea4504','#8e1111','#d61515','#d6149c','#f2e64d','black']
  let headColor = colors[Math.round(Math.random()*(colors.length-1))]
  let bodyColor = colors[Math.round(Math.random()*(colors.length-1))]
  let tailColor = colors[Math.round(Math.random()*(colors.length-1))]
  let neckColor = colors[Math.round(Math.random()*(colors.length-1))]

  c.localAlpha = 0.2;

  this.fishLength = 20;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.time = Math.random()*5;
  this.positions = [];
  this.slopes = [];

  let totalSpeed = Math.sqrt(dx*dx + dy*dy)

  this.speed = this.dx * this.dx + this.dy + this.dy;


  this.record = function(){
    //initialize the fish at time 0
    if (this.positions.length < this.fishLength){
      for (var i = 0 ; i < this.fishLength ; i++){
        this.positions.push([x + i * dx , y + i * dy])
      }
    }


    this.positions.push([this.x,this.y]);
    this.slopes.push(this.dy/this.dx);


    if (this.positions.length > this.fishLength){
      this.positions.shift();
    }

    if (this.slopes.length > this.fishLength + 1){
      this.slopes.shift();
    }
  }

  this.draw = function(){

    let headAngle = Math.atan(this.dy/this.dx);
    let midpoint = Math.round((this.positions.length /2)+4);

    let cc = true;
    let mc = false;
    if (this.dx > 0 ){
      cc = false;
      mc = true;
    }


    //the fins of the fish

    let finOscillate = 0.8 + 0.2 * Math.sin(this.time);

    c.beginPath();
    c.ellipse(this.positions[midpoint][0],this.positions[midpoint][1], 0.5 * this.radius,  finOscillate * this.radius, headAngle, -Math.PI/2, Math.PI/2, cc);
    c.strokeStyle = bodyColor;
    c.lineWidth = 2;
    c.stroke();

    // the midsection of the fish


    c.beginPath();
    c.ellipse(this.positions[midpoint][0],this.positions[midpoint][1], this.radius * 1.1, this.radius / 2, Math.atan(this.slopes[midpoint]), 0, Math.PI * 2, mc);
    c.fillStyle = bodyColor;
    c.fill();

    //the neck of the fish
    let neckPoint = Math.round(0.95 * this.positions.length)
    c.beginPath();
    c.arc(this.positions[neckPoint][0],this.positions[neckPoint][1],7,0,2*Math.PI,false);
    c.fillstyle = neckColor;
    c.fill();



    //the head of the fish

    c.beginPath();
    c.ellipse(this.x,this.y,this.radius , this.radius /2 , headAngle, -Math.PI/2, Math.PI/2,cc);
    c.fillStyle = headColor;
    c.fill();

    // the tail of the fish
    let tailAngle = Math.atan(this.slopes[1]);
    c.beginPath();
    c.ellipse(this.positions[4][0],this.positions[4][1], this.radius / 2 , this.radius / 2 , tailAngle, -Math.PI/2, Math.PI/2,cc);
    c.fillStyle = tailColor;
    c.fill();





  }

  function distance(x0,y0,x1,y1){
    return Math.sqrt(Math.pow(x0-x1,2)+Math.pow(y0-y1,2))
  }

  let yDif;
  let xDif;
  let angle;


  this.speedDif = function(initial,desired){
    return Math.abs(initial - desired)/Math.abs(initial);
  }

  this.chaseFood = function() {
    //has access to foodarr
    //first find the piece of food the fish is closest to.

    let chaseIndex = 0;

    for (var a = 0; a < foodarr.length ; a++){
      if (distance(this.x,this.y,foodarr[a].x,foodarr[a].y) < distance(this.x,this.y,foodarr[chaseIndex].x,foodarr[chaseIndex].y)){
        chaseIndex = a;
      }
    }




    let turnChange = 0.3;

    //assume that its sorted already...
    yDif = foodarr[chaseIndex].y - this.y;
    xDif = foodarr[chaseIndex].x - this.x;
    angle = Math.atan(yDif/xDif);


    let foodDir = 1;
    //adjust the angle!
    if (xDif < 0){
      foodDir = -1;
    }

    this.dfy = totalSpeed * Math.sin(angle) * foodDir;
    this.dfx = totalSpeed * Math.cos(angle) * foodDir;

    //eat the food

    for (var f = 0 ; f < foodarr.length ; f++){
      if (distance(this.x,this.y,foodarr[f].x,foodarr[f].y) < 20){
        foodarr.splice(f,1);
      }
    }




    //control how fast they can turn.

    if (this.speedDif(this.dx,this.dfx) < 0.001 ){
      this.dx = this.dfx;
    } else {
      this.dx += turnChange * this.dfx;
    }

    if (this.speedDif(this.dy,this.dfy) < 0.5 ){
      this.dy = this.dfy;
    } else {
      this.dy += turnChange * this.dfy;
    }


  }



  this.update = function(){

    //first update positions with the fish coordinates


    //deals with collisions

    //try making the motion more smooth

    // if it goes too close to the right boundary and its still moving towards that boundary...
    if (this.x + this.radius > 0.93 * innerWidth){
      //the fish is moving towards the boundary
      if (this.dx > 0){

        if (this.x + this.radius > 0.97 * innerWidth){
          this.dx *= 0.1;
        } else if (this.x + this.radius > 0.95 * innerWidth){
          this.dx *= 0.2;
        } else {
          this.dx *= 0.8;
        }

      }

      if (this.dx < 0 ){
        if (this.x + this.radius > 0.95 * innerWidth){
          this.dx = -1 * 0.1 * dx;
        } else {
          this.dx = -1 * 0.2 * dx;
        }
      }
    }

    if (this.x - this.radius < 0.07 * innerWidth){
      //the fish is moving towards the boundary
      if (this.dx < 0){
        if (this.x - this.radius < 0.03 * innerWidth){
          this.dx *= 0.1;
        } else if (this.x - this.radius < 0.05 * innerWidth) {
          this.dx *= 0.2
        } else {
          this.dx *= 0.8;
        }
      }

      if (this.dx > 0 ){
        if (this.x + this.radius < 0.05 * innerWidth){
          this.dx =  0.1 * dx;
        } else {
          this.dx = 0.2 * dx;
        }
      }
    }

    //vertical boundaries!

    //lower boundary

    if (this.y + this.radius > 0.935 * innerHeight){

      //moving towards the border

      if (Math.abs(this.dy) < 0.1 * dy){
        this.dy = -0.2 * dy;
        this.dx *= 1.5;
      }
      if (this.dy > 0 ){
        if (this.y + this.radius > 0.97 * innerHeight){
          this.dy *= 0.3;
        } else if (this.y + this.radius > 0.95 * innerHeight){
          this.dy *= 0.6;
        } else {
          this.dy *= 0.8;
        }
      }

      if (this.dy < 0 ){
        this.dy *= 1.1;
      }

    }

    //upper boundary

    if (this.y - this.radius < 0.065 * innerHeight){
      if (Math.abs(this.dy) < 0.1 * dy){
        this.dy = 0.5 * dy;
        this.dx *= 1.5;
      }

      if (this.dy < 0 ){
        if (this.y - this.radius < 0.03 * innerHeight){
          this.dy *= 0.3;
        } else if (this.y - this.radius < 0.05 * innerHeight){
          this.dy *= 0.6;
        } else {
          this.dy *= 0.8;
        }
      }

      if (this.dy > 0 ){
        this.dy *= 1.1;
      }


    }




    //once it really hits the edge, it should make a u turn.

    if (this.x + this.radius > 0.98 * innerWidth || this.x - this.radius < 0.02 * innerWidth){
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 0.98 * innerHeight  || this.y - this.radius < 0.02 * innerHeight){
      this.dy = -this.dy;
    }




    //side to side oscillation, based on normal vector and Sin.


  }
  //this is the end of this.update.

  this.calcSpeed = function(xv,yv){
    return Math.sqrt(xv*xv + yv*yv)
  }

  this.controlSpeed = function () {

        //random motion, cuz fish are fish lol.
        this.dx += (this.dx * 0.25) * (Math.random()-0.5)
        this.dx += (this.dy * 0.25) * (Math.random()-0.5)


        if (this.calcSpeed(this.dx,this.dy) > (dx + dy)){
          this.dx *= (1/1.2);
          this.dy *= (1/1.2);
        }

        if (this.calcSpeed(this.dx,this.dy) < 0.7 * (dx + dy )){
          this.dx *= (1/0.7);
          this.dy *= (1/0.7);
        }

  }

  this.oscillate = function(){
    let ox = -1 * this.dy;
    let oy = this.dx;

    this.time += 0.08;
    let oscillation = 0.295 * Math.sin(this.time);


    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;
  }



  this.do = function(){


    if (foodarr.length === 0){
      this.update();
    } else {
      this.chaseFood();
    }

    this.record();

    this.controlSpeed();
    this.oscillate();
    this.draw();


  }

}

/* harmony default export */ __webpack_exports__["a"] = (Fish);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var foodDrift = 3;

function Food(x,y,radius,c){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = (Math.random()-0.5) * 2;
  this.dy = (Math.random()-0.5) * 2;


  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius, 0, Math.PI * 2 , false);
    c.fillStyle = '#e0ac28';
    c.fill();
  }

  this.update = function() {

    if (this.x < 0.9 * innerWidth && this.x > 0.1 * innerWidth){
      this.x += this.dx;
    }

    if (this.y < 0.9 * innerHeight && this.y > 0.1 * innerHeight){
      this.y += this.dy;
    }



  }

  this.do = function() {
    this.update();
    this.draw();
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Food);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function LilyPad(x,y,c){

  this.x = x;
  this.y = y;
  this.dx = (Math.random()-0.5) * 1;
  this.dy = (Math.random()-0.5) * 1;
  let radius = 20;


  let startAngle = Math.random() * Math.PI * 2;
  let endAngle = startAngle +  Math.PI ;
  let padColor = '#4CAF50';

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle, endAngle , false);
    c.fillStyle = padColor;
    c.fill();



    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle + 1.3*(Math.PI/2) , endAngle + 1.3 * (Math.PI/2) , false);
    c.fillstyle = padColor;
    c.fill();



  }

  this.update = function(){
    if (this.x > window.innerWidth - 50 || this.x < 50){
      this.dx *= -1;
    }

    if (this.y > window.innerHeight - 50 || this.y < 50){
      this.dy *= -1;
    }


    this.x += this.dx;
    this.y += this.dy;
  }




  this.do = function(){
    this.update();
    this.draw();
  }


}

/* harmony default export */ __webpack_exports__["a"] = (LilyPad);


/***/ })
/******/ ]);
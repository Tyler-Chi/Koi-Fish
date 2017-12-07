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

  fishes.push(new __WEBPACK_IMPORTED_MODULE_0__fish_js__["a" /* default */](x,y,dx,dy,radius ,i,c,foods))
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function Fish(x,y,dx,dy,radius,id,c,foodarr){



  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.time = 0;
  this.positions = [];

  let totalSpeed = Math.sqrt(dx*dx + dy*dy)

  this.speed = this.dx * this.dx + this.dy + this.dy;



  this.draw = function(){
    //the tail of the fish

    let fishLength = 60 / Math.sqrt(this.speed);

    if (this.positions.length < fishLength){
      for (var i = 0 ; i < fishLength ; i++){
        this.positions.push([x + i * dx , y + i * dy])
      }
    }


    c.beginPath();
    c.arc(this.positions[0][0],this.positions[0][1], this.radius, 0 ,Math.PI * 2, false);
    c.fillStyle = 'black';
    c.fill();
    c.stroke();
    //the midsection of the fish
    c.beginPath();
    let midpoint = this.positions.length /2;
    c.arc (this.positions[midpoint][0],this.positions[midpoint][1], this.radius, 0, Math.PI*2, false);
    c.fillStyle = 'orange';
    c.fill();


    //the head of the fish

    c.beginPath();

    let headAngle = Math.atan(this.dy/this.dx);
    let startAngle = headAngle - (Math.PI/2);

    let cc = true;
    if (this.dx > 0 ){
      cc = false;
    }
    c.arc (this.x, this.y, this.radius, startAngle, startAngle + Math.PI, cc );



    c.fillStyle = 'white';
    c.fill();
    c.stroke();

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

    let turnChange = 0.3;

    //assume that its sorted already...
    yDif = foodarr[0].y - this.y;
    xDif = foodarr[0].x - this.x;
    angle = Math.atan(yDif/xDif);


    let foodDir = 1;
    //adjust the angle!
    if (xDif < 0){
      foodDir = -1;
    }

    this.dfy = totalSpeed * Math.sin(angle) * foodDir;
    this.dfx = totalSpeed * Math.cos(angle) * foodDir;

    //eat the food
    if (distance(this.x,this.y,foodarr[0].x,foodarr[0].y) < 50){
      foodarr.splice(0,1);
    }

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

  this.record = function(){
    this.positions.push([this.x,this.y])

    if (this.positions.length > 60 / Math.sqrt(this.speed)){
      this.positions.shift();
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
        this.dx += (this.dx * 0.3) * (Math.random()-0.5)
        this.dx += (this.dy * 0.3) * (Math.random()-0.5)


        if (this.calcSpeed(this.dx,this.dy) > (dx + dy)){
          this.dx *= (1/1.2);
          this.dy *= (1/1.2);
        }

        if (this.calcSpeed(this.dx,this.dy) < 0.7 * (dx + dy )){
          this.dx *= (1/0.7);
          this.dy *= (1/0.7);
        }





        //
        // if (Math.abs(this.dx) < 0.7 * dx){
        //   this.dx *= (1/0.7);
        // }
        //
        // if (Math.abs(this.dy) < 0.7 * dy){
        //   this.dy *= (1/0.7);
        // }
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

    console.log(this.speed);

  }

}

/* harmony default export */ __webpack_exports__["a"] = (Fish);


// let fish2 = new Fish(150,400,1,1,20,2);
// let fish3 = new Fish(400,400,1,1,20,3);
// let fish4 = new Fish(400,150,1,1,20,4);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var foodDrift = 3;

function Food(x,y,radius,c){
  this.x = x;
  this.y = y;
  this.radius = radius;


  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius, 0, Math.PI * 2 , false);
    c.fillStyle = '#68f442';
    c.fill();
    c.stroke();
  }

  this.update = function() {
    this.x += (Math.random()-0.5) *foodDrift;
    this.y += (Math.random()-0.5) *foodDrift;
  }

  this.do = function() {
    this.update();
    this.draw();
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Food);


/***/ })
/******/ ]);
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

    foods.push(new __WEBPACK_IMPORTED_MODULE_1__food_js__["a" /* default */](mouse.x,mouse.y,5,c))
  }

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

function createFishes(fishCount,foods,c){

  let dx = 1 ;
  let dy = 1 ;
  let radius = 18;

  if (fishCount > fishes.length){
    for (var f = fishes.length ; f < fishCount ; f++){
      fishes.push(new __WEBPACK_IMPORTED_MODULE_0__fish_js__["a" /* default */](dx, dy, radius, f , c, foods))
    }
  } else {
    let difference = fishes.length - fishCount;
    fishes = fishes.slice(difference);
  }
}


function createPads(padCount,c){

  if (padCount > pads.length) {
    for (var p = pads.length ; p < padCount; p++){
      pads.push(new __WEBPACK_IMPORTED_MODULE_2__lilypad_js__["a" /* default */](c))
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Fish(dx, dy, radius, id, c, foodarr) {
  let colors = [
    "#d7dde5",
    "#ea4504",
    "#d8d215",
    "#d61515",
    "#ff9400",
    "black",
    "#d8d8d8",
    "white"
  ];
  let headColor = colors[Math.round(Math.random() * (colors.length - 1))];
  let bodyColor = colors[Math.round(Math.random() * (colors.length - 1))];
  let tailColor = colors[Math.round(Math.random() * (colors.length - 1))];
  let neckColor = colors[Math.round(Math.random() * (colors.length - 1))];
  let width = c.canvas.width;
  let height = c.canvas.height;

  this.x = (0.15 + 0.7 * Math.random()) * width;
  this.y = (0.15 + 0.7 * Math.random()) * height;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.time = Math.random() * 5;
  this.positions = [];
  this.slopes = [];
  this.angles = [];

  let totalSpeed = Math.sqrt(dx * dx + dy * dy);
  this.speed = (this.dx * this.dx) + (this.dy + this.dy);
  this.fishLength = Math.round(40 / Math.sqrt(this.speed));

  while (this.angles.length < this.fishLength){
    this.angles.unshift([Math.atan(this.dx/this.dy),1])
  }

  this.draw = function() {

    if (this.dx === 0){
      this.dx = 0.001;
    }

    let cc = true;
    let mc = false;
    let nd = 1;
    if (this.dx >= 0) {
      cc = false;
      mc = true;
      nd = 1;
    } else {
      nd = -1;
    }
    //should initially calculate all positions first.
    let headAngle = Math.atan(this.dy / this.dx);
    this.angles.unshift([headAngle,nd]);
    if (this.angles.length > this.fishLength){
      this.angles.pop();
    }

    let neckDistance = 3;
    let neckX = this.x - this.angles[5][1] * neckDistance * (Math.cos(this.angles[5][0]))
    let neckY = this.y - this.angles[5][1] * neckDistance * (Math.sin(this.angles[5][0]))

    let bodyDistance = 10;
    let bodyPosition = 15;
    let bodyX = this.x - this.angles[bodyPosition][1] * bodyDistance * (Math.cos(this.angles[bodyPosition][0]))
    let bodyY = this.y - this.angles[bodyPosition][1] * bodyDistance * (Math.sin(this.angles[bodyPosition][0]))


    //sin and cosine are getting added incorrectly!
    let tipDistance = 10;
    let tip1X = neckX - tipDistance * Math.sin(headAngle)
    let tip1Y = neckY + tipDistance * Math.cos(headAngle)

    let tip2X = neckX + tipDistance * Math.sin(headAngle)
    let tip2Y = neckY - tipDistance * Math.cos(headAngle)


    //TODO can possibly turn this into a loop, we will see!
    //TODO can also add some trig oscillation right here.
    //TODO should really turn these into quadratic curves.
    //TODO use the tip points in order to draw the curves
    //TODO THEY SWAP CUZ THE RIGHT AND LEFT SWAPS!!!

    let bodySegment1Distance = 17;
    let body1X = neckX - this.angles[5][1] * bodySegment1Distance * (Math.cos(this.angles[5][0]))
    let body1Y = neckY - this.angles[5][1] * bodySegment1Distance * (Math.sin(this.angles[5][0]))

    let bodySegment1Width = 7;

    let body1LX = body1X - bodySegment1Width * Math.sin(headAngle)
    let body1LY = body1Y + bodySegment1Width * Math.cos(headAngle)

    let body1RX = body1X + bodySegment1Width * Math.sin(headAngle)
    let body1RY = body1Y - bodySegment1Width * Math.cos(headAngle)


    let bodySegment2Distance = 30;
    let body2X = neckX - this.angles[8][1] * bodySegment2Distance * (Math.cos(this.angles[8][0]))
    let body2Y = neckY - this.angles[8][1] * bodySegment2Distance * (Math.sin(this.angles[8][0]))

    let bodyTipDistance = 35;
    let bodyTipX = neckX - this.angles[10][1] * bodyTipDistance * (Math.cos(this.angles[10][0]))
    let bodyTipY = neckY - this.angles[10][1] * bodyTipDistance * (Math.sin(this.angles[10][0]))

    c.beginPath();
    c.arc(
      body1X,
      body1Y,
      3,
      0,
      2 * Math.PI,
      false
    )
    c.fillStyle = 'blue';
    c.fill();

    c.beginPath();
    c.arc(
      body1RX,
      body1RY,
      3,
      0,
      2* Math.PI,
      false
    )
    c.fillStyle='white';
    c.fill();

    c.beginPath();
    c.arc(
      body1LX,
      body1LY,
      3,
      0,
      2* Math.PI,
      false
    )
    c.fillStyle='white';
    c.fill();

    c.beginPath();
    c.arc(
      tip1X,
      tip1Y,
      3,
      0,
      2* Math.PI,
      false
    )
    c.fillStyle='black';
    c.fill();

    c.beginPath();
    c.arc(
      tip2X,
      tip2Y,
      3,
      0,
      2* Math.PI,
      false
    )
    c.fillStyle='black';
    c.fill();


    c.beginPath();
    c.arc(
      bodyTipX,
      bodyTipY,
      3,
      0,
      2* Math.PI,
      false
    )
    c.fillStyle='black';
    c.fill();

    let finOscillate = 0.9 + 0.2 * Math.sin(this.time);

    c.beginPath();
    c.ellipse(
      neckX,
      neckY,
      0.5 * this.radius,
      finOscillate * this.radius,
      headAngle,
      -Math.PI / 2,
      Math.PI / 2,
      cc
    );
    c.strokeStyle = bodyColor;
    c.lineWidth = 3;
    c.stroke();


    c.beginPath();
    c.arc(
      neckX,
      neckY,
      9,
      0,
      2 * Math.PI,
      false
    )
    c.fillStyle = headColor;
    c.fill();


    // the head of the fish

    c.beginPath();
    c.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius/2,
      headAngle,
      -Math.PI / 2,
      Math.PI / 2,
      cc
    )
    c.fillStyle = headColor;
    c.fill();


  };


  //EVERYTHING BELOW THIS PERTAINS TO CHASEFOOD

  function distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
  }

  let yDif;
  let xDif;
  let angle;

  this.speedDif = function(initial, desired) {
    return Math.abs(initial - desired) / Math.abs(initial);
  };

  this.chaseFood = function() {
    //has access to foodarr
    //first find the piece of food the fish is closest to.

    let chaseIndex = 0;

    for (var a = 0; a < foodarr.length; a++) {
      if (
        distance(this.x, this.y, foodarr[a].x, foodarr[a].y) <
        distance(this.x, this.y, foodarr[chaseIndex].x, foodarr[chaseIndex].y)
      ) {
        chaseIndex = a;
      }
    }

    let turnChange = 0.3;

    //assume that its sorted already...
    yDif = foodarr[chaseIndex].y - this.y;
    xDif = foodarr[chaseIndex].x - this.x;
    angle = Math.atan(yDif / xDif);

    let foodDir = 1;
    //adjust the angle!
    if (xDif < 0) {
      foodDir = -1;
    }

    this.dfy = (totalSpeed * Math.sin(angle) * foodDir) ;
    this.dfx = (totalSpeed * Math.cos(angle) * foodDir) ;
;
    //eat the food

    for (var f = 0; f < foodarr.length; f++) {
      if (distance(this.x, this.y, foodarr[f].x, foodarr[f].y) < 20) {
        foodarr.splice(f, 1);
      }
    }

    //control how fast they can turn.

    if (this.speedDif(this.dx, this.dfx) < 0.001) {
      this.dx = this.dfx;
    } else {
      this.dx += turnChange * this.dfx;
    }

    if (this.speedDif(this.dy, this.dfy) < 0.5) {
      this.dy = this.dfy;
    } else {
      this.dy += turnChange * this.dfy;
    }
  };

  this.update = function() {
    //first update positions with the fish coordinates

    //deals with collisions

    //try making the motion more smooth

    // if it goes too close to the right boundary and its still moving towards that boundary...
    if (this.x + this.radius > 0.93 * width) {
      //the fish is moving towards the boundary
      if (this.dx > 0) {
        if (this.x + this.radius > 0.97 * width) {
          this.dx *= 0.1;
        } else if (this.x + this.radius > 0.95 * width) {
          this.dx *= 0.2;
        } else {
          this.dx *= 0.8;
        }
      }

      if (this.dx < 0) {
        if (this.x + this.radius > 0.95 * width) {
          this.dx = -1 * 0.1 * dx;
        } else {
          this.dx = -1 * 0.2 * dx;
        }
      }
    }

    if (this.x - this.radius < 0.07 * width) {
      //the fish is moving towards the boundary
      if (this.dx < 0) {
        if (this.x - this.radius < 0.03 * width) {
          this.dx *= 0.1;
        } else if (this.x - this.radius < 0.05 * width) {
          this.dx *= 0.2;
        } else {
          this.dx *= 0.8;
        }
      }

      if (this.dx > 0) {
        if (this.x + this.radius < 0.05 * width) {
          this.dx = 0.1 * dx;
        } else {
          this.dx = 0.2 * dx;
        }
      }
    }

    //vertical boundaries!

    //lower boundary

    if (this.y + this.radius > 0.935 * height) {
      //moving towards the border

      if (Math.abs(this.dy) < 0.1 * dy) {
        this.dy = -0.2 * dy;
        this.dx *= 1.5;
      }
      if (this.dy > 0) {
        if (this.y + this.radius > 0.97 * height) {
          this.dy *= 0.3;
        } else if (this.y + this.radius > 0.95 * height) {
          this.dy *= 0.6;
        } else {
          this.dy *= 0.8;
        }
      }

      if (this.dy < 0) {
        this.dy *= 1.1;
      }
    }

    //upper boundary

    if (this.y - this.radius < 0.065 * height) {
      if (Math.abs(this.dy) < 0.1 * dy) {
        this.dy = 0.5 * dy;
        this.dx *= 1.5;
      }

      if (this.dy < 0) {
        if (this.y - this.radius < 0.03 * height) {
          this.dy *= 0.3;
        } else if (this.y - this.radius < 0.05 * height) {
          this.dy *= 0.6;
        } else {
          this.dy *= 0.8;
        }
      }

      if (this.dy > 0) {
        this.dy *= 1.1;
      }
    }

    //once it really hits the edge, it should make a u turn.

    if (
      this.x + this.radius > 0.98 * width ||
      this.x - this.radius < 0.02 * width
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.radius > 0.98 * height ||
      this.y - this.radius < 0.02 * height
    ) {
      this.dy = -this.dy;
    }

    //side to side oscillation, based on normal vector and Sin.
  };
  //this is the end of this.update.

  this.calcSpeed = function(xv, yv) {
    return Math.sqrt(xv * xv + yv * yv);
  };

  //this handles random motion

  this.controlSpeed = function() {
    //random motion, cuz fish are fish lol.
    this.dx += this.dx * 0.15 * (Math.random() - 0.5);
    this.dx += this.dy * 0.15 * (Math.random() - 0.5);

    if (this.calcSpeed(this.dx, this.dy) > dx + dy) {
      this.dx *= 1 / 1.2;
      this.dy *= 1 / 1.2;
    }

    if (this.calcSpeed(this.dx, this.dy) < 0.7 * (dx + dy)) {
      this.dx *= 1 / 0.7;
      this.dy *= 1 / 0.7;
    }
  };

  this.oscillate = function() {
    let ox = -1 * this.dy;
    let oy = this.dx;

    this.time += 0.08;
    let oscillation = 0.4 * Math.sin(this.time);

    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;
  };

  this.do = function() {
    if (foodarr.length === 0) {
      this.update();
    } else {
      this.chaseFood();
    }



    this.controlSpeed();
    this.oscillate();
    this.draw();


  };
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
function LilyPad(c) {
  let width = c.canvas.width;
  let height = c.canvas.height;
  this.x = (0.2 + 0.65 * Math.random()) * c.canvas.width;
  this.y = (0.2 + 0.65 * Math.random()) * c.canvas.height;
  this.dx = (Math.random() - 0.5) * 1;
  this.dy = (Math.random() - 0.5) * 1;
  this.time = 0;
  let radius = 20;

  let startAngle = Math.random() * Math.PI * 2;

  let padColor = "#4CAF50";

  let petalColors = [
    "#ff00fa",
    "#8c00ff",
    "#ce3b63",
    "#e00ba7",
    "#ff35e4",
    "#7c1531",
    "#7c1531"
  ];

  let petalColor = Math.round(Math.random() * (petalColors.length - 1));

  let petalLength = 12 + Math.random() * 4;

  this.draw = function() {
    startAngle += 0.009;

    let endAngle = startAngle + Math.PI;

    c.beginPath();
    c.arc(this.x, this.y, radius, startAngle, endAngle, false);
    c.fillStyle = padColor;
    c.fill();

    c.beginPath();
    c.arc(
      this.x,
      this.y,
      radius,
      startAngle + 1.7 * (Math.PI / 2),
      endAngle + 1.7 * (Math.PI / 2),
      false
    );
    c.fillstyle = padColor;
    c.fill();

    //lines on the lilypads

    for (var i = 0; i < 5; i++) {
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.lineTo(
        this.x + (radius - 2) * Math.cos(startAngle + Math.PI / 2.18 * i),
        this.y + (radius - 2) * Math.sin(startAngle + Math.PI / 2.18 * i)
      );
      c.lineWidth = 2;
      c.strokeStyle = "#023a03";
      c.stroke();
    }

    //petals on the lilypads

    for (var i = 0; i < 4; i++) {
      c.beginPath();
      c.ellipse(
        this.x,
        this.y,
        3,
        petalLength,
        startAngle + 2 * Math.PI / 4 * i,
        0,
        Math.PI,
        true
      );
      c.fillStyle = petalColors[petalColor];
      c.fill();
    }

    for (var i = 0; i < 4; i++) {
      c.beginPath();
      c.ellipse(
        this.x,
        this.y,
        3,
        petalLength * 0.75,
        startAngle + Math.PI / 4 + 2 * Math.PI / 4 * i,
        0,
        Math.PI,
        true
      );
      c.fillStyle = "white";
      c.fill();
    }

    //the middle part of the flower
    c.beginPath();
    c.arc(this.x, this.y, radius / 4, 0, 2 * Math.PI, false);
    c.fillStyle = "#fffa00";
    c.fill();
  };

  this.update = function() {
    if (this.x > width - 50 || this.x < 50) {
      this.dx *= -1;
    }

    if (this.y > height - 50 || this.y < 50) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  };

  this.do = function() {
    this.update();
    this.draw();
  };
}

/* harmony default export */ __webpack_exports__["a"] = (LilyPad);


/***/ })
/******/ ]);
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
  this.tipTime = Math.random() * 5;
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

    let neckDistance = 0.5;
    let neckX = this.x - this.angles[5][1] * neckDistance * (Math.cos(this.angles[5][0]))
    let neckY = this.y - this.angles[5][1] * neckDistance * (Math.sin(this.angles[5][0]))

    let bodyDistance = 10;
    let bodyPosition = 15;
    let bodyX = this.x - this.angles[bodyPosition][1] * bodyDistance * (Math.cos(this.angles[bodyPosition][0]))
    let bodyY = this.y - this.angles[bodyPosition][1] * bodyDistance * (Math.sin(this.angles[bodyPosition][0]))


    //sin and cosine are getting added incorrectly!
    let tipDistance = 7;
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


    //handle tailWagging
    this.tipTime += Math.sqrt(this.dx * this.dx + this.dy * this.dy)/22;
    let bodyTipOX = -1 * Math.sin(headAngle);
    let bodyTipOY = Math.cos(headAngle);
    let bodyOscillation = 8 * Math.sin(this.tipTime)
    bodyTipX += bodyTipOX * bodyOscillation;
    bodyTipY += bodyTipOY * bodyOscillation;


    c.beginPath();
    c.moveTo(tip1X,tip1Y)
    c.quadraticCurveTo(body1LX,body1LY,bodyTipX,bodyTipY);
    c.quadraticCurveTo(body1RX,body1RY,tip2X,tip2Y);
    c.lineTo(tip1X,tip1Y);
    c.fillStyle = bodyColor;
    c.fill();

    let finOscillate = 0.7 + 0.075 * Math.sin(this.time);

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
    // c.lineCap = 'round';
    c.stroke();
    c.fill();


    //the neck circle

    c.beginPath();
    c.arc(
      neckX,
      neckY,
      7,
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

    let maxDistance = Math.sqrt( innerWidth * innerWidth + innerHeight * innerHeight )


    //accessing the food array, deciding which piece of food is closest.

    let chaseIndex = 0;
    for (var a = 0; a < foodarr.length; a++) {
      if (
        distance(this.x, this.y, foodarr[a].x, foodarr[a].y) <
        distance(this.x, this.y, foodarr[chaseIndex].x, foodarr[chaseIndex].y)
      ) {
        chaseIndex = a;
      }
    }


    let distancePercent = distance(this.x,this.y, foodarr[chaseIndex].x,foodarr[chaseIndex].y)

    //assume that its sorted already...
    yDif = foodarr[chaseIndex].y - this.y;
    xDif = foodarr[chaseIndex].x - this.x;
    angle = Math.atan(yDif / xDif);

    let foodDir = 1;
    //adjust the angle!
    if (xDif < 0) {
      foodDir = -1;
    }

    let turnChange = 0.08;

    this.dfy = (dy * Math.sin(angle) * foodDir);
    this.dfx = (dx * Math.cos(angle) * foodDir);

    if (this.speedDif(this.dx, this.dfx) > 0.01){
      this.dx = ( 1 - turnChange ) * this.dx + turnChange * this.dfx;
    }

    if (this.speedDif(this.dy, this.dfy) > 0.01){
      this.dy = (1 - turnChange) * this.dy + turnChange * this.dfy;
    }


    //eat the food

    for (var f = 0; f < foodarr.length; f++) {
      if (distance(this.x, this.y, foodarr[f].x, foodarr[f].y) < 20) {
        foodarr.splice(f, 1);
      }
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


    if (this.calcSpeed(this.dx, this.dy) > 1.2 * this.calcSpeed(dx,dy)) {
      this.dx *= 1 / 1.2;
      this.dy *= 1 / 1.2;
    }

    if (this.calcSpeed(this.dx, this.dy) < 0.7 * this.calcSpeed(dx, dy)) {
      this.dx *= 1 / 0.7;
      this.dy *= 1 / 0.7;
      console.log('hi');
    }
  };

  this.controlChaseSpeed = function(){
    this.dx *= 1.05;
    this.dy *= 1.05;
  }

  this.generalBehavior = function() {
    let ox = -1 * this.dy;
    let oy = this.dx;

    this.time += 0.08;
    let oscillation = 0.4 * Math.sin(this.time);

    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;

    //random motion, cuz fish are fish lol.
    this.dx += this.dx * 0.15 * (Math.random() - 0.5);
    this.dx += this.dy * 0.15 * (Math.random() - 0.5);
  };

  this.do = function() {
    if (foodarr.length === 0) {
      this.update();
      this.controlSpeed();
    } else {
      this.chaseFood();
      this.controlChaseSpeed();
    }



    this.generalBehavior();
    this.draw();


  };
}

export default Fish;

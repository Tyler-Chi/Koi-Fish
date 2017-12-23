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

  this.x = (0.2 + 0.6 * Math.random()) * width;
  this.y = (0.2 + 0.6 * Math.random()) * height;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.time = Math.random() * 5;
  this.positions = [];
  this.slopes = [];

  let totalSpeed = Math.sqrt(dx * dx + dy * dy);

  this.speed = this.dx * this.dx + this.dy + this.dy;

  this.fishLength = Math.round(40 / (Math.sqrt(this.speed)));

  this.record = function() {
    //initialize the fish at time 0
    if (this.positions.length < this.fishLength) {
      for (var i = 0; i < this.fishLength; i++) {
        this.positions.push([this.x + i * dx, this.y + i * dy]);
      }
    }

    this.positions.push([this.x, this.y]);

    if (this.dx === 0) {
      this.slopes.push(this.dy/0.0000001);
    } else {
      this.slopes.push(this.dy / this.dx);
    }

    if (this.positions.length >= this.fishLength) {
      this.positions = this.positions.slice(this.positions.length - this.fishLength - 5 )
    }

    if (this.slopes.length > this.fishLength + 1) {
      this.slopes.shift();
    }
  };

  this.draw = function() {
    let headAngle = Math.atan(this.dy / this.dx);
    let midpoint = Math.round(this.positions.length / 2 + 4);

    let cc = true;
    let mc = false;
    if (this.dx > 0) {
      cc = false;
      mc = true;
    }

    //the fins of the fish

    let finOscillate = 0.9 + 0.2 * Math.sin(this.time);

    c.beginPath();
    c.ellipse(
      this.positions[midpoint + 3][0],
      this.positions[midpoint + 3][1],
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

    // the midsection of the fish

    c.beginPath();
    c.ellipse(
      this.positions[midpoint][0],
      this.positions[midpoint][1],
      this.radius * 1.1,
      this.radius / 2,
      Math.atan(this.slopes[midpoint]),
      0,
      Math.PI * 2,
      mc
    );
    c.fillStyle = bodyColor;
    c.fill();

    //the neck of the fish
    let neckPoint = Math.round(0.95 * this.positions.length);
    c.beginPath();
    c.arc(
      this.positions[neckPoint][0],
      this.positions[neckPoint][1],
      7,
      0,
      2 * Math.PI,
      false
    );
    c.fillstyle = neckColor;
    c.fill();

    //the head of the fish

    c.beginPath();
    c.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius / 2,
      headAngle,
      -Math.PI / 2,
      Math.PI / 2,
      cc
    );
    c.fillStyle = headColor;
    c.fill();

    // the tail of the fish
    let tailAngle = Math.atan(this.slopes[1]);


    if (Math.abs(tailAngle) > 1.5){
      cc *= -1;
    }

    c.beginPath();
    c.ellipse(
      this.positions[4][0],
      this.positions[4][1],
      this.radius / 2,
      this.radius / 2,
      tailAngle,
      -Math.PI / 2,
      Math.PI / 2,
      cc
    );
    c.fillStyle = tailColor;
    c.fill();
  };

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

  this.controlSpeed = function() {
    //random motion, cuz fish are fish lol.
    this.dx += this.dx * 0.25 * (Math.random() - 0.5);
    this.dx += this.dy * 0.25 * (Math.random() - 0.5);

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
    let oscillation = 0.295 * Math.sin(this.time);

    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;
  };

  this.do = function() {
    if (foodarr.length === 0) {
      this.update();
    } else {
      this.chaseFood();
    }

    this.record();

    this.controlSpeed();
    this.oscillate();
    this.draw();
  };
}

export default Fish;

let headAngle = Math.atan(this.dy / this.dx);
let midpoint = Math.round(this.positions.length / 2 + 4);

let cc = true;
let mc = false;
if (this.dx > 0) {
  cc = false;
  mc = true;
}

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



// the tail of the fish
// let tailAngle = Math.atan(this.slopes[1]);
let tailAngle = this.angles[5];

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

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;

})

function Circle( x , y , dx, dy, radius, id, dr){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.id = id;

  this.dr = dr;

  this.draw = function(){
    c.beginPath();
    c.arc( this.x, this. y, this.radius, 0 , Math.PI * 2, false);
    c.strokeStyle = 'black';

    if (this.id % 3 === 0){
      c.fillStyle = '#0059ff';
    } else if (this.id % 3 === 1) {
      c.fillStyle = '#c5ccd8';
    } else {
      c.fillStyle = '#1e2430';
    }

    c.fill();

    c.stroke();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }

    // if (this.radius >= 40 || this.radius <= 20 ){
    //   this.dr *= -1;
    // }
    //
    // this.radius += (0.5 * this.dr);
    this.x += this.dx;
    this.y += this.dy;

    // interactivity

    if ((mouse.x - this.x < 1)&&(mouse.y - this.y < 1)){
      this.radius += 1;
    } else {
      this.radius = 30;
    }



  }





  this.do = function (){
    this.update();
    this.draw();
  }
}


//this creates an endless animation loop



// var circles = [];
// for (var i = 0 ; i < 10 ; i++){
//   circles.push(new Circle(Math.random()*innerHeight),Math.random()*innerWidth,4,4,5)
// }

var circleArray = [];

for (var i = 0 ; i < 100 ; i++){
  var x = Math.random() * innerWidth;
  var y = Math.random() * innerHeight;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5 ) * 8;
  var radius = 30 + (Math.random() - 0.5) * 10;
  var dr = 2 * (Math.random() - 0.5)
  circleArray.push(new Circle(x, y, dx, dy, radius,i,dr))
}


function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);
  //this clears the canvas each time animate being called.

  circleArray.forEach(function(circle){
    circle.do();
  })

  //due to the logic inside the Circle object, update first updates
  //the position of the circle, and then causes it to move around.



  //the x coordinate changes 1 pixel every time that the animate is run.


}

animate();

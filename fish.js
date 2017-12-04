var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Fish(x,y,dx,dy,radius,id){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.time = 0;


  this.draw = function(){
    c.beginPath();
    c.arc (this.x, this.y, this.radius, 0, Math.PI * 2, false );
    c.strokeStyle = 'black';
    c.fill();
    c.stroke();

  }

  this.update = function(){

    //deals with collisions

    //try making the motion more smooth

    // if it goes too close to the right boundary and its still moving towards that boundary...
    if (this.x + this.radius > 0.95 * innerWidth){
      //the fish is moving towards the boundary
      if (this.dx > 0){
        if (this.x + this.radius > 0.97 * innerWidth){
          this.dx *= 0.1;
        } else {
          this.dx *= 0.3;
        }
      }

      if (this.dx < 0 ){
        if (this.x + this.radius > 0.95 * innerWidth){
          this.dx = -1 * 0.1 * dx;
        } else {
          this.dx = -1 * 0.5 * dx;
        }
      }
    }

    if (this.x + this.radius < 0.05 * innerWidth){
      //the fish is moving towards the boundary
      if (this.dx < 0){
        if (this.x + this.radius < 0.03 * innerWidth){
          this.dx *= 0.1;
        } else {
          this.dx *= 0.3;
        }
      }

      if (this.dx > 0 ){
        if (this.x + this.radius < 0.05 * innerWidth){
          this.dx =  0.1 * dx;
        } else {
          this.dx = 0.5 * dx;
        }
      }
    }








    if (this.x + this.radius > innerWidth || this.x - this.radius < 10){
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight - 10 || this.y - this.radius < 10){
      this.dy = -this.dy;
    }

    //side to side oscillation, based on normal vector and Sin.

    let ox = -1 * this.dy;
    let oy = this.dx;

    this.time += 0.08;
    let oscillation = 0.295 * Math.sin(this.time);

    //random motion, cuz fish are fish lol.
    this.dx += (this.dx * 0.2) * (Math.random()-0.5)
    this.dx += (this.dy * 0.2) * (Math.random()-0.5)

    //cant go TOO crazy
    if (Math.abs(this.dx) > 1.5*dx){
      this.dx *= (1/1.5);
    }

    if (Math.abs(this.dy) > 1.5*dy){
      this.dy *= (1/1.5);
    }

    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;




  }






  this.do = function(){
    this.update();
    this.draw();
  }

}


// INITIALIZE THE SCHOOL OF FISHIES
let fishes = [];
let x;
let y;



let fish = new Fish(100,100,2,2,20);
let fish2 = new Fish(150,150,1.5,1.5,20);

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);

  fish.do();
  fish2.do();

}

animate();

var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Fish(x,y,dx,dy,radius){
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

    if (this.x + this.radius > innerWidth - 50 || this.x - this.radius < 50){
      this.dx = -this.dx;
    }



    if (this.y + this.radius > innerHeight - 50 || this.y - this.radius < 50){
      this.dy = -this.dy;
    }


    let ox = -1 * this.dy;
    let oy = this.dx;


    this.time += 0.08;
    let oscillation = 0.35 * Math.sin(this.time);


    this.x += this.dx + oscillation * ox;
    this.y += this.dy + oscillation * oy;




  }






  this.do = function(){
    this.update();
    this.draw();
  }

}

let fish = new Fish(100,100,1.5,1.5,20);

function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth, innerHeight);

  fish.do();


}

animate();

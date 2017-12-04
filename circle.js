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

    if (this.radius >= 40 || this.radius <= 20 ){
      this.dr *= -1;
    }

    this.radius += (0.5 * this.dr);
    this.x += this.dx;
    this.y += this.dy;


  }

  this.do = function (){
    this.update();
    this.draw();
  }
}

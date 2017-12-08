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

export default Food;

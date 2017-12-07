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

export default Food;

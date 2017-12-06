function Food(x,y,radius,c){
  this.x = x;
  this.y = y;
  this.radius = radius;


  this.draw = function() {
     c.beginPath();
     c.arc(this.x,this.y,this.radius, 0, Math.PI * 2 , false);
     c.fillStyle = '#d1b723';
     c.fill();
     c.stroke();
  }


}

export default Food;

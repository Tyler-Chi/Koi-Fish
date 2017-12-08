

function LilyPad(x,y,c){

  this.x = x;
  this.y = y;
  let startAngle = Math.random() * Math.PI * 2;
  let endAngle = startAngle + (3/2) * Math.PI;

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,15,startAngle, endAngle , false);
    c.fillStyle = '#0f772d';
    c.fill();
  }

  this.do = function(){
    this.draw();
  }


}

export default LilyPad;

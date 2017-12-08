

function LilyPad(x,y,c){

  this.x = x;
  this.y = y;
  this.dx = (Math.random()-0.5) * 2;
  this.dy = (Math.random()-0.5) * 2;
  let radius = 20;


  let startAngle = Math.random() * Math.PI * 2;
  let endAngle = startAngle +  Math.PI ;
  let padColor = '#87bf67';

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle, endAngle , false);
    c.fillStyle = padColor;
    c.fill();



    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle + 1.2*(Math.PI/2) , endAngle + 1.2 * (Math.PI/2) , false);
    c.fillstyle = padColor;
    c.fill();



  }

  this.update = function(){
    if (this.x > window.innerWidth - 20 || this.x < 20){
      this.dx *= -1;
    }

    if (this.y > window.innerHeight - 20 || this.y < 20){
      this.dy *= -1;
    }


    this.x += this.dx;
    this.y += this.dy;
  }




  this.do = function(){
    this.update();
    this.draw();
  }


}

export default LilyPad;

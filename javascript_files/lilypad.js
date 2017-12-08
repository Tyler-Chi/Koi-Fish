

function LilyPad(x,y,c){

  this.x = x;
  this.y = y;
  this.dx = (Math.random()-0.5) * 1;
  this.dy = (Math.random()-0.5) * 1;
  this.time = 0;
  let radius = 20;


  let startAngle = Math.random() * Math.PI * 2;

  let padColor = '#4CAF50';


  this.draw = function(){


    startAngle += 0.009;

    let endAngle = startAngle + Math.PI ;

    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle, endAngle , false);
    c.fillStyle = padColor;
    c.fill();



    c.beginPath();
    c.arc(this.x,this.y,radius,startAngle + 1.7*(Math.PI/2) , endAngle + 1.7 * (Math.PI/2) , false);
    c.fillstyle = padColor;
    c.fill();

    //lines on the lilypads

    for (var i = 0 ; i < 5 ; i ++){

      c.beginPath();
      c.moveTo(this.x,this.y);
      c.lineTo(this.x + (radius - 2 ) * Math.cos(startAngle + (Math.PI/2.18)*i), this.y + (radius - 2 ) * Math.sin(startAngle + (Math.PI/2.18)*i));
      c.lineWidth = 2;
      c.strokeStyle = '#023a03';
      c.stroke();

    }






  }

  this.update = function(){

    if (this.x > window.innerWidth - 50 || this.x < 50){
      this.dx *= -1;
    }

    if (this.y > window.innerHeight - 50 || this.y < 50){
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

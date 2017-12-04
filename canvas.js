console.log('hello world');


//this grabs the HTML Canvas tag.
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//we are returning a drawing context to this variable c
//within c, we are creating a super object
//we will use c to draw within the context of canvas
// var c = canvas.getContext('2d');

// c.fillRect(x,y,width,height);
// x,y determine where the rectangle will be
// width and height determine how large
// top left is (0,0)

//how to change the color of the rectangle
c.fillStyle = "#fa34a3";
c.fillRect(100,100,100,100);


//fillrect will automatically take the color of the first fillstyle above it.
c.fillStyle = "#ffffff";
c.fillRect(400,100,100,100);
c.fillRect(300,300,100,100);


//how to draw lines :D

c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.lineTo(400,300);

//how to change the color of the stroke.
c.strokeStyle="#fa34a3";
//the point is invisible until call a stroke method.

c.stroke();

// Arcs and circles

//first two arguements are x and y coordinates
//the next argument is the radius of the circle in px
//second two arguments are starting and ending angles, in radians
//0 is obviously 0, Math.Pi*2 is 360 degrees
//last argument asks if you want to draw it counterclockwise.
//so false means not counter clockwise!


//need to specify beginPath, otherwise this will connect from

//the last line that was being drawn.


for (var i = 0 ; i <3; i++){
  c.beginPath();
  c.arc(90 + 20 * i, 65 + 20 * i, 100, 0, Math.PI * 2, true);  // Right eye
  c.strokeStyle = 'black';
  c.stroke();
}

//
c.beginPath();
c.arc(200 , 200 , 100, 0, Math.PI * 2, true);
c.strokeStyle = 'red';
c.stroke();


//this creates a loop
function animate() {
  requestAnimationFrame(animate);
}

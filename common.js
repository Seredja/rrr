function circle(x,y,myCanvas)
{
	var obCanvas = myCanvas.getContext('2d');

	obCanvas.beginPath();
	obCanvas.arc(x, y, 5, 0, 2*Math.PI, false);
	obCanvas.fillStyle = 'red';
	obCanvas.fill();
	obCanvas.lineWidth = 1;
	obCanvas.strokeStyle = 'black';
	obCanvas.stroke();
}

function create() {
	var canvas = document.getElementById('myCanvas');
	canvas.width = 1000;
	canvas.height = 500;

	var x =130;
	var step = 0.05;
	var n = 7;
	var arrayY = [460, 180, 290, 140, 330, 440, 210];
	var sum;
	var multy;
	
	var thisStep = x - step;
	while(thisStep<x*n){
		thisStep+=step;
		sum = 0;
		for(i=1;i<=n;i++){
			multy = 1;
			var j;
			for(j=1;j<=n;j++){
				if(i!=j) multy*=(thisStep-j*x)/(x*i - x*j);
			}
			sum+=arrayY[i-1]*multy;
		}
		var ttt = canvas.getContext('2d');
		ttt.fillRect(thisStep,sum,2,2);
	}
	var curX = x;
	for(i=0;i<n;i++){
		circle(curX,arrayY[i],canvas);
		curX+=x;
	}
}
function create2(){
	var canvas = document.getElementById('myCanvas2');
	canvas.width = 1000;
	canvas.height = 500;

	var a = new Point(40,40);
	a.draw(canvas);
	a.makePolar();

	var b = new Line(300,200,600,400);
	b.draw(canvas);
	console.log(b.getLength());
  
  array = [new Line(100,100,100,200),new Line(100,200,200,200),new Line(200,200,200,100),new Line(200,100,150,50),new Line(150,50,100,100)];
	var c = new Figure(array,array.length);
	console.log(c.getPeri());
	c.draw(canvas);
}
class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	makePolar(){
		this.r = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
		this.angle = Math.atan(this.y/this.x);
		console.log(this.r,this.angle);
	}
	draw(myCanvas){
		circle(this.x,this.y,myCanvas);
	}
}
class Line{
	constructor(x1,y1,x2,y2){
		this.point1 = new Point(x1,y1);
		this.point2 = new Point(x2,y2);
	}
	getLength(){
		return (Math.sqrt(Math.pow(Math.abs(this.point1.x-this.point2.x),2)+Math.pow(Math.abs(this.point1.y-this.point2.y),2))); 
	}
	
	draw(myCanvas){
		var context = myCanvas.getContext('2d');
		context.beginPath();
		context.moveTo(this.point1.x, this.point1.y);
		context.lineTo(this.point2.x, this.point2.y);
		context.lineWidth = 2;
		context.stroke();
		this.point1.draw(myCanvas);
		this.point2.draw(myCanvas);
	}

}
class Figure{
	constructor(array){
    var i;
		this.arrayOfLines = new Array(1);
		if(array.arrayLength=array.length){
			for(i=0;i<array.arrayLength;i++){
				this.arrayOfLines[i] = array[i];
			}
		}
		else{
			var number = 0;
			for(i=0;i<array.length;i+=n){
				this.arrayOfLines[number] = new Line(array[i],array[i+1],array[i+2],array[i+3]);
				number++;
			}
			this.arrayOfLines[number] = new Line(array[0],array[1],array[array.length-1],array[array.length-2]);
		}
	}
	draw(myCanvas){
		var i;
		for(i=0;i<this.arrayOfLines.length;i++){
				this.arrayOfLines[i].draw(myCanvas);
				this.arrayOfLines[i].draw(myCanvas);
			}
	}
	getPeri(){
		var i;var sum=0;
		for(i=0;i<this.arrayOfLines.length;i++){
				sum+=this.arrayOfLines[i].getLength();
			}
			return (sum);
	}
}



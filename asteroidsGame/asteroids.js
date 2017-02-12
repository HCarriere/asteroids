
var canvas, ctx;

$(document).ready(function(){

	init();

});

var fps = {	
	startTime : 0,	
	frameNumber : 0,	
	get : function(){		
		this.frameNumber++;		
		var d = new Date().getTime(),			
			currentTime = ( d - this.startTime ) / 1000,			
			result =  this.frameNumber / currentTime ;		
		if( currentTime > 1 ){			
			this.startTime = new Date().getTime();			
			this.frameNumber = 0;		
		}		
		return result;	
	}
};

																		   
function init(){
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	window.addEventListener('mousedown', mousePressed);
	window.addEventListener('mouseup', mouseReleased);
	window.addEventListener('mousemove', mouseDragged);
	window.addEventListener('keypress', keyPressed);
	window.onresize = resizeCanvas;
	width = canvas.width = (window.innerWidth);
	height = canvas.height = (window.innerHeight);
	resizeCanvas();

	render();

}

////////////// main loop /////////////
function render(){
	ctx.clearRect(0,0,width,height);
	
	ctx.fillText("fps:"+Math.floor(fps.get()),1,10);
	
	requestAnimationFrame(render);
}


//////////////inputs/////////////////////

//e.offsetX
//e.offsetY
function mousePressed(e) {
	
}
function mouseReleased(e) {
	
}
function mouseDragged(e) {
	
}
//e.charCode
function keyPressed(e){
	console.log(e.charCode)
}

///////////////// resize /////////////////
function resizeCanvas() {
	width = canvas.width = (window.innerWidth);
	setTimeout(function() {
	height = canvas.height = (window.innerHeight);
	}, 0);
};
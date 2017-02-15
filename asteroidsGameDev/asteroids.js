
var canvas, ctx, mouseX, mouseY;


function getEvents(){
    var events = [];
    events["ckey"] = {
        onReceive : function(data){
            console.log("ckey : "+data)
        }
    }
    events["cmouse"] = {
        onReceive : function(data){
            console.log("cmouse : "+data)
        }
    }
    events["console"] = {
        onReceive : function(data){
            output.write(data)
        }
    }
    return events;
}

$(document).ready(function(){
    sockets.init(getEvents());
    
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
    
    //begin with screen :
    screenBuild.fetchScreen("home");
    
	render();

}

////////////// main loop /////////////
function render(){
	ctx.clearRect(0,0,width,height);
	ctx.fillStyle = "#fff";
    var vfps = fps.get();
	ctx.fillText("fps:"+Math.floor(vfps)+" ("+Math.floor(vfps*100/60)+"%)",1,10);
	output.show(1,20);
    
//    ctx.fillStyle = "#ff0000";
//    ctx.fillRect(mouseX,mouseY,10,10);
    
	requestAnimationFrame(render);
}


//////////////inputs/////////////////////
var output = {
    history : [],
    
    write : function(message){
        this.history.push(message);
        if(this.history.length > 40){
            console.log(this.history.shift())
        }
    },
    
    show : function(x,y){
        for(var i = 0; i<this.history.length; i++){
            ctx.fillText(this.history[i], x,y+10*i);
        }
    }
}

//e.offsetX
//e.offsetY
function mousePressed(e) {
	sockets.emit('mouse',null,e.offsetX);
}
function mouseReleased(e) {
	
}
function mouseDragged(e) {
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }	
}
//e.charCode
function keyPressed(e){
	//console.log(e.charCode)
    sockets.emit('key',null,e.charCode);
}

///////////////// resize /////////////////
function resizeCanvas() {
	width = canvas.width = (window.innerWidth);
	setTimeout(function() {
	height = canvas.height = (window.innerHeight);
	}, 0);
};
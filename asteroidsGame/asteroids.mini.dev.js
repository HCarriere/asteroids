function getEvents(){var e=[];return e.ckey={onReceive:function(e){console.log("ckey : "+e)}},e.cmouse={onReceive:function(e){console.log("cmouse : "+e)}},e}function init(){canvas=document.getElementsByTagName("canvas")[0],ctx=canvas.getContext("2d"),window.addEventListener("mousedown",mousePressed),window.addEventListener("mouseup",mouseReleased),window.addEventListener("mousemove",mouseDragged),window.addEventListener("keypress",keyPressed),window.onresize=resizeCanvas,width=canvas.width=window.innerWidth,height=canvas.height=window.innerHeight,resizeCanvas(),render()}function render(){ctx.clearRect(0,0,width,height),ctx.fillStyle="#fff",ctx.fillText("fps:"+Math.floor(fps.get()),1,10),requestAnimationFrame(render)}function mousePressed(e){sockets.emit("mouse",null,e.offsetX)}function mouseReleased(e){}function mouseDragged(e){}function keyPressed(e){sockets.emit("key",null,e.charCode)}function resizeCanvas(){width=canvas.width=window.innerWidth,setTimeout(function(){height=canvas.height=window.innerHeight},0)}var canvas,ctx;$(document).ready(function(){init(),sockets.init(getEvents())});var fps={startTime:0,frameNumber:0,get:function(){this.frameNumber++;var e=(new Date).getTime(),t=(e-this.startTime)/1e3,n=this.frameNumber/t;return t>1&&(this.startTime=(new Date).getTime(),this.frameNumber=0),n}},sockets={socket:null,init:function(e){socket=io(),socket.on("event",function(t){e[t.header].onReceive(t.data)})},emit:function(e,t,n){socket.emit("event",{header:e,context:t,data:n})}};
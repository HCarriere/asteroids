function init(){canvas=document.getElementsByTagName("canvas")[0],ctx=canvas.getContext("2d"),window.addEventListener("mousedown",mousePressed),window.addEventListener("mouseup",mouseReleased),window.addEventListener("mousemove",mouseDragged),window.addEventListener("keypress",keyPressed),window.onresize=resizeCanvas,width=canvas.width=window.innerWidth,height=canvas.height=window.innerHeight,resizeCanvas(),render()}function render(){ctx.clearRect(0,0,width,height),ctx.fillText("fps:"+Math.floor(fps.get()),1,10),requestAnimationFrame(render)}function mousePressed(e){}function mouseReleased(e){}function mouseDragged(e){}function keyPressed(e){console.log(e.charCode)}function resizeCanvas(){width=canvas.width=window.innerWidth,setTimeout(function(){height=canvas.height=window.innerHeight},0)}var canvas,ctx;$(document).ready(function(){init()});var fps={startTime:0,frameNumber:0,get:function(){this.frameNumber++;var e=(new Date).getTime(),n=(e-this.startTime)/1e3,t=this.frameNumber/n;return n>1&&(this.startTime=(new Date).getTime(),this.frameNumber=0),t}};console.log("coucou");
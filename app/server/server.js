const conf = require('../../config')
var events = require('./events')

function init(server){
	var io = require('socket.io')(server);
	
    
	
	io.sockets.on('connection', function(socket){
		onConnect(socket);
		//SESSION ON
		
//		socket.on('',function(data){
//		});
        
        for(var i = 0; i<events.events.length; i++){
            
            console.log(events.events[i]);
            socket.on(events.events[i].header, events.events[i].onReceive);
            
        }
        
		//SESSION OFF
		socket.on('disconnect', function(){
			onDisconnect(socket);
		});
	});
	io.listen(conf.socket.port);
	console.log("socket.io launched on "+conf.socket.port)
}



function onConnect(socket){
	
}

function onDisconnect(socket){
	
}





//////////////////////////////////////

module.exports = {
    init
}

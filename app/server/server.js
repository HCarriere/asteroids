const conf = require('../../config')


function init(server){
	var io = require('socket.io')(server);
	
	
	io.sockets.on('connection', function(socket){
		onConnect(socket);
		//SESSION ON
		
		socket.on('message',function(data){
            io.emit('message', response);
		});

		//SESSION OFF
		socket.on('disconnect', function(){
			onDisconnect(socket);
		});
	});
	io.listen(conf.chat.port);
	console.log("socket.io launched on "+conf.chat.port)
}



function onConnect(socket){
	
}

function onDisconnect(socket){
	
}





//////////////////////////////////////

module.exports = {
    init
}

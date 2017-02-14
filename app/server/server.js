const conf = require('../../config')
var events = require('./events').getEvents();

var io;

function init(server){
	io = require('socket.io')(server);
	
    
	io.sockets.on('connection', function(socket){
		onConnect(socket);
		//SESSION ON
		
        socket.on("event", function(message){
            events[message.header].onReceive(message.data, socket);
        });
        
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

/**
emit to the specified client.
message contains : header,data
*/
function emitToClient(client,message) {
    client.emit('event', message);
}
/**
emit to all the clients contained in the room.
*/
function emitToRoom(roomName,message){
    
}
/**
emit to everyone connected (use with care?).
*/
function broadcast(message){
    io.emit('ckey', message)
}


//////////////////////////////////////

module.exports = {
    init,
    emitToClient,
    emitToRoom,
    broadcast
}

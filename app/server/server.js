const conf = require('../../config')
var events = require('./events').getEvents();

var io;

function init(server){
	io = require('socket.io')(server);
	
    
	io.sockets.on('connection', function(socket){
		onConnect(socket);
		//SESSION ON
		
        socket.on("event", function(message){
            logMsg('event : '+JSON.stringify(message));
            events[message.header].onReceive(message.data, socket);
        });
        
		//SESSION OFF
		socket.on('disconnect', function(){
			onDisconnect(socket);
		});
	});
    
    
    
	io.listen(conf.socket.port);
	logMsg("socket.io launched on "+conf.socket.port)
}



function onConnect(socket){
	logMsg('client '+socket.id+' connected');
}

function onDisconnect(socket){
	logMsg('client '+socket.id+' disconnected');
}

/**
emit to the specified client.
message contains : header,data
*/
function emitToClient(client,message) {
    client.emit('event', message);
}
/**
emit to all the clients contained in the room
*/
function emitToRoom(roomName, message){
    io.sockets.in(roomName).emit('event',message);
}

function emitToOthersInRoom(client, roomName, message){
    socket.to(roomName).emit('event', message);
}
/**
emit to everyone connected (use with care?).
*/
function broadcast(message){
    io.emit('event', message)
}

function joinRoom(client, roomName, callback) {
    if(callback){
        client.join(roomName, callback);
    }else{
        client.join(roomName, function(){
            logMsg(client.id+' joined room '+roomName)
        });
    }
}

function leaveRoom(client, roomName, callback) {
    if(callback){
        client.leave(roomName, callback);
    }else{
        client.leave(roomName, function(){
            logMsg(client.id+' leaved room '+roomName)
        });
    }
}

//////////////////////////////////////


module.exports = {
    init,
    emitToClient,
    emitToRoom,
    emitToOthersInRoom,
    broadcast,
    joinRoom,
    leaveRoom
}



////////////////////////////////////

function logMsg(message){
    if(conf.socket.verbose){
        console.log(message)
    }
}
const conf = require('../../config')
const front = require('../front')
var events = require('./events').getEvents();

var clients = [];
var mouses = [];

var io;

function init(server){
	io = require('socket.io')(server);
	
    
	io.sockets.on('connection', function(socket){
		onConnect(socket);
		//SESSION ON
		
        socket.on("event", function(message){
            //logMsg('event : '+JSON.stringify(message));
            events[message.header].onReceive(message.data, socket, io);
        });
        
        socket.on("screenInfo", function(message) {
            logMsg('screenInfo : '+JSON.stringify(message));
            if(message.data){
                var screen = front.getScreenInfos(message.data);
                sendScreenToClient(socket,message.data, screen, function(clientAck){
                    logMsg("client "+socket.id+" received screen with response : "+clientAck)
                })
            }
        });
        
		//SESSION OFF
		socket.on('disconnect', function(){
			onDisconnect(socket);
		});
	});
    
    
    
	io.listen(conf.socket.port);
	logMsg("socket.io launched on "+conf.socket.port);
    
    
    /////////// LOOPS ///////////
    setInterval(function (){
        updateGameState();
    },166);
}

function updateGameState(){
  
    io.emit('event',({header:'mouseDragged', 
                      data: {
                          mouses : mouses,
                          clients : clients
                      }
                     }));
    
}

function updateClientMouse(client, mouse) {
    
    if(!mouses[client.id]){
        mouses[client.id] = {
            x:0,
            y:0
        }
        clients.push(client.id);
    }
    mouses[client.id].x = mouse.x;
    mouses[client.id].y = mouse.y;
    console.log(JSON.stringify(client))
}
////// EVENTS //////

function onConnect(socket){
	logMsg('client '+socket.id+' connected');
}

function onDisconnect(socket){
	logMsg('client '+socket.id+' disconnected');
}


function sendScreenToClient(client, id, data, callback){
    client.emit('screenInfo', {
        header:id,
        data:data
    }, callback);
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

function emitToRoomExceptSelf(client, roomName, message){
    client.to(roomName).emit('event', message);
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
    emitToRoomExceptSelf,
    broadcast,
    joinRoom,
    leaveRoom,
    updateClientMouse
}



////////////////////////////////////

function logMsg(message){
    if(conf.socket.verbose){
        console.log(message)
    }
//    //for the lolz
//    broadcast({
//        header:'console',
//        data:message
//    })
}
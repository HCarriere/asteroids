var server = require('./server')

module.exports = {
	init: server.init,
    broadcast : server.broadcast,
    emitToClient: server.emitToClient,
    emitToRoom: server.emitToRoom,
    emitToRoomExceptSelf : server.emitToRoomExceptSelf,
    joinRoom: server.joinRoom,
    leaveRoom: server.leaveRoom
}
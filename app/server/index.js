var server = require('./server')

module.exports = {
	init: server.init,
    broadcast : server.broadcast,
    emitToClient: server.emitToClient,
    emitToRoom: server.emitToRoom,
    emitToOthersInRoom : server.emitToOthersInRoom,
    joinRoom: server.joinRoom,
    leaveRoom: server.leaveRoom
}
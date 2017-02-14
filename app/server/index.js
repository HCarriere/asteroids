var server = require('./server')
var events = require('./events')

module.exports = {
	init: server.init,
    broadcast : server.broadcast,
    events : events.getEvents
}
var server = require('./server')
var events = require('./events')

module.exports = {
	init: server.init,
    events : events.events
}
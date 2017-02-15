

var sockets = {
    socket : null,

    init : function(events){
        this.socket = io();

        this.socket.on('event', function(message) {
            events[message.header].onReceive(message.data);
        });
        
        this.socket.on('screenInfo', function(message, ack) {
            console.log("received screen info : " + JSON.stringify(message))
            ack("client received a screen ! ");
        });
    },
    
    //regular events
    emit : function(header, context, data){
        this.socket.emit('event', {
            header:header,
            context:context,
            data:data
        });
    },
    
    //special : screen informations
    fetchScreen : function(id) {
        this.socket.emit('screenInfo', {
            data:id
        });
    }
}



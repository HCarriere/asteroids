

var sockets = {
    socket : null,
    init : function(events){
        socket = io();
//        socket.on('a', function (data) {
//            console.log('received  : '+data);
//        });
//        for(var i = 0; i<events.length; i++){
//            socket.on(events[i].header, events[i].onReceive);
//        }
        socket.on('event', function(message) {
            events[message.header].onReceive(message.data);
        });
    },
    emit : function(header, context, data){
        socket.emit('event', {
            header:header,
            context:context,
            data:data
        });
    }
}



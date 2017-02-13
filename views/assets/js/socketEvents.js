

var sockets = {
    socket : null,
    init : function(){
        socket = io();
        socket.on('a', function (data) {
            console.log('received  : '+data);
        });
    },
    emit : function(header, context, data){
        socket.emit(header, {
            context:context,
            data:data
        });
    }
}



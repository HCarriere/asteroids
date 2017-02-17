
function getEvents(){
    var events = [];
    events["ckey"] = {
        onReceive : function(data){
            output.write("ckey : "+data)
        }
    }
    events["cmouse"] = {
        onReceive : function(data){
            output.write("cmouse : "+data)
        }
    }
    events["console"] = {
        onReceive : function(data){
            output.write(data)
        }
    }
    events["mouseDragged"] = {
        onReceive : function(data){
            mouses = data.mouses;
        }
    }
    return events;
}

//////////////////////////////////////////////////////////


var sockets = {
    socket : null,

    init : function(events){
        this.socket = io();

        this.socket.on('event', function(message) {
            events[message.header].onReceive(message.data);
        });
        
        this.socket.on('screenInfo', function(message, ack) {
            screenBuild.addScreen(message.header,message.data);
            ack("OK");
        });
        
        this.socket.on('disconnected', function(){
            output.write('disconnected from server')
        })
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




//recu par le serveur, envoyé depuis le client. 
//"Thou shall always verify user input"

function getEvents(){
    var events = [];
    events["mouse"] = {
        onReceive : function(data, client, io){
//            console.log("mouse : "+data);
//            require('./server').emitToClient(client, {
//                header:'cmouse',
//                data:'yousentme'+data
//            })
            
        }
    };
    events["key"] = {
        onReceive : function(data, client, io){
//            console.log("key : "+data);
        }
    };
    events["mouseDragged"] = {
        onReceive : function(data, client, io){
            //console.log(client.id+" : "+data.x+" - "+data.y);
            require('./server').updateClientMouse(client, data);
        }
    };
    return events;
}


module.exports = {
    getEvents
}
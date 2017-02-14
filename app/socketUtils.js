
/*
.ajout client : addClient("clientid")
.Un client peux rejoindre(join)/quitter(leave) une room : clients["clientid"].join("roomid")
.On peux requeter les room dans lequel le client est : clients["clienid"].rooms();

.ajout room : addRoom("roomid")
.On peux requeter les room pour avoir leurs clients : rooms["roomid"].clients();
*/
var clients, rooms;


//clients

function addClient(clientId) {
    clients[clientId] = {
        clientId : clientId,
        roomsIn : [],
        join : function(roomId) {
            rooms[roomId].add(clientId);
            roomsIn.push(roomId);
        },
        leave : function(roomId) {
            rooms[roomId].remove(clientId);
            roomsIn.pop(roomId);
        },
        rooms : function(){
            return roomsIn;
        }
    };
}

function removeClient(clientId) {
    clients[clientId] = null;
}


//rooms

function addRoom(roomId) {
    rooms[roomId] = {
        roomId : roomId,
        clientsIn : [],
        add : function(){
            clientsIn : 
        },
        remove : function(){
            
        }
    };
}

function removeRoom(roomId){
    rooms[roomId] = null;
}

//export
module.exports = {
    addClient,
    addRoom,
    clients,
    rooms
}
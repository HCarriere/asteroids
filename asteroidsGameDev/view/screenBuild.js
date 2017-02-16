/*
utilities to build the screen : 
-verify that the screen is loaded
-if not, ask the screen to server
-wait the server for the screen (callback)
-store the screen, so that client don't have to ask it again
*/

var screenBuild = {
    loadedScreens : [],
    
    addScreen : function(id,data) {
        output.write("screen <"+id+"> stored. ("+JSON.stringify(data)+")")
        this.loadedScreens[id] = data;
    },
    fetchScreen : function(id) {
        if(this.isScreenLoaded) {
            sockets.fetchScreen(id);
        }
    },
    isScreenLoaded : function(id) {
        if(this.loadedScreens[id]) {
            return true;
        } else {
            return false;
        }
    }
}



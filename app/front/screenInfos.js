var screens = [];

screens["home"] = {
    data : ""
};
screens["none"] = {
    
};

function getScreenInfo(id){
    return screens[id];
}


module.exports = {
    getScreenInfo
}
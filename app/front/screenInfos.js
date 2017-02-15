var screens = [];
screens["home"] = {
    data:"coucou home!"
};

function getScreenInfo(id){
    return screens[id];
}


module.exports = {
    getScreenInfo
}
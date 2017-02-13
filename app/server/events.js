var events = [
    {
        header:"key",
        onReceive:function( data){
            //default   
            console.log("key"+data.data);
        }
    },
    
    {
        header:"mouse",
        onReceive:function( data){
            //default   
            console.log("mouse"+data.data);
        }
    }
];

module.exports = {
    events
}
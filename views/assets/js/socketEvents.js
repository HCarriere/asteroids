// scr="/js/socket.io.min.js"
$(document).ready(function(){

	var socket = io();

	socket.on('message', function (data) {
		
	});

});

function emit(){
    socket.emit('message', {
        /*message:$('#message').val(),
        author:$('#message_author').val(),
        keyAuth:$('#message_keyauth').val()*/
    });
}



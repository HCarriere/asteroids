$(document).ready(function() {
    $('html, body').css('overflowY', 'auto'); 
    var win = $(window);

    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() == win.scrollTop()) {
            
            $('#roulette').append(getPosts());
            console.log("coucou")
        }
    });
});

function getPosts(){
    return $("#roulette").html();
}
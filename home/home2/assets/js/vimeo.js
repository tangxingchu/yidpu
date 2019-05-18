/* ======= Animations ======= */
$(document).ready(function() {
    /* ======= Auto play Vimeo in Bootstrpa Modal ======= */
    
    /* Vimeo API: http://developer.vimeo.com/player/js-api */
    // http://stackoverflow.com/questions/24952984/play-and-stop-vimeo-video-placed-in-bootstrap-modal
    
    var iframe = document.getElementById('vimeo-video');
    // $f == Froogaloop
    var player = $f(iframe);
    
    $('#modal-video').on('hidden.bs.modal', function () {
        player.api('pause');
    });
    
    $('#modal-video').on('shown.bs.modal', function () {
        player.api('play');
    });
            
});
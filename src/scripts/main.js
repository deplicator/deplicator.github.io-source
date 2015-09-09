$(document).ready(function() {

    // Redirect users to https.
    if (window.location.protocol != 'https:') {
        window.location.protocol = 'https:';
    }

    // Reconbobulate html structure around aticle images.
    $('img').each(function() {
        $(this).parent().append('<div class="image-caption"/>');
        $(this).parent().find('.image-caption').html('<div>' + $(this).prop('title') + '</div>')
        $(this).parent().find('.image-caption').prepend($(this));
    });
});


// Opoen large image modal when click on an image.
$('img').on('click', function() {
    $('#large-image-modal .modal-title').html($(this).prop('alt'));
    $('#large-image-modal .modal-body').html('<img src="' + $(this).prop('src') + '"></img>');
    $('#large-image-modal .modal-body').append('<p>' + $(this).prop('title') + '</p>');
    $('#large-image-modal').modal('show');
});

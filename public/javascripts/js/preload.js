<!-----------------panreloader-----------------script-------------->
$(window).on('load', function() { // makes sure the whole site is loaded 
    $('#preloader').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(500).css({ 'overflow-x': 'hidden' });
})

<!-----------------pannel-----------------script-------------->
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('ion-android-arrow-down  ion-android-arrow-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);
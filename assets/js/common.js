$(function() {
	smoothScroll(700);
  mobileNav();
});

function mobileNav() {
	// Open Menu Mobile
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });

	// Close Menu Mobile if link is clicked
	$('.menu-link').click(function(){
		$('#mobile-nav, .mobile-nav-toggle').toggleClass('is-open');
	});

}

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, duration);
				return false;
	    }
	});
}

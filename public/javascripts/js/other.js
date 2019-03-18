
(function ($) {

	"use strict";



	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-1').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1000, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				arrows: {
					enable: true,
					style: "zeus",
					hide_onleave: false,
					left: {
						container: 'slider',
						h_align: 'left',
						v_align: 'center',
						h_offset: 163,
						v_offset: 120
					},
					right: {
						container: 'slider',
						h_align: 'left',
						v_align: 'center',
						h_offset: 220,
						v_offset: 120
					}
				},
				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "dione",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "middle",
					h_offset: 180,
					v_offset: 30,
					space: -50,
					tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-2').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1000, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {


				thumbnails: {
					style: "hesperiden",
					enable: true,
					width: 170,
					height: 100,
					min_width: 170,
					wrapper_padding: 5,
					wrapper_color: "transparent",
					wrapper_opacity: "1",
					tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span>',
					visibleAmount: 5,
					hide_onmobile: true,
					hide_onleave: false,
					direction: "horizontal",
					span: false,
					position: "inner",
					space: 0,
					h_align: "right",
					v_align: "bottom",
					h_offset: 0,
					v_offset: 80
				},
				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "hesperiden",
					hide_onleave: false,
					direction: "vertical",
					h_align: "left",
					v_align: "top",
					h_offset: 0,
					v_offset: 200,
					space: -10,
					tmp: '<span class="tp-tab-date">{{param1}}</span><span class="tp-tab-date in">{{param2}}</span> <span class="tp-tab-date in">{{param3}}</span>'
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-3').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1000, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "ares",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "center",
					h_offset: 20,
					v_offset: 260,
					space: -10,
					tmp: '<span class="tp-tab-date">{{param1}}</span><span class="tp-tab-date in">{{param2}}</span> <span class="tp-tab-date in">{{param3}}</span>'
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-3-1').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			visibilityLevels: [1240, 1024, 778, 480],
			gridwidth: 1240,
			gridheight: 700,
			lazyType: "none",
			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				parallax: {
					type: "3D",
					origo: "slidercenter",
					speed: 2000,
					levels: [5, 10, 20, 30, 25, 30, 35, 40, 45, 50, 47, 48, 49, 50, 51, 55],
					type: "3D",
					ddd_shadow: "off",
					ddd_bgfreeze: "off",
					ddd_overflow: "hidden",
					ddd_layer_overflow: "visible",
					ddd_z_correction: 65,
				},
				spinner: "off",
				autoHeight: "off",
				disableProgressBar: "on",
				hideThumbsOnMobile: "off",
				hideSliderAtLimit: 0,
				hideCaptionAtLimit: 0,
				hideAllCaptionAtLilmit: 0,
				debugMode: false,
				fallbacks: {
					simplifyAll: "off",
					disableFocusListener: false,
				}


			}
		});
	});


	/*revolution-setting-js--------------------------*/

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-5').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [850, 850, 800, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "hades",
					hide_onleave: false,
					direction: "horizontal",
					h_align: "right",
					v_align: "middle",
					h_offset: 180,
					v_offset: 30,
					space: -50,
					tmp: ''
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/


	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-4').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [950, 950, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {


				bullets: {
					enable: true,
					hide_onmobile: false,
					style: "dione",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "middle",
					h_offset: 180,
					v_offset: 30,
					space: -50,
					tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-6').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			visibilityLevels: [957, 700, 550, 480],
			gridwidth: 900,
			gridheight: 957,
			lazyType: "none",
			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				thumbnails: {
					style: "hesperiden",
					enable: true,
					width: 170,
					height: 100,
					min_width: 170,
					wrapper_padding: 5,
					wrapper_color: "transparent",
					wrapper_opacity: "1",
					tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span>',
					visibleAmount: 5,
					hide_onmobile: true,
					hide_onleave: false,
					direction: "horizontal",
					span: false,
					position: "inner",
					space: 0,
					h_align: "right",
					v_align: "bottom",
					h_offset: 0,
					v_offset: 80
				},

				parallax: {
					type: "3D",
					origo: "slidercenter",
					speed: 2000,
					levels: [5, 10, 20, 30, 25, 30, 35, 40, 45, 50, 47, 48, 49, 50, 51, 55],
					type: "3D",
					ddd_shadow: "off",
					ddd_bgfreeze: "off",
					ddd_overflow: "hidden",
					ddd_layer_overflow: "visible",
					ddd_z_correction: 65,
				},
				spinner: "off",
				autoHeight: "off",
				disableProgressBar: "on",
				hideThumbsOnMobile: "on",
				hideSliderAtLimit: 0,
				hideCaptionAtLimit: 0,
				hideAllCaptionAtLilmit: 0,
				debugMode: false,
				fallbacks: {
					simplifyAll: "off",
					disableFocusListener: false,
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-6-1').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			visibilityLevels: [1240, 1170, 670, 480],
			gridwidth: 900,
			gridheight: 870,
			lazyType: "none",
			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				thumbnails: {
					style: "hesperiden",
					enable: true,
					width: 170,
					height: 100,
					min_width: 170,
					wrapper_padding: 5,
					wrapper_color: "transparent",
					wrapper_opacity: "1",
					tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span>',
					visibleAmount: 5,
					hide_onmobile: true,
					hide_onleave: false,
					direction: "horizontal",
					span: false,
					position: "inner",
					space: 0,
					h_align: "right",
					v_align: "bottom",
					h_offset: 0,
					v_offset: 80
				},

				parallax: {
					type: "3D",
					origo: "slidercenter",
					speed: 2000,
					levels: [5, 10, 20, 30, 25, 30, 35, 40, 45, 50, 47, 48, 49, 50, 51, 55],
					type: "3D",
					ddd_shadow: "off",
					ddd_bgfreeze: "off",
					ddd_overflow: "hidden",
					ddd_layer_overflow: "visible",
					ddd_z_correction: 65,
				},
				spinner: "off",
				autoHeight: "off",
				disableProgressBar: "on",
				hideThumbsOnMobile: "on",
				hideSliderAtLimit: 0,
				hideCaptionAtLimit: 0,
				hideAllCaptionAtLilmit: 0,
				debugMode: false,
				fallbacks: {
					simplifyAll: "off",
					disableFocusListener: false,
				},


			}
		});
	});


	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-7-1').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1080, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: true,
					style: "zeus",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "center",
					h_offset: 50,
					v_offset: 35,
					space: -50,
					tmp: ''
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/


	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-7-2').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1080, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: true,
					style: "zeus",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "center",
					h_offset: 50,
					v_offset: 35,
					space: -50,
					tmp: ''
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/


	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-7-3').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [1080, 1000, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: true,
					style: "zeus",
					hide_onleave: false,
					direction: "vertical",
					h_align: "right",
					v_align: "center",
					h_offset: 50,
					v_offset: 35,
					space: -50,
					tmp: ''
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/


	/*revolution-setting-js--------------------------*/

	/* https://learn.jquery.com/using-jquery-core/document-ready/ */
	jQuery(document).ready(function () {

		/* initialize the slider based on the Slider's ID attribute from the wrapper above */
		jQuery('#slider-8').show().revolution({
			parallax: {
				type: 'mouse+scroll',
				origo: 'slidercenter',
				speed: 400,
				levels: [5, 10, 15, 20, 25, 30, 35, 40,
					45, 46, 47, 48, 49, 50, 51, 55
				],
				disable_onmobile: 'on'
			},

			/* options are 'auto', 'fullwidth' or 'fullscreen' */
			sliderLayout: 'auto',
			/* RESPECT ASPECT RATIO */
			minHeight: '500',
			responsiveLevels: [1600, 1170, 778, 480],
			visibilityLevels: [1600, 1170, 778, 480],
			gridwidth: [1600, 1170, 778, 480],
			gridheight: [900, 900, 900, 700],

			/* basic navigation arrows and bullets */

			/* basic navigation arrows and bullets */
			navigation: {

				bullets: {
					enable: true,
					hide_onmobile: true,
					style: "hebe",
					hide_onleave: false,
					direction: "vertical",
					h_align: "left",
					v_align: "center",
					h_offset: 45,
					v_offset: 35,
					space: 40,
					tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
				},


			}
		});
	});

	/*revolution-setting-js--------------------------*/



	
	
	 /*-----------------------back-to-top-------------*/
$(window).scroll(function(){
	if ($(this).scrollTop() > 300) {
      $("#back-to-top").fadeIn('600');
	}else{
      $("#back-to-top").fadeOut('700');
	}
});
$(document).ready(function() {
	$("#back-to-top").on("click", function(){
	   $('html, body').animate({scrollTop: 0}, 1200);
	});
});
  /*-----------------------back-to-top-------------*/

	/*------------------shop-detail review product tab slide script------------------*/
	$(document).ready(function () {

		(function ($) {
			$('.review-product ul.review-product-link').addClass('active').find('> li:eq(0)').addClass('current');

			$('.review-product ul.review-product-link li a').click(function (g) {
				var tab = $(this).closest('.review-product'),
					index = $(this).closest('li').index();

				tab.find('ul.review-product-link > li').removeClass('current');
				$(this).closest('li').addClass('current');

				tab.find('.review-product-content').find('div.review-product-item').not('div.review-product-item:eq(' + index + ')').slideUp();
				tab.find('.review-product-content').find('div.review-product-item:eq(' + index + ')').slideDown();

				g.preventDefault();
			});
		})(jQuery);

	});
	/*------------------shop-detail review product tab slide script end------------------*/
	/*-------------------popup-home-8------------*/
	$(document).ready(function () {

		var id = '#dialog';

		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();

		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({
			'width': maskWidth,
			'height': maskHeight
		});

		//transition effect		
		$('#mask').fadeIn(1000);
		$('#mask').fadeTo("slow", 0.8);

		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();

		//Set the popup window to center
		$(id).css('top', winH / 2 - $(id).height() / 2);
		$(id).css('left', winW / 2 - $(id).width() / 2);

		//transition effect
		$(id).fadeIn(2000);

		//if close button is clicked
		$('.window .close').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();

			$('#mask').hide();
			$('.window').hide();
		});

		//if mask is clicked
		$('#mask').click(function () {
			$(this).hide();
			$('.window').hide();
		});

	});
	/*-------------------popup-home-8------------*/
	 
	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.product-deal-in').owlCarousel({
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1200: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.header-carousel').owlCarousel({
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1200: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.mordern-designer-in').owlCarousel({
			loop: true,
			margin: 0,

			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1200: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});


	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.updates-in').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 3,
					nav: true
				},
				800: {
					items: 4,
					nav: false
				},
				1000: {
					items: 5,
					nav: true,
					loop: false,

				},
				1400: {
					items: 7,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.h2-deal').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1000: {
					items: 1,
					nav: true,
					loop: false,

				},
				1400: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});
	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.h2-month-deal').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1000: {
					items: 1,
					nav: true,
					loop: false,

				},
				1400: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});


	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.h5-wel-right').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1000: {
					items: 1,
					nav: true,
					loop: false,

				},
				1400: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});


	/*---owl-arousel----*/
	$(document).ready(function () {
		$('.h5-wel-left').owlCarousel({
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1000: {
					items: 1,
					nav: true,
					loop: false,

				},
				1400: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*----client-testimonial-h4---*/

	$(document).ready(function () {
		$('.client-testimonial-h4').owlCarousel({
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1000: {
					items: 1,
					nav: true,
					loop: false,

				},
				1400: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});
	/*----logo-h4---*/

	$(document).ready(function () {
		$('.logo-carosel').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 3,
					nav: true
				},
				800: {
					items: 5,
					nav: false
				},
				1000: {
					items: 6,
					nav: true,
					loop: false,

				},
				1400: {
					items: 8,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*----bundle-product---*/

	$(document).ready(function () {
		$('.bundle-pro').owlCarousel({
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 2,
					nav: true
				},
				800: {
					items: 3,
					nav: false
				},
				1200: {
					items: 5,
					nav: true,
					loop: false,

				},
				1600: {
					items: 6,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*---shop-review-product---*/

	$(document).ready(function () {
		$('.shop-details-review').owlCarousel({
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 2,
					nav: true
				},
				800: {
					items: 3,
					nav: false
				},
				1200: {
					items: 3,
					nav: true,
					loop: false,

				},
				1600: {
					items: 3,
					nav: true,
					loop: false,

				}
			}
		});
	});

	/*---blog-details---*/

	$(document).ready(function () {
		$('.blog-details-carousel').owlCarousel({
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 1,
					nav: true
				},
				800: {
					items: 1,
					nav: false
				},
				1200: {
					items: 1,
					nav: true,
					loop: false,

				},
				1600: {
					items: 1,
					nav: true,
					loop: false,

				}
			}
		});
	});




	/*------counting days and time-----*/

	function makeTimer() {

		var endTime = new Date("april 26, 2019 12:00:00 PDT");
		var endTime = (Date.parse(endTime)) / 1000;

		var now = new Date();
		var now = (Date.parse(now) / 1000);

		var timeLeft = endTime - now;

		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") {
			hours = "0" + hours;
		}
		if (minutes < "10") {
			minutes = "0" + minutes;
		}
		if (seconds < "10") {
			seconds = "0" + seconds;
		}

		$("#days").html(days + "");
		$("#hours").html(hours + "");
		$("#minutes").html(minutes + "");
		$("#seconds").html(seconds + "");

	}

	setInterval(function () {
		makeTimer();
	}, 1000);

	/*=======Countdown JS===========*/


	const countdown = new Date("May 7, 2019");

	function getRemainingTime(endtime) {
		const milliseconds = Date.parse(endtime) - Date.parse(new Date());
		const seconds = Math.floor((milliseconds / 1000) % 60);
		const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
		const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
		const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

		return {
			'total': milliseconds,
			'seconds': seconds,
			'minutes': minutes,
			'hours': hours,
			'days': days,
		};
	}

	function initClock(id, endtime) {
		const counter = document.getElementById(id);
		const daysItem = counter.querySelector('.js-countdown-days');
		const hoursItem = counter.querySelector('.js-countdown-hours');
		const minutesItem = counter.querySelector('.js-countdown-minutes');
		const secondsItem = counter.querySelector('.js-countdown-seconds');

		function updateClock() {
			const time = getRemainingTime(endtime);

			daysItem.innerHTML = time.days;
			hoursItem.innerHTML = ('0' + time.hours).slice(-2);
			minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
			secondsItem.innerHTML = ('0' + time.seconds).slice(-2);

			if (time.total <= 0) {
				clearInterval(timeinterval);
			}
		}

		updateClock();
		const timeinterval = setInterval(updateClock, 1000);
	}

	initClock('js-countdown', countdown);


	<!-- smooth-scrolling-of-move-up -->

	$(document).ready(function () {
		/*
		var defaults = {
		    containerID: 'toTop', // fading element id
		    containerHoverID: 'toTopHover', // fading element hover id
		    scrollSpeed: 1200,
		    easingType: 'linear' 
		};
		*/

		$().UItoTop({
			easingType: 'easeOutQuart'
		});

	});


	/*---active-li-items----*/

	$('ul li').click(function () {
		$('.current').removeClass('current');
		$(this).addClass('current');
	});
	
	


	/*-----price-filter--*/
	var lowerSlider = document.querySelector('#lower');
	var upperSlider = document.querySelector('#upper');

	document.querySelector('#two').value = upperSlider.value;
	document.querySelector('#one').value = lowerSlider.value;

	var lowerVal = parseInt(lowerSlider.value);
	var upperVal = parseInt(upperSlider.value);

	upperSlider.oninput = function () {
		lowerVal = parseInt(lowerSlider.value);
		upperVal = parseInt(upperSlider.value);

		if (upperVal < lowerVal + 4) {
			lowerSlider.value = upperVal - 4;
			if (lowerVal == lowerSlider.min) {
				upperSlider.value = 4;
			}
		}
		document.querySelector('#two').value = this.value
	};

	lowerSlider.oninput = function () {
		lowerVal = parseInt(lowerSlider.value);
		upperVal = parseInt(upperSlider.value);
		if (lowerVal > upperVal - 4) {
			upperSlider.value = lowerVal + 4;
			if (upperVal == upperSlider.max) {
				lowerSlider.value = parseInt(upperSlider.max) - 4;
			}
		}
		document.querySelector('#one').value = this.value
	};


})(window.jQuery);


/*---shop-page-customize----*/

function openNav() {
	document.getElementById("category").style.width = "270px";
}

function closeNav() {
	document.getElementById("category").style.width = "0";
}

/*---shop-page-cart----*/

function openCart() {
	document.getElementById("cart").style.width = "400px";
}

function closeCart() {
	document.getElementById("cart").style.width = "0";
}


function increaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('number').value = value;
}

function decreaseValue() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	document.getElementById('number').value = value;
}


function increasesValue() {
	var value = parseInt(document.getElementById('numbers').value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	document.getElementById('numbers').value = value;
}

function decreasesValue() {
	var value = parseInt(document.getElementById('numbers').value, 10);
	value = isNaN(value) ? 0 : value;
	value < 1 ? value = 1 : '';
	value--;
	document.getElementById('numbers').value = value;
}
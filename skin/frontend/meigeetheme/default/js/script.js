jQuery.noConflict();    
jQuery(window).load(function() {

	/* Fix for IE */
    	if (jQuery.browser.msie && jQuery.browser.version >= 9) {
		 jQuery.support.noCloneEvent = true;
		}
	/* End fix for IE */

	/* Top Cart */
	jQuery('.top-cart .block-title').click(function(){
		jQuery(this).toggleClass('active');
		jQuery('#topCartContent').slideToggle(500).toggleClass('active')
	})
	/* Top Cart */
	
	/* More Views Slider */
	if(jQuery('#more-views-slider').length) {
		jQuery('#more-views-slider').iosSlider({
	      responsiveSlideWidth: true,
	      snapToChildren: true,
	      desktopClickDrag: true,
	      infiniteSlider: true,
	      navSlideSelector: '.sliderNavi .naviItem',
	      navNextSelector: '.more-views .next',
	      navPrevSelector: '.more-views .prev'
	    });
	}
	
	/* More Views Slider */

	/* Related Block Slider */
	 if(jQuery('#block-related-slider').length) {
		jQuery('#block-related-slider').iosSlider({
	      responsiveSlideWidth: true,
	      snapToChildren: true,
	      desktopClickDrag: true,
	      infiniteSlider: true,
	      navSlideSelector: '.sliderNavi .naviItem',                
	      navNextSelector: '.block-related .next',
	      navPrevSelector: '.block-related .prev'
	    });
	} 
	/* Related Block Slider */
	
	/* Wishlist Block Slider */
	function wishlist_slider(){
		jQuery('#wishlist-slider .es-carousel').iosSlider({
		  responsiveSlideWidth: true,
		  snapToChildren: true,
		  desktopClickDrag: true,
		  infiniteSlider: true,
		  navNextSelector: '#wishlist-slider .next',
		  navPrevSelector: '#wishlist-slider .prev'
		});
	}
	if(jQuery('#wishlist-slider').length){
		whs_first_set = true;
		wishlist_slider();
	}
	/* Wishlist Block Slider */
	
  /* Layered Navigation Accorion */
  if (jQuery('#layered_navigation_accordion').length) {
    jQuery('.filter-label').each(function(){
        jQuery(this).toggle(function(){
            jQuery(this).addClass('closed').next().slideToggle(200);
        },function(){
            jQuery(this).removeClass('closed').next().slideToggle(200);
        })
    });
  }
  /* Layered Navigation Accorion */


  /* Product Collateral Accordion */
  if (jQuery('#collateral-accordion').length) {
	  jQuery('#collateral-accordion > div.box-collateral').hide();  
	  jQuery('#collateral-accordion > h2').click(function() {
	    var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	 
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300);
	    }
	  });
  }
  /* Product Collateral Accordion */

  /* My Cart Accordion */
  if (jQuery('#cart-accordion').length) {
	  jQuery('#cart-accordion > div.accordion-content').hide();	  
	  
	  jQuery('#cart-accordion > h3.accordion-title').wrapInner('<span/>').click(function(){
	  
		var accordion_title_check_flag = false;
		if(jQuery(this).hasClass('active')){accordion_title_check_flag = true;}
		jQuery('#cart-accordion > h3.accordion-title').removeClass('active');
		if(accordion_title_check_flag == false){
			jQuery(this).toggleClass('active');
	    }
		
		var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	 
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300);
	    }
		
	  });
	  
	  
  }
  /* My Cart Accordion */
    

	/* Fancybox */
	if (jQuery.fn.fancybox) {
		jQuery('.fancybox').fancybox();
	}
	/* Fancybox */

	/* Zoom */
	if (jQuery('#zoom').length) {
		jQuery('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
  	}
	/* Zoom */
		
	/* Responsive */
	var responsiveflag = false;
	var topSelectFlag = false;
	var menu_type = jQuery('#nav').attr('class');
	
	function mobile_menu(mode){
		switch(mode)
		 {
		 case 'animate':
		   if(jQuery('.nav-container .menu-item-button').length==0){
				jQuery('.nav-container > ul').slideUp('fast');
				jQuery('.menu-button').on('click', function(){
					jQuery(this).toggleClass('active');
					jQuery('.nav-container > ul').slideToggle('medium');
				});
			   jQuery('.nav-container > ul a').each(function(){
					if(jQuery(this).next('ul').length){
						jQuery(this).before('<span class="menu-item-button" />')
						jQuery(this).next('ul').slideUp('fast');
						jQuery(this).prev('.menu-item-button').on('click', function(){
							jQuery(this).toggleClass('active');
							jQuery(this).nextAll('ul').slideToggle('medium');
						});
					}
			   });
		   }
		   break;
		 default:
		   if(jQuery('.nav-container .menu-item-button').length!=0){
				jQuery('.menu-button').off();
				jQuery('.nav-container > ul').slideDown('fast');
				jQuery('.nav-container .menu-item-button').each(function(){
					jQuery(this).nextAll('ul').slideDown('fast');
					jQuery(this).remove();
				});
		    }
		 }
	}
	
	function accordion (status){
		if(status == 'enable'){
			jQuery('aside.sidebar section header').append('<span />');
			jQuery('.footer-columns-block h3, aside.sidebar section:not(.opc-block-progress) header, .block-subscribe h3').on('click', function(){
				jQuery(this).toggleClass("active").parent().find(".custom-footer-content, .block-content").slideToggle('medium');
				wishlist_slider();
			})
			jQuery('.footer-columns-block, aside.sidebar, .block-subscribe').addClass('accordion').find(".custom-footer-content, section:not(.opc-block-progress) .block-content, form .block-content").slideUp('fast');
		}else{
			jQuery('.footer-columns-block h3, aside.sidebar header, .block-subscribe h3').removeClass("active").off().parent().find(".custom-footer-content, .block-content").slideDown('fast');
			jQuery('.footer-columns-block, aside.sidebar, .block-subscribe').removeClass('accordion');
		}
	}
	function toDo(){
		if (jQuery(document.body).width() < 767 && responsiveflag == false){
		    accordion('enable');
			
			/* Top Menu Select */
			if(topSelectFlag == false){
				jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				topSelectFlag = true;
			}
			jQuery('.nav-container .sbOptions li a').on('click', function(){
				if(!jQuery('.nav-container .sbSelector span').length){
					jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				}
			});
			/* //Top Menu Select */
			responsiveflag = true;
		}
		else if (jQuery(document.body).width() > 767){
			accordion('disable');
			responsiveflag = false;
		}
	}
	function replacingClass () {

	   if (jQuery(document.body).width() < 480) { //Mobile
			mobile_menu('animate');
	   }
	   if (jQuery(document.body).width() > 479 && jQuery(document.body).width() < 768) { //iPhone
			mobile_menu('animate');
	   }  
	   else if (jQuery(document.body).width() > 767) { //Desktop
			mobile_menu('reset');
	   }
		if (jQuery(document.body).width() > 767 && jQuery(document.body).width() < 977){ //Tablet
			mobile_menu('reset');
	    }
		if (jQuery(document.body).width() > 1279){ //Extra Large
			mobile_menu('reset');
		}
	   
	}
	replacingClass();
	toDo();
	//menuHeight2();
	jQuery(window).resize(function(){toDo(); replacingClass();});
	/* Responsive */
	
	/* Top Menu */
	function menuHeight2 () {
		var menu_min_height = 0;
		jQuery('#nav li.tech').css('height', 'auto');
		jQuery('#nav li.tech').each(function(){
			if(jQuery(this).height() > menu_min_height){
				menu_min_height = jQuery(this).height();
			}
		});		
		jQuery('#nav li.tech').each(function(){
			jQuery(this).css('height', menu_min_height + 'px');
		});
	}
	
	/* Top Selects */
	function option_class_add(items, is_selector){
		jQuery(items).each(function(){
			if(is_selector){
				jQuery(this).removeAttr('class'); 
				jQuery(this).addClass('sbSelector');
			}			
			stripped_string = jQuery(this).html().replace(/(<([^>]+)>)/ig,"");
			RegEx=/\s/g;
			stripped_string=stripped_string.replace(RegEx,"");
			jQuery(this).addClass(stripped_string.toLowerCase());
			if(is_selector){
				tags_add();
			}
		});
	}
	option_class_add('.form-language .sbOptions li a, .form-language .sbSelector, .form-currency .sbOptions li a, .form-currency .sbSelector', false);
	jQuery('.form-language .sbOptions li a, .form-currency .sbOptions li a').on('click', function(){
		option_class_add('.form-language .sbSelector, .form-currency .sbSelector', true);
	});	
	function tags_add(){
		jQuery('.form-language .sbSelector, .form-currency .sbSelector').each(function(){
			if(!jQuery(this).find('span.text').length){
				jQuery(this).wrapInner('<span class="text" />').append('<span />').find('span:last').wrapInner('<span />');
			}
		});
	}
	tags_add();
	/* //Top Selects */
	
	
	/* Mobile Devices */
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))){

	/* Menu */
	jQuery(".nav-container:not('.mobile') #nav li").on({
		click: function (){
			if ( !jQuery(this).hasClass('touched') && jQuery(this).children('ul').length ){
				jQuery(this).addClass('touched');
				clearTouch(jQuery(this));
				return false;
			}
		}
	});
	
	/* Clear Touch Function */
	function clearTouch(handlerObject){
		jQuery('body').on('click', function(){
			handlerObject.removeClass('touched closed');
			if(handlerObject.parent().attr('id') == 'categories-accordion'){
				handlerObject.children('ul').slideToggle(200);
			}
			jQuery('body').off();
		});
		handlerObject.click(function(event){
			event.stopPropagation();
		});
		
		/* if(wideMenu == false){ */
			handlerObject.parent().click(function(){
				handlerObject.removeClass('touched');
			});
			handlerObject.parents('ul.level0').click(function(){
				handlerObject.removeClass('touched');
			});
			handlerObject.siblings().click(function(){
				handlerObject.removeClass('touched');
			});
		/* } */
	}
	
	var mobileDevice = true;
}else{
	var mobileDevice = false;
}

/* Categories Accorion */
if (jQuery('#categories-accordion').length){
	jQuery('#categories-accordion li.level-top.parent ul.level0').before('<div class="btn-cat"></div>');
	if(mobileDevice == true){
		jQuery('#categories-accordion li.level-top.parent').each(function(){
			jQuery(this).on({
				click: function (){
					if(!jQuery(this).hasClass('touched')){
						jQuery(this).addClass('touched closed').children('ul').slideToggle(200);
						clearTouch(jQuery(this));
						return false;
					}
				}
			});
		});
	}else{
		jQuery('#categories-accordion li.level-top.parent .btn-cat').each(function(){
			jQuery(this).toggle(function(){
				jQuery(this).addClass('closed').next().slideToggle(200);
			},function(){
				jQuery(this).removeClass('closed').next().slideToggle(200);
			})
		});
	}
}
/* Categories Accorion */
	
	
});
jQuery(document).ready(function(){
	/* Top Search */
	jQuery('header#header .form-search input, #footer .block-subscribe .input-box input').focusin(function(){
		jQuery(this).parent().addClass('focus');
	});
	jQuery('header#header .form-search input, #footer .block-subscribe .input-box input').focusout(function(){
		jQuery(this).parent().removeClass('focus');
	});

    /* Cart Increase/Decrease Buttons */
	jQuery('.cart .qty, .my-wishlist .qty').each(function(){
		var thisQty = jQuery(this);
		
		var decreaseButton = thisQty.prev();
		decreaseButton.on('click', function(){
			if( !isNaN( thisQty.attr("value") ) && thisQty.attr("value") > 0 ){
			   var el_val = parseFloat(thisQty.attr("value"))-1;
			   thisQty.attr('value', el_val);
		    }
		});
		
		var increaseButton = jQuery(this).next();
		increaseButton.on('click', function(){
			if( !isNaN(thisQty.attr("value"))){
			   var el_val = parseFloat(thisQty.attr("value"))+1; 
			   thisQty.attr('value', el_val);
		    }
		});
	});
	
	/* Listing Price */
	jQuery('.products-list .price-box a .price').parent().parent().addClass('combined');
	
});
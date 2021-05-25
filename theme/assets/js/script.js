
$(function(){ 'use strict';

    // Nav Left
    var navLeft = $('nav.nav-left');
    navLeft.find('.menu.has-children > a').on('click', function(e){
        var parent = $(this).parent(),
            children = parent.find('> .submenu-container');
        if(children.length){
            e.preventDefault();
            parent.toggleClass('active');
            children.slideToggle(450);
        }
    });


    // Button Popup Toggle
    $('.btn-popup-toggle').click(function(e){
        e.preventDefault();
        var id = $(this).data('popup');
        if(id!==undefined){
            $('.popup-comment[data-popup="'+id+'"], .popup-options[data-popup="'+id+'"]')
                .toggleClass('active');
        }
    });

    
    // Tab Container
    var tabContainers = $('.tab-container');
    if(tabContainers.length){
        tabContainers.each(function(){
            var self = $(this),
                tabs = self.find('.tabs > .tab'),
                tabContents = self.find('.tab-contents > .tab-content');
            tabs.click(function(e){
                var target = tabContents.filter('[data-tab="'+$(this).data('tab')+'"]'),
                    slideContainers = target.find('.slide-container');
                if(target.length){
                    e.preventDefault();
                    tabs.removeClass('active');
                    $(this).addClass('active');

                    tabContents.removeClass('active');
                    target.addClass('active');
                    
                    if(slideContainers.length){
                        slideContainers.each(function(){
                            $(this).find('.slides').slick('setPosition');
                        });
                    }
    
                    AOS.refresh();
                }
            });
        });
    }

});

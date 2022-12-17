if (typeof jQuery === 'undefined') {
    throw new Error('Erreur : jQuery est requis.')
}

var $ = jQuery.noConflict();

/**
 Core script to handle the entire theme and core functions
 **/
var Application = function () {

    var transformSVG = function () {
        /*
         * Replace all SVG images with inline SVG
         */
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    };

    var layoutActions = function () {

        $(document).ready(function () {

            // Langselect onMouseLeave
            $('.top-nav-lang').mouseleave(function () {
                $('.actived').removeClass('rotated');
                $('.nav-lang').hide();
            });

            // Userselect onMouseLeave
            $('.top-nav-user').mouseleave(function () {
                $('.actived-user').removeClass('rotated');
                $('.nav-user').hide();
            });
        });
    };

    var langSelector = function () {

        $('.actived').toggleClass('rotated');
        $('.nav-lang').toggle();
    };

    var userSelector = function () {

        $('.actived-user').toggleClass('rotated');
        $('.nav-user').toggle();
    };

    var equalHeights = function () {

        //  Equal Height rows > 991
        if (document.documentElement.clientWidth > 991) {

            if ($('.row.equal-heights').length > 0) {

                $('.row.equal-heights').equalHeights();
            }

            if ($('.equal-heights').length > 0) {

                $('.equal-heights').equalHeights();
            }

            // Page interne : Résultats de recherche (Non membre)

            $('.game-server-faq').height($('.game-server').height());
        }

        if ($('.our-games-grid').length > 0) {

            $('.our-games-grid').equalHeights();
        }
    };

    var equalHeightGames = function () {

        $('.our-games-grid .game').each(function () {

            $(this).height(Math.ceil($(this).width()));
            $(this).css({
                minHeight: Math.ceil($(this).width())+'px',
            });

        });
    };

    var initOwlCarousel = function () {

        $(document).ready(function () {

            var owl = $('.owl-carousel');

            // Initialized
            owl.on('initialized.owl.carousel', function (event) {
                $('.owl-item:eq(' + event.item.index + ')').find('.content').fadeIn();
            });

            owl.owlCarousel({
                items: 1,
                loop: true,
                lazyLoad: true,
                nav: true,
                dots: false,
                navText: ['<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>', '<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>']
            });

            // Translate 
            owl.on('translate.owl.carousel', function (event) {
                $('.owl-item').find('.content').stop().hide();
            });

            // Translated
            owl.on('translated.owl.carousel', function (event) {

                // Get the previous index
                var indexSlide = Number(event.item.index) - 1;

                // Animations
                setTimeout(function () {
                    $('.owl-item:eq(' + event.item.index + ')').find('.content').stop().fadeIn();
                }, 500);

            });

            // Resized 
            owl.on('resized.owl.carousel', function (event) {
                // Animations
                setTimeout(function () {
                    $('.owl-item:eq(' + event.item.index + ')').find('.content').stop().fadeIn();
                }, 500);
            });

        });
    };

    var initSlick = function () {

        $('.pricing-slider').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
        });

        $('.slider').slick({
            autoplay: true,
            autoplaySpeed: 524000,
            speed: 650,
            arrows: true,
            centerMode: false,

            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        });

        // On before slide change
        $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide)
        {

            var indexSlide = Number(currentSlide) + 1;

            // Animations
            $('.slider').find('[rel=' + indexSlide + ']').removeClass('active');
        });


    }

    var gamesGridHover = function () {

        $('.our-games-grid .game').mouseenter(function () {

            $(this).addClass('hover');
        });

        $('.our-games-grid .game').mouseleave(function () {

            $(this).removeClass('hover');


        });
    };

    return {

        langSelect: function () {
            langSelector();
        },

        userSelect: function () {
            userSelector();
        },

        initSVG: function () {
            transformSVG();
        },

        initLayout: function () {
            layoutActions();
            //initOwlCarousel();
            initSlick();
            equalHeightGames();
            equalHeights();
            gamesGridHover();
        },

        initHeader: function () {

        },

        resized: function () {
            equalHeightGames();
        },

        init: function () {
            this.initSVG();
            this.initLayout();
            this.initHeader();
        }
    };

}();


$(document).ready(function () {

    "use strict";

    Application.init();

    //console.log('Application loaded : ' + Application.init);

    $('.powered').html($('a:contains("WHMCompleteSolution")').parent().html());

    $('a:contains("WHMCompleteSolution")').first().parent().remove();


    $(".markdown-editor").markdown({autofocus: false, savable: false});

    $(".btn-filter-close").click(function () {

        // Close
        $(".display-filter").hide();

        // Remove filter
        $('#category-sort').find('a').removeClass('actif');
    });

    $('.categorie-toggle').click(function () {

        $('.categorie-btn').toggle(function () {
            if ($(this).css('display') == 'none') {
                $(".categorie-toggle").css({'transform': 'rotate(0deg)'});
            } else {
                $(".categorie-toggle").css({'transform': 'rotate(180deg)'});
            }
        });
    });


    // Collapsable Panels
    $(".panel-collapsable .panel-heading").click(function (e) {
        var $this = jQuery(this);
        if (!$this.parents('.panel').hasClass('panel-collapsed')) {
            $this.parents('.panel').addClass('panel-collapsed').find('.panel-body').slideUp();
            $this.find('.collapse-icon i').removeClass('fa-minus').addClass('fa-plus');
        } else {
            $this.parents('.panel').removeClass('panel-collapsed').find('.panel-body').slideDown();
            $this.find('.collapse-icon i').removeClass('fa-plus').addClass('fa-minus');
        }
    });

    // Ticket Rating Click Handler
    $('.ticket-reply .rating span.star').click(function (event) {
        window.location = 'viewticket.php?tid='
                + jQuery(this).parent('.rating').attr("ticketid")
                + '&c=' + jQuery(this).parent('.rating').attr("ticketkey")
                + '&rating=rate' + jQuery(this).parent('.rating').attr("ticketreplyid")
                + '_' + jQuery(this).attr("rate");
    });


    $(function () {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, else we gonna set it if we can.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    });


    var category_name;

    var Portfolio = {
        sort: function (category_name) {

            $('.actif').removeClass("actif");

            $("." + category_name).show();
            $('#category-content').find('div.category-item').not("." + category_name).fadeOut(500);

            $('#game-category').html(category_name);


            if (category_name === "survival") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/bonfire.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/craft-banner.jpg)");
                $(".survival-btn").addClass("actif");
            }

            if (category_name === "fps") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/gun-pointer.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/fps-banner.jpg)");
                $(".fps-btn").addClass("actif");
            }

            if (category_name === "racing") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/flag.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/racing-banner.jpg)");
                $(".racing-btn").addClass("actif");
            }

            if (category_name === "crafting") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/pickaxe.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/craft-banner.jpg)");
                $(".crafting-btn").addClass("actif");
            }

            if (category_name === "rpg") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/swords.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/rpg-banner.jpg)");
                $(".rpg-btn").addClass("actif");
            }

            if (category_name === "retro") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/mushroom.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/retro-banner.jpg)");
                $(".retro-btn").addClass("actif");
            }

            if (category_name === "strategy") {
                $("#category-icon").css("background-image", "url(https://gamehosting.co/templates/dev/img/svg/strategy.svg)");
                $("#banner-cat").css("background-image", "url(https://gamehosting.co/templates/dev/img/strategy-banner.jpg)");
                $(".strategy-btn").addClass("actif");
            }

        },
        showAll: function (items) {
            items.fadeIn(500);
        },

        doSort: function () {

            $('a', '#category-sort').on('click', function () {

                var $a = $(this);


                if (!$a.is('#all')) {

                    $(".display-filter").show();
                    var items = $('div[data-cat=' + category_name + ']', '#category-content');
                    category_name = $a.data('cat');

                    Portfolio.sort(category_name);


                } else {

                    Portfolio.showAll($('div.category-item', '#category-content'));
                    $(".display-filter").show();
                }

            });

            $('a', '#btn-filter').on('click', function () {

                var $a = $(this);
                if (!$a.is('#all')) {

                    var items = $('div[data-cat=' + $a.data('cat') + ']', '#category-content');

                    Portfolio.sort(items);

                } else {

                    Portfolio.showAll($('div.category-item', '#category-content'));


                }

            });
        }
    };

    Portfolio.doSort();

});

$(window).resize(function () {

    "use strict";

    Application.resized();
});


/**
 * Countdown the save timeout. When zero, the span will update to show saved.
 */
function doCountdown()
{

    if (counter >= 0) {
        if (counter == 0) {
            jQuery("span.markdown-save").html(saved);
        }
        counter--;
        setTimeout(doCountdown, 1000);
    }
}

/**
 * Append additional file upload input field.
 */
function extraTicketAttachment() {
    $("#fileUploadsContainer").append('<input type="file" name="attachments[]" class="form-control" />');
}


/**
 * Fetch automated knowledgebase suggestions for ticket content.
 */
function getticketsuggestions() {
    currentcheckcontent = jQuery("#message").val();
    if (currentcheckcontent != lastcheckcontent && currentcheckcontent != "") {
        jQuery.post("submitticket.php", {action: "getkbarticles", text: currentcheckcontent},
                function (data) {
                    if (data) {
                        jQuery("#searchresults").html(data);
                        jQuery("#searchresults").hide().removeClass('hidden').slideDown();
                    }
                });
        lastcheckcontent = currentcheckcontent;
    }
    setTimeout('getticketsuggestions();', 3000);
}

/**
 * Get automatic knowledgebase suggestions for support ticket message.
 */
var lastTicketMsg;
function getTicketSuggestions() {
    var userMsg = jQuery("#inputMessage").val();
    if (userMsg != lastTicketMsg && userMsg != '') {
        jQuery.post("submitticket.php", {action: "getkbarticles", text: userMsg},
                function (data) {
                    if (data) {
                        jQuery("#autoAnswerSuggestions").html(data);
                        if (!jQuery("#autoAnswerSuggestions").is(":visible")) {
                            jQuery("#autoAnswerSuggestions").hide().removeClass('hidden').slideDown();
                        }
                    }
                });
        lastTicketMsg = userMsg;
    }
    setTimeout('getTicketSuggestions()', 3000);
}


/**
 * Redirect on click if an element is not a button or link.
 *
 * Where table rows are clickable, we only want to redirect if the row
 * itself is clicked. If a button or link within the row is clicked,
 * the event tied to that object should be executed. This function
 * stops the standard JS event bubbling required to make that happen.
 *
 * @param {object} clickEvent jQuery click event
 * @param {string} target     Redirect location
 * @param {bool} newWindow    Open link in new window
 */
function clickableSafeRedirect(clickEvent, target, newWindow) {
    var eventSource = clickEvent.target.tagName.toLowerCase();
    var eventParent = clickEvent.target.parentNode.tagName.toLowerCase();
    var eventTable = clickEvent.target.parentNode.parentNode.parentNode;
    if (jQuery(eventTable).hasClass('collapsed')) {
        // This is a mobile device sized display, and datatables has triggered folding
        return false;
    }
    if (eventSource != 'button' && eventSource != 'a') {
        if (eventParent != 'button' && eventParent != 'a') {
            if (newWindow) {
                window.open(target);
            } else {
                window.location.href = target;
            }
        }
    }
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    if ($(this).hasClass('to-top')) {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    }


});

$(document).on('click', '.btn-detail', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $('.term-title').offset().top
    }, 1500);

});


/**
 * Submit the first form that exists within a given container.
 *
 * @param {string} containerId The ID name of the container
 */
function autoSubmitFormByContainer(containerId) {
    jQuery("#" + containerId).find("form:first").submit();
}



function copyToClipboard(element) {

    var copyText = element;
    copyText.select();

    document.execCommand("Copy");

    $(copyText).parent().find('.text-copied').addClass('show');

    setTimeout(function () {
        $(copyText).parent().find('.text-copied').removeClass('show');
    }, 2000);


}


/**
 * Used to toggle display of editable billing address fields.
 */
function editBillingAddress() {
    jQuery("#billingAddressSummary").hide();
    jQuery(".cc-billing-address").hide().removeClass('hidden').fadeIn();
}

/**
 * Show new credit card input fields.
 */
function showNewCardInputFields() {
    if (jQuery(".cc-details").hasClass("hidden")) {
        jQuery(".cc-details").hide().removeClass("hidden");
    }
    jQuery(".cc-details").slideDown();
    jQuery("#btnEditBillingAddress").removeAttr("disabled");
}

/**
 * Hide new credit card input fields.
 */
function hideNewCardInputFields() {
    jQuery(".cc-billing-address").slideUp();
    jQuery(".cc-details").slideUp();
    jQuery("#btnEditBillingAddress").attr("disabled", "disabled");
    if (jQuery("#billingAddressSummary").hasClass('hidden')) {
        jQuery("#billingAddressSummary").hide().removeClass('hidden').slideDown();
    } else {
        jQuery("#billingAddressSummary").slideDown();
    }
}
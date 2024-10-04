/*---------------------------------------------"
// Template Name: Realtor
// Description:  Realtor Html Template
// Version: 1.0.0

--------------------------------------------*/
(function (window, document, $, undefined) {
  "use strict";

  var MyScroll = "";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.preloader();
      Init.BackToTop();
      Init.searchToggle();
      Init.quantityHandle();
      Init.uiHeader();
      Init.shippingAddress();
      Init.niceSelect();
      Init.priceRangeSlider();
      Init.slick();
      Init.countdownInit(".countdown", "2024/12/01");
      Init.miniCart();
      Init.toggles();
      Init.wow();
      Init.magnifying();
      Init.filterToggle();
    },

    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    // =================
    // Preloader
    // =================
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2500);
    },
    // =================
    // Bak to top
    // =================
    BackToTop: function () {
      let scrollTop = $(".scroll-top path");
      if (scrollTop.length) {
        var e = document.querySelector(".scroll-top path"),
          t = e.getTotalLength();
        (e.style.transition = e.style.WebkitTransition = "none"),
          (e.style.strokeDasharray = t + " " + t),
          (e.style.strokeDashoffset = t),
          e.getBoundingClientRect(),
          (e.style.transition = e.style.WebkitTransition =
            "stroke-dashoffset 10ms linear");
        var o = function () {
          var o = $(window).scrollTop(),
            r = $(document).height() - $(window).height(),
            i = t - (o * t) / r;
          e.style.strokeDashoffset = i;
        };
        o(), $(window).scroll(o);
        var back = $(".scroll-top"),
          body = $("body, html");
        $(window).on("scroll", function () {
          if ($(window).scrollTop() > $(window).height()) {
            back.addClass("scroll-top--active");
          } else {
            back.removeClass("scroll-top--active");
          }
        });
      }
    },

    // =======================
    //  Quantity Handle
    // =======================
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },
    // =======================
    //  UI Header
    // =======================
    uiHeader: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }

      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }

      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".sticky-header__content");
        mobileNavContainer.innerHTML = navContent;
      }

      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }

      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }

      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },

    // =======================
    //  Nice Select
    // =======================
    niceSelect: function () {
      if ($(".has-nice-select").length) {
        $('.has-nice-select, .contact-form select').niceSelect();
      }
    },

    // =======================
    //  Range Slider
    // =======================
    priceRangeSlider: function () {
      const priceGap = 1000;

      $(".price-input input").on("input", function () {
        let minPrice = parseInt($(".price-input .input-min").val()),
          maxPrice = parseInt($(".price-input .input-max").val());

        if (maxPrice - minPrice >= priceGap && maxPrice <= $(".range-input .range-max").attr("max")) {
          if ($(this).hasClass("input-min")) {
            $(".range-input .range-min").val(minPrice);
            $(".slider .progress").css("left", (minPrice / $(".range-input .range-min").attr("max")) * 100 + "%");
          } else {
            $(".range-input .range-max").val(maxPrice);
            $(".slider .progress").css("right", 100 - (maxPrice / $(".range-input .range-max").attr("max")) * 100 + "%");
          }
        }
      });

      $(".range-input input").on("input", function () {
        let minVal = parseInt($(".range-input .range-min").val()),
          maxVal = parseInt($(".range-input .range-max").val());

        if (maxVal - minVal < priceGap) {
          if ($(this).hasClass("range-min")) {
            $(".range-input .range-min").val(maxVal - priceGap);
          } else {
            $(".range-input .range-max").val(minVal + priceGap);
          }
        } else {
          $(".price-input .input-min").val(minVal);
          $(".price-input .input-max").val(maxVal);
          $(".slider .progress").css("left", (minVal / $(".range-input .range-min").attr("max")) * 100 + "%");
          $(".slider .progress").css("right", 100 - (maxVal / $(".range-input .range-max").attr("max")) * 100 + "%");
        }
      });

    },

    // =======================
    //  Slick Slider
    // =======================
    slick: function () {
      if ($(".brands-slider").length) {
        $('.brands-slider').slick({
          slidesToShow: 7,
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
          autoplaySpeed: 0,
          speed: 6000,
          pauseOnFocus: false,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      }

      if ($(".preview-slider").length) {
        $(".preview-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          centerMode: true,
          asNavFor: ".preview-slider-nav",
        });
      }
      if ($(".preview-slider-nav").length) {
        $(".preview-slider-nav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".preview-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 990,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      }
      if ($(".related-products-carousel").length) {
        $('.related-products-carousel').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          dots: false,
          arrows: true,
          lazyLoad: 'progressive',
          speed: 800,
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      }
      if ($(".related-blogs-carousel").length) {
        $('.related-blogs-carousel').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          dots: false,
          arrows: true,
          lazyLoad: 'progressive',
          speed: 800,
          responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      $(".prev-btn").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickPrev");
      });

      $(".next-btn").click(function () {
        var $this = $(this).attr("data-slide");
        $('.' + $this).slick("slickNext");
      });
    },
    // =======================
    //  Shipping Address
    // =======================
    shippingAddress: function () {
      if ($("#ship-address").length) {
        $(".shipping-address-block").hide();
        $("#ship-address").change(function () {
          if ($(this).is(":checked")) {
            $(".shipping-address-block").hide("slow");
          } else {
            $(".shipping-address-block").show("slow");
          }
        });
      }
    },
    // =======================
    //  Search Function
    // =======================
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },
    // =======================
    //  Coming Soon Countdown
    // =======================
    countdownInit: function (countdownSelector, countdownTime) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              '<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Min</h6></li>\
              <li><h2>%S</h2><h6>Sec</h6></li>'
            )
          );
        });
      }
    },
    // =======================
    //  Mini Cart
    // =======================
    miniCart: function () {
      $(document).ready(function ($) {
        var $body = $("body");

        $(".cart-button, .close-button, #sidebar-cart-curtain").click(function (e) {
          e.preventDefault();
          $body.toggleClass("show-sidebar-cart");
          $body.toggleClass("locked");
          if ($("#sidebar-cart-curtain").is(":visible")) {
            $("#sidebar-cart-curtain").fadeOut(500);
          } else {
            $("#sidebar-cart-curtain").fadeIn(500);
          }
        });
      });

    },
    // =======================
    //  Toggles
    // =======================
    toggles: function () {
      if ($('.sidebar-widget').length) {
        $(".widget-title-row").on("click", function (e) {
          $(this).find('i').toggleClass('fa-horizontal-rule fa-plus', 'slow');
          // $(this).find('i').toggleClass('fa-light fa-regular', 'slow');
          $(this).parents('.sidebar-widget').find('.widget-content-block').animate({ height: 'toggle' }, 'slow');
        })
      }
      // Wishlist Toggle 
      if ($(".wishlist-icon").length) {
        $('.wishlist-icon').on('click', function () {
          $(this).find('.fa-light').toggleClass('fa-solid');
          return false;
        })
      }
    },
    // =======================
    //  Wow
    // =======================
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow", // animated element css class (default is wow)
          animateClass: "animated", // animation css class (default is animated)
          mobile: true, // trigger animations on mobile devices (default is true)
          live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
      }
    },
    // =======================
    // Magnifying Popup
    // =======================
    magnifying: function () {
      if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      }
    },
    // =======================
    // Filter Toggle Button
    // =======================
    filterToggle: function () {
      if ($('.category-block').length) {
        $(".category-block .title").on("click", function (e) {
          var count = $(this).data('count');
          if ($('.category-block.box-' + count + ' .content-block').is(':visible')) {
            $('.category-block.box-' + count + ' span i').removeClass('fa-horizontal-rule');
            $('.category-block.box-' + count + ' span i').addClass('fa-plus');
            $('.category-block.box-' + count + ' .content-block').hide('slow');

          } else {
            $('.category-block.box-' + count + ' span i').removeClass('fa-plus');
            $('.category-block.box-' + count + ' span i').addClass('fa-horizontal-rule');
            $('.category-block.box-' + count + ' .content-block').show('slow');
          }
        })
      }
      if ($('.toggle-sidebar').length) {
        $('.shop-filter').on('click', function () {
          $('.toggle-sidebar').animate({ left: '0' }, 300);
          $('.overlay').fadeIn(300);
        });

        $('.overlay').on('click', function () {
          $('.toggle-sidebar').animate({ left: '-400px' }, 300);
          $(this).fadeOut(300);
        });

      }
    },
  };

  Init.i();
})(window, document, jQuery);

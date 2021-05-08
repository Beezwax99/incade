// header menu

$(document).ready(function () {

    AOS.init();
    AOS.init({
      duration: 700,
      disable: function() {
        var maxWidth = 1365;
        return window.innerWidth > maxWidth;
      }
    });


    const menu = $('.menu'),
        burger = $('.burger'),
        menuClose = $('.menu__close');
    burger.on('click', function (e) {
        e.preventDefault();
        menu.addClass('active')
        menu.children('.menu__block').addClass('active');
        menu.children('.menu__bg-image').addClass('active');
        $('body').addClass('no-scroll');
    });
    menuClose.on('click', function (e) {
        e.preventDefault();
        menu.removeClass('active')
        menu.children('.menu__block').removeClass('active');
        menu.children('.menu__bg-image').removeClass('active');
        $('body').removeClass('no-scroll');
    });
    $('.tabs-item').on('click', function (e) {
        e.preventDefault();
        let id = $(this).attr('href');
        $('.tabs-item').removeClass('active-price');
        $(this).addClass('active-price');
        $('.price').removeClass('active-price');
        $(id).addClass('active-price');
        
    });
    $('.tel').mask("+38(999) 99-99-999");
    $('.form-mob').mask("+38(999) 99-99-999");

    $.datepicker.regional['ru'] = {
      closeText: 'Закрыть',
      prevText: 'Предыдущий',
      nextText: 'Следующий',
      currentText: 'Сегодня',
      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
      dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
      dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
      weekHeader: 'Не',
      dateFormat: 'dd.mm.yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
});
// accordion



// select
// $('.item').hide();
$('.item').click(function () {
    var x = $(this).text();
    $(this).siblings(".selected").text(x);
    // $(this).slideUp().siblings(".item").slideUp();
});
// $('.Drop').click(function () {  
//     $(this).parent().toggleClass("opened");
//     $(this).siblings(".item").slideToggle();
//     $(this).show("1000");
// });
$('.selected').click(function () { 
    // $(this).parent().removeClass("opened");
    // $(this).siblings(".item").slideUp();
});

// datapicker 
$(function(){
	$('#datepicker').datepicker({
		onSelect: function(date){
			$('#datepicker_value').val(date)
		},
    minDate: 0
	});
	$('#datepicker').datepicker("setDate", $('#datepicker_value').val());
});


// scroll menu
$(window).scroll(function () {
  let scroll = $(window).scrollTop();

  // if(window.location.href.indexOf('services') == -1) {
    if (scroll == 0) { //верх страницы
      $('.logo-hide').removeClass('opacity');
      $('.header__contact').removeClass('opacity');
      $('.burger').addClass('burger-white');
    } else { //скролл вниз
      $('.logo-hide').addClass('opacity');
      $('.header__contact').addClass('opacity');
      $('.burger').removeClass('burger-white');
    }  
  // }
});

var swiperWork = new Swiper('.works__swiper', {
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: {
    nextEl: '.works__arrow--next',
    prevEl: '.works__arrow--prev',
  },
  // pagination: {
  //   el: '.works-pagination-num',
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //       let count;
  //       if (index + 1 >= 10) {
  //           count = index + 1;
  //       } else {
  //           count = '0' + (index + 1);
  //       }
  //     return '<span class="' + className + '">'  + count + '</span>';
  //   },
  // },
  
});

swiperWork.on('slideChange', function () {
  let count = swiperWork.activeIndex + 1;
  if (count > 10) {
    $('.works-count, .works-pagination-num').text(swiperWork.activeIndex + 1);
  } else {
    $('.works-count, .works-pagination-num').text('0' + (swiperWork.activeIndex + 1));
  }
});

$('.works-item').on('click', function (e) {
  e.preventDefault();
  let index = $(this).index();
  swiperWork.slideTo(index + 1);
  console.log($('.works-item').eq(index));
});


var swiper = new Swiper('.reviews__swiper', {
  spaceBetween: 30,
  navigation: {
    nextEl: '.reviews__arrow--next',
    prevEl: '.reviews__arrow--prev',
  },
  pagination: {
    el: '.reviews-pagination',
    clickable: true,
    renderBullet: function (index, className) {
        let count;
        if (index + 1 >= 10) {
            count = index + 1;
        } else {
            count = '0' + (index + 1);
        }
      return '<span class="' + className + '">'  + count + '</span>';
    },
  },
  breakpoints: {
    768: {
        direction: 'vertical',
        slidesPerView: 2,
        spaceBetween: 21,
    },
  }
});

var swiper = new Swiper('.about__swiper', {
  spaceBetween: 30,
  navigation: {
    nextEl: '.about__arrow--next',
    prevEl: '.about__arrow--prev',
  },
  pagination: {
    el: '.about-pagination',
    clickable: true,
    renderBullet: function (index, className) {
        let count;
        if (index + 1 >= 10) {
            count = index + 1;
        } else {
            count = '0' + (index + 1);
        }
      return '<span class="' + className + '">'  + count + '</span>';
    },
  }
});

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 20,
    slidesPerView: 4,
    // freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
        768:{
            direction: 'horizontal',
            slidesPerView: 4,
          }
    }
});
var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 0,
    clickable: false,
    allowTouchMove: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    breakpoints: {
      1366:{
        allowTouchMove: false,
      }
    }
  });

  
  $('.modal__close, #modal__close').on('click', function (e) {
    $('.modal, .overlay').removeClass('active');              
  });

// Modal START
!function (e) { "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) { for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;)++n; return Boolean(o[n]) }), "function" != typeof e.closest && (e.closest = function (e) { for (var t = this; t && 1 === t.nodeType;) { if (t.matches(e)) return t; t = t.parentNode } return null }) }(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function () {

  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      $('body').css('overflow', 'hidden');
      var modalId = this.getAttribute('data-modal'),
      modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

      modalElem.classList.add('active');
      overlay.classList.add('active');
    }); 
  }); 

  closeButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }); 

  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
      document.querySelector('.modal.active').classList.remove('active');
      document.querySelector('.overlay').classList.remove('active');
      $('body').css('overflow', 'unset');
    };
  }, false);


  if(overlay) {
    overlay.addEventListener('click', function () {
      document.querySelector('.modal.active').classList.remove('active');
      this.classList.remove('active');
      $('body').css('overflow', 'unset');
    });

  }
}); 
// Modal FINISH


// slider section start
$(window).on('load resize', function () {
  const windowWidth = $(window).width();
  
  if (windowWidth < 1366) {
    $('.slide-active').removeClass('slide active queue');
    $('#slider').removeClass('slider');
  }

  else {
    var timeStart = 0;
  
    function indexSlide() {
      let index = $('.slide.active').index();
      // if(window.location.href.indexOf('services') == -1) {
        if(index==0) {
          $('.logo-hide').removeClass('opacity');
          $('.header__contact').removeClass('opacity');
        } else {
          $('.logo-hide').addClass('opacity');
          $('.header__contact').addClass('opacity');
          $('.burger').removeClass('burger-white');
        }
      // }
      if($('.slide.active').prev().attr('id') == 'price') {
          $('body').css('overflow', 'hidden');
          let modalElem = document.querySelector('.modal[data-modal="1"]'),
          overlay = document.querySelector('.js-overlay-modal'),
          closeButtons = document.querySelectorAll('.js-modal-close');
  
          modalElem.classList.add('active');
          overlay.classList.add('active');

          closeButtons.forEach(function (item) {

            item.addEventListener('click', function (e) {
              var parentModal = this.closest('.modal');
        
              parentModal.classList.remove('active');
              overlay.classList.remove('active');
            });
          }); 
        
          document.body.addEventListener('keyup', function (e) {
            var key = e.keyCode;
        
            if (key == 27) {
              // document.querySelector('.modal.active').classList.remove('active');
              document.querySelector('.overlay').classList.remove('active');
              $('body').css('overflow', 'unset');
            };
          }, false);
        
          if(overlay) {
            overlay.addEventListener('click', function () {
              // document.querySelector('.modal.active').classList.remove('active');
              this.classList.remove('active');
              $('body').css('overflow', 'unset');
            });
        
          }
        $('#price').removeAttr('id');
      }
    }

    function wheely(e) {
      var y = e.originalEvent.deltaY;
      var timeStop = new Date().getTime();
      var timeDiff = timeStop - timeStart;
      if (timeDiff > 200) {
        if (y > 0) {
          nextSlide();
        }
        if (y < 0) {
          prevSlide();
        }
      }
      timeStart = timeStop;

      indexSlide();
    }
  
    function prevSlide() {
      if(!$(".modal").hasClass('active')) {
        if ($(".active").is(":first-child")) {
          if (!$(".slider").hasClass("dragging")) {
            $(".slide:first-child").addClass("bounce");
            setTimeout(function () {
              $(".slide:first-child").removeClass("bounce");
            }, 300);
          }
        } else {
          $(".active")
            .removeClass("active")
            .addClass("queue")
            .prev()
            .removeClass("prev")
            .addClass("active");
        }
      }
    }
  
    function nextSlide() {
      if(!$(".modal").hasClass('active')) {

        if ($(".active").is(":last-child")) {
          if (!$(".slider").hasClass("dragging")) {
            $(".slide:last-child").addClass("bounce");
            setTimeout(function () {
              $(".slide:last-child").removeClass("bounce");
            }, 300);
          }
        } else {
          $(".active")
            .removeClass("active")
            .addClass("prev")
            .next()
            .removeClass("queue")
            .addClass("active");
        }
      }

    }
  
    function hotkeys(e) {
      if (e.keyCode == 38) {
        prevSlide();
      }
  
      if (e.keyCode == 40) {
        e.preventDefault();
        nextSlide();
      }
      
      indexSlide();
    }
  
    function dragStart(e) {
      // e.preventDefault();
      // if (e.type == "touchstart") {
      //   $(document).off("mousedown", dragStart);
      //   startPoint = e.originalEvent.touches[0].pageY;
      // } else {
      //   startPoint = e.pageY;
      // }
      // dragDist = 0;
      if (windowWidth < 1366) {
        $(document).on("touchmove mousemove", dragMove);
      }
      indexSlide();
    }
  
    function dragMove(e) {
      // if (e.type == "touchmove") {
      //   var movePoint = e.originalEvent.touches[0].pageY;
      // } else {
      //   var movePoint = e.pageY;
      // }
      // dragDist = ((movePoint - startPoint) / $(".slider").height()) * 100;
  
      // $(".slider").addClass("dragging");
  
      // $(".slide, .bg").css({
      //   transition: "0ms",
      // });
  
      // if (dragDist < 0) {
      //   $(".active .bg").css({
      //     opacity: 1 + dragDist / 200,
      //   });
      //   $(".active")
      //     .css({
      //       transform: "translate3d(0," + dragDist / 2 + "%,0)",
      //     })
      //     .next()
      //     .css({
      //       transform: "translate3d(0," + (100 + dragDist) + "%,0)",
      //     });
      // }
  
      // if (dragDist > 0) {
      //   $(".active")
      //     .css({
      //       transform: "translate3d(0," + dragDist + "%,0)",
      //     })
      //     .prev()
      //     .css({
      //       animation: "none",
      //       transform: "translate3d(0," + (-50 + dragDist / 2) + "%,0)",
      //     })
      //     .find(".bg")
      //     .css({
      //       opacity: 0.5 + dragDist / 200,
      //     });
      // }
      
      indexSlide();
    }
  
    function dragEnd() {
      // $(document).off("touchmove mousemove", dragMove);
      // $(".slide, .bg").removeAttr("style");
      // if (dragDist > 20) {
      //   prevSlide();
      // }
      // if (dragDist < -20) {
      //   nextSlide();
      // }
  
      // setTimeout(function () {
      //   $(".slider").removeClass("dragging");
      // }, 800);

      indexSlide();
    }
  
    $(document).on("wheel", wheely);
    $(document).on("keydown", hotkeys);
    $(document).on("touchstart mousedown", dragStart);
    $(document).on("touchend mouseup", dragEnd);

  }
});
// slider end


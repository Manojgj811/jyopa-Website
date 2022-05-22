function url()
{ 
  console.log("Got Server URL");
  // return "http://13.234.112.252:50000/"; //Dev
  return "http://13.235.110.229:50000/"; //Prod

}

jQuery(document).ready(function ($) {
  $('[data-toggle="tooltip"]').tooltip();
  $('#dismiss, .overlay').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  
  
  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


  // Porfolio - uses the magnific popup jQuery plugin
  $('.portfolio-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function (openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });


});

//Data Validation Function:

function validate(data){
 var ferror = false, emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i, numExp = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/i;

    data.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
          if (i.val() === '') {
            ferror = ierror = true;
          }
          break;

          case 'minlen':
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;

          case 'email':
          if (!emailExp.test(i.val())) {
            ferror = ierror = true;
          }
          break;

          case 'checked':
          if (! i.is(':checked')) {
            ferror = ierror = true;
          }
          break;

          case 'regexp':
          exp = new RegExp(exp);
          if (!exp.test(i.val())) {
            ferror = ierror = true;
          }
          break;

          case 'telnum':
          if (!numExp.test(i.val())) {
            ferror = ierror = true;
          }
          break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    data.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
          if (i.val() === '') {
            ferror = ierror = true;
          }
          break;

          case 'minlen':
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else return true;
  }


// var datalist = jQuery('datalist');
// var options = jQuery('datalist option');
// var optionsarray = jQuery.map(options ,function(option) {
//     return option.value;
// });
// var input = jQuery('input[list]');
// var inputcommas = (input.val().match(/,/g)||[]).length;
// var separator = ',';
    
// function filldatalist(prefix) {
//   if (input.val().indexOf(separator) > -1 && options.length > 0) {
//     for (i=0; i < optionsarray.length; i++ ) {
//       if (prefix.indexOf(optionsarray[i]) < 0 ) {
//         datalist.append('<option value="'+prefix+optionsarray[i]+'">');
//       }
//     }
//   }
// }
// input.bind("change paste keyup",function() {
//   var inputtrim = input.val().replace(/^\s+|\s+$/g, "");
//   //console.log(inputtrim);
//   var currentcommas = (input.val().match(/,/g)||[]).length;
//   //console.log(currentcommas);
//   if (inputtrim != input.val()) {
//     if (inputcommas != currentcommas) {
//       var lsIndex = inputtrim.lastIndexOf(separator);
//       var str = (lsIndex != -1) ? inputtrim.substr(0, lsIndex)+", " : "";
//       filldatalist(str);
//       inputcommas = currentcommas;
//     }
//     input.val(inputtrim);
//   }
// });

function logout() {
  console.log("Called Logout");
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location = "/home/";
}



 function sendMail() {
        
        var data = {"access_token": "hcd7fmx1odt18h7enmap75ra"};
        data['subject'] = 'TEST WITH POSTMAIL';
        data['text'] = 'TEST WITH POSTMAIL';

        $.post('https://postmail.invotes.com/send',
            data,
            onSuccess
        ).fail(onError);

        return false;
    }

sendMail();

function sendMail() {
   $.ajax({
    url: "https://api.mailjet.com/v3.1/send",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", "Basic " + btoa("e7f0887e93bf8cc205ed314c25a5dbf1:3d5a29495f615be1ff32bdfc805c8422")); 
    },
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data:'{"Messages":[{"From":{"Email":"fghijabcde33@gmail.com","Name":"ASJ"},"To":[{"Email":"fghijabcde33@gmail.com","Name":"ASJ"}],"Subject":"MyfirstMailjetemail","TextPart":"GreetingsfromMailjet.","HTMLPart":"<h3>Dearpassenger1,welcometo<ahref=\'https://www.mailjet.com/\'>Mailjet</a>!</h3><br/>Maythedeliveryforcebewithyou!","CustomID":"AppGettingStartedTest"}]}',
    success: function (data) {
      console.log(JSON.stringify(data));
    },
    error: function(){
      console.log("Cannot get data");
    }
});
}





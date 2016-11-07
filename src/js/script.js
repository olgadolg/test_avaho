$(function () {

  //change bootstrap logic for dropdown.
  //close if clicked on another element
  $('.dropdown-checkbox .btn').on('click', function () {
    $(this).parent().toggleClass('open');
  });

  $('body').on('click', function (e) {
    if ($('.dropdown-checkbox').hasClass('open')) {
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      var obj = e.target || event.srcElement;

      while (obj.parentNode) {
        if ($(obj).hasClass('dropdown-checkbox')) {
          break;
        }
        else {
          obj = obj.parentNode;
        }
      }

      if (!$(obj).hasClass('dropdown-checkbox')) {
        $('.dropdown-checkbox').removeClass('open');
      }
    }
  });

  //added backdrop for body
  $('.avaho-bottom-panel').on({
    'show.bs.collapse': function () {
      var backdrop = $('<div></div>').addClass('panel-backdrop');
      var backdropTopPosition = parseInt($('.avaho-panel').offset().top) + parseInt($('.avaho-panel').innerHeight())
      backdrop.offset({
        top: backdropTopPosition
      });
      backdrop.on('click', function () {
        $(".avaho-bottom-panel").collapse('hide');
      })
      $('body').css('overflow', 'hidden');
      $('.avaho-panel').append(backdrop).fadeIn(300);
    },
    'hide.bs.collapse': function () {
      $('body').css('overflow', 'auto');
      $('.panel-backdrop').remove().fadeIn(300);
    }
  })

  $(window).resize(function () {
    if ($('.panel-backdrop').length > 0) {
      var backdropTopPosition = parseInt($('.avaho-panel').offset().top) + parseInt($('.avaho-panel').innerHeight())
      $('.panel-backdrop').offset({
        top: backdropTopPosition
      });
    }
  });

});
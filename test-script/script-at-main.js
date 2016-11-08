var css = '.collapsing {'
    + 'position: relative !important; '
    + 'height: 0;'
    + 'overflow: hidden;'
    + '-webkit-transition: height .35s  !important;'
    + 'transition: height .35s  !important;'
    + '}'
    + '.panel-backdrop {'
    + 'position: absolute;'
    + 'right: 0;'
    + 'left: 0;'
    + 'top: 0;'
    + 'bottom: 0;'
    + 'z-index: 10;'
    + 'width: 100%;'
    + 'background-color: rgba(0,0,0,0.5);'
    + '}'
    + '.search-form {'
    + 'z-index: 100000;'
    + 'position: relative;'
    +'}',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

$('#extendedLink').collapse({
  toggle: false
})

$('a[data-toggle="collapse"]').on('click', function(e) {
  console.log('test')
  e.preventDefault();
  e.cancelBubble = true;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  $(this).find('i.extended-drop').toggleClass('fa-angle-down fa-angle-right');
  if ($('#extendedLink')) {
    $('#extendedLink').collapse('toggle')
  }
});

//added backdrop for body
$('#extendedLink').on({
  'show.bs.collapse': function () {
    var backdrop = $('<div></div>').addClass('panel-backdrop');
    var backdropTopPosition = parseInt($('.search-form__params--w-extended').offset().top) + parseInt($('.search-form__params--w-extended').innerHeight())
    backdrop.offset({
      top: backdropTopPosition
    });
    backdrop.on('click', function () {
      $("#extendedLink").collapse('hide');
    });
    $('body').prepend(backdrop).fadeIn(300);
  },
  'hide.bs.collapse': function () {
    $('.panel-backdrop').remove().fadeIn(300);
  }
})
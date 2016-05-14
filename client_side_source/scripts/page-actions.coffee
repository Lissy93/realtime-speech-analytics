

# Show nav bar on scroll
$ ->
  $('nav').hide()
  $(window).scroll ->
    if $(this).scrollTop() > 100 then $('nav').fadeIn()
    else $('nav').fadeOut()
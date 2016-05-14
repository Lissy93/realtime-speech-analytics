

# Show nav bar on scroll
$ ->
  $('nav').hide()
  $(window).scroll ->
    if $(this).scrollTop() > 100 then $('nav').fadeIn()
    else $('nav').fadeOut()

$('#get-started').click ->
  $(this)
    .addClass('circle')
    .html("Start Speaking")
    .append('<br><i class="material-icons">pause</i>')

  $('#theInput').slideDown(400)

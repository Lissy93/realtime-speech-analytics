

listening = false

# Show nav bar on scroll
$ ->
  $('nav').hide()
  $(window).scroll ->
    if $(this).scrollTop() > 100 then $('nav').fadeIn()
    else $('nav').fadeOut()

toggleListening = ->

  if listening
    stopRecording()
    listening = false
    $('#audioImg').fadeOut('normal')
    $('#get-started').html("Tap to Resume")
      .append('<br><i class="material-icons" id ="ico">play_arrow</i>')
      .removeClass('circle')


  else
    startRecording()
    listening = true
    $('#get-started').addClass('circle')
    .html("Listening")
    .append('<img src="/images/audio.gif" id="audioImg"/>')
    .append('<i class="material-icons" id ="ico">pause</i>')
    $('#audioImg').fadeIn('normal')


$('#get-started').click ->
  $('#theInput').slideDown(400)
  toggleListening()

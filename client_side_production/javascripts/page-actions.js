var listening, toggleListening;

listening = false;

$(function() {
  $('nav').hide();
  return $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      return $('nav').fadeIn();
    } else {
      return $('nav').fadeOut();
    }
  });
});

toggleListening = function() {
  if (listening) {
    stopRecording();
    listening = false;
    $('#audioImg').fadeOut('normal');
    return $('#get-started').html("Tap to Resume").append('<br><i class="material-icons" id ="ico">play_arrow</i>').removeClass('circle');
  } else {
    startRecording();
    listening = true;
    $('#get-started').addClass('circle').html("Listening").append('<img src="/images/audio.gif" id="audioImg"/>').append('<i class="material-icons" id ="ico">pause</i>');
    return $('#audioImg').fadeIn('normal');
  }
};

$('#get-started').click(function() {
  $('#theInput').slideDown(400);
  return toggleListening();
});

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
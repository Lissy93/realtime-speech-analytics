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

$('#get-started').click(function() {
  $(this).addClass('circle').html("Start Speaking").append('<br><i class="material-icons">pause</i>');
  startRecording();
  return $('#theInput').slideDown(400);
});

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
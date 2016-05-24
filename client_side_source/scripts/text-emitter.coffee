
$('#textAreaMain').keypress (e) ->
  if  e.keyCode == 0 or e.keyCode == 32
    word = $('#textAreaMain').val().split(' ').pop()
    document.dispatchEvent(new CustomEvent("word", { "detail": word }))

  if [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) != -1
    sentence  = $('#textAreaMain').val()
    document.dispatchEvent(new CustomEvent("sentence", { "detail": sentence }))


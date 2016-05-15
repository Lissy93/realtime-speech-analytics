
# SETUP
recognition = new webkitSpeechRecognition

# SETTINGS
recognition.continuous = true
recognition.interimResults = true
final_transcript = ''

shouldResetTimestamp = true

# STARTING
startRecording = ->
  recognition.start()
  console.log 'Recording Started'


# ENDING
stopRecording = ->
  recognition.stop()
  shouldResetTimestamp = true
  console.log 'Recognition Stopping'



# For calculating the rate of word input
eventCount = 0
firstTimestamp = 0
paceTotal = 0.0


recognition.onresult = (event) ->
  interim_transcript = ''

  if shouldResetTimestamp
    firstTimestamp = event.timeStamp
    paceTotal = 0
    shouldResetTimestamp = false
  else
    paceTotal = event.timeStamp - firstTimestamp

  eventCount += 1
  i = event.resultIndex
  while i < event.results.length
    if event.results[i].isFinal
      final_transcript += event.results[i][0].transcript
    else
      interim_transcript += event.results[i][0].transcript
    ++i

  # Pace Data
  window.updatePace(paceTotal, eventCount)

  # Handle new interim
  if interim_transcript.length > 0
    $("code#prelim-words").text($("code#prelim-words").text() + " " + interim_transcript)
    window.updateInterimResults()

  # Handel final results
  if final_transcript.length > 0
    $("#textAreaMain").val(final_transcript)
    updateForNewText(final_transcript)










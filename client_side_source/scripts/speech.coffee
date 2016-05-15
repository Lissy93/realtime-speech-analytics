

# SETUP
recognition = new webkitSpeechRecognition


# STARTING
startRecording = ->
  recognition.start()
  console.log 'Recording Started'


# ENDING
stopRecording = ->
  recognition.stop()
  console.log 'Recognition Stopping'


recognition.continuous = true
recognition.interimResults = true
start_timestamp = undefined
final_transcript = ''
recognizing = false

# For calculating the rate of word input
eventCount = 0
previusTimestamp = 0
paceTotal = 0.0

recognition.onresult = (event) ->
  interim_transcript = ''
  paceTotal += if eventCount == 0 then 0 else event.timeStamp - previusTimestamp
  previusTimestamp = event.timeStamp
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


  # Handle new interim and final results
  if interim_transcript.length > 0
    $("code#prelim-words").text($("code#prelim-words").text() + " " + interim_transcript)
  if final_transcript.length > 0
    $("#textAreaMain").val(final_transcript)
    window.updateForNewText()








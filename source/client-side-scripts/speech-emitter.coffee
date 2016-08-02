
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

paceActions = (event) ->


recognition.onresult = (event) ->
  interim_transcript = ''

  if shouldResetTimestamp
    firstTimestamp = event.timeStamp
    paceTotal = 0
    shouldResetTimestamp = false
  else
    paceTotal = event.timeStamp - firstTimestamp


  i = event.resultIndex
  while i < event.results.length
    if event.results[i].isFinal
      final_transcript += event.results[i][0].transcript
    else
      interim_transcript += event.results[i][0].transcript
    ++i

  # New interim results
  if interim_transcript.length > 0
    eventCount += 1
    event = new CustomEvent("word", {
      "detail": interim_transcript,
      pace: { total: paceTotal, count: eventCount }
    } )
    document.dispatchEvent(event)


  # New final results
  if final_transcript.length > 0
    event = new CustomEvent("sentence", { "detail": final_transcript })
    document.dispatchEvent(event)


module.exports.startRecording = startRecording
module.exports.stopRecording = stopRecording



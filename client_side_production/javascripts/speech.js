var eventCount, final_transcript, paceTotal, previusTimestamp, recognition, recognizing, startRecording, stopRecording;

recognition = new webkitSpeechRecognition;

recognition.continuous = true;

recognition.interimResults = true;

final_transcript = '';

recognizing = false;

startRecording = function() {
  recognition.start();
  recognizing = true;
  return console.log('Recording Started');
};

stopRecording = function() {
  recognition.stop();
  return console.log('Recognition Stopping');
};

eventCount = 0;

previusTimestamp = 0;

paceTotal = 0.0;

recognition.onresult = function(event) {
  var i, interim_transcript;
  interim_transcript = '';
  paceTotal += eventCount === 0 ? 0 : event.timeStamp - previusTimestamp;
  previusTimestamp = event.timeStamp;
  eventCount += 1;
  i = event.resultIndex;
  while (i < event.results.length) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
    ++i;
  }
  window.updatePace(paceTotal, eventCount);
  if (interim_transcript.length > 0) {
    $("code#prelim-words").text($("code#prelim-words").text() + " " + interim_transcript);
    window.updateInterimResults();
  }
  if (final_transcript.length > 0) {
    $("#textAreaMain").val(final_transcript);
    window.updateForNewText();
    return requestEntityData(final_transcript);
  }
};

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
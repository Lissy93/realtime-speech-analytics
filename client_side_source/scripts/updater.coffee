

updateInterimVisualisations = (newWord) ->
  console.log 'interim will be updated'

updateFinalVisualisations = (newSentence) ->
  console.log 'final will be updated'












#
#
#
#getAverageSentiment =  ->
#  totalSentiment = 0
#  count = 0
#  for wordObj in wordsArr
#    s = wordObj.sentiment
#    if s > 0.1 or s < -0.1 then totalSentiment += s; count++
#  totalSentiment / count
#
#
#getStupidSentiment = (sentence) ->
#  sentiment = sentimentAnalysis sentence
#  if sentiment > 1 then sentiment = 1
#  else if sentiment < -1 then sentiment = -1
#  sentiment
#
#
#window.updateInterimResults = ->
#  sentence = $('#textAreaMain').val()   # Get full text
#  wordObj = addWordToArr sentence.split(' ').pop()
#  updateCloud(wordObj)
#  updateGauge(getStupidSentiment($('code#prelim-words').text()))
#
#window.updateForNewText = (final_transcript) ->
#  updateInterimResults()
#  requestEntityData(final_transcript)
#  insertHighlightedWordData(final_transcript)
#
#
#$('#textAreaMain').keypress (e) ->
#  if  e.keyCode == 0 or e.keyCode == 32
#    sentence = $('#textAreaMain').val()
#    wordObj = addWordToArr sentence.split(' ').pop()
#    updateCloud(wordObj)
#    updateInterimResults()
#    updateGauge(getStupidSentiment($('#textAreaMain').val()))
#
#
#  if [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) != -1
#    updateForNewText()


sentimentAnalysis = require 'sentiment-analysis'

wordsArr = []


addWordToArr = (word) ->
  sentiment = sentimentAnalysis word
  f = wordsArr.filter((item) -> item.word == word)
  if f.length == 0 then wordsArr.push {word:word, sentiment:sentiment, count:1}
  else for res in wordsArr then if res.word == word then res.count++; return res
  {word:word, sentiment:sentiment, count:1}


getAverageSentiment =  ->
  totalSentiment = 0
  count = 0
  for wordObj in wordsArr
    s = wordObj.sentiment
    if s > 0.1 or s < -0.1 then totalSentiment += s; count++
  totalSentiment / count


getStupidSentiment = (sentence) ->
  sentiment = sentimentAnalysis sentence
  if sentiment > 1 then sentiment = 1
  else if sentiment < -1 then sentiment = -1
  sentiment


window.updateForNewText = ->
  sentence = $('#textAreaMain').val()
  wordObj = addWordToArr sentence.split(' ').pop()
  window.updateGauge(getStupidSentiment(sentence))
  window.updateCloud(wordObj)


$('#textAreaMain').keypress (e) ->
  if  e.keyCode == 0 or e.keyCode == 32
    updateForNewText()





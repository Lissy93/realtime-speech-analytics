sentimentAnalysis = require 'sentiment-analysis'


class SpeechDataManager


  wordsArr = []
  fullText = ''


  addWordResults: (data) ->
    addWordToArr(data)


  addSentenceResults: (data) ->
    fullText = data


  getWords: -> wordsArr


  getFullText: -> formatFullTextNicely fullText


  addWordToArr = (word) ->
    sentiment = sentimentAnalysis word
    f = wordsArr.filter((item) -> item.word == word)
    if not f.length then wordsArr.push {word:word, sentiment:sentiment, count:1}
    else for r in wordsArr then if r.word == word then r.count++; return r
    wordsArr[wordsArr.length-1] # Returns the newly added word object

  formatFullTextNicely = (rawText) ->
    rawText.charAt(0).toUpperCase() + rawText.slice(1);


module.exports = SpeechDataManager


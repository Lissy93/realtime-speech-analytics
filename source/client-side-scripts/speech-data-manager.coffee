sentimentAnalysis = require 'sentiment-analysis'


class SpeechDataManager


  wordsArr = []
  fullText = ''


  addWordResults: (data) ->
    addWordToArr(data)


  addSentenceResults: (data) ->
    fullText = data


  getWords: -> wordsArr


  getFullText: -> fullText


  addWordToArr = (word) ->
    sentiment = sentimentAnalysis word
    f = wordsArr.filter((item) -> item.word == word)
    if f.length == 0 then wordsArr.push {word:word, sentiment:sentiment, count:1}
    else for res in wordsArr then if res.word == word then res.count++; return res
    {word:word, sentiment:sentiment, count:1}

module.exports = SpeechDataManager


##########################################################
## THIS FILE CONTAINS HELPER FUNCTIONS FOR CALCULATING  ##
## THE RAW RESULTS FROM INPUT TEXT READY FOR THE CHARTS ##
## E.G. SENTIMENT, KEYWORDS, DENSITY...                 ##
##########################################################

class TextCalculations

  sentimentAnalysis = null

  constructor: (@helpers) ->
    sentimentAnalysis = @helpers.sentimentAnalysis


  # @input: array of word objects
  # @output: a single decimal number between -1 and +1 indicating sentiment
  calcSentimentOfWords: (wordsObj) ->
    totalSentiment = 0
    count = 0
    for wordObj in wordsObj
      s = wordObj.sentiment
      if s > 0.1 or s < -0.1 then totalSentiment += s; count++
    if count and totalSentiment then totalSentiment / count
    else 0


  # @input: array of word objects
  # @output: the sentiment score from JUST the last part of the text
  calcRecentSentiment: (wordsObj) ->
    @calcSentimentOfWords(wordsObj.slice(-10))


  # @input: string of text, not too fussy
  # @output: the decimal sentiment result
  calcFullSentiment: (sentence) ->
    sentimentAnalysis sentence


module.exports = TextCalculations




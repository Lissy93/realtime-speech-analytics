removeWords = require 'remove-words'

uniformWord = (word) -> (''+word).toLowerCase().replace /\W/g, ''

window.insertHighlightedWordData = (text) ->
  keyWords = removeWords text # Array of keywords
  htmlText = ''
  aStyle =  'style="color: black; font-weight: bold; '  # style for key words
  aStyle += 'background: #D0A9F5; border-radius: 5px; padding: 1px" '
  for word in text.split " "
    if uniformWord(word) in keyWords
      htmlText += "<span #{aStyle}>#{word}</span> "
    else htmlText += "#{word} "
  $('#highlightedTerms').html(htmlText)
sentimentAnalysis = require 'sentiment-analysis'


$('#textAreaMain').keyup ->
  console.log sentimentAnalysis $(this).val()


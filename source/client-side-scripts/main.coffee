
# Include all packages, libraries, utilities etc for calculating results
helpers = {}
helpers.sentimentAnalysis = require 'sentiment-analysis'
helpers.removeWords = require 'remove-words'

# Include all sub-modules
pageActions = require './page-actions.coffee'         # Simple user interactions
DataManager = require './speech-data-manager.coffee'  # Manages all data
speechEmitter = require './speech-emitter.coffee'     # Handles speech rec
textEmitter = require './text-emitter.coffee'         # Calls emitters for text
TextCalculations  = require './text-calculations.coffee' # Handles all calcs

# Include all charts
basicText   = require './charts/basic-text.coffee'    # Fills in the text box
spiralWords = require './charts/instant-word-spiral.coffee' # Live words
gauge       = require './charts/gauge.coffee'         # Live sentiment gauge
cloud       = require './charts/cloud.coffee'         # Detailed full word cloud
pace       = require './charts/pace.coffee'           # Render pace data

# Create new instance of helper class, and pass in required packages
textCalculations = new TextCalculations helpers

# Create a new instance of data manager to keep track of text
dataManager = new DataManager(textCalculations)

# Initialise Charts
initialiseCharts = () ->
  spiralWords.initialiseChart()
  gauge.initialiseChart()
  cloud.initialiseChart()
  pace.initialiseChart()

# Word listen event, executed when a word is emitted
document.addEventListener 'word', ((e) ->
  dataManager.addWordResults e.detail
  spiralWords.updateChart e.detail
  gauge.updateChart textCalculations.calcRecentSentiment dataManager.getWords()
  pace.updateChart(e.pace.total, e.pace.count)
), false

# Sentence listen event, executed when a sentence is emitted or at end
document.addEventListener 'sentence', ((e) ->
  dataManager.addSentenceResults e.detail
  basicText.updateChart dataManager.getFullText()
  cloud.updateChart textCalculations.prioritiseWordsArr dataManager.getWords()
), false

# Expose public functions
window.startRecording = speechEmitter.startRecording
window.stopRecording  = speechEmitter.stopRecording
window.initialiseCharts = initialiseCharts
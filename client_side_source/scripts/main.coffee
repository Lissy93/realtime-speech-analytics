

# Include all sub-modules
pageActions = require './page-actions.coffee'         # Simple user interactions
DataManager = require './speech-data-manager.coffee'  # Manages all data
speechEmitter = require './speech-emitter.coffee'     # Handles speech rec
textEmitter = require './text-emitter.coffee'         # Calls emitters for text

# Create a new instance of data manager to keep track of text
dataManager = new DataManager()

# Expose public functions
window.startRecording = speechEmitter.startRecording
window.stopRecording  = speechEmitter.stopRecording

# Word listen event, executed when a word is emitted
document.addEventListener 'word', ((e) ->
  dataManager.addWordResults e.detail
  console.log 'WORD relieved'
), false

# Sentence listen event, executed when a sentence is emitted or at end
document.addEventListener 'sentence', ((e) ->
  dataManager.addSentenceResults e.detail
  console.log 'SENTENCE relieved'
), false





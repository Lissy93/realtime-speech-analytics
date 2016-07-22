entityExtraction = undefined
express = undefined
formatData = undefined
formatText = undefined
hpKey = undefined
router = undefined
express = require('express')
router = express.Router()
entityExtraction = require('haven-entity-extraction')
hpKey = require('../keys').hp

formatText = (tweetBody) ->
  tweetBody = tweetBody.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
  tweetBody = tweetBody.replace(/[^A-Za-z0-9 ]/g, '')
  tweetBody = tweetBody.substring(0, 5000)

formatData = (data) ->
  category = undefined
  key = undefined
  results = undefined
  _i = undefined
  _len = undefined
  _ref = undefined
  results = []
  _ref = Object.keys(data)
  _i = 0
  _len = _ref.length
  while _i < _len
    key = _ref[_i]
    category = key.charAt(0).toUpperCase() + key.split('_')[0].slice(1)
    results.push
      name: category
      items: data[key]
    _i++
  results = results.sort((a, b) ->
    b.items.length - (a.items.length)
  )

router.post '/', (req, res) ->
  entityExtraction formatText(req.body.text), hpKey, (data) ->
    res.json formatData(data)
module.exports = router

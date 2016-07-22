express = require('express')
router = express.Router()
locals = require('../../locals.json')

router.get '/', (req, res, next) ->
  res.render 'index', locals

module.exports = router

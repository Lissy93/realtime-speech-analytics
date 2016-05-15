var entityExtraction, express, formatData, formatText, hpKey, router;
express = require('express');
router = express.Router();
entityExtraction = require('haven-entity-extraction');
hpKey = require('../keys').hp;
formatText = function(tweetBody) {
  tweetBody = tweetBody.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  tweetBody = tweetBody.replace(/[^A-Za-z0-9 ]/g, '');
  return tweetBody = tweetBody.substring(0, 5000);
};
formatData = function(data) {
  var category, key, results, _i, _len, _ref;
  results = [];
  _ref = Object.keys(data);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    key = _ref[_i];
    category = key.charAt(0).toUpperCase() + key.split('_')[0].slice(1);
    results.push({
      name: category,
      items: data[key]
    });
  }
  return results = results.sort(function(a, b) {
    return b.items.length - a.items.length;
  });
};
router.post('/', function(req, res) {
  return entityExtraction(formatText(req.body.text), hpKey, function(data) {
    return res.json(formatData(data));
  });
});
module.exports = router;
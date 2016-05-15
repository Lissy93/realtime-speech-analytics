var HEIGHT, WIDTH, draw, fillScale, getSentimentForWord, inited, parentWidth, redraw, scaleColors, sizeScale, wordData;

parentWidth = $('svg#cloud').parent().width();

WIDTH = parentWidth;

HEIGHT = parentWidth / 2;

wordData = [];

inited = false;

getSentimentForWord = function(word) {
  var each, j, len;
  for (j = 0, len = wordData.length; j < len; j++) {
    each = wordData[j];
    if (each.word === word) {
      return each.sentiment;
    }
  }
  return 0;
};

scaleColors = ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#B4B4B4", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"];

fillScale = d3.scale.linear().domain([-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]).range(scaleColors);

sizeScale = d3.scale.linear().domain([0, 80]).range([13, 65]);

draw = function(words) {
  return d3.select('svg#cloud').attr('width', WIDTH).attr('height', HEIGHT).append('g');
};

redraw = function(words) {
  return d3.select('svg#cloud g').attr('transform', 'translate(150,150)').selectAll('text').data(words).enter().append('text').style('font-family', 'Impact').style('fill', function(d, i) {
    return fillScale(getSentimentForWord(d.word));
  }).attr('text-anchor', 'middle').attr('transform', function(d) {
    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
  }).text(function(d) {
    return d.word;
  });
};

$(function() {
  var theCloud;
  theCloud = d3.layout.cloud().size([WIDTH, HEIGHT]).words(wordData).rotate(function() {
    return ~~(Math.round(Math.random() * 5) * 45) - 90;
  }).font('Impact').fontSize(function(d) {
    return sizeScale(d.size);
  }).on('end', draw).start();
  return window.updateCloud = function(newData) {
    var f, j, len, res;
    f = wordData.filter(function(item) {
      return item.word === newData.word;
    });
    if (f.length === 0) {
      wordData.push({
        word: newData.word,
        sentiment: newData.sentiment,
        size: 1
      });
    } else {
      for (j = 0, len = wordData.length; j < len; j++) {
        res = wordData[j];
        if (res.word === newData.word) {
          res.size++;
        }
      }
    }
    theCloud.words(wordData).on('end', redraw).start();
    return wordData;
  };
});

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
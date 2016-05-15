
parentWidth = $('svg#cloud').parent().width()

WIDTH   = parentWidth     # Width constant for canvas and chart
HEIGHT  = parentWidth / 2 # Height constant for canvas and chart

wordData = []
inited = false

getSentimentForWord = (word) ->
  for each in wordData then if each.word == word then return each.sentiment
  0 # if for some reason we can't find the word, then just return neutral.

scaleColors = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#B4B4B4",
  "#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]

fillScale = d3.scale.linear()
.domain([-1,-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1])
.range(scaleColors)

sizeScale = d3.scale.linear()
.domain([0,80])
.range([13,65])


draw = (words) ->
  d3.select('svg#cloud')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .append('g')



redraw = (words) ->
  d3.select('svg#cloud g')
  .attr('transform', 'translate(150,150)')
  .selectAll('text')
  .data(words)
  .enter()
  .append('text')
#  .style('font-size', (d) -> d.size + 'px')
  .style('font-family', 'Impact')
  .style('fill', (d, i) -> fillScale getSentimentForWord d.word)
  .attr('text-anchor', 'middle')
  .attr('transform', (d) ->
    'translate(' + [d.x, d.y,] + ')rotate(' + d.rotate + ')')
  .text (d) -> d.word

$ ->
  theCloud = d3.layout.cloud().size([WIDTH, HEIGHT])
    .words(wordData)
    .rotate(-> ~ ~ (Math.round(Math.random()*5)*45)-90)
    .font('Impact').fontSize((d) -> sizeScale d.size )
    .on('end', draw).start()



  window.updateCloud = (newData) ->
    f = wordData.filter((item) -> item.word == newData.word)
    if f.length == 0
      wordData.push {word:newData.word, sentiment:newData.sentiment, size: 1}
    else for res in wordData then if res.word == newData.word then res.size++
    theCloud.words(wordData).on('end', redraw).start()
    wordData


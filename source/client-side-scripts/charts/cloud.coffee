

prelimWordCloud = null  # Will store the actual chart, once it's initialised
words = []              # Will store each of the preliminary words to display
height = 0              # Height of canvas (overwritten in initialisation)
width = 0               # Width of canvas (again, overwritten in initialisation)


initialiseChart = () ->

  height = Math.round($("#cloud").parent().width())
  width =  Math.round($("#cloud").parent().width())

  console.log height

  scaleColors = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#B4B4B4",
                 "#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]

  fillScale = d3.scale.linear()
  .domain([-1,-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1])
  .range(scaleColors)


  svg = d3.select('#cloud')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(250,250)')

  # Rendered the initial cloud
  draw = (words) ->
    cloud = svg.selectAll('g text')
    .data(words, (d) -> d.text )

    cloud.enter()
    .append('text')
    .style('font-family', 'Impact')
    .style('fill', (d, i) -> fillScale i )
    .attr('text-anchor', 'middle')
    .attr('font-size', 1)
    .text (d) -> d.text

    cloud.transition()
    .duration(600)
    .style('font-size', (d) -> d.size + 'px' )
    .attr('transform', (d) -> 'translate(' + [d.x, d.y ] + ')rotate(' + d.rotate + ')' )
    .style 'fill-opacity', 1

    cloud.exit()
    .transition()
    .duration(200)
    .style('fill-opacity', 1e-6)
    .attr('font-size', 1)
    .remove()

  prelimWordCloud = { update: (words) ->
    d3.layout.cloud()
    .size([ height, width])
    .words(words)
    .padding(5)
    .rotate(-> ~ ~(Math.random() * 2) * 90 )
    .font('Impact')
    .fontSize((d) -> d.size ).on('end', draw).start()
  }


updateChart = (wordsObjArr) ->

  sizeScale = d3.scale.linear()
  .domain([0,10])
  .range([20,100])

  prelimWordCloud.update wordsObjArr.map (d) ->
    {text:d.word, size: sizeScale(d.count)}



module.exports.initialiseChart = initialiseChart
module.exports.updateChart = updateChart
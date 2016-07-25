

prelimWordCloud = null  # Will store the actual chart, once it's initialised
words = []              # Will store each of the preliminary words to display
height = 500            # Height of canvas (overwritten in initialisation)
width = 500             # Width of canvas (again, overwritten in initialisation)


initialiseChart = () ->

  height = Math.round($("#word-spiral-container").width()) * 1.6
  width = Math.round($("#word-spiral-container").width()) * 1.6

  fill = d3.scale.linear()
    .domain([0, 15])
    .range(["#9C27B0", "#eeb9f7", "#6b057c"])

  svg = d3.select('#instant-word-spiral')
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
      .style('fill', (d, i) -> fill i )
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


updateChart = (newWords) ->
  newWords = newWords.split(' ')
  prelimWordCloud.update newWords.map (d) -> { text:d, size: 6+Math.random()*60}



module.exports.initialiseChart = initialiseChart
module.exports.updateChart = updateChart
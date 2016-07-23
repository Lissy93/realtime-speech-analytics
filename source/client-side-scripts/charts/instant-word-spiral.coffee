


initialiseChart = () ->
  width = Math.round($("#word-spiral-container").width())
  height = width
  centerX = width / 2
  centerY = height / 2
  radius = 150
  coils = 4
  rotation = 2 * Math.PI
  thetaMax = coils * 2 * Math.PI
  awayStep = radius / thetaMax
  chord = 20
  new_time = []
  theta = chord / awayStep

  while theta <= thetaMax
    away = awayStep * theta
    around = theta + rotation
    x = centerX + Math.cos(around) * away
    y = centerY + Math.sin(around) * away
    theta += chord / away
    new_time.push
      x: x
      y: y

  svg = d3.select('#instant-word-spiral')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')

  lineFunction = d3.svg.line()
    .x((d) -> d.x)
    .y((d) -> d.y)
    .interpolate('cardinal')

  svg.append('path')
    .attr('d', lineFunction(new_time))
    .attr('stroke', 'gray')
    .attr('stroke-width', 0.5)
    .attr 'fill', 'none'

  circles = svg.selectAll('circle')
    .data(new_time)
    .enter()
    .append('circle')
    .attr('cx', (d) -> d.x )
    .attr('cy', (d) -> d.y )
    .attr('r', 2)


updateChart = (data) ->
  ''

module.exports.initialiseChart = initialiseChart
module.exports.updateChart = updateChart
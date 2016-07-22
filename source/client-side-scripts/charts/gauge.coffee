gauge = (container, configuration) ->
  that = {}
  config =
    size: 200
    clipWidth: 200
    clipHeight: 110
    ringInset: 20
    ringWidth: 20
    pointerWidth: 10
    pointerTailLength: 5
    pointerHeadLengthPercent: 0.9
    minValue: 0
    maxValue: 10
    minAngle: -90
    maxAngle: 90
    transitionMs: 750
    majorTicks: 10
    labelFormat: d3.format(',g')
    labelInset: 10
    arcColorFn: d3.interpolateHsl(d3.rgb('#DF0101'), d3.rgb('#04B404'))
  range = undefined
  r = undefined
  pointerHeadLength = undefined
  value = 0
  svg = undefined
  arc = undefined
  scale = undefined
  ticks = undefined
  tickData = undefined
  pointer = undefined
  donut = d3.layout.pie()

  deg2rad = (deg) -> deg * Math.PI / 180

  newAngle = (d) -> config.minAngle + scale(d) * range

  configure = (configuration) ->
    prop = undefined
    for prop of configuration
      `prop = prop`
      config[prop] = configuration[prop]
    range = config.maxAngle - (config.minAngle)
    r = config.size / 2
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent)
    # a linear scale that maps domain values to a percent from 0..1
    scale = d3.scale.linear()
      .range([ 0, 1 ])
      .domain([ config.minValue, config.maxValue ])
    ticks = scale.ticks(config.majorTicks)
    tickData = d3.range(config.majorTicks).map(-> 1 / config.majorTicks )
    arc = d3.svg.arc()
      .innerRadius(r - (config.ringWidth) - (config.ringInset))
      .outerRadius(r - (config.ringInset))
      .startAngle((d, i) ->  deg2rad config.minAngle + (d * i) * range )
      .endAngle((d, i) -> deg2rad config.minAngle + (d * (i + 1)) * range )

  centerTranslation = ->  'translate(' + r + ',' + r + ')'

  isRendered = ->  svg != undefined

  render = (newValue) ->
    svg = d3.select(container)
      .append('svg:svg')
      .attr('class', 'gauge')
      .attr('width', config.clipWidth)
      .attr('height', config.clipHeight)

    centerTx = centerTranslation()
    arcs = svg.append('g').attr('class', 'arc').attr('transform', centerTx)
    arcs.selectAll('path')
      .data(tickData)
      .enter()
      .append('path')
      .attr('fill', (d, i) -> config.arcColorFn d * i )
      .attr 'd', arc

    lg = svg.append('g').attr('class', 'label').attr('transform', centerTx)
    lg.selectAll('text')
      .data(ticks)
      .enter()


    lineData = [
      [ config.pointerWidth / 2, 0 ]
      [ 0, -pointerHeadLength ]
      [ -(config.pointerWidth / 2), 0 ]
      [ 0, config.pointerTailLength ]
      [ config.pointerWidth / 2, 0 ]
    ]
    pointerLine = d3.svg.line().interpolate('monotone')
    pg = svg.append('g')
      .data([ lineData ])
      .attr('class', 'pointer')
      .attr('transform', centerTx)

    pointer = pg.append('path')
      .attr('d', pointerLine)
      .attr('transform', 'rotate(' + config.minAngle + ')')

    update if newValue == undefined then 0 else newValue


  update = (newValue, newConfiguration) ->
    if newConfiguration != undefined then configure newConfiguration
    ratio = scale(newValue)
    newAngle = config.minAngle + ratio * range
    pointer.transition()
      .duration(config.transitionMs)
      .ease('elastic')
      .attr 'transform', 'rotate(' + newAngle + ')'


  that.configure = configure
  that.isRendered = isRendered
  that.render = render
  that.update = update
  configure configuration
  that





$ ->
  parentWidth = $('#power-gauge').parent().width()
  powerGauge = gauge('#power-gauge',
    size: parentWidth
    clipWidth: parentWidth
    clipHeight: parentWidth / 1.8
    ringWidth: 60
    maxValue: 10
    transitionMs: 4000)

  window.updateGauge = (val) -> powerGauge.update((val / 2 + 0.5) * 10)

  powerGauge.render()

  updateGauge(0)


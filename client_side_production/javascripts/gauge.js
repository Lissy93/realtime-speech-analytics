var gauge;

gauge = function(container, configuration) {
  var arc, centerTranslation, config, configure, deg2rad, donut, isRendered, newAngle, pointer, pointerHeadLength, r, range, render, scale, svg, that, tickData, ticks, update, value;
  that = {};
  config = {
    size: 200,
    clipWidth: 200,
    clipHeight: 110,
    ringInset: 20,
    ringWidth: 20,
    pointerWidth: 10,
    pointerTailLength: 5,
    pointerHeadLengthPercent: 0.9,
    minValue: 0,
    maxValue: 10,
    minAngle: -90,
    maxAngle: 90,
    transitionMs: 750,
    majorTicks: 10,
    labelFormat: d3.format(',g'),
    labelInset: 10,
    arcColorFn: d3.interpolateHsl(d3.rgb('#DF0101'), d3.rgb('#04B404'))
  };
  range = void 0;
  r = void 0;
  pointerHeadLength = void 0;
  value = 0;
  svg = void 0;
  arc = void 0;
  scale = void 0;
  ticks = void 0;
  tickData = void 0;
  pointer = void 0;
  donut = d3.layout.pie();
  deg2rad = function(deg) {
    return deg * Math.PI / 180;
  };
  newAngle = function(d) {
    return config.minAngle + scale(d) * range;
  };
  configure = function(configuration) {
    var prop;
    prop = void 0;
    for (prop in configuration) {
      prop = prop;
      config[prop] = configuration[prop];
    }
    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);
    scale = d3.scale.linear().range([0, 1]).domain([config.minValue, config.maxValue]);
    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {
      return 1 / config.majorTicks;
    });
    return arc = d3.svg.arc().innerRadius(r - config.ringWidth - config.ringInset).outerRadius(r - config.ringInset).startAngle(function(d, i) {
      return deg2rad(config.minAngle + (d * i) * range);
    }).endAngle(function(d, i) {
      return deg2rad(config.minAngle + (d * (i + 1)) * range);
    });
  };
  centerTranslation = function() {
    return 'translate(' + r + ',' + r + ')';
  };
  isRendered = function() {
    return svg !== void 0;
  };
  render = function(newValue) {
    var arcs, centerTx, lg, lineData, pg, pointerLine;
    svg = d3.select(container).append('svg:svg').attr('class', 'gauge').attr('width', config.clipWidth).attr('height', config.clipHeight);
    centerTx = centerTranslation();
    arcs = svg.append('g').attr('class', 'arc').attr('transform', centerTx);
    arcs.selectAll('path').data(tickData).enter().append('path').attr('fill', function(d, i) {
      return config.arcColorFn(d * i);
    }).attr('d', arc);
    lg = svg.append('g').attr('class', 'label').attr('transform', centerTx);
    lg.selectAll('text').data(ticks).enter();
    lineData = [[config.pointerWidth / 2, 0], [0, -pointerHeadLength], [-(config.pointerWidth / 2), 0], [0, config.pointerTailLength], [config.pointerWidth / 2, 0]];
    pointerLine = d3.svg.line().interpolate('monotone');
    pg = svg.append('g').data([lineData]).attr('class', 'pointer').attr('transform', centerTx);
    pointer = pg.append('path').attr('d', pointerLine).attr('transform', 'rotate(' + config.minAngle + ')');
    return update(newValue === void 0 ? 0 : newValue);
  };
  update = function(newValue, newConfiguration) {
    var ratio;
    if (newConfiguration !== void 0) {
      configure(newConfiguration);
    }
    ratio = scale(newValue);
    newAngle = config.minAngle + ratio * range;
    return pointer.transition().duration(config.transitionMs).ease('elastic').attr('transform', 'rotate(' + newAngle + ')');
  };
  that.configure = configure;
  that.isRendered = isRendered;
  that.render = render;
  that.update = update;
  configure(configuration);
  return that;
};

$(function() {
  var parentWidth, powerGauge;
  parentWidth = $('#power-gauge').parent().width();
  powerGauge = gauge('#power-gauge', {
    size: parentWidth,
    clipWidth: parentWidth,
    clipHeight: parentWidth / 1.8,
    ringWidth: 60,
    maxValue: 10,
    transitionMs: 4000
  });
  window.updateGauge = function(val) {
    return powerGauge.update((val / 2 + 0.5) * 10);
  };
  powerGauge.render();
  return updateGauge(0);
});

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
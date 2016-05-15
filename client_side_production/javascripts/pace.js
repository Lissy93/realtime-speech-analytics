var paceData, paceHigh, paceLow, paceMed, renderTimePaceChart;

paceLow = 80;

paceMed = 120;

paceHigh = 200;

paceData = [];

renderTimePaceChart = function() {
  var chart, chartData, i, len, paceObj;
  chartData = {
    x: 'x',
    columns: [['x'], ['Pace']]
  };
  for (i = 0, len = paceData.length; i < len; i++) {
    paceObj = paceData[i];
    chartData.columns[0].push(paceObj.y);
    chartData.columns[1].push(paceObj.x);
  }
  console.log(chartData);
  return chart = c3.generate({
    bindto: '#paceTime',
    data: chartData
  });
};

window.updatePace = function(paceTotal, eventCount) {
  var pace, paceColor;
  pace = (paceTotal / eventCount) / 5;
  paceData.push({
    x: pace,
    y: eventCount
  });
  paceColor = '#848484';
  if (pace < paceLow) {
    paceColor = '#04B404';
  } else if (pace > paceHigh) {
    paceColor = '#DF0101';
  }
  $('#word_rate_label').text(parseInt(pace)).css('color', paceColor);
  return renderTimePaceChart();
};

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */
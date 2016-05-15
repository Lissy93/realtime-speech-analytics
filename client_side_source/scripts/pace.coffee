
paceLow = 80
paceMed = 120
paceHigh= 200

paceData = []


renderTimePaceChart = ->

  chartData = {x: 'x', columns: [['x'],['Pace']]}
  for paceObj in paceData
    chartData.columns[0].push paceObj.y
    chartData.columns[1].push paceObj.x

  console.log chartData

  chart = c3.generate(
    bindto: '#paceTime'
    data: chartData
  )


window.updatePace = (paceTotal, eventCount) ->
  # Calculate Pace
  pace = (paceTotal / eventCount) / 5

# Add to Array
  paceData.push {x: pace, y: eventCount }

  # Get pace color
  paceColor =  '#848484'
  if pace < paceLow then paceColor = '#04B404'
  else if pace > paceHigh then paceColor = '#DF0101'

  # Set text field value and color
  $('#word_rate_label').text(parseInt(pace)).css('color', paceColor)


  renderTimePaceChart()


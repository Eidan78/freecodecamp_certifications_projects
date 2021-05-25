async function barChart() {
  // Access data

  const data = await d3.json(
    'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  );
  const dataset = data.data;
  const parseTime = d3.timeParse('%Y-%m-%d');
  const xAccessor = (d) => parseTime(d[0]);
  const yAccessor = (d) => d[1];

  // Draw chart
  const width = 1000;
  let dimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 40,
      right: 50,
      bottom: 60,
      left: 80,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Create scales

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, yAccessor)])
    .range([dimensions.boundedHeight, 0]);

  // Create canvas

  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const svg = d3.select('svg');

  // Create axes
  const xAxis = d3.axisBottom().scale(xScale);
  svg
    .append('g')
    .attr('id', 'x-axis')
    .call(xAxis)
    .attr(
      'transform',
      `translate(${dimensions.margin.left}, ${
        dimensions.boundedHeight + dimensions.margin.top
      })`
    );

  const yAxis = d3.axisLeft().scale(yScale);
  svg
    .append('g')
    .attr('id', 'y-axis')
    .call(yAxis)
    .attr(
      'transform',
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  //Create axes labels

  const xAxisLabel = d3
    .select('#x-axis')
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 17)
    .attr('fill', '#616161')
    .style('font-size', '1.4em')
    .html('Date');

  const yAxisLabel = d3
    .select('#y-axis')
    .append('text')
    .attr('fill', '#616161')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 30)
    .style('transform', `rotate(-90deg)`)
    .style('font-size', '1.4em')
    .attr('text-anchor', 'middle')
    .html('Gross Domestic Product');

  // Create bars
  const barWidth = dimensions.boundedWidth / dataset.length;

  const bars = bounds
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d) => xScale(xAccessor(d)))
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('width', barWidth)
    .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr('class', 'bar')
    .style('fill', 'cornflowerblue')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])

    // Mouse event handlers for bars and tooltip
    .on('mouseover', (d, i) => {
      d3.select(d.currentTarget).style('fill', '#547cc7');
      tooltip.transition().duration(200).style('visibility', 'visible');
      tooltip
        .html(
          '<strong>Date: </strong>' +
            i[0] +
            '<br><strong>GDP:</strong> $ ' +
            i[1] +
            ' billion'
        )
        .style('left', d.pageX + 'px')
        .style('top', d.pageY - 28 + 'px')
        .attr('data-date', i[0])
        .attr('data-gdp', i[1]);
    })
    .on('mouseleave', onMouseLeave);

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
    d3.selectAll('rect').style('fill', 'cornflowerblue');
  }

  //  Tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('visibility', 'hidden');
}

barChart();

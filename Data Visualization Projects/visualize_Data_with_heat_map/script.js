async function drawScatter() {
  // Access data

  const data = await d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  );
  const dataset = data.monthlyVariance;

  const xAccessor = (d) => d.year;
  const yAccessor = (d) => d.month;

  // Draw chart
  const width = 1400;
  let dimensions = {
    width,
    height: width * 0.4,
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
    .scaleTime()
    .domain([new Date('2021-11-01'), new Date('2021-01-01')])
    .range([dimensions.boundedHeight, 0])
    .nice();

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
  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format('d'));
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

  const yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.timeFormat('%B'));
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
    .attr('y', dimensions.margin.bottom - 7)
    .attr('fill', '#616161')
    .style('font-size', '1.4em')
    .html('Years');

  const yAxisLabel = d3
    .select('#y-axis')
    .append('text')
    .attr('fill', '#616161')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 30)
    .style('transform', `rotate(-90deg)`)
    .style('font-size', '1.4em')
    .attr('text-anchor', 'middle')
    .html('Months');

  // Create cells
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const line = bounds
    .append('path')
    .attr('d', lineGenerator(dataset))
    .attr('fill', 'none')
    .attr('stroke', '#af9358')
    .attr('stroke-width', '2');
}
drawScatter();

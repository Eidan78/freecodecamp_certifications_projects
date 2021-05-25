async function drawScatter() {
  // Access data

  const data = await d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
  );

  const parseDate = d3.timeParse('%Y');
  const timeFormat = d3.timeFormat('%M:%S');
  const xAccessor = (d) => parseDate(d.Year);
  const yAccessor = (d) => new Date(d.Seconds * 1000);

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

  // Create scales 2390, 2210]
  const years = [new Date(1993, 0, 1), new Date(2016, 0, 1)];
  const times = [new Date(2400 * 1000), new Date(2210 * 1000)];
  const xScale = d3
    .scaleTime()
    .domain([d3.min(years), d3.max(years)])
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleTime()
    .domain([d3.max(times), d3.min(times)])
    .range([dimensions.boundedHeight, 0]);
  console.log([d3.max(data, yAccessor), d3.min(data, yAccessor)]);

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

  const yAxis = d3.axisLeft().scale(yScale).tickFormat(timeFormat);
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
    .html('Time in minutes');

  // Draw data

  const dots = bounds
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', 6)
    .attr('class', 'dot')
    .style('fill', (d) => (d.Doping ? '#EF5670' : 'cornflowerblue'))
    .attr('data-xvalue', xAccessor)
    .attr('data-yvalue', yAccessor)

    // Mouse event handlers for bars and tooltip
    .on('mouseover', (d, i) => {
      tooltip.transition().duration(200).style('visibility', 'visible');
      tooltip
        .html(
          '<strong>Name: </strong>' +
            i.Name +
            '<br><strong>Year: </strong>' +
            d.target.getAttribute('data-xvalue').split(' ')[3] +
            '<br><strong>Time: </strong>' +
            i.Time +
            (i.Doping ? '<br><strong>Doping: </strong>' + i.Doping : '')
        )
        .style('left', d.pageX + 'px')
        .style('top', d.pageY - 28 + 'px')
        .attr('data-year', d.target.getAttribute('data-xvalue'));
    })
    .on('mouseleave', onMouseLeave);

  function onMouseLeave() {
    tooltip.transition().duration(200).style('visibility', 'hidden');
  }

  //  Tooltip

  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('font-size', '0.8em')
    .style('visibility', 'hidden')
    .attr('text-anchor', 'start');

  // Draw Legend

  const legendContainer = svg.append('g').attr('id', 'legend');

  const legendText1 = d3
    .select('#legend')
    .append('text')
    .attr('class', 'legendText')
    .attr('fill', '#616161')
    .style('font-size', '0.7em')
    .attr('text-anchor', 'start')
    .html('No doping allegations')

    .attr('x', dimensions.width - dimensions.margin.right - 157)
    .attr('y', dimensions.boundedHeight / 2 + 15)
    .attr('width', 200)
    .attr('height', 50);

  const legendText2 = d3
    .select('#legend')
    .append('text')
    .attr('class', 'legendText')
    .attr('fill', '#616161')
    .style('font-size', '0.7em')
    .attr('text-anchor', 'start')
    .html('Riders with doping allegations')
    .attr('x', dimensions.width - dimensions.margin.right - 200)
    .attr('y', dimensions.boundedHeight / 2 + 45)
    .attr('width', 200)
    .attr('height', 50);

  const nonDoping = d3
    .select('#legend')
    .append('rect')
    .attr('fill', 'cornflowerblue')
    .attr('x', dimensions.width - dimensions.margin.right - 30)
    .attr('y', dimensions.boundedHeight / 2 + 1)
    .attr('width', 20)
    .attr('height', 20);

  const doping = d3
    .select('#legend')
    .append('rect')
    .attr('fill', '#EF5670')
    .attr('x', dimensions.width - dimensions.margin.right - 30)
    .attr('y', dimensions.boundedHeight / 2 + 32)
    .attr('width', 20)
    .attr('height', 20);
}
drawScatter();

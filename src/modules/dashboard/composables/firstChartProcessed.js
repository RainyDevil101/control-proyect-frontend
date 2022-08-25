const firstChartProcessed = (data) => {

  //FIRST CHART
  
  let counts = {};
  let arrayToExcel = [];

  let destinationsArray = [];
  let destinationsChart = [];

  for (let d of data) {
    destinationsArray.push(d.destination_name);
  }

  destinationsArray.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  let sortableDestinations = Object.fromEntries(
    Object.entries(counts).sort(([, a], [, b]) => b - a)
  );

  const sliced = Object.fromEntries(
    Object.entries(sortableDestinations).slice(0, 5)
  );

  const destinationsName = Object.keys(sliced);
  const destinationsValue = Object.values(sliced);

  destinationsChart.push(destinationsName, destinationsValue);

  const firstChartDataProcessed = destinationsChart;

  //To Excel data

  for(let d in sortableDestinations) {
    arrayToExcel.push({'Destino': d, 'Cantidad': sortableDestinations[d]})
  };

  return {
    firstChartDataProcessed,
    arrayToExcel
  };
};

export default firstChartProcessed;

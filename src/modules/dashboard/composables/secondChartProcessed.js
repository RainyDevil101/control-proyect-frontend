const secondChartProcessed = (data) => {
  let counts = {};
  let operatorsToExcel = [];

  let operatorsArray = [];
  let operatorsChart = [];

  for (let d of data) {
    operatorsArray.push(d.created_by_name);
  }

  operatorsArray.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  let sortableOperators = Object.fromEntries(
    Object.entries(counts).sort(([, a], [, b]) => b - a)
  );

  const sliced = Object.fromEntries(Object.entries(sortableOperators).slice(0, 5));

  const operatorsName = Object.keys(sliced);
  const operatorsValue = Object.values(sliced);

  operatorsChart.push(operatorsName, operatorsValue);

  const secondChartDataProcessed = operatorsChart;

  //To Excel

  for(let d in sortableOperators) {
    operatorsToExcel.push({'Operador': d, 'Cantidad': sortableOperators[d]})
  };

  return {
    secondChartDataProcessed,
    operatorsToExcel,
  };
};

export default secondChartProcessed;

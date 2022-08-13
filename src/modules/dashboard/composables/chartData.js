import { ref } from "vue";

const chartData = (data) => {
  const firstChartValue = ref(null);
  const secondChartValue = ref(null);
  const thirdChartValue = ref(null);
  const errorMessages = ref(false);

  if (data.length > 0) {
    //FirstChart

    console.log(data);
    
    const destinationsArray = [];
    const counts = {};
    const destinationsChart = [];
    
    for(let d of data) {
        destinationsArray.push(d.destination_name);
    };

    destinationsArray.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    const destinationsName = Object.keys(counts);
    const destinationsValue = Object.values(counts);

    destinationsChart.push(destinationsName,
        destinationsValue);

        console.log(destinationsChart);

    firstChartValue.value = destinationsChart;

    //SecondChart

    secondChartValue.value = "";

    //ThirdChart

    thirdChartValue.value = "";

    errorMessages.value = false;
  } else {
    firstChartValue.value = null;
    secondChartValue.value = null;
    thirdChartValue.value = null;
    errorMessages.value = true;
  }

  return {
    firstChartValue,
    secondChartValue,
    thirdChartValue,
    errorMessages,
  };
};

export default chartData;

import { ref } from "vue";
import firstChartProcessed from "./firstChartProcessed";
import secondChartProcessed from "./secondChartProcessed";
import thirdChartProcessed from "./thirdChartProcessed";

const chartData = (data) => {
  const firstChartValue = ref(null);
  const secondChartValue = ref(null);
  const thirdChartValue = ref(null);
  const errorMessages = ref(false);
  const sortableDestinationsToExcel = ref(null);
  const sortableOperatorsToExcel = ref(null);
  const sortableDelaysToExcel = ref(null);

  if (data.length > 0) {
    
    //FirstChart
   
    const { firstChartDataProcessed, arrayToExcel } = firstChartProcessed(data);
    firstChartValue.value = firstChartDataProcessed;
    sortableDestinationsToExcel.value = arrayToExcel;
   
    //SecondChart

    const { secondChartDataProcessed, operatorsToExcel } = secondChartProcessed(data);
    secondChartValue.value = secondChartDataProcessed;
    sortableOperatorsToExcel.value = operatorsToExcel;

    //ThirdChart
    
    const materialsDispatched = data.filter(key => key.pendiente === 0);

    const { thirdChartDataProcessed, dataToExcelDelays } = thirdChartProcessed(materialsDispatched);
    thirdChartValue.value = thirdChartDataProcessed;
    sortableDelaysToExcel.value = dataToExcelDelays;

    // Errors

    errorMessages.value = false;

  } else {

    firstChartValue.value = null;
    secondChartValue.value = null;
    thirdChartValue.value = null;
    sortableDestinationsToExcel.value = null;
    sortableOperatorsToExcel.value = null;
    sortableDelaysToExcel.value = null;
    errorMessages.value = true;

  }

  return {
    firstChartValue,
    sortableDestinationsToExcel,
    secondChartValue,
    sortableOperatorsToExcel,
    thirdChartValue,
    sortableDelaysToExcel,
    errorMessages,
  };
};

export default chartData;

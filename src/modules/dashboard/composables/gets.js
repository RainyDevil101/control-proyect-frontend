import { computed, ref } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";
import chartData from "./chartData";

const getMaterialsCharts = (
  dates = {
    date_in: {
      initDate: "",
      finDate: "",
    },
    divisionSearch: "",
  }
) => {
  const store = useStore();
  const gettingDate = ref(dates);
  const firstChart = ref(null);
  const sortableDestinationToExcelExport = ref(null);
  const secondChart = ref(null);
  const sortableOperatorToExcelExport = ref(null);
  const thirdChart = ref(null);
  const sortableDelayToExcelExport = ref(null);
  const errorMessage = ref(false);

  const chartValues = (gettingDate) => {
    if (!gettingDate) return;

    const dateFormated = cloneDeep(gettingDate);

    const data = computed(() =>
      store.getters["materials/gettingData"](dateFormated)
    );

    const { allMaterialsFiltered } = data.value;

    const {
      firstChartValue,
      sortableDestinationsToExcel,
      secondChartValue,
      sortableOperatorsToExcel,
      thirdChartValue,
      sortableDelaysToExcel,
      errorMessages,
    } = chartData(allMaterialsFiltered);

    firstChart.value = firstChartValue.value;
    secondChart.value = secondChartValue.value;
    thirdChart.value = thirdChartValue.value;
    sortableDestinationToExcelExport.value = sortableDestinationsToExcel.value;
    sortableOperatorToExcelExport.value = sortableOperatorsToExcel.value;
    sortableDelayToExcelExport.value = sortableDelaysToExcel.value;
    errorMessage.value = errorMessages.value;

    return;
  };

  chartValues(gettingDate.value);

  return {
    chartValues,
    firstChart,
    sortableDestinationToExcelExport,
    secondChart,
    sortableOperatorToExcelExport,
    thirdChart,
    sortableDelayToExcelExport,
    errorMessage,

    statusCharts: computed(() => store.getters["materials/statusCharts"]),
  };
};

export default getMaterialsCharts;

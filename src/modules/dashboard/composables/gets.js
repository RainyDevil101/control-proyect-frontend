import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash';
import chartData from './chartData';


const getMaterialsCharts = (dates = {
    initDate: "",
    finDate: "",
    divisionSearch: "",
}) => {

    const store = useStore();
    const gettingDate = ref(dates);
    const firstChart = ref(null);
    const secondChart = ref(null);
    const thirdChart = ref(null);
    const forthChart = ref(null);
    const fifthChart = ref(null);
    const sixChart = ref(null);
    const sevenChart = ref(null);
    const errorMessage = ref(false);

    const chartValues = (gettingDate) => {
        
        if (!gettingDate) return;
        
        const dateFormated = cloneDeep(gettingDate);
        
        const data = computed(() => store.getters['materials/gettingData'](dateFormated));

        const { allMaterialsFiltered } = data.value;
        
        const { firstChartValue, secondChartValue, thirdChartValue, forthChartValue, fifthChartValue, sixChartValue, sevenChartValue, errorMessages } = chartData(allMaterialsFiltered);

        console.log(secondChartValue.value);
        
        firstChart.value = firstChartValue.value;
        secondChart.value = secondChartValue.value;
        thirdChart.value = thirdChartValue.value;
        forthChart.value = forthChartValue.value;
        fifthChart.value = fifthChartValue.value;
        sixChart.value = sixChartValue.value;
        sevenChart.value = sevenChartValue.value;
        errorMessage.value = errorMessages.value;

        return;

    };

    chartValues(gettingDate.value);

    return {
        chartValues,
        firstChart,
        secondChart,
        thirdChart,
        forthChart,
        fifthChart,
        gettingDate,
        sixChart,
        sevenChart,
        errorMessage,

        statusCharts: computed(() => store.getters['materials/statusCharts']),
    };
};

export default getMaterialsCharts
import { ref } from "vue";

const chartData = (data) => {

    const firstChartValue = ref(null);
    const secondChartValue = ref(null);
    const thirdChartValue = ref(null);
    const forthChartValue = ref(null);
    const fifthChartValue = ref(null);
    const sixChartValue = ref(null);
    const sevenChartValue = ref(null);
    const errorMessages = ref(false);

    if (data.length > 0) {

        //FirstChart

        firstChartValue.value = '';

        //SecondChart

        secondChartValue.value = '';

        //ThirdChart

        thirdChartValue.value = '';

        errorMessages.value = false

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
    }

}

export default chartData
<template>
  <div class="up">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    thirdChart: {
      type: Array,
      required: true,
    },
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const delays = props.thirdChart[0];
    const delaysData = props.thirdChart[1];
    const averageDelays = props.thirdChart[2];
    const averageMilliseconds = props.thirdChart[3];

    let average = averageDelays[0];

    return {
      delays,
      delaysData,
      averageDelays,
      average,

      chartData: {
        labels: ['Despacho esperado dentro de 48 horas', 'Promedio de demora'],
        datasets: [
          {
            label: "Promedio tardanza de despacho de bultos en horas.",
            backgroundColor: ["#B5D99C"],
            data: [48, averageMilliseconds],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.up {
  background-color: white;
  width: 90%;
  max-width: 1200px;
  min-width: 300px;
  overflow: auto;
  border-radius: 4px;
}

.average {
  text-align: center;
  margin: 8px 0 8px 0;
}
</style>
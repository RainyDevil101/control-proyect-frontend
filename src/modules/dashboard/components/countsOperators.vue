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
    secondChart: {
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

    const operatorsName = props.secondChart[0];
    const operatorsCounts = props.secondChart[1];

    return {
      operatorsName,
      operatorsCounts,

      chartData: {
        labels: operatorsName,
        datasets: [
          {
            label: "REGISTROS",
            data: operatorsCounts,
            backgroundColor: ["#E75A7C"],
          borderWidth: 1
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
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
</style>

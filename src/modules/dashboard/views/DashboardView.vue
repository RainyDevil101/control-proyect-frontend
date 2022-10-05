<template>
  <div class="wrapper">
    <div class="filter-align">
      <div class="filter">
        <h3><b>FILTRAR</b></h3>
        <div class="input-date-search">
          <div class="dates">
            <div class="input-config">
              <h5><b>Desde</b></h5>
              <input type="date" v-model="filters.date_in.initDate" />
            </div>
            <div class="input-config">
              <h5><b>Hasta</b></h5>
              <input type="date" v-model="filters.date_in.finDate" />
            </div>
            <div>
              <button @click="onReset" class="btn button-generate">
                <b>Resetear</b>
              </button>
            </div>
          </div>
          <div class="buttons-container">

            <div class="header-buttons">
              <p>Exportar a excel</p>
            </div>

            <div>
              <button
                class="btn button-generate"
                @click="onGenerateExcelDestinations"
              >
                <b>Destinos</b>
              </button>
            </div>
            <div>
              <button
                class="btn button-generate"
                @click="onGenerateExcelOperators"
              >
                <b>Operadores</b>
              </button>
            </div>
            <div>
              <button
                class="btn button-generate"
                @click="onGenerateExcelDelays"
              >
                <b>Tiempo demora</b>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage === true" class="noData">
      <div>
        <no-data />
      </div>
    </div>

    <div v-else class="dashboard-view">
      <div class="chart countsDestinations">
        <counts-destinations
          v-if="firstChart"
          :key="firstChart"
          :firstChart="firstChart"
        />
        <no-data v-else />
      </div>
      <div class="chart countOperators">
        <counts-operators
          v-if="secondChart"
          :key="secondChart"
          :secondChart="secondChart"
        />
        <no-data v-else />
      </div>
      <div class="chart averageDelays">
        <average-delays
          v-if="thirdChart"
          :key="thirdChart"
          :thirdChart="thirdChart"
        />
        <no-data v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import countsOperators from "../components/countsOperators.vue";
import countsDestinations from "../components/countsDestinations.vue";
import averageDelays from "../components/averageDelays.vue";
import getMaterialsCharts from "../composables/gets";
import NoData from "../components/NoData.vue";
import sendData from "../composables/sendDataToExcel";
import createFile from "../composables/createExcelFile";
import Swal from "sweetalert2";

export default {
  components: {
    countsDestinations,
    countsOperators,
    averageDelays,
    NoData,
  },

  setup() {
    const filters = ref({
      date_in: {
        initDate: "",
        finDate: "",
      },
      materials_divisions: "",
    });

    const {
      firstChart,
      sortableDestinationToExcelExport,
      secondChart,
      sortableOperatorToExcelExport,
      thirdChart,
      sortableDelayToExcelExport,
      gettingDate,
      errorMessage,
      chartValues,
      statusCharts,
    } = getMaterialsCharts(filters.value);

    const { postData } = sendData();
    const { createExcelFile } = createFile();

    watch(
      () => [
        filters.value.date_in.initDate,
        filters.value.date_in.finDate,
        filters.value.materials_divisions,
      ],
      () => {
        chartValues(filters.value);
      }
    );

    return {
      filters,
      firstChart,
      sortableDestinationToExcelExport,
      secondChart,
      sortableOperatorToExcelExport,
      thirdChart,
      sortableDelayToExcelExport,
      gettingDate,
      errorMessage,
      chartValues,
      statusCharts,
      postData,
      createExcelFile,

      onReset: () => {
        filters.value = {
          date_in: {
            initDate: "",
            finDate: "",
          },
          materials_divisions: "",
        };
        return;
      },
      onGenerateExcelDestinations: async () => {
        new Swal({
          title: "Generando informe, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let dates = filters.value.date_in;
        let category = "DESTINOS";

        let { errors, excel, nice } = await createExcelFile(
          category,
          sortableDestinationToExcelExport.value,
          dates
        );

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Informe generado",
            `El archivo ${excel.value} se ha generado con éxito.`
          );
        }
      },
      onGenerateExcelOperators: async () => {
        new Swal({
          title: "Generando informe, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let dates = filters.value.date_in;
        let category = "OPERADORES";

        let { errors, excel, nice } = await createExcelFile(
          category,
          sortableOperatorToExcelExport.value,
          dates
        );

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Informe generado",
            `El archivo ${excel.value} se ha generado con éxito.`
          );
        }
      },
      onGenerateExcelDelays: async () => {
        new Swal({
          title: "Generando informe, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let dates = filters.value.date_in;
        let category = "DEMORA";

        let { errors, excel, nice } = await createExcelFile(
          category,
          sortableDelayToExcelExport.value,
          dates
        );

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Informe generado",
            `El archivo ${excel.value} se ha generado con éxito.`
          );
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>

  h1, p {
    margin: 0;
    padding: 0;
  }
.wrapper {
  height: 100%;
}

.noData {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-view {
  margin: auto;
  padding-bottom: 70px;
  display: block;
  gap: 12px;
  padding-left: 4px;
  padding-right: 4px;
}

.filter-align {
  padding-top: 6rem;
  margin-bottom: 30px;
}

.filter {
  margin: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 300px;
  background-color: white;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.input-date-search {
  display: block;
  align-items: center;
  justify-content: center;
}

.chart {
  display: flex;
  justify-content: center;
  margin: 8px 0 8px 0;
}

.input-config {
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px 6px 5px 6px;
}

h3 {
  text-decoration: underline;
}

.header-buttons {
  margin: 2rem auto 1rem auto;
  padding: 10px;
}
.header-buttons p{
  border: 1px solid black;
  font-size: 1.5rem;
  border-radius: 4px;
}

.buttons-container {
  display: block;
  margin: auto;
}

.button-generate {
  color: white;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  width: 150px;
  margin: 4px auto;
  
}

//X-Small devices (portrait phones, less than 576px)
//No media query for `xs` since this is the default in Bootstrap

//Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .dashboard-view > div {
    min-width: 500px;
  }
}

@media screen and (min-width: 768px) {
  .dashboard-view > div {
    min-width: 500px;
  }

  // .countsDestinations .countOperators .artToDate .averageCompleted .rcPrevented .noPerAnswer .cuantityfaena .questions {
  //   grid-column-start: 1;
  //   grid-column-end: -1;
  // }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
}
</style>

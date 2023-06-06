<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">

    <div class="alarm-wrapper">
      <h1>En proceso de ingreso</h1>
      <div class="filter">
        <p>Ubicación:</p>
        <select v-model="filters.ubication">
          <option value="">TODAS</option>
          <option v-for="place of places" :key="place.name" :value="place.id">
            {{ place.place }}
          </option>
        </select>
      </div>
      <div class="body-wrapper">
        <div class="pendiente-wrapper">
          <table class="table-wrapper">
            <thead>
              <tr>
                <th>Código</th>
                <th class="id">ID</th>
                <th class="id"></th>
              </tr>
            </thead>
            <tbody>
              <pendientesFiltered v-for="pendienteFiltered of pendientesFiltered" :key="pendienteFiltered.id"
                :pendienteFiltered="pendienteFiltered" />
            </tbody>
          </table>
        </div>
      </div>
      <div class="button-container">
        <button @click="$router.push({ name: 'menu-refunds' })" type="button" class="buttons-styles">
          Volver
        </button>
        <button @click="onExportToExcel" type="button" class="buttons-styles">
          Exportar a excel
        </button>
      </div>
    </div>
  </div>
</template>
    
<script>
import { watch, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import useRefunds from "../../operatorRefund/composables/operatorRefundsStore";
import createFileFinished from "@/modules/adminRefund/composables/createExcelFileFinished";
import PendientesFiltered from "../components/PendientesFiltered.vue";
import getPlaces from "@/modules/get/getPlace";

export default {
  components: { PendientesFiltered, Loader },
  setup() {

    const { getRefundsFilteredByplace, pendientesFiltered, status } = useRefunds();

    const refundStatus = "En_proceso_ingreso";

    const filters = ref({
      ubication: ""
    });

    const { places } = getPlaces();

    watch(
      () => [
        filters.value.ubication,
      ],
      () => {
        getRefundsFilteredByplace(filters.value.ubication)
      }
    );

    getRefundsFilteredByplace();

    const { createExcelFileFinished } = createFileFinished();

    return {
      filters,
      pendientesFiltered,
      getRefundsFilteredByplace,
      status,
      places,
      onExportToExcel: async () => {
        new Swal({
          title: "Generando archivo, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const refundsData = pendientesFiltered.value;

        const { errors, nice } = await createExcelFileFinished(refundsData, refundStatus);

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Exportado a excel"
          );
        }
      },
    };
  },
};
</script>
    
<style lang="scss" scoped>
  
  .table-wrapper {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
  }
  
  .table-wrapper tr:nth-child(even) {
      background-color: #f2f2f2;
  }
  
  .table-wrapper th {
      color: white;
      background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
      text-align: left;
      padding: 12px 8px;
  }
  
  .id {
      width: 100px;
  }
    
  .alarm-wrapper {
    min-height: 400px;
    background-color: #fff;
  }
  
  .alarm-wrapper h1 {
    text-align: center;
    margin: 4px 0;
  }
  
  .body-wrapper {
    height: 60vh;
    overflow: auto;
  }
  
  .button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
  
  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // max-width: 400px;
    margin: 20px;
  }
  
  .filter p {
    width: 150px;
  }
  
  @media screen and (min-width: 768px) {
    
  }
    </style>
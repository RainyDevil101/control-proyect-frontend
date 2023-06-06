<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="alarm-wrapper">
    <h1>Material contabilizado</h1>
    <div class="filter">
      <p>Ubicación:</p>
      <select v-model="filters.ubication">
        <option value="">TODAS</option>
        <option v-for="place of places" :key="place.name" :value="place.id">
          {{ place.place }}
        </option>
      </select>
    </div>
    <div class="overflow">
      <table class="table-wrapper ">
        <thead>
          <tr>
            <th>Estado de la devolución</th>
            <th class="id">ID</th>
          </tr>
        </thead>
        <tbody>
          <completaFiltered v-for="completaFiltered of completasFiltered" :key="completaFiltered.id"
            :completaFiltered="completaFiltered" />
        </tbody>
      </table>
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
</template>

<script>
import { watch, ref } from "vue";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import useRefunds from "../composables/refundsStore";
import createFileFinished from "@/modules/adminRefund/composables/createExcelFileFinished";
import CompletaFiltered from "../../refund/components/CompletaFiltered.vue";
import getPlaces from "@/modules/get/getPlace";

export default {
  components: { CompletaFiltered, Loader },
  setup() {
    const { getCompletedRefundsFilteredByplace, completasFiltered, status } = useRefunds();
    const { places } = getPlaces();

    const refundStatus = "Material_Contabilizado";

    const filters = ref({
      ubication: ""
    });

    watch(
      () => [
        filters.value.ubication,
      ],
      () => {
        getCompletedRefundsFilteredByplace(filters.value.ubication)
      }
    );

    getCompletedRefundsFilteredByplace();

    const { createExcelFileFinished } = createFileFinished();

    return {
      getCompletedRefundsFilteredByplace,
      completasFiltered,
      filters,
      status,
      places,
      onExportToExcel: async () => {
        new Swal({
          title: "Generando archivo, espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const refundsData = completasFiltered.value;

        const { errors, excel, nice } = await createExcelFileFinished(refundsData, refundStatus);

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

.alarm-wrapper {
  margin: auto;
  background-color: #fff;
}

.alarm-wrapper h1 {
  text-align: center;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.overflow {
  height: 60vh;
  overflow: auto;
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

.table-wrapper {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.table-wrapper th {
    color: white;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    text-align: left;
    padding: 12px 8px;
}

.id {
    width: 80px;
}

@media screen and (min-width: 768px) {
}
</style>
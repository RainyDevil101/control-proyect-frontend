<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">

    <div class="alarm-wrapper">
      <h1>Devolución Pendiente</h1>
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
              </tr>
            </thead>
            <tbody>
              <pendientesFiltered v-for="pendienteFiltered of pendientesFiltered" :key="pendienteFiltered.id"
                :pendienteFiltered="pendienteFiltered" />
            </tbody>
          </table>
        </div>
      </div>
      <div class="back-button">
        <button @click="$router.push({ name: 'home-view' })" type="button" class="buttons-styles">
          Volver
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { watch, ref } from "vue";
import Loader from "@/modules/components/Loader.vue";
import useRefunds from "../composables/operatorRefundsStore";
import PendientesFiltered from "../components/PendientesFiltered.vue";
import getPlaces from "@/modules/get/getPlace";

export default {
  components: { PendientesFiltered, Loader },
  setup() {

    const { getRefundsFilteredByplace, pendientesFiltered, status } = useRefunds();


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

    return {
      filters,
      pendientesFiltered,
      getRefundsFilteredByplace,
      status,
      places,
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

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.not-registers {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  margin: auto;
  height: 60vh;
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
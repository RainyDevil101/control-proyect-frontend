<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div class="header">
        <h1>BULTOS FINALIZADOS</h1>
      </div>
      <div class="filter">
        <p>Ubicación:</p>
        <select v-model="filters.ubication">
          <option value="">TODAS</option>
          <option v-for="place of places" :key="place.name" :value="place.id">
            {{ place.place }}
          </option>
        </select>
      </div>
      <div v-if="completasFiltered.length > 0" class="body-wrapper">
        <div class="pendiente-wrapper">
          <completaFiltered
            v-for="completaFiltered of completasFiltered"
            :key="completaFiltered.id"
            :completaFiltered="completaFiltered"
          />
        </div>
      </div>

      <div v-else class="not-registers">
        <h1>NO HAY REGISTROS</h1>
      </div>
      <div class="back-button">
        <button
          @click="$router.push({ name: 'menu-refunds' })"
          type="button"
          class="buttons-styles"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";
import Loader from "@/modules/components/Loader.vue";
import useRefunds from "../composables/refundsStore";
import CompletaFiltered from "../../refund/components/CompletaFiltered.vue";
import getPlaces from "@/modules/get/getPlace";

export default {
  components: { CompletaFiltered, Loader },
  setup() {
    const { getCompletedRefundsFilteredByplace, completasFiltered, status } = useRefunds();

    const filters = ref({
      ubication: ""
    });

    const { places } = getPlaces();

    watch(
      () => [
        filters.value.ubication,
      ],
      () => {
        getCompletedRefundsFilteredByplace(filters.value.ubication)
      }
    );

    getCompletedRefundsFilteredByplace();

    return {
      completasFiltered,
      filters,
      status,
      places,
    };
  },
};
</script>

<style lang="scss" scoped>

.alarm-wrapper {
  min-height: 400px;
  margin-top: 70px;
  margin-bottom: 70px;
  background-color: #fff;
  border-radius: 4px;
  min-width: 338px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}

.body-wrapper {
  cursor: default;
  height: 500px;
  overflow: auto;
  margin: auto;
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
  height: 500px;
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
  .alarm-wrapper {
    max-width: 600px;
  }
}
</style>
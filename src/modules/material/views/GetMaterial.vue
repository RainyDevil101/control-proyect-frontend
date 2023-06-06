<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="alarm-wrapper">
    <h1>Despachos Pendientes</h1>
    <div class="overflow">
      <table class="table-wrapper ">
        <thead>
          <tr>
            <th>Código</th>
            <th>Número de transporte</th>
            <th class="id">ID</th>
          </tr>
        </thead>
        <tbody>
          <pendiente v-for="pendiente of pendientes" :key="pendientes.id" :pendiente="pendiente" />
        </tbody>
      </table>
    </div>

    <div class="back-button">
    </div>
    <button @click="$router.push({ name: 'menu-materials' })" type="button" class="buttons-styles">
      Volver
    </button>
  </div>
</template>

<script>
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";

import Pendiente from "../components/Pendiente.vue";

export default {
  components: { Pendiente, Loader },
  setup() {

    const { pendientes, status } = useMaterials();

    return {
      pendientes,
      status,
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

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.overflow {
  height: 70vh;
  overflow: auto;
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
    width: 50px;
}

@media screen and (min-width: 768px) {
}
</style>
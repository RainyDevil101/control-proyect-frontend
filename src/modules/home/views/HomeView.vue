<template>
  <div class="home-wrapper">
    <div class="pendientes-wrapper">
      <div v-if="pendientes.length > 0">
        <pendientes-menu
        v-for="pendiente of pendientes"
        :key="pendiente.id"
        :pendiente="pendiente"
      />
      </div>
      <div class="not-register" v-else>
        <h1>NO HAY REGISTROS PENDIENTES</h1>
      </div>
    </div>
  </div>
</template>

<script>
import PendientesMenu from "../components/PendientesMenu.vue";
import useMaterials from "@/modules/material/composables/materialsStore";

export default {
  components: { PendientesMenu },
  setup() {
    const { pendientes } = useMaterials();

    return {
      pendientes,
    };
  },
};
</script>

<style lang="scss" scoped>

h1, p {
  margin: 0;
  padding: 0;
}

.home-wrapper {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-register {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pendientes-wrapper {
    margin-top: 3rem;
    background-color: white;
    width: 90vw;
    height: 90vh;
    min-width: 390px;
    max-width: 1024px;
    border-radius: 4px;
}

.pendiente-body {
    padding: 1rem;
    overflow: auto;
}


</style>
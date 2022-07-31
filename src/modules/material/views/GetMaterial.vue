<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div v-if="pendientes.length > 0" class="header">
        <h1>PENDIENTES</h1>
      </div>
      <div v-if="pendientes.length > 0" class="body-wrapper">
        <div class="pendiente-wrapper">
          <pendiente
            v-for="pendiente of pendientes"
            :key="pendientes.id"
            :pendiente="pendiente"
          />
        </div>
      </div>

      <div v-else class="not-registers">
        <h1>NO HAY REGISTROS</h1>
      </div>
        <div class="back-button">
          <button @click="$router.push({ name: 'menu-materials' })" type="buton" class="btn btn-warning">Volver</button>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";

import Pendiente from "../components/Pendiente.vue";

export default {
  components: { Pendiente, Loader },
  setup() {
    const store = useStore();

    const { pendientes, status } = useMaterials();

    return {
      pendientes,
      status,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.alarm-wrapper {
  height: 80vh;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  width: 90vw;
  min-width: 338px;
}

.header {
  text-align: center;
  height: 6%;
}

.body-wrapper {
  cursor: default;
  height: 94%;
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
  height: 100%;
}

@media screen and (min-width: 768px) {
  .alarm-wrapper {
    max-width: 600px;
  }
}
</style>
<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div v-if="allMaterials.length > 0" class="header">
        <h1>TODAS</h1>
      </div>
      <div v-if="allMaterials.length > 0" class="body-wrapper">
        <div class="pendiente-wrapper">
          <all-material
            v-for="allMaterial of allMaterials"
            :key="allMaterial.id"
            :allMaterial="allMaterial"
          />
        </div>
      </div>

      <div v-else class="not-registers">
        <h1>NO HAY REGISTROS</h1>
      </div>
      <div class="back-button">
        <button
          @click="$router.push({ name: 'menu-materials' })"
          type="buton"
          class="btn btn-warning"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";

import AllMaterial from "../components/AllMaterial.vue";

export default {
  components: { AllMaterial, Loader },
  setup() {
    const { allMaterials, status } = useMaterials();

    return {
      allMaterials,
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
  height: 100%;
  display: flex;
}

.alarm-wrapper {
  height: 80vh;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  width: 90vw;
  min-width: 338px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
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
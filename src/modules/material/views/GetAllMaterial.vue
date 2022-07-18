<template>

<loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="alarm-wrapper">
      <div class="header">
        <h1>TODAS</h1>
      </div>
      <div class="body-wrapper">
        <div class="pendiente-wrapper">
          <all-material
          v-for="allMaterial of allMaterials"
          :key="allMaterial.id"
          :allMaterial="allMaterial"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Loader from "@/modules/components/Loader.vue";
import useMaterials from "../composables/materialsStore";

import AllMaterial from "../components/AllMaterial.vue";

export default {
  components: { AllMaterial, Loader },
  setup() {
    const store = useStore();

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
  width: 100vw;
  height: 100vh;
  display: flex;
}

.alarm-wrapper {
  height: 80vh;
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
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

@media screen and (mind-width: 768px) {
}
</style>
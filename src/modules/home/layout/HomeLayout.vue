<template>
  <nabvar />
  <div v-if="status === 'CARGANDO'" class="loader-menu-wrapper">
    <loader />
  </div>
  <div v-else class="router-view-wrapper">
    <router-view />
  </div>
</template>

<script>
import useAuth from "@/modules/auth/composables/useAuth";
import Nabvar from "@/modules/components/Nabvar.vue";
import useMaterials from "@/modules/material/composables/materialsStore";
import getMaterial from "@/modules/material/composables/materialsStore";
import Loader from "@/modules/components/Loader.vue";
import { onUpdated } from "@vue/runtime-core";
export default {
  components: { Nabvar, Loader },

  setup() {
    const { getMaterials } = useAuth();
    const { materialId } = getMaterial();
    const { status } = useMaterials();

    getMaterials();

    return {
      getMaterials,
      status,
      materialId,
    };
  },
};
</script>

<style lang="scss" scoped>
.loader-menu-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
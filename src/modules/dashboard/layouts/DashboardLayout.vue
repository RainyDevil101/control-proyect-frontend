<template>
  <Nabvar />

  <Loader v-if="statusCharts === 'CARGANDO'"/>

  <router-view v-else />
</template>

<script>
import Nabvar from "@/modules/components/Nabvar.vue";
import useAuth from "@/modules/auth/composables/useAuth";
import Loader from "@/modules/components/Loader.vue";
import getMaterialsCharts from '../composables/gets';

export default {
  components: { Nabvar, Loader },

  setup() {
    const { getMaterials } = useAuth();
    const { statusCharts } = getMaterialsCharts();

    getMaterials();

    return {
      statusCharts,
    };
  },
};
</script>
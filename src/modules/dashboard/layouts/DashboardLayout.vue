<template>
  <Nabvar />

  <Loader v-if="statusCharts === 'CARGANDO'"/>

  <router-view v-else />
</template>

<script>
import { useStore } from "vuex";
import { onUpdated } from "vue";

import Nabvar from "@/modules/components/Navbar.vue";
import useAuth from "@/modules/auth/composables/useAuth";
import Loader from "@/modules/components/Loader.vue";
import getMaterialsCharts from '../composables/gets';

export default {
  components: { Nabvar, Loader },

  setup() {

    const store = useStore();

    const { getMaterials, reMaterials, reDestinations, reDivisions } = useAuth();

    const { statusCharts } = getMaterialsCharts();
    const status = store.state.auth.status;
    
    
    const materials = JSON.parse(localStorage.getItem('aM'));
    reMaterials(materials);
    const destinations = JSON.parse(localStorage.getItem('aD'));
    reDestinations(destinations);
    const divisions = JSON.parse(localStorage.getItem('aDi'));
    reDivisions(divisions);

    
    onUpdated(() => {
      getMaterials();
    }),
    getMaterials();

    return {
      statusCharts,
    };
  },
};
</script>
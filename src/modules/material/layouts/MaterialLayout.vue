<template>
  <Nabvar />

  <div class="width">
    <router-view />
  </div>
</template>

<script>
import { onUpdated } from '@vue/runtime-core';
import { useStore } from 'vuex';

import Nabvar from '@/modules/components/Navbar.vue';
import useAuth from '../../auth/composables/useAuth';


export default {
  components: { Nabvar },

  setup() {

    const store = useStore();

    const { getMaterials, reMaterials, reDestinations, reDivisions } = useAuth();

    onUpdated(() => {
      getMaterials();
    });

    const status = store.state.auth.status;

    const materials = JSON.parse(localStorage.getItem('aM'));
    reMaterials(materials);
    const destinations = JSON.parse(localStorage.getItem('aD'));
    reDestinations(destinations);
    const divisions = JSON.parse(localStorage.getItem('aDi'));
    reDivisions(divisions);

    getMaterials();

    return {
      status
    };
  },
};
</script>

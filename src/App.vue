<template>
<router-view/>
</template>

<script>
import { ref } from '@vue/reactivity';

import useAuth from './modules/auth/composables/useAuth';
import { useStore } from 'vuex';

export default {
  setup() {

    const { checkToken, reMaterials } = useAuth();

    const store = useStore();

    checkToken();

    const status = store.state.auth.status;

    const materials = JSON.parse(localStorage.getItem('aM'));
    reMaterials(materials);

    return {
      checkToken,
      status,

    };
  },
};
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    background-color: rgba(49, 49, 49, 0.756);
    /* font-size: 16px; */
    
    }



</style>

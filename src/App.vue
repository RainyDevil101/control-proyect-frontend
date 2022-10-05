<template>
<router-view/>
</template>

<script>
import { useStore } from 'vuex';
import useAuth from './modules/auth/composables/useAuth';

export default {
  setup() {

    const { checkToken, reMaterials, reDestinations, reDivisions, reUsers } = useAuth();

    const store = useStore();

    checkToken();

    const status = store.state.auth.status;

    const materials = JSON.parse(localStorage.getItem('aM'));
    reMaterials(materials);
    const destinations = JSON.parse(localStorage.getItem('aD'));
    reDestinations(destinations);
    const divisions = JSON.parse(localStorage.getItem('aDi'));
    reDivisions(divisions);
    const users = JSON.parse(localStorage.getItem('aU'));
    reUsers(users);

    return {
      checkToken,
      status,
    };
  },
};
</script>

<style>
  #app {
    background-color: rgb(243, 243, 243);
    height: 100%;
    min-height: 100vh;
    /* font-size: 16px; */
    
    }



</style>

<template>
<router-view/>
</template>

<script>
import { useStore } from 'vuex';
import useAuth from './modules/auth/composables/useAuth';

export default {
  setup() {

    const { checkToken, reMaterials, reDestinations, reLocations, reDivisions, reUsers } = useAuth();

    const store = useStore();

    checkToken();

    const status = store.state.auth.status;

    const materials = JSON.parse(localStorage.getItem('aM'));
    reMaterials(materials);
    const destinations = JSON.parse(localStorage.getItem('aD'));
    reDestinations(destinations);
    const locations = JSON.parse(localStorage.getItem('aL'));
    reLocations(locations);
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
    width: 100%;
    height: 100%;
    background-color: rgba(49, 49, 49, 0.756);
    /* font-size: 16px; */
    
    }



</style>

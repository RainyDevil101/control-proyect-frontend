<template>
    <Nabvar/>

    <router-view/>
</template>

<script>

import useAuth from '../../auth/composables/useAuth';
import { onUpdated } from '@vue/runtime-core';
import Nabvar from '@/modules/components/Navbar.vue';

export default {
  components: { Nabvar },

  setup() {

    const { getDestinations, getDivisions, getUsers, reUsers, reDestinations } = useAuth();


    onUpdated(() => {
      getDestinations();
      getDivisions();
      getUsers();
    })

    const users = JSON.parse(localStorage.getItem('aU'));
    reUsers(users);

    const destinations = JSON.parse(localStorage.getItem('aD'));
    reDestinations(destinations);

    getDestinations();
    getDivisions();
    getUsers();

    return { 
      getDestinations,
      getDivisions,
     };
  },
};
</script>
<template>
    <Nabvar/>

    <div class="width">
      <AdminUserBar />
      <router-view/>
    </div>
</template>

<script>

import { onUpdated } from '@vue/runtime-core';
import useAuth from '../../auth/composables/useAuth';
import Nabvar from '@/modules/components/Navbar.vue';
import AdminUserBar from '../components/AdminUserBar.vue';

export default {
  components: { Nabvar, AdminUserBar },

  setup() {

    const { getDestinations, getDivisions, getUsers, reUsers, reDestinations } = useAuth();


    // onUpdated(() => {
    //   getDestinations();
    //   getDivisions();
    //   getUsers();
    // })

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
<template>
  <router-view />
</template>

<script>
import useAuth from './modules/auth/composables/useAuth';

export default {
  setup() {

    const { checkToken } = useAuth();

    checkToken();




    return {
      checkToken,
    };
  },
};
</script>

<style>

#app {
  background-color: rgb(243, 243, 243);
  height: 100%;
  min-height: 100vh;

  

}

</style>

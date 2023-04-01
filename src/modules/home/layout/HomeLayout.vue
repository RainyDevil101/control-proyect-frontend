<template>
  <nabvar />
  <div>
    <router-view />
  </div>
</template>

<script>
import Nabvar from "@/modules/components/Navbar.vue";

export default {
  components: { Nabvar },

  setup() {


    return {
    };
  },
};
</script>
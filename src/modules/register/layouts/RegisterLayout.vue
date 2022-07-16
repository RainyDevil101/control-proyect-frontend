<template>
    <Nabvar/>

    <router-view/>
</template>

<script>

import useAuth from '../../auth/composables/useAuth';

import { onActivated } from '@vue/runtime-core';
import Nabvar from '@/modules/components/Nabvar.vue';

export default {
  components: { Nabvar },

  setup() {

    // const { getForums } = useAuth();
    // const { statusState } = getTerm();

    // onActivated(() => {
    //   getForums();
    // })

    // getForums();

    return { 

     };
  },
};
</script>
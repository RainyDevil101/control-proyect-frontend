<template>
    <Nabvar/>

    <router-view/>
</template>

<script>

import Nabvar from '@/modules/components/Nabvar.vue';
import useAuth from '../../auth/composables/useAuth';
import getMaterial from '../composables/materialsStore';
import { onUpdated } from '@vue/runtime-core';


export default {
  components: { Nabvar },

  setup() {

    const { getMaterials } = useAuth();
    const { materialId } = getMaterial();

    onUpdated(() => {
      getMaterials();
    });

    getMaterials();

    return { 
      materialId,
     };
  },
};
</script>
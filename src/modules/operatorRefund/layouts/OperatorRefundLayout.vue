<template>
    <Nabvar/>

    <div class="width">
      <router-view/>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { onUpdated } from '@vue/runtime-core';

import Nabvar from '@/modules/components/Navbar.vue';
import useAuth from '../../auth/composables/useAuth';
import getRefund from '../composables/operatorRefundsStore';


export default {
  components: { Nabvar },

  setup() {

    const store = useStore();

    const { getRefunds, renovateRefunds } = useAuth();
    const { refundId } = getRefund();

    onUpdated(() => {
      getRefunds();
    });

    const status = store.state.auth.status;

    const refunds = JSON.parse(localStorage.getItem('aR'));
    renovateRefunds(refunds);

    getRefunds();

    return { 
      refundId,
      status
     };
  },
};
</script>
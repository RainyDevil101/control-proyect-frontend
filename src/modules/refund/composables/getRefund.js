import { computed } from 'vue'
import { useStore } from 'vuex'


const useRefundStore = () => {

    const store = useStore();

    const getRefund = async (id) => {

        const resp = await store.dispatch('refunds/getRefund', id)
        return resp

    }

    const localStorageRefund = () => {
        store.commit('refunds/renovateUserNeeded')
    }


    return {
        getRefund,
        localStorageRefund,

        userNeeded: computed(() => store.getters['refunds/getRefundNeeded']),
        userNeededId: computed(() => store.getters['refunds/getRefundNeededId']),

    }
}

export default useRefundStore
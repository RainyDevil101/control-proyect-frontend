import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const useRefunds = () => {

    const pendientesFiltered = ref(null);

    const store = useStore();

    const getPendingRefund = async (id) => {
        const resp = await store.dispatch('refunds/getPendingRefund', id);

        return resp;
    };
    const getRefundsFilteredByplace = async (filters = '') => {

        const resp = computed(() =>
            store.getters["refunds/getPendientesFiltered"](filters)
        );

        pendientesFiltered.value = resp.value;

        return;
    };

    return {
        getPendingRefund,
        getRefundsFilteredByplace,
        pendientesFiltered,

        status: computed(() => store.getters['refunds/statusState']),
        pendientes: computed(() => store.getters['refunds/getPendientes']),
        allRefunds: computed(() => store.getters['refunds/getAllRefunds']),
        completedPendiente: computed(() => store.getters['refunds/getPendingCompleted']),
        imageOneCompleted: computed(() => store.getters['refunds/getCompletedImageOne']),
        imageTwoCompleted: computed(() => store.getters['refunds/getCompletedImageTwo']),
        imageOne: computed(() => store.getters['refunds/getImageOne']),
        imageTwo: computed(() => store.getters['refunds/getImageTwo']),



        refundPendingId: computed(() => store.getters['refunds/getPendingRefundNeeded']),
        refundPendingIdDate: computed(() => store.getters['refunds/getPendingRefundDateNeeded']),
        refundPendingIdStatus: computed(() => store.getters['refunds/getPendingRefundIdStatus']),
        pendiente: computed(() => store.getters['refunds/getPendiente']),
    };
};

export default useRefunds
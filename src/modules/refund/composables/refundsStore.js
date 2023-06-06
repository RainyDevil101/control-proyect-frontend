import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const useRefunds = () => {

    const almacenadasFiltered = ref(null);
    const completasFiltered = ref(null);

    const store = useStore();

    const getStoredRefund = async (id) => {
        const resp = await store.dispatch('refunds/getStoredRefund', id);

        return resp;
    };
    const getCompletedRefund = async (id) => {
        const resp = await store.dispatch('refunds/getCompletedRefund', id);
        return resp;
    };
    const getStoredRefundsFilteredByplace = async (filters = '') => {

        const resp = computed(() =>
            store.getters["refunds/getAlmacenadasFiltered"](filters)
        );

        almacenadasFiltered.value = resp.value;

        return;
    };
    const getCompletedRefundsFilteredByplace = async (filters = '') => {

        const resp = computed(() =>
            store.getters["refunds/getCompletedRefundsFiltered"](filters)
        );

        completasFiltered.value = resp.value;

        return;
    };

    return {
        getStoredRefund,
        getStoredRefundsFilteredByplace,
        almacenadasFiltered,
        getCompletedRefund,
        getCompletedRefundsFilteredByplace,
        completasFiltered,

        status: computed(() => store.getters['refunds/statusState']),
        almacenadas: computed(() => store.getters['refunds/getAlmacenadas']),
        completas: computed(() => store.getters['refunds/getCompletas']),
        pendingStored: computed(() => store.getters['refunds/getPendingStored']),
        imageOneCompleted: computed(() => store.getters['refunds/getCompletedImageOne']),
        imageTwoCompleted: computed(() => store.getters['refunds/getCompletedImageTwo']),
        imageOne: computed(() => store.getters['refunds/getImageOne']),
        imageTwo: computed(() => store.getters['refunds/getImageTwo']),



        refundIdStored: computed(() => store.getters['refunds/getRefundStoredNeeded']),
        refundStoredIdDate: computed(() => store.getters['refunds/getStoredRefundDateNeeded']),
        refundIdCompleted: computed(() => store.getters['refunds/getRefundCompletedNeeded']),
        refundIdCompletedDate: computed(() => store.getters['refunds/getRefundCompletedNeededDate']),
        refundStoredIdStatus: computed(() => store.getters['refunds/getStoredRefundIdStatus']),
        refundCompletedIdStatus: computed(() => store.getters['refunds/getCompletedRefundIdStatus']),
        almacenada: computed(() => store.getters['refunds/getAlmacenada']),
    };
};

export default useRefunds;
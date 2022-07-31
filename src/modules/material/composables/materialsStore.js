import { computed } from 'vue'
import { useStore } from 'vuex'


const useMaterials = () => {

    const store = useStore();

    const getMaterialPending = async (id) => {
        const resp = await store.dispatch('materials/getMaterialPending', id)
        return resp
    };
    const getMaterialCompleted = async (id) => {
        const resp = await store.dispatch('materials/getMaterialCompleted', id)
        return resp
    };

    return {
        getMaterialPending,
        getMaterialCompleted,

        status: computed(() => store.getters['materials/statusState']),
        pendientes: computed(() => store.getters['materials/getPendientes']),
        completas: computed(() => store.getters['materials/getCompletas']),
        allMaterials: computed(() => store.getters['materials/getAllMaterials']),
        completedPendiente: computed(() => store.getters['materials/getCompletedPendiente']),
        imageOneCompleted: computed(() => store.getters['materials/getCompletedImageOne']),
        imageTwoCompleted: computed(() => store.getters['materials/getCompletedImageTwo']),
        imageOne: computed(() => store.getters['materials/getImageOne']),
        imageTwo: computed(() => store.getters['materials/getImageTwo']),



        materialPendingId: computed(() => store.getters['materials/getMaterialPendingNeeded']),
        materialPendingIdDate: computed(() => store.getters['materials/getMaterialPendingNeededDate']),
        materialIdCompleted: computed(() => store.getters['materials/getMaterialCompletedNeeded']),
        materialIdCompletedDate: computed(() => store.getters['materials/getMaterialCompletedNeededDate']),
        materialPendingIdStatus: computed(() => store.getters['materials/getMaterialPendingIdStatus']),
        materialCompletedIdStatus: computed(() => store.getters['materials/getMaterialCompletedIdStatus']),
        pendiente: computed(() => store.getters['materials/getPendiente']),
    };
};

export default useMaterials
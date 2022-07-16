import { computed } from 'vue'
import { useStore } from 'vuex'


const useMaterials = () => {

    const store = useStore();


    const getMaterial = async (id) => {
        const resp = await store.dispatch('materials/getMaterial', id)
        return resp
    }

    return {
        getMaterial,

        status: computed(() => store.getters['materials/statusState']),
        pendientes: computed(() => store.getters['materials/getPendientes']),
        materialId: computed(() => store.getters['materials/getMaterialNeeded']),
        materialIdStatus: computed(() => store.getters['materials/getMaterialIdStatus']),
        pendiente: computed(() => store.getters['materials/getPendiente']),
    };
};

export default useMaterials
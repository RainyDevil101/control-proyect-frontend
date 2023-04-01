import { computed } from 'vue'
import { useStore } from 'vuex'


const useMaterialStore = () => {

    const store = useStore();

    const getMaterial = async (id) => {

        const resp = await store.dispatch('materials/getMaterial', id)
        return resp

    }

    const saveMaterial = async (id) => {

        const resp = await store.dispatch('materialNext/saveMaterial', id)
        return resp
    }

    const localStorageMaterial = () => {
        store.commit('materials/renovateUserNeeded')
    }


    return {
        getMaterial,
        saveMaterial,
        localStorageMaterial,

        userNeeded: computed(() => store.getters['materials/getMaterialNeeded']),
        userNeededId: computed(() => store.getters['materials/getMaterialNeededId']),

    }
}

export default useMaterialStore
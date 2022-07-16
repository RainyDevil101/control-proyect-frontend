import { computed, ref } from 'vue'
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

    // const checkToken = async() => {
    //     const resp = await store.dispatch('auth/readToken')
    //     return resp
    // }

    // const getUsers = async() => {
    //     const resp = await store.dispatch('users/loadUsers')
    //     return resp
    // }

    // const getForums = async() => {
    //     const resp = await store.dispatch('forums/loadForums')
    //     return resp
    // }

    // const logOut = () => {
    //     store.commit('auth/logOut')
    // }

    return {
        getMaterial,
        saveMaterial,
        localStorageMaterial,

        userNeeded: computed(() => store.getters['materials/getMaterialNeeded']),
        userNeededId: computed(() => store.getters['materials/getMaterialNeededId']),

        // authStatus: computed(() => store.getters['auth/currentState']),
        // userName: computed(() => store.getters['auth/userName'])
    }
}

export default useMaterialStore
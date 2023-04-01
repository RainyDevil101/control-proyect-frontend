import { computed } from 'vue'
import { useStore } from 'vuex'


const useAuth = () => {

    const store = useStore();

    const loginUser = async (user) => {

        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }
    const reMaterials = async (materials) => {
        const resp = await store.dispatch('materials/renoveMaterials', materials)
        return resp
    }
    const renovateRefunds = async (refunds) => {
        const resp = await store.dispatch('refunds/renovateRefunds', refunds)
        return resp
    }
    const reDestinations = async (destinations) => {
        const resp = await store.dispatch('destinations/renoveDestinations', destinations)
        return resp
    }
    const reDispatchPlaces = async (dispatchPlaces) => {
        const resp = await store.dispatch('dispatchPlaces/renoveDispatchPlaces', dispatchPlaces)
        return resp
    }
    const renovatePlaces = async (places) => {
        const resp = await store.dispatch('places/renovatePlaces', places)
        return resp
    }
    const reDivisions = async (divisions) => {
        const resp = await store.dispatch('divisions/renoveDivisions', divisions)
        return resp
    }
    const reClients = async (clients) => {
        const resp = await store.dispatch('clients/renoveClients', clients)
        return resp
    }
    const reUsers = async (users) => {
        const resp = await store.dispatch('users/renoveUsers', users)
        return resp
    }
    const checkToken = async() => {
        const resp = await store.dispatch('auth/readToken')
        return resp
    }
    const getMaterials = async() => {
        const resp = await store.dispatch('materials/loadMaterials')
        return resp
    }
    const getRefunds = async() => {
        const resp = await store.dispatch('refunds/loadRefunds')
        return resp
    }
    const getDestinations = async() => {
        const resp = await store.dispatch('destinations/loadDestinations');
        return resp
    }
    const getClients = async() => {
        const resp = await store.dispatch('clients/loadClients');
        return resp
    }
    const getDispatchPlaces = async() => {
        const resp = await store.dispatch('dispatchPlaces/loadDispatchPlaces');
        return resp
    }
    const getDivisions = async() => {
        const resp = await store.dispatch('divisions/loadDivisions');
        return resp
    }
    const getUsers = async() => {
        const resp = await store.dispatch('users/loadUsers');
        return resp
    }

    const logOut = () => {
        store.commit('auth/logOut')
    }

    return {

        userDivision: computed(() => store.getters['auth/getUserDivision']),
        userId: computed(() => store.getters['auth/getUserId']),
        pathWanted: computed(() => store.getters['auth/getPathWanted']),
        userRole: computed(() => store.getters['auth/getUserRole']),

        checkToken,
        loginUser,
        logOut,
        reMaterials,
        reDestinations,
        reDispatchPlaces,
        renovateRefunds,
        renovatePlaces,
        reDivisions,
        reClients,
        reUsers,
        getMaterials,
        getRefunds,
        getDestinations,
        getDivisions,
        getDispatchPlaces,
        getClients,
        getUsers,
    }
}

export default useAuth
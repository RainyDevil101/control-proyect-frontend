import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useDispatchPlaces = () => {

    const store = useStore();
    const term = ref("");

    const getDispatchPlaces = async () => {
        const resp = await store.dispatch('dispatchPlaces/loadDispatchPlaces');
        return resp;
    }

    return {

        term,
        getDispatchPlaces,

        status: computed(() => store.getters['dispatchPlaces/getStatus']),
        dispatchPlacesByTerm: computed(() => store.getters["dispatchPlaces/getDispatchPlacesByTerm"](term.value)),
        dispatchPlaceUpdate: computed(() => store.getters["dispatchPlaces/getUpdateDispatchPlace"]
        ),
        currentPage: computed(() => store.getters['dispatchPlaces/getCurrentPage']),
        numberOfPages: computed(() => store.getters['dispatchPlaces/getNumberOfPages']),
        getDispatchPlaceSelectedToUpdate: computed(() => store.getters['dispatchPlaces/getDispatchPlaceSelected'])
    };
};

export default useDispatchPlaces
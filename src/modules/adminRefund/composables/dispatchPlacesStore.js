import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useDispatchPlaces = () => {

    const store = useStore();
    const term = ref("");


    return {

        term,

        status: computed(() => store.getters['dispatchPlaces/getStatus']),
        dispatchPlacesByTerm: computed(() => store.getters["dispatchPlaces/getDispatchPlacesByTerm"](term.value)),
    };
};

export default useDispatchPlaces
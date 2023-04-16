import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useDestination = () => {

    const store = useStore();
    const term = ref("");

    const getDestinations = async () => {
        const resp = await store.dispatch('destinations/loadDestinations');
        return resp;
    }

    return {

        term,
        getDestinations,

        status: computed(() => store.getters['destinations/getStatus']),
        destinationsByTerm: computed(() => store.getters["destinations/getDestinationsByTerm"](term.value)),
        destinationUpdate: computed(() => store.getters["destinations/getUpdateDestination"]
        ),
        currentPage: computed(() => store.getters['destinations/getCurrentPage']),
        numberOfPages: computed(() => store.getters['destinations/getNumberOfPages']),
        getDestinationToUpdate: computed(() => store.getters['destinations/getDestinationSelected'])
    };
};

export default useDestination
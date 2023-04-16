import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useClients = () => {

    const store = useStore();
    const term = ref("");

    const getClients = async () => {
        const resp = await store.dispatch('clients/loadClients');
        return resp
    }


    return {
        term,
        getClients,

        status: computed(() => store.getters['clients/getStatus']),
        clientsByTerm: computed(() => store.getters["clients/getClientsByTerm"](term.value)),
        clientUpdate: computed(
            () => store.getters["clients/getUpdateClient"]
          ),
        currentPage: computed(() => store.getters['clients/getCurrentPage']),
        numberOfPages: computed(() => store.getters['clients/getNumberOfPages']),
        getClientSelectedToUpdate: computed(() => store.getters['clients/getClientSelected'])
    };
};

export default useClients
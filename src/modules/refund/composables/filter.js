import { computed } from "vue";
import { useStore } from "../../../store";

const filter = (filters = '') => {

    const store = useStore();
    
    const getPlacesFiltered = computed(() =>
    store.getters['refunds/getPendientesFiltered'](filters)
    );

    return {
        getPlacesFiltered,
    };
}

export default filter;
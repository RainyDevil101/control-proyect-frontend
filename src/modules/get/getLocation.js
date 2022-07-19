import { ref } from "vue";
import backendConnect from '../../api/backend';

const getLocations = () => {
    
    const locations = ref(null);
    const status = ref('CARGANDO');
    const secondStatus = ref('CARGANDO');
    
    const searchLocations = async () => {

        const {data} = await backendConnect.get('/api/location', {
            headers: { 'x-token': localStorage.getItem('token') }
        });
        const locationsArray = []
        const locationsDB = data.locations
        for(const location of locationsDB) {
            locationsArray.push(location)
        };
        locations.value = locationsArray
        status.value = 'RECIBIDO'
        secondStatus.value = 'RECIBIDO'
        return {locations, status, ok: true};
    };
    
    searchLocations();

    return {
        locations,
        searchLocations,
        status,
        secondStatus,
    }
}

export default getLocations;
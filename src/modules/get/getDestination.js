import { ref } from "vue";
import backendConnect from '../../api/backend';

const getDestinations = () => {
    
    const destinations = ref(null);
    const status = ref('CARGANDO');
    const secondStatus = ref('CARGANDO');
    
    const searchDestinations = async () => {

        const {data} = await backendConnect.get('/api/destination ', {
            headers: { 'x-token': localStorage.getItem('token') }
        });
        const destinationsArray = [];
        const destinationsDB = data.destinations;
        for(const destination of destinationsDB) {
            destinationsArray.push(destination)
        };
        destinations.value = destinationsArray;
        status.value = 'RECIBIDO';
        secondStatus.value = 'RECIBIDO';
        return {destinations, ok: true};
    }
    
    searchDestinations();

    return {
        destinations,
        searchDestinations,
        status,
        secondStatus,
    }
}

export default getDestinations;
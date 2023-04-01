import { ref } from "vue";
import backendConnect from '../../api/backend';

const getPlaces = () => {
    
    const places = ref(null);
    const placeStatus = ref('CARGANDO');
    
    const searchPlaces = async () => {

        const {data} = await backendConnect.get('/api/place ', {
            headers: { 'x-token': localStorage.getItem('token') }
        });
        const placesArray = [];
        const placesDB = data.places;
        for(const place of placesDB) {
            placesArray.push(place)
        };
        places.value = placesArray;
        placeStatus.value = 'RECIBIDO';

        return {places, ok: true};
    }
    
    searchPlaces();

    return {
        places,
        searchPlaces,
        placeStatus,
    }
}

export default getPlaces;
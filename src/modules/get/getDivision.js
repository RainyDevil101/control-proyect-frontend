import { ref } from "vue";
import backendConnect from '../../api/backend';

const getDivisions = () => {
    
    const divisions = ref(null);
    const status = ref('CARGANDO');
    const secondStatus = ref('CARGANDO');
    
    const searchDivisions = async () => {

        const {data} = await backendConnect.get('/api/division', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const divisionsArray = []
        const divisionsDB = data.divisions
        for(const division of divisionsDB) {
            divisionsArray.push(division)
            divisions.value = divisionsArray
            status.value = 'RECIBIDO'
            secondStatus.value = 'RECIBIDO'
        }
        return {divisions, ok: true}
    }
    
    searchDivisions()

    return {
        divisions,
        searchDivisions,
        status,
        secondStatus,
    }
}

export default getDivisions
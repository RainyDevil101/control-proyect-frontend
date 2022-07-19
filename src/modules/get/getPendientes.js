import { ref } from "vue";
import backendConnect from '../../api/backend';

const getPendientes = () => {
    
    const pendientes = ref(null);
    const status = ref('CARGANDO');
    const secondStatus = ref('CARGANDO');
    
    const searchPendientes = async () => {

        const {data} = await backendConnect.get('/api/material', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const materialsArray = []
        const materialsDB = data.materials
        for(const material of materialsDB) {
            materialsArray.push(material)
        };
        pendientes.value = materialsArray;
        status.value = 'RECIBIDO';
        secondStatus.value = 'RECIBIDO';
        return {pendientes, ok: true};
    }
    
    searchPendientes()

    return {
        pendientes,
        searchPendientes,
        status,
        secondStatus,
    }
}

export default getPendientes
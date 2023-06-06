import { ref } from "vue";
import backendConnect from '../../api/backend';

const getClients = () => {
    
    const clients = ref(null);
    const clientStatus = ref('CARGANDO');
    
    const searchClients = async () => {

        const all = true;

        const {data} = await backendConnect.get(`/api/client?all=${all}`, {
            headers: { 'x-token': localStorage.getItem('token') }
        });
        const clientsArray = [];
        const clientsDB = data.clients;
        for(const client of clientsDB) {
            clientsArray.push(client)
        };
        clients.value = clientsArray;
        clientStatus.value = 'RECIBIDO';

        return {clients, ok: true};
    }
    
    searchClients();

    return {
        clients,
        searchClients,
        clientStatus,
    }
}

export default getClients;
import { ref } from "vue";
import backendConnect from '../../api/backend';

const getUsers = () => {
    
    const users = ref(null);
    const status = ref('CARGANDO');
    
    const searchUsers = async () => {

        const {data} = await backendConnect.get('/api/user', {
            headers: { 'x-token': localStorage.getItem('token') }
        });

        
        if (data.users.length === 0) {

            console.log('asdas');
            users.value = "";
            status.value = 'RECIBIDO';

        } else {

            const usersArray = [];
            const usersDB = data.users;
            for(const user of usersDB) {
            };
            usersArray.push(user);
            users.value = usersArray;
            status.value = 'RECIBIDO';
        }

        return {users, ok: true};
    }
    
    searchUsers();


    return {
        users,
        searchUsers,
        status,
    }
}

export default getUsers;
<template>
    <Navbar />
    <div class="width">
        <AdminRefundBar />
        <RouterView />
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Navbar from '@/modules/components/Navbar.vue';
import AdminRefundBar from '../components/AdminRefundBar.vue';
import useAuth from '@/modules/auth/composables/useAuth';


export default {
    components: { Navbar, RouterView, AdminRefundBar },
    setup() {

    const { getClients, reClients, getDispatchPlaces, reDispatchPlaces } = useAuth();

    getClients();
    getDispatchPlaces();

    const clients = JSON.parse(localStorage.getItem('aClients'));
    reClients(clients);
    const dispatchPlaces = JSON.parse(localStorage.getItem('aPlaces'));
    reDispatchPlaces(dispatchPlaces);


        return {
            getClients,
            reClients,
            getDispatchPlaces,
            reDispatchPlaces
        }
    }
}

</script>
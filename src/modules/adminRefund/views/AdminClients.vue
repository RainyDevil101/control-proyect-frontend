<template>
    <div class="admin_menu-wrapper">
        <div v-if="clientUpdate === true" class="update">
            <UpdateClient @on:close="onShowUpdateClient" />
        </div>
        <div v-if="status === 'CARGANDO'">
            <loading />
        </div>
        <div v-else class="">
            <div class="header-wrapper">
                <p class="search-wrapper">
                    <label for="search">Buscar por nombre</label>
                    <input type="text" id="search" v-model="term">
                </p>
                <form class="form-wrapper" @submit.prevent="onSubmit">
                    <p>
                        <label for="name">Crear cliente</label>
                        <input type="text" id="name" v-model="clientName" maxlength="20">
                    </p>
                    <button type="submit" class="btn btn-warning button-create">Crear</button>
                </form>
            </div>
            <table class="table-wrapper">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th class="id">id</th>
                    </tr>
                </thead>
                <tbody>
                    <Client class="client-wrapper" v-for="client in clientsByTerm" :key="client.id" :client="client"
                        @on:open="onShowUpdateClient" />
                </tbody>
            </table>
            <div class="page_section-wrapper">
                <div class="page_button-wrapper">
                    <button class="button-page" @click="prevPage">Atrás</button>
                    <button class="button-page" @click="nextPage">Siguiente</button>
                </div>

                <div class="page-wrapper">
                    <p>Página: <span>{{ currentPage }}/</span>
                        <span>{{ numberOfPages }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import useClients from '../composables/clientsStore';
import Loading from '../components/Loading.vue';
import Client from '../components/Client.vue';
import UpdateClient from '../components/UpdateClient.vue';
import clientsCommand from '@/modules/refund/composables/clientsCommand';

export default {
    components: { Loading, Client, UpdateClient },

    setup() {

        const store = useStore();
        const clientName = ref('');

        const { status, clientsByTerm, term, clientUpdate, currentPage, numberOfPages } = useClients();

        const { postClient } = clientsCommand();


        return {
            postClient,
            status,
            clientsByTerm,
            term,
            clientName,
            clientUpdate,
            currentPage,
            numberOfPages,

            onSubmit: async () => {

                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const { errorsPost, nicePost } = await postClient(
                    clientName.value,
                );

                if (nicePost.value === false) {
                    Swal.fire("Error", `${errorsPost.value}.`, "error");
                    return;
                } else {
                    Swal.fire(
                        "Guardado",
                        "Cliente creado con éxito",
                        "success"
                    ).then(function (result) {
                        if (true) {
                            location.reload();
                        } else {
                            window.alert("Error, intente nuevamente");
                        }
                    });
                }
            },
            onShowUpdateClient: (id) => {
                if (clientUpdate.value === false) {
                    store.dispatch("clients/changeClientId", id);
                    store.dispatch("clients/changeClientUpdate", true);
                    return;
                } else {
                    store.dispatch("clients/changeClientUpdate", false);
                    return;
                }
            },
            nextPage: () => {

                let next = currentPage.value + 1;

                if (next > numberOfPages.value) {

                    return next = numberOfPages;

                }

                store.dispatch("clients/loadClients", next)
            },
            prevPage: () => {

                let prev = currentPage.value - 1;

                if (prev < 1) {
                    return prev = 1;
                }

                store.dispatch("clients/loadClients", prev)
            }
        };
    },
}
</script>

<style lang="scss" scoped>

.admin_menu-wrapper {
    background-color: white;
    padding: 10px;
}

.header-wrapper {
    display: flex;
    margin: 12px 0;
    flex-direction: column;
}

.search-wrapper, .form-wrapper {
    display: flex;
    flex-direction: column;
}
.header-wrapper label {
    padding: 8px;
    margin: 4px 0;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
}

.table-wrapper {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.table-wrapper tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-wrapper th {
    color: white;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    text-align: left;
    padding: 12px 8px;
}

.id {
    width: 50px;
}

.button-create {
    margin: 12px 0;
}

.page_section-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
}

.button-page {
    color: white;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    border: none;
    padding: 8px;
    margin-right: 4px;
}

.page-wrapper {
    font-weight: bold;
}

@media screen and (min-width: 768px) {
  
    .header-wrapper {
    display: flex;
    flex-direction: row;
}
.header-wrapper label {
    text-align: center;
    width: 160px;
    margin: 0 12px;
    padding: 8px;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
}

.search-wrapper, .form-wrapper {
    display: flex;
    flex-direction: row;

}

.button-create {

    height: 100%;
    margin: 0 12px;
}

}

</style>
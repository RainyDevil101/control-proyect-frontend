<template>
    <div v-if="userUpdate === true">
        <UpdateUserModal :roles="roles" @on:close="onShowUpdateUser" />
    </div>
    <div class="userList-wrapper" v-if="status === 'CARGANDO'">
        <loading />
    </div>
    <div v-else class="userList-wrapper">
        <table class="table-wrapper">
            <thead>
                <tr>
                    <th class="id">ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Rut</th>
                    <th>Cargo</th>
                </tr>
            </thead>
            <tbody>
                <User class="user-wrapper" v-for="user of users" :key="user.id" :user="user" @on:open="onShowUpdateUser"/>
            </tbody>
        </table>
        <div class="page_section-wrapper">
            <div class="page_button-wrapper">
                <button class="button-page" @click="prevPage">Atrás</button>
                <button class="button-page" @click="nextPage">Siguiente</button>
            </div>
            <div class="page-wrapper">
                <p>Totales: {{ total }}</p>
                <p>Página: <span>{{ currentPage }}/</span>
                    <span>{{ numberOfPages }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../components/User.vue';
import Loading from '../components/Loading.vue'
import getUsers from '../composables/getUsers';
import updateUser from '../composables/updateUser';
import UpdateUserModal from '../components/UpdateUserModal.vue';
import registUser from '../composables/registUser';

export default {

    components: { User, Loading, UpdateUserModal },
    setup() {

        const { users, currentPage, numberOfPages, nextPage, prevPage, total, status } = getUsers();
        const { onShowUpdateUser, userUpdate } = updateUser();
        const { roles } = registUser();

        return {
            users,
            currentPage,
            numberOfPages,
            total,
            nextPage,
            prevPage,
            status,
            onShowUpdateUser,
            userUpdate,
            roles
        };
    }
};

</script>

<style lang="scss" scoped>

.userList-wrapper {
    background-color: white;
    padding: 10px;
    overflow-y: auto;
}

.table-wrapper {
    width: 100%;
    min-width: 800px;
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
    display: flex;
}

.page-wrapper p {
    font-size: .8rem;
    margin: 0 4px;
}

</style>
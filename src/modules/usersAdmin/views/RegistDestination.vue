<template>
    <div class="admin_menu-wrapper">
        <div v-if="destinationUpdate === true" class="update">
            <UpdateDestination @on:close="onShowUpdateDestination" />
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
                        <label for="name">Nombre</label>
                        <input type="text" id="name" v-model="name" maxlength="20">
                    </p>
                    <p>
                        <label for="id">ID</label>
                        <input type="number" id="id" v-model="id" maxlength="20">
                    </p>
                    <button type="submit" class="btn btn-warning button-create">Crear</button>
                </form>
            </div>
            <table class="table-wrapper">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th class="id">ID</th>
                    </tr>
                </thead>
                <tbody>
                    <Destination v-if="destinationsByTerm.length > 0" class="destination-wrapper"
                        v-for="destination in destinationsByTerm" :key="destination.id" :destination="destination"
                        @on:open="onShowUpdateDestination" />
                </tbody>
            </table>
            <!-- <div class="page_section-wrapper">
                <div class="page_button-wrapper">
                    <button class="button-page" @click="prevPage">Atrás</button>
                    <button class="button-page" @click="nextPage">Siguiente</button>
                </div>

                <div class="page-wrapper">
                    <p>Página: <span>{{ currentPage }}/</span>
                        <span>{{ numberOfPages }}</span>
                    </p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import useDestinations from '../composables/destinationStore';
import Loading from '../components/Loading.vue';
import Destination from '../components/Destination.vue'
import destinationsCommand from '../composables/destinationsCommand';
import UpdateDestination from '../components/UpdateDestination.vue';


export default {
    components: { Loading, Destination, UpdateDestination },

    setup() {

        const store = useStore();
        const name = ref('');
        const id = ref('');

        const { status, destinationsByTerm, term, destinationUpdate, currentPage, numberOfPages } = useDestinations();

        const { postDestination } = destinationsCommand();


        return {
            postDestination,
            status,
            destinationsByTerm,
            term,
            name,
            id,
            destinationUpdate,
            currentPage,
            numberOfPages,

            onSubmit: async () => {

                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const { errorsPost, nicePost } = await postDestination(
                    name.value,
                    id.value
                );

                if (nicePost.value === false) {
                    Swal.fire("Error", `${errorsPost.value}.`, "error");
                    return;
                } else {
                    Swal.fire(
                        "Guardado",
                        "Ubicación de despacho creada con éxito",
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
            onShowUpdateDestination: (id) => {

                if (destinationUpdate.value === false) {
                    store.dispatch("destinations/changeDestinationId", id);
                    store.dispatch("destinations/changeDestinationUpdate", true);
                    return;
                } else {
                    store.dispatch("destinations/changeDestinationUpdate", false);
                    return;
                }
            },
            // nextPage: () => {

            //     let next = currentPage.value + 1;

            //     if (next > numberOfPages.value) {

            //         return next = numberOfPages;

            //     }

            //     store.dispatch("dispatchPlaces/loadDispatchPlaces", next)
            // },
            // prevPage: () => {

            //     let prev = currentPage.value - 1;

            //     if (prev < 1) {
            //         return prev = 1;
            //     }

            //     store.dispatch("dispatchPlaces/loadDispatchPlaces", prev)
            // }
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

.search-wrapper {
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
    width: 100px;
}

.button-create {
    margin: 12px 0;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    // background-color: red;
}

.form-wrapper p {
    display: flex;
    flex-direction: column;
}

// .page_section-wrapper {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: 12px;
// }

// .button-page {
//     color: white;
//     background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
//     border: none;
//     padding: 8px;
//     margin-right: 4px;
// }

.page-wrapper {
    font-weight: bold;
}

@media screen and (min-width: 1200px) {
  
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

.search-wrapper {
    display: flex;
    flex-direction: row;

}

.button-create {

    height: 100%;
    margin: 0 12px;
}

.form-wrapper {
    display: flex;
    flex-direction: row;
    // background-color: red;
}

.form-wrapper p {
    display: flex;
    flex-direction: row;
    width: 300px;
}


}

</style>
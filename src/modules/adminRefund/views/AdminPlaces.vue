<template>
    <div class="admin_menu-wrapper">
        <div v-if="dispatchPlaceUpdate === true" class="update">
            <UpdateDispatchPlace @on:close="onShowUpdateDispatchPlace" />
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
                        <label for="name">Crear destino</label>
                        <input type="text" id="name" v-model="dispatchPlaceName" maxlength="20">
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
                    <DispatchPlace class="dispatchPlace-wrapper" v-for="dispatchPlace in dispatchPlacesByTerm"
                        :key="dispatchPlace.id" :dispatchPlace="dispatchPlace" @on:open="onShowUpdateDispatchPlace" />
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
import useDispatchPlaces from '../composables/dispatchPlacesStore';
import Loading from '../components/Loading.vue';
import DispatchPlace from '../components/DispatchPlace.vue'
import dispatchPlacesCommand from '../composables/dispatchPlacesCommand';
import UpdateDispatchPlace from '../components/UpdateDispatchPlace.vue';


export default {
    components: { Loading, DispatchPlace, UpdateDispatchPlace },

    setup() {

        const store = useStore();
        const dispatchPlaceName = ref('');

        const { status, dispatchPlacesByTerm, term, dispatchPlaceUpdate, currentPage, numberOfPages } = useDispatchPlaces();

        const { postDispatchPlace } = dispatchPlacesCommand();


        return {
            postDispatchPlace,
            status,
            dispatchPlacesByTerm,
            term,
            dispatchPlaceName,
            dispatchPlaceUpdate,
            currentPage,
            numberOfPages,

            onSubmit: async () => {

                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const { errorsPost, nicePost } = await postDispatchPlace(
                    dispatchPlaceName.value,
                );

                if (nicePost.value === false) {
                    Swal.fire("Error", `${errorsPost.value}.`, "error");
                    return;
                } else {
                    Swal.fire(
                        "Guardado",
                        "Ubicación de despatcho creada con éxito",
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
            onShowUpdateDispatchPlace: (id) => {

                if (dispatchPlaceUpdate.value === false) {
                    store.dispatch("dispatchPlaces/changeDispatchPlaceId", id);
                    store.dispatch("dispatchPlaces/changeDispatchPlaceUpdate", true);
                    return;
                } else {
                    store.dispatch("dispatchPlaces/changeDispatchPlaceUpdate", false);
                    return;
                }
            },
            nextPage: () => {

                let next = currentPage.value + 1;

                if (next > numberOfPages.value) {

                    return next = numberOfPages;

                }

                store.dispatch("dispatchPlaces/loadDispatchPlaces", next)
            },
            prevPage: () => {

                let prev = currentPage.value - 1;

                if (prev < 1) {
                    return prev = 1;
                }

                store.dispatch("dispatchPlaces/loadDispatchPlaces", prev)
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
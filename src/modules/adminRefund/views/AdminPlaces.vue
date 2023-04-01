<template>
    <div class="admin_menu-wrapper">
        <div v-if="status === 'CARGANDO'">
            <loading />
        </div>
        <div v-else class="">
            <div class="header-wrapper">
                <div class="search-wrapper">
                    <label for="search">Buscar por nombre</label>
                    <input type="text" id="search" v-model="term">
                </div>
                <form class="form-wrapper" @submit.prevent="onSubmit">
                    <label for="name">Crear destino</label>
                    <input type="text" id="name" v-model="dispatchPlaceName" maxlength="20">
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
                    <DispatchPlace class="dispatchPlace-wrapper" v-for="dispatchPlace in dispatchPlacesByTerm" :key="dispatchPlace.id" :dispatchPlace="dispatchPlace" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import useDispatchPlaces from '../composables/dispatchPlacesStore';
import Loading from '../components/Loading.vue';
import DispatchPlace from '../components/DispatchPlace.vue'
import dispatchPlacesCommand from '../composables/dispatchPlacesCommand';

export default {
    components: { Loading, DispatchPlace },

    setup() {

        const dispatchPlaceName = ref('');

        const { status, dispatchPlacesByTerm, term } = useDispatchPlaces();

        const { postDispatchPlace } = dispatchPlacesCommand();


        return {
            postDispatchPlace,
            status,
            dispatchPlacesByTerm,
            term,
            dispatchPlaceName,

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
                    await

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


<template>
  <div v-if="destinationUpdate === true" class="update-destination">
    <update-destination @on:close="onShowUpdateDestination" />
  </div>

  <loader class="loader-wrapper" v-if="getStatusDestination === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="destinations">
      <div class="header">
        <h1>Destinos</h1>
      </div>
      <div class="create">
        <div class="form">
          <form @submit.prevent="onSubmit">
          <div class="input-wrapper">
            <input class="input-destination" type="text" placeholder="Nombre" v-model="destinationForm.name" maxlength="25" />
              <input class="input-destination my-2" type="text" placeholder="ID" v-model="destinationForm.id" maxlength="10" />
            </div>
            <div class="button-wrapper">
              <button type="submit" class="buttons-styles mx-1">Crear</button>
            <!-- <p @click="$router.push({ name: 'register-destination-massive' })" class="buttons-styles mx-1">Añadir varios destinos</p> -->
            </div>
          </form>
          </div>
      </div>
      <div class="search">
        <input type="text" placeholder="Buscar destino" v-model="term" />
      </div>
      <div v-if="showDestinations === true" class="body">
        <destinations v-for="destination of destinations" :key="destination.id" :destination="destination"
          @on:open="onShowUpdateDestination" />
      </div>
      <div v-else class="not-register">
        <h1>NO HAY REGISTROS</h1>
      </div>
      <div class="button-wrapper">
        <button type="button" @click="$router.push({ name: 'select-register' })" class="buttons-styles">
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";
import destinations from "../components/destinations.vue";
import destinationsCommand from "../composables/destinationsCommand";
import getTerm from "@/helpers/searchByTerm";
import UpdateDestination from "../components/update-destination.vue";
export default {
  components: { destinations, Loader, UpdateDestination },
  setup() {
    const store = useStore();
    const term = ref("");
    const {
      destinationTerm,
      getStatusDestination,
      destinations,
      destinationUpdate,
      destinationIdStatus,
      showDestinations,
    } = getTerm(term.value);

    const destinationForm = ref({
      name: "",
      id: ""
    });

    watch(
      () => term.value,
      () => destinationTerm(term.value)
    );
    const { postDestination } = destinationsCommand();
    return {
      destinationForm,
      postDestination,
      term,
      destinationTerm,
      getStatusDestination,
      destinations,
      destinationUpdate,
      destinationIdStatus,
      showDestinations,
      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { errorsPost, nicePost } = await postDestination(
          destinationForm.value
        );
        if (nicePost.value === false) {
          Swal.fire("Error", `${errorsPost.value}.`, "error");
          return;
        } else {
          await store.dispatch("destinations/loadDestinations");
          Swal.fire("Guardado", `Destino registrado con éxito`, "success").then(function (result) {
            if (true) {
              location.reload();
            } else {
              window.alert("Error, intente nuevamente");
            }
          }
          );
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
    };
  },
};
</script>

<style lang="scss" scoped>

.loader-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
}
.create {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  align-items: space;
  margin: auto;
}
.button-wrapper {
  padding: 4px 0 4px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 4px;
}
.header {
  color: black;
  padding: 15px;
  text-align: center;
}

.destinations {
  min-height: 400px;
  margin-top: 70px;
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 4px;
  min-width: 338px;
  border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
}
.button-forum {
  padding: 4;
}
.body {
  display: block;
  margin: auto;
  padding: 8px;
  height: 500px;
  overflow: auto;
}
.not-register {
  width: 30vw;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.search {
  margin: 10px 0 10px 0;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  border-radius: 4px;
  margin-top: 4;
}
@media screen and (min-width: 768px) {
  .destinations {
    width: 760px;
  }
}
@media screen and (min-width: 1024px) {
  .body {
    width: 90%;
  }
}
</style>
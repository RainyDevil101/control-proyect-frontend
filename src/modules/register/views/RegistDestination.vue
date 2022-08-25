
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
        <form @submit.prevent="onSubmit">
          <div class="form">
            <input
              type="text"
              placeholder="Nombre"
              v-model="destinationForm.name"
              maxlength="25"
            />
            <button type="submit" class="button-forum">CREAR</button>
          </div>
        </form>
      </div>
      <div class="search">
        <input type="text" placeholder="Buscar destino" v-model="term" />
      </div>
      <div v-if="showDestinations === true" class="body">
        <destinations
          v-for="destination of destinations"
          :key="destination.id"
          :destination="destination"
          @on:open="onShowUpdateDestination"
        />
      </div>
      <div v-else class="not-register">
        <h1>NO HAY REGISTROS</h1>
      </div>
      <div class="button-wrapper">
        <button
          type="button"
          @click="$router.push({ name: 'select-register' })"
          class="buttons-styles"
        >
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
        const { errorsPost, destination, nicePost } = await postDestination(
          destinationForm.value
        );
        if (nicePost.value === false) {
          Swal.fire("Error", `${errorsPost.value}.`, "error");
          return;
        } else {
          await store.dispatch("destinations/loadDestinations");
          Swal.fire("Guardado", "Destino registrada con éxito", "success").then(function (result) {
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
p {
  margin: 0;
  padding: 0;
}
.wrapper {
  display: flex;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
.loader-wrapper {
  width: 100%;
  min-width: 100vw;
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
  margin: 4px 0 4px 0;
}
.form {
  display: block;
}
.button-wrapper {
  padding: 4px 0 4px 0;
  display: flex;
  justify-content: center;
  align-content: center;
}
.header {
  color: black;
  padding: 15px;
  text-align: center;
}

.buttons-styles {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 4px;
  color: white;
  padding: 8px;
  width: 9.8rem;
  margin: 4px auto 4px auto;
  height: 44px;
  border: none;
  cursor: default;
    transition: 0.2s;

  &:hover {
    background-color: rgba($color: #444444, $alpha: 1.0);
  }

}
.destinations {
  width: 90%;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
}
.button-forum {
  margin: 4px;
  border-radius: 4px;
  width: 70px;
}
.body {
  display: block;
  margin: auto;
  max-height: 30rem;
  min-height: 25rem;
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
input[type="text"] {
  border-radius: 4px;
}
@media screen and (min-width: 768px) {
  .destinations {
    width: 70%;
  }
  .body {
    max-height: 35rem;
    width: 25rem;
  }
}
@media screen and (min-width: 1024px) {
  .destinations {
    width: 40%;
  }
  .body {
    width: 90%;
    max-height: 35rem;
  }
}
</style>
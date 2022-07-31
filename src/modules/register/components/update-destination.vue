<template>
  <div class="modal-background fade-in" @click.self="$emit('on:close')">
    <div class="modal-container">
      <div class="update-wrapper">
        <form @submit.prevent="onSubmit">
          <div class="name margin-item">
            <span>Nombre:</span>
            <p>
              <b>{{ destination.nombre }}</b>
            </p>
          </div>
          <div class="name margin-item">
            <span>id:</span>
            <p>
              <b>{{ destinationId }}</b>
            </p>
          </div>
          <div class="input-change-name margin-item">
            <input
              type="text"
              placeholder=""
              v-model="destinationName"
            />
          </div>
          <div class="update-button">
            <button class="btn btn-warning" type="submit">
              Cambiar Nombre
            </button>
            <button type="button" class="btn btn-danger" @click="onDelete">Eliminar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from "@vue/reactivity";
import getTerm from "@/helpers/searchByTerm";
import Loader from "@/modules/components/Loader.vue";
import Swal from 'sweetalert2';
import destinationsCommand from '@/modules/register/composables/destinationsCommand';

export default {
  components: { Loader },
  emits: ["on:close"],
  setup() {

    const store = useStore();

    const { destinationById } = getTerm();
    const destination = ref("");
    const destinationId = ref("");
    const destinationName = ref("");

    const { deleteDestination, updateDestination } = destinationsCommand();

    const destinationUpdate = ref({
      nombre: "",
    });

    destination.value = destinationById.value.destinationToChange;
    destinationId.value = destinationById.value.destinationIdToChange;
    destinationName.value = destinationById.value.destinationToChange.nombre;

    return {
      destinationById,
      destinationUpdate,
      destinationId,
      destination,
      destinationName,

      onSubmit: async () => {
        new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errorsUpdate, niceUpdate } = await updateDestination(
            destinationName.value,
            destinationId.value
        );
        
        if (niceUpdate.value === false) {
            Swal.fire("Error", `${errorsUpdate.value}.`, "error");
            return;
        } else {

            await store.dispatch("destinations/loadDestinations");

            Swal.fire(
                "Guardado",
                "Destino actualizado con éxito",
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
      onDelete: async () => {

        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No se podrá recuperar una vez borrado",
          showDenyButton: true,
          confirmButtonText: "Estoy seguro",
        });

        if (isConfirmed) {
          new Swal({
            title: "Espere por favor",
            allowOutsideClick: false,
          });
          Swal.showLoading();

          const { idDelete,
                  errorsDelete,
                  niceDelete } = await deleteDestination(destinationId.value);

          if (niceDelete.value === true) {

            await store.dispatch("destinations/loadDestinations");

            Swal.fire("Eliminado", "", "success").then(function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error", "intente nuevamente");
              }
            });

          }

        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
h1,
p {
  margin: 0;
  padding: 0;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.input-change-name {
  display: grid;
}

.name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
  max-width: 550px;
}

.modal-container {
  padding: 3rem;
  color: black;
  background-color: white;
  width: auto;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

.margin-item {
  margin: 20px 0 20px 0;
}

.update-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fade-in {
  animation: fadeIn ease-out 0.2s;
  -webkit-animation: fadeIn ease-out 0.2s;
  -moz-animation: fadeIn ease-out 0.2s;
  -o-animation: fadeIn ease-out 0.2s;
  -ms-animation: fadeIn ease-out 0.2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
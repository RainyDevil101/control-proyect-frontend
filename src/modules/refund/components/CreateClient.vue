<template>
  <div class="modal-background fade-in" @click.self="$emit('on:close')">
    <div class="modal-container">
      <div class="update-wrapper">
        <form @submit.prevent="onSubmit">
          <div class="input-change-name margin-item">
            <input type="text" placeholder="Nombre" maxlength="20" v-model="clientName" />
          </div>
          <div class="update-button">
            <button class="btn btn-warning" type="submit">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import Loader from "@/modules/components/Loader.vue";
import Swal from "sweetalert2";
import clientsCommand from "../composables/clientsCommand";

export default {
  components: { Loader },
  emits: ["on:close"],
  setup() {

    const clientName = ref("");

    const { postClient } = clientsCommand();

    return {
      postClient,
      clientName,


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
          await 

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
  max-width: 95vw;
  max-height: 80vh;
  overflow: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

.margin-item {
  margin: 20px 0 20px 0;
}

.update-button {
  display: flex;
  justify-content: center;
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
<template>
  <loader v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="divisions">
      <div class="header">
        <h1>Divisiones</h1>
      </div>
      <div class="create">
        <form @submit.prevent="onSubmit">
          <div class="form">
            <input
              type="text"
              placeholder="Nombre"
              v-model="divisionForm.name"
              maxlength="25"
            />
            <button type="submit" class="button-forum">CREAR</button>
          </div>
        </form>
      </div>
      <div class="body">
        <divisions
          v-if="divisions.length > 0"
          v-for="division of divisions"
          :key="division"
          :division="division"
        />
      </div>
      <div class="button-wrapper">
        <button
          type="button"
          @click="$router.push({ name: 'select-register' })"
          class="btn btn-warning back"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/modules/components/Loader.vue";
import { useStore } from "vuex";
import getDivision from "../../get/getDivision";
import divisions from "../components/divisions.vue";
import createDivision from "../composables/createDivision";
import Swal from "sweetalert2";
import { ref } from "@vue/reactivity";

export default {
  components: { divisions, Loader },
  setup() {
    const store = useStore();

    const { divisions, searchDivisions, status } = getDivision();
    const divisionForm = ref({
      name: "",
    });

    const { postDivision } = createDivision();

    return {
      divisions,
      searchDivisions,
      status,
      divisionForm,
      postDivision,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { division, nice, errors } = await postDivision(
          divisionForm.value
        );

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Guardado",
            "División registrada con éxito",
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
  color: #fff;
  padding: 15px;
  text-align: center;
}

.divisions {
  width: 90%;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
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
  max-height: 35rem;
  min-height: 25rem;
  overflow: auto;
}

input[type="text"] {
  border-radius: 4px;
}

@media screen and (min-width: 768px) {
  .divisions {
    width: 70%;
  }

  .body {
    max-height: 35rem;
    width: 25rem;
  }
}

@media screen and (min-width: 1024px) {
  .divisions {
    width: 30%;
  }

  .body {
    width: 90%;
    max-height: 35rem;
  }
}
</style>
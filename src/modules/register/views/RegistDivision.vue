<template>
  <div v-if="divisionUpdate === true" class="update-division">
    <update-division @on:close="onShowUpdateDivision"/>
  </div>

  <loader class="loader-wrapper" v-if="getStatusDivision === 'CARGANDO'" />

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
      <div v-if="showDivisions === true" class="body">
        <divisions
          v-for="division of divisions"
          :key="division"
          :division="division"
          @on:open="onShowUpdateDivision"
        />
      </div>
      <div v-else class="not-register">
        <h1>NO HAY REGISTROS</h1>
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
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";

import divisions from "../components/divisions.vue";
import divisionsCommand from "../composables/divisionsCommand";
import getTerm from "@/helpers/searchByTerm";
import UpdateDivision from "../components/update-division.vue";
import useAuth from '@/modules/auth/composables/useAuth';

export default {
  components: { divisions, Loader, UpdateDivision },
  setup() {
    const store = useStore();

    const term = ref("");

    const { getDivisions } = useAuth();
    const { postDivision } = divisionsCommand();

    const {
      divisionTerm,
      getStatusDivision,
      divisions,
      divisionUpdate,
      divisionIdStatus,
      showDivisions,
    } = getTerm(term.value);

    const divisionForm = ref({
      name: "",
    });

    watch(
      () => term.value,
      () => divisionTerm(term.value)
    );


    return {
      divisionForm,
      postDivision,
      term,
      divisionTerm,
      getStatusDivision,
      divisions,
      divisionUpdate,
      divisionIdStatus,
      showDivisions,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { errorsPost, divisions, nicePost } = await postDivision(
          divisionForm.value
        );

        if (nicePost.value === false) {
          Swal.fire("Error", `${errorsPost.value}.`, "error");
          return;
        } else {
          
          await store.dispatch("divisions/loadDivisions");

          Swal.fire("Guardado", "Destino registrada con éxito", "success").then(
            function (result) {
              if (true) {
                location.reload();
              } else {
                window.alert("Error, intente nuevamente");
              }
            }
          );
        }
      },
      onShowUpdateDivision: (id) => {
        if (divisionUpdate.value === false) {
          store.dispatch("divisions/changeDivisionId", id);
          store.dispatch("divisions/changeDivisionUpdate", true);
          return;
        } else {
          getDivisions();
          store.dispatch("divisions/changeDivisionUpdate", false);
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

.not-register {
  width: 30vw;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.body {
  display: block;
  margin: auto;
  max-height: 32rem;
  min-height: 25rem;
  overflow: auto;
}

.search {
  margin: 10px 0 10px 0;
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
    width: 40%;
  }

  .body {
    width: 90%;
    max-height: 35rem;
  }
}
</style>
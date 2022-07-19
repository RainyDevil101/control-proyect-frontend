<template>
  <loader class="loader-wrapper" v-if="status === 'CARGANDO'" />

  <div v-else class="wrapper">
    <div class="locations">
      <div class="header">
        <h1>Ubicaciones</h1>
      </div>
      <div class="create">
        <form @submit.prevent="onSubmit">
          <div class="form">
            <input
              type="text"
              placeholder="Nombre"
              v-model="locationForm.name"
              maxlength="25"
            />
            <button type="submit" class="button-forum">CREAR</button>
          </div>
        </form>
      </div>
      <div class="body">
        <locations
          v-if="locations.length > 0"
          v-for="location of locations"
          :key="location"
          :location="location"
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
import getLocation from "../../get/getLocation";
import locations from "../components/locations.vue";
import createLocation from "../composables/createLocation";
import Swal from "sweetalert2";
import { ref } from "@vue/reactivity";

export default {
  components: { locations, Loader },
  setup() {
    const { locations, searchLocations, status } = getLocation();
    const locationForm = ref({
      name: "",
    });

    console.log(locations.value);

    const { postLocation } = createLocation();

    return {
      locations,
      searchLocations,
      status,
      locationForm,
      postLocation,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        const { location, nice, errors } = await postLocation(
          location.value
        );

        if (nice.value === false) {
          Swal.fire("Error", `${errors.value}.`, "error");
          return;
        } else {
          Swal.fire(
            "Guardado",
            "Ubicación registrada con éxito",
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

.locations {
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
  .locations {
    width: 70%;
  }

  .body {
    max-height: 35rem;
    width: 25rem;
  }
}

@media screen and (min-width: 1024px) {
  .locations {
    width: 30%;
  }

  .body {
    width: 90%;
    max-height: 35rem;
  }
}
</style>
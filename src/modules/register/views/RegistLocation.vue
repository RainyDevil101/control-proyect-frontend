<template>
  <div v-if="locationUpdate === true" class="update-location">
    <update-location @on:close="onShowUpdateLocation" />
  </div>

  <div v-if="getStatusLocation === 'CARGANDO'" class="loader-wrapper">
    <loader />
  </div>

  <div v-else class="wrapper-locations">
    <div class="locations">
      <div class="header">
        <h1>Ubicaciones</h1>
      </div>

      <div v-if="showLocations === true" class="body-location">
        <locations
          v-for="location of locations"
          :key="location"
          :location="location"
          @on:open="onShowUpdateLocation"
        />
      </div>
      <div v-else class="not-register"><h1>NO HAY REGISTROS</h1></div>
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
    <div class="create-wrapper">
      <div class="create">
        <form @submit.prevent="onSubmit">
          <div class="header">
            <h1>Registrar ubicación</h1>
          </div>
          <div class="form form-name">
            <p>Nombre</p>
            <input
              type="text"
              placeholder="Nombre"
              v-model="locationForm.name"
              maxlength="60"
            />
          </div>
          <div class="form form-name">
            <p>Sector</p>
            <input
              type="text"
              placeholder="Sector"
              v-model="locationForm.sector"
              maxlength="60"
            />
          </div>
          <div class="form form-location-division">
            <p>División</p>
            <select
              v-model="locationForm.location_division"
              aria-label="Default select example"
            >
              <option
                v-for="division of divisions"
                :key="division.id"
                :value="division.id"
              >
                {{ division.name }}
              </option>
            </select>
          </div>
          <div class="button-wrapper">
            <button type="submit" class="btn btn-warning back">CREAR</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Loader from "@/modules/components/Loader.vue";

import locations from "../components/locations.vue";
import locationsCommand from "../composables/locationsCommand";
import getTerm from "@/helpers/searchByTerm";
import updateLocation from "../components/update-location.vue";
import useAuth from "../../auth/composables/useAuth";

export default {
  components: { locations, Loader, updateLocation },
  setup() {
    const store = useStore();

    const { getLocations } = useAuth();
    const { postLocation } = locationsCommand();

    const {
      locationTerm,
      getStatusLocation,
      locations,
      locationUpdate,
      locationIdStatus,
      showLocations,
      divisions,
    } = getTerm();

    const locationForm = ref({
      name: "TESTTTT",
      sector: "TESTING",
      location_division: "",
    });

    return {
      locationForm,
      postLocation,
      locations,
      getStatusLocation,
      locationTerm,
      locationUpdate,
      locationIdStatus,
      showLocations,
      divisions,

      onSubmit: async () => {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        const { errorsPost, nicePost } = await postLocation(
          locationForm.value
        );

        if (nicePost.value === false) {
          Swal.fire("Error", `${errorsPost.value}.`, "error");
          return;
        } else {
          await store.dispatch("divisions/loadDivisions");

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
      onShowUpdateLocation: (id) => {
        if (locationUpdate.value === false) {
          store.dispatch("locations/changeLocationId", id);
          store.dispatch("locations/changeLocationUpdate", true);
          return;
        } else {
          getLocations();
          store.dispatch("locations/changeLocationUpdate", false);
          return;
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
p,
h1 {
  margin: 0;
  padding: 0;
}

.wrapper-locations {
  display: block;
  min-height: 100vh;
  width: 90vw;
  margin: auto;
  padding: 4rem 0 10px 0;
}

.button-wrapper {
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.locations {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  border-radius: 4px;
  min-width: 300px;
  padding: 15px;
}

.not-register {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.body-location {
  height: 70vh;
  overflow: auto;
  width: 100%;
}

.header h1 {
  text-align: center;
  color: white;
  padding: 10px;
}

.create-wrapper {
  margin-top: 20px;
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  min-width: 300px;
  border-radius: 4px;
  display: flex;
  padding: 15px;
}

.loader-wrapper {
  width: 100vw;
  height: 100vh;
}

.create {
  margin: auto;
  width: 100%;
}

.form {
  display: block;
  margin: auto;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type=""] {
  width: 100%;
}

select {
  width: 100%;
}

@media screen and (min-width: 948px) {
  .wrapper-locations {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .create {
    margin: auto;
    height: 100%;
    min-width: 400px;
  }

  .locations {
    min-width: 400px;
  }

  .body-location {
    height: 60vh;
    overflow: auto;
  }
}
</style>